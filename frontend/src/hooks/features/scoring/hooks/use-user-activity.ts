import { useEffect } from 'react';
import { UserActivityService } from '../services/user-activity.service';
import { IUserActivityService } from '../interfaces/index';

// Create a singleton instance
let userActivityServiceInstance: IUserActivityService | null = null;

export function useUserActivity(): IUserActivityService {
  if (!userActivityServiceInstance) {
    userActivityServiceInstance = new UserActivityService();
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      userActivityServiceInstance?.resetActivity();
    };
  }, []);

  return userActivityServiceInstance;
}
