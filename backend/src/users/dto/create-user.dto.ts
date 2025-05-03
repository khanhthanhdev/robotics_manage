import { UserRole } from '../../utils/prisma-types';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

// Define the Zod schema for user creation
export const CreateUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: 'Invalid user role' }),
  }),
  createdById: z.string().uuid('Creator ID must be a valid UUID').optional(),
});

// Create a DTO class from the Zod schema
export class CreateUserDto extends createZodDto(CreateUserSchema) {}