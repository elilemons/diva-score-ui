import * as React from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

import { useAuth } from '@components/appProviders/Auth'
import FullscreenLoader from '@components/elements/FullscreenLoader'
import Layout from '@components/elements/Layout'
import { APP_ROUTES } from '@root/appRoutes'

// // // // // // // // //
// Global Pages
// // // // // // // // //
const Home = React.lazy(() => import('./Global/Home'))

// // // // // // // // //
// Unauthenticated Pages
// // // // // // // // //
const Login = React.lazy(() => import('./Unauthenticated/Login'))
const Signup = React.lazy(() => import('./Unauthenticated/Signup'))
const SignupSuccess = React.lazy(() => import('./Unauthenticated/SignupSuccess'))
const VerifyEmail = React.lazy(() => import('./Unauthenticated/VerifyEmail'))
const ForgotPassword = React.lazy(() => import('./Unauthenticated/ForgotPassword'))
const ResetPassword = React.lazy(() => import('./Unauthenticated/ResetPassword'))

// // // // // // // // //
// Authenticated Pages
// // // // // // // // //
const Account = React.lazy(() => import('./Authenticated/Account'))
const Dashboard = React.lazy(() => import('./Authenticated/Dashboard'))

// // // // // // // // //
// Global Routes
// // // // // // // // //
const globalRoutes = [
  {
    exact: true,
    path: APP_ROUTES.global.home,
    component: Home,
  },
]

// // // // // // // // //
// Unauthenticated Routes
// // // // // // // // //
const unauthenticatedRoutes = [
  {
    exact: true,
    path: APP_ROUTES.unauthenticated.login,
    component: Login,
  },
  {
    exact: true,
    path: APP_ROUTES.unauthenticated.loginWithEmail,
    component: Login,
  },
  {
    exact: true,
    path: APP_ROUTES.unauthenticated.signup,
    component: Signup,
  },
  {
    exact: true,
    path: APP_ROUTES.unauthenticated.signupSuccess,
    component: SignupSuccess,
  },
  {
    exact: true,
    path: APP_ROUTES.unauthenticated.verifyEmail,
    component: VerifyEmail,
  },
  {
    exact: true,
    path: APP_ROUTES.unauthenticated.forgotPassword,
    component: ForgotPassword,
  },
  {
    exact: true,
    path: APP_ROUTES.unauthenticated.forgotPasswordWithEmail,
    component: ForgotPassword,
  },
  {
    exact: true,
    path: APP_ROUTES.unauthenticated.resetPassword,
    component: ResetPassword,
  },
]

// // // // // // // // //
// Authenticated Routes
// // // // // // // // //
const authenticatedRoutes = [
  {
    exact: true,
    path: APP_ROUTES.authenticated.account,
    component: Account,
  },
  {
    exact: true,
    path: APP_ROUTES.authenticated.dashboard,
    component: Dashboard,
  },
]

export const Routes: React.FC = () => {
  const { user } = useAuth()
  const history = useHistory()
  const location = useLocation()

  const attemptedUserFetch = user !== undefined
  const isAuthenticated = user

  React.useEffect(() => {
    if (location?.pathname.startsWith('/uni/')) {
      history.push(`${location.pathname.replace('/uni/', '/')}${location.search}${location.hash}`)
    }
  }, [location, history])

  return (
    <Layout>
      <React.Suspense fallback={<FullscreenLoader />}>
        <Switch>
          <Route exact path='/' component={Home} />

          {globalRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>

        {attemptedUserFetch && !isAuthenticated && (
          <Switch>
            {unauthenticatedRoutes.map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
        )}

        {attemptedUserFetch && isAuthenticated && (
          <Switch>
            {authenticatedRoutes.map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
        )}
      </React.Suspense>
    </Layout>
  )
}
