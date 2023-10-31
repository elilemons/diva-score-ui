import * as React from 'react'
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom'

import { useAuth } from '@components/appProviders/Auth'
import FullscreenLoader from '@components/elements/FullscreenLoader'
import Layout from '@components/elements/Layout'
import { APP_ROUTES } from '@root/appRoutes'

// // // // // // // // //
// Unauthenticated Pages
// // // // // // // // //
const Home = React.lazy(() => import('./Unauthenticated/Home'))
const Login = React.lazy(() => import('./Unauthenticated/Login'))
const Signup = React.lazy(() => import('./Unauthenticated/Signup'))
const SignupSuccess = React.lazy(() => import('./Unauthenticated/SignupSuccess'))
const VerifyEmail = React.lazy(() => import('./Unauthenticated/VerifyEmail'))

// // // // // // // // //
// Authenticated Pages
// // // // // // // // //
const Dashboard = React.lazy(() => import('./Authenticated/Dashboard'))

// // // // // // // // //
// Unauthenticated Routes
// // // // // // // // //
const unauthenticatedRoutes = [
  {
    exact: true,
    path: APP_ROUTES.unauthenticated.home,
    component: Home,
  },
  {
    exact: true,
    path: APP_ROUTES.unauthenticated.login,
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
]

// // // // // // // // //
// Authenticated Routes
// // // // // // // // //
const authenticatedRoutes = [
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

  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  React.useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [user])
  React.useEffect(() => {
    if (location?.pathname.startsWith('/uni/')) {
      history.push(`${location.pathname.replace('/uni/', '/')}${location.search}${location.hash}`)
    }
  }, [location, history])

  return (
    <Layout>
      <React.Suspense fallback={<FullscreenLoader />}>
        {!isAuthenticated && (
          <Switch>
            {unauthenticatedRoutes.map(route => (
              <Route key={route.path} {...route} />
            ))}

            <Route>
              <Redirect to={APP_ROUTES.unauthenticated.login} />
            </Route>
          </Switch>
        )}

        {isAuthenticated && (
          <Switch>
            {authenticatedRoutes.map(route => (
              <Route key={route.path} {...route} />
            ))}

            {/* TODO */}
            {/* <Route>
              <Redirect to={APP_ROUTES.authenticated.shared.notFound} />
            </Route> */}
            <Route>
              <Redirect to={APP_ROUTES.authenticated.dashboard} />
            </Route>
          </Switch>
        )}
      </React.Suspense>
    </Layout>
  )
}
