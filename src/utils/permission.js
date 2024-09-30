import { getUserRole } from './auth';

const PERMISSIONS = {
  ADMIN: ['home', 'timesheet', 'project', 'clients', 'organization', 'expenses', 'department', 'reports', 'settings'],
  USER: ['home', 'timesheet', 'project', 'clients', 'userprofile']
};

export function hasPermission  (permission)  {
  const userRole = getUserRole(); // Get the user's role from your authentication system
  const userPermissions = PERMISSIONS[userRole] || [];
  return userPermissions.includes(permission);
};
