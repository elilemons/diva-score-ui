import { useAuth } from '@components/appProviders/Auth'
import { APP_ROUTES } from '@root/appRoutes'
import * as React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  const { user } = useAuth()
  return (
    <div>
      <h2>Daily Inspired Vision and Actions</h2>
      <p>
        Elevate the self-care journey for Daily Inspired Vision and Action (Divas) with your own
        DIVA Score. Daily check-ins on body, mind, and spirit activities, each with point values,
        provide a personalized Daily Self-Care Score. Stay accountable to your well-being and goals,
        and cultivate gratitude and connection with this app.
      </p>

      {/* TODO Add Button Component */}
      {user ? (
        <>
          <div>
            <Link to={APP_ROUTES.authenticated.dashboard}>Dashboard</Link>
          </div>
          <div>
            <Link to={APP_ROUTES.authenticated.account}>Manage Account</Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to={APP_ROUTES.unauthenticated.signup}>Get Started</Link>
          </div>
          <div>
            <Link to={APP_ROUTES.unauthenticated.login}>Login</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
