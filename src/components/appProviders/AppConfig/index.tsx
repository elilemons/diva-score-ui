import React, { createContext, useContext } from 'react'

type ContextType = {
  apiDomain: string
}
const Context = createContext<ContextType>({
  apiDomain: '',
})

type AppConfigProviderProps = {
  children: React.ReactNode
}
const AppConfigProvider: React.FC<AppConfigProviderProps> = ({
  children,
}: AppConfigProviderProps) => {
  const apiDomain = process.env.REACT_APP_API_URL || ''

  return <Context.Provider value={{ apiDomain }}>{children}</Context.Provider>
}

const useAppConfig = (): ContextType => useContext(Context)

export { AppConfigProvider, useAppConfig }
