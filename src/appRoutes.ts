export const APP_ROUTES = {
  unauthenticated: {
    home: '/',
    login: '/login',
    signup: '/signup',
    signupSuccess: '/signup-success',
    verifyEmail: '/verify-email/:token',
  },
  authenticated: {
    dashboard: '/dashboard',
  },
}
