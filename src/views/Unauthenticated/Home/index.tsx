import { APP_ROUTES } from '@root/appRoutes'
import * as React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  // TODO Remove this test code
  console.log('ELITEST Home Page')
  // ^ TODO Remove this test code

  return (
    <div>
      <h2>Daily Inspired Vision and Actions</h2>
      <p>
        Elevate the self-care journey for Daily Inspired Vision and Action (Divas) with your own
        DIVA Score. Daily check-ins on body, mind, and spirit activities, each with point values,
        provide a personalized Daily Self-Care Score. Stay accountable to your well-being and goals,
        and cultivate gratitude and connection with this app.
      </p>

      {/* TODO Make Button Component */}
      <Link to={APP_ROUTES.unauthenticated.signup}>Get Started</Link>
      <Link to={APP_ROUTES.unauthenticated.login}>Login</Link>
    </div>
  )
}

export default Home
