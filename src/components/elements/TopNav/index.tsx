import { useAuth } from '@components/appProviders/Auth'
import * as React from 'react'

const TopNav: React.FC = () => {
  const { user } = useAuth()
  // TODO Remove this test code
  console.log('ELITEST TopNav')
  // ^ TODO Remove this test code

  return user ? (
    <div>
      <div>Logo</div>
      <div>Dashboard</div>
      <div>Calendar</div>
      <div>Account</div>
    </div>
  ) : (
    <div>
      <div>Logo</div>
      <div>Home</div>
      <div>Login</div>
      <div>Get Started</div>
    </div>
  )
}

export default TopNav
