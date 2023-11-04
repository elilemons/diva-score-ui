import TopNav from '@components/elements/TopNav'
import * as React from 'react'

type Props = {
  children: React.ReactNode
  hideTopNav?: boolean
}

const Layout: React.FC<Props> = ({ children, hideTopNav = false }: Props) => {
  return (
    <div>
      {!hideTopNav && <TopNav />}
      <div>{children}</div>
    </div>
  )
}

export default Layout
