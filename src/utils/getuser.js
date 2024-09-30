export const getUserRole = () => {
    // Implement logic to get the user's role from your authentication system
    // For example:
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { role } = JSON.parse(userInfo);
      return role;
    }
    return null; // or a default role
  };