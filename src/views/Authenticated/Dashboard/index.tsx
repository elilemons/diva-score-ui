import { useAuth } from '@components/appProviders/Auth'
import * as React from 'react'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  return (
    <div>
      <h1>Welcome to your Dashboard {user && `${user.email}`}!</h1>
    </div>
  )
}

export default Dashboard
