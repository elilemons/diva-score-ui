import TopNav from '@components/elements/TopNav'
import * as React from 'react'

const Home: React.FC = () => {
  // TODO Remove this test code
  console.log('ELITEST Home Page')
  // ^ TODO Remove this test code

  return (
    <div>
      <TopNav />
      <h2>Daily Inspired Vision and Actions</h2>
      <p>
        Elevate the self-care journey for Daily Inspired Vision and Action (Divas) with your own
        DIVA Score. Daily check-ins on body, mind, and spirit activities, each with point values,
        provide a personalized Daily Self-Care Score. Stay accountable to your well-being and goals,
        and cultivate gratitude and connection with this app.
      </p>

      {/* TODO Make Button Component */}
      <div>Get Started</div>
      <div>Login</div>
    </div>
  )
}

export default Home
