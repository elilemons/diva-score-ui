export const APP_ROUTES = {
  global: {
    home: '/',
    notFound: '/not-found',
  },

  unauthenticated: {
    login: '/login',
    loginWithEmail: '/login/:email',
    signup: '/signup',
    signupSuccess: '/signup-success',
    verifyEmail: '/verify-email/:token',
    forgotPassword: '/forgot-password',
    forgotPasswordWithEmail: '/forgot-password/:email',
  },
  authenticated: {
    account: '/account',
    dashboard: '/dashboard',
    survey: '/survey',
    surveyWithId: '/survey/:surveyId',
  },
}
