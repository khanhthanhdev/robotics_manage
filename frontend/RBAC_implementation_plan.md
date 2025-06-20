# Frontend RBAC Implementation Plan

This document outlines the step-by-step process for implementing a robust Role-Based Access Control (RBAC) system in the Next.js frontend application.

**Goal:** To create a secure and user-friendly interface that dynamically adjusts what the user can see and do based on their assigned role.

---

### Prerequisites

1.  **Backend API:** The backend must have an authentication endpoint (`/login`) that, upon successful login, returns a user object including their `role`.
2.  **Secure Token:** The backend should provide a secure token (e.g., JWT) that is stored on the client (e.g., in an HttpOnly cookie) to manage the session.

---

### Step 1: Centralize Authentication State with React Context

Create a global context to manage the user's session. This makes the user's role and authentication status available to any component in the application without prop-drilling.

**Action:** Create a new file `src/hooks/useAuth.tsx`.

```tsx
// src/hooks/useAuth.tsx
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types/user'; // We will create this in the next step
import { authService } from '@/services/authService'; // Assume this service exists

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const currentUser = await authService.getCurrentUser(); // Verifies token with backend
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, []);

  const logout = () => {
    authService.logout(); // Clears token
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

**Action:** Wrap the root layout with this `AuthProvider`.

```tsx
// src/app/layout.tsx
import { AuthProvider } from '@/hooks/useAuth';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

### Step 2: Define Shared Types

Create a shared type definition for the `User` and `UserRole` to ensure consistency between the frontend and backend.

**Action:** Create a new file `src/types/user.ts`.

```ts
// src/types/user.ts
export enum UserRole {
  ADMIN = 'ADMIN',
  HEAD_REFEREE = 'HEAD_REFEREE',
  ALLIANCE_REFEREE = 'ALLIANCE_REFEREE',
  TEAM_LEADER = 'TEAM_LEADER',
  TEAM_MEMBER = 'TEAM_MEMBER',
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}
```

---

### Step 3: Component-Level Access Control

Use the `useAuth` hook to conditionally render UI elements based on the user's role.

**Action:** Create a `RoleGuard` component for cleaner conditional rendering. This component centralizes the display logic, making it highly scalable.

```tsx
// src/components/auth/RoleGuard.tsx
"use client";

import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/user';
import { ReactNode } from 'react';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>; // Or a spinner component
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null; // Don't render anything if user is not authorized
  }

  return <>{children}</>;
}
```

**Usage Example:**

```tsx
// In any component that needs role-based UI
import { RoleGuard } from '@/components/auth/RoleGuard';
import { UserRole } from '@/types/user';

function MatchControls() {
  return (
    <div>
      <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.HEAD_REFEREE]}>
        <button>Approve Final Score</button>
      </RoleGuard>

      <RoleGuard allowedRoles={[UserRole.ADMIN]}>
        <button>System-Wide Reset</button>
      </RoleGuard>
    </div>
  );
}
```

**Scalability Note:** Using a `RoleGuard` component is highly scalable. If you need to change your permission logic (e.g., a "Super Admin" should inherit "Admin" permissions), you only need to update the logic inside the `RoleGuard.tsx` file once. The change will automatically apply everywhere the component is used.

---

### Step 4: Page-Level Access Control (Protected Routes)

Use Next.js Middleware to protect entire pages. This is the most secure and performant method.

**Action:** Create an `access-denied` page.

```tsx
// src/app/access-denied/page.tsx
export default function AccessDeniedPage() {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
}
```

**Action:** Create the `middleware.ts` file in the root of your project (or inside `src/`).

```ts
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from '@/types/user';

// This is a simplified example. In a real app, use a library like 'jose' to verify and decode JWTs.
async function getRoleFromToken(token: string | undefined): Promise<UserRole | null> {
  if (!token) return null;
  // Replace with actual JWT decoding logic
  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  return payload.role || null;
}

const protectedRoutes: Record<string, UserRole[]> = {
  '/admin': [UserRole.ADMIN],
  '/stages': [UserRole.ADMIN],
  '/referee-panel': [UserRole.ADMIN, UserRole.HEAD_REFEREE],
  '/team-management': [UserRole.TEAM_LEADER],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requiredRoles = Object.entries(protectedRoutes).find(([path]) =>
    pathname.startsWith(path)
  )?.[1];

  // If the route is not protected, let it pass
  if (!requiredRoles) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth_token')?.value;
  const userRole = await getRoleFromToken(token);

  if (!userRole || !requiredRoles.includes(userRole)) {
    const url = request.nextUrl.clone();
    url.pathname = '/access-denied';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/stages/:path*', '/referee-panel/:path*', '/team-management/:path*'],
};
```

**Scalability Note:** Using Middleware is the most scalable way to protect pages. To protect a new section of your application (e.g., `/analytics`), you only need to add the new path to the `protectedRoutes` object and the `matcher` array in this single file. You do not need to add any security code to the new page components themselves.

---

### Step 5: Long-Term Scalability and Maintenance

This architecture is designed to grow with your application without becoming complex.

*   **Centralized Rules:** All page-level security rules are in `middleware.ts`. All component-level display logic is in `RoleGuard.tsx`. This makes it easy to understand and modify your permission system.
*   **Adding New Roles:** To add a new role (e.g., "Sponsor"), you simply add it to the `UserRole` enum and then include it in the `allowedRoles` arrays where needed. No major refactoring is required.
*   **Adding New Pages:** To protect a new page, you make a one-line change in the middleware. This is extremely efficient and reduces the risk of forgetting to protect a page.

### Summary & Best Practices

*   **Centralize Logic:** Use the `AuthProvider`, `RoleGuard`, and `middleware.ts` to keep your RBAC logic clean, centralized, and scalable.
*   **Middleware is Key:** Use middleware for page-level protection. It's more secure, performant, and vastly easier to maintain than client-side checks as your app grows.
*   **UX is Not Security:** Remember that frontend controls are for user experience. The backend `RolesGuard` is your actual security. Always validate permissions on the server for every API call.
*   **Provide Feedback:** Don't just render `null`. Use loading states and redirect to an `access-denied` page to give the user clear feedback.


