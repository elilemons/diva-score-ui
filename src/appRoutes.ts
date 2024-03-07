export const APP_ROUTES = {
  global: {
    home: '/',
    notFound: '/not-found',
    termsOfService: '/terms-of-service',
    privacyPolicy: '/privacy-policy',
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
    calendar: '/calendar',
    dashboard: '/dashboard',
    survey: '/survey',
    surveyWithId: '/survey/:surveyId',
  },
}
