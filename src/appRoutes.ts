export const APP_ROUTES = {
  global: {
    home: '/',
  },

  unauthenticated: {
    login: '/login',
    signup: '/signup',
    signupSuccess: '/signup-success',
    verifyEmail: '/verify-email/:token',
  },
  authenticated: {
    account: '/account',
    dashboard: '/dashboard',
  },
}
