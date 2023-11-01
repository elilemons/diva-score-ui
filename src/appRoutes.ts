export const APP_ROUTES = {
  global: {
    home: '/',
  },

  unauthenticated: {
    login: '/login',
    loginWithEmail: '/login/:email',
    signup: '/signup',
    signupSuccess: '/signup-success',
    verifyEmail: '/verify-email/:token',
    forgotPassword: '/forgot-password',
    forgotPasswordWithEmail: '/forgot-password/:email',
    resetPassword: '/reset-password/:token/:email',
  },
  authenticated: {
    account: '/account',
    dashboard: '/dashboard',
  },
}
