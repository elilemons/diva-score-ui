import * as React from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

import { useAuth } from '@components/appProviders/Auth'
import FullscreenLoader from '@components/elements/FullscreenLoader'
import Layout from '@components/elements/Layout'
import { APP_ROUTES } from '@root/appRoutes'

// // // // // // // // //
// Unauthenticated Pages
// // // // // // // // //
const Home = React.lazy(() => import('./Unauthenticated/Home'))
// const Login = React.lazy(() => import("./Unauthenticated/Login"))
const Signup = React.lazy(() => import('./Unauthenticated/Signup'))

// // // // // // // // //
// Unauthenticated Routes
// // // // // // // // //
const unauthenticatedRoutes = [
  {
    exact: true,
    path: APP_ROUTES.unauthenticated.home,
    component: Home,
  },
  // {
  //   exact: true,
  //   path: APP_ROUTES.unauthenticated.login,
  //   component: Login,
  // },
  {
    exact: true,
    path: APP_ROUTES.unauthenticated.signup,
    component: Signup,
  },
]

// // // // // // // // //
// Authenticated Routes
// // // // // // // // //
// const unauthenticatedRoutes = [
//   {
//     exact: true,
//     path: APP_ROUTES.unauthenticated.dashboard,
//     component: Dashboard,
//   },
// ]

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
        {attemptedUserFetch && !isAuthenticated && (
          <Switch>
            {unauthenticatedRoutes.map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
        )}

        {attemptedUserFetch && isAuthenticated && (
          <Switch>
            {/* {authenticatedRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))} */}

            {/* <Route>
            <Redirect to={APP_ROUTES.authenticated.shared.notFound} />
          </Route> */}
          </Switch>
        )}
      </React.Suspense>
    </Layout>
  )
}
