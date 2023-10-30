import React from 'react'
import { useAuth } from '@components/appProviders/Auth'
// import { APP_ROUTES } from '@root/appRoutes'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Home from '@root/views/Unauthenticated/Home'

// TODO Make this lazy once I have a template: https://reactrouter.com/en/main/route/lazy
// Unauthenticated pages
// const Home = () => import('./Unauthenticated/Home')

// const unauthenticatedRoutes = [
//   {
//     path: APP_ROUTES.unauthenticated.home,
//     lazy: Home,
//   },
// ]

// TODO
// const authenticatedRoutes = [
//   {
//     path: APP_ROUTES.authenticated.dashboard,
//     component: Dashboard,
//   },
// ]

export const DIVARoutes: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const attemptedUserFetch = user !== undefined
  const isAuthenticated = user

  React.useEffect(() => {
    if (location?.pathname.startsWith('/uni/')) {
      navigate(`${location.pathname.replace('/uni/', '/')}${location.search}${location.hash}`)
    }
  }, [location, navigate])

  return (
    // TODO Create a fallback component like <FullscreenLoader />
    <React.Suspense>
      {attemptedUserFetch && !isAuthenticated && (
        <Routes>
          <Route path='/' element={<Home />} />

          {/* {unauthenticatedRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))} */}

          {/* {location &&
          ['/terms-of-use', '/tos', '/terms-of-service'].includes(location.pathname) ? (<>
              <Route from='/terms-of-service' to='/terms-of-use' />
              <Route from='/tos' to='/terms-of-use' />
              </>
          ) : (
            <Route>
            </Route>
          )} */}
        </Routes>
      )}

      {/* TODO Authenticated Routes */}
      {/* {attemptedUserFetch && isAuthenticated && (
        <Routes>
          {authenticatedRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))}

        </Routes>
         // TODO <Route path={APP_ROUTES.authenticated.shared.notFound} />

      )} */}
    </React.Suspense>
  )
}
