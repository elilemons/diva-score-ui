import React, { createContext, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

type ContextType = {
  goBackRoutes: {
    [key: string]: string
  }
  goBackOrReturn: () => void
  routeToAndTag: (route: string) => void
}
const Context = createContext<ContextType>({
  goBackRoutes: {},
  goBackOrReturn: () => undefined,
  routeToAndTag: () => undefined,
})

type NavigationProviderProps = {
  children: React.ReactNode
}

const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [goBackRoutes, setGoBackRoutes] = React.useState<{ [key: string]: string }>({})
  const location = useLocation()
  const history = useHistory()

  const goBackOrReturn = React.useCallback(() => {
    if (goBackRoutes[location.pathname]) {
      history.push(goBackRoutes[location.pathname])
    } else {
      history.goBack()
    }
  }, [location.pathname, history, goBackRoutes])

  const routeToAndTag = (goingToRoute: string) => {
    setGoBackRoutes(routes => ({
      ...routes,
      [goingToRoute]: location.pathname,
    }))

    history.push(goingToRoute)
  }

  return (
    <Context.Provider
      value={{
        routeToAndTag,
        goBackOrReturn,
        goBackRoutes,
      }}
    >
      {children}
    </Context.Provider>
  )
}

const useNavigation = (): ContextType => useContext(Context)

export { NavigationProvider, useNavigation }
