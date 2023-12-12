import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider } from '@components/appProviders/Auth'
import { InAppBrowserListener } from '@components/elements/InAppBrowserListener'
import { OnRouteChange } from '@components/elements/OnRouteChange'
import { Routes } from '@root/views/Routes'

import { DialogProvider } from '@components/appProviders/Dialogs'
import { NavigationProvider } from '@components/appProviders/Navigation'

import { createStandaloneToast } from '@chakra-ui/react'

import { AppConfigProvider } from '@root/components/appProviders/AppConfig'
import classes from './App.module.css'

const { ToastContainer } = createStandaloneToast()

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        staleTime: Infinity,
        structuralSharing: false,
      },
    },
  })

  return (
    <>
      <AppConfigProvider>
        <QueryClientProvider client={queryClient}>
          <div className={classes.app}>
            <Router>
              <NavigationProvider>
                <DialogProvider>
                  <OnRouteChange />
                  <InAppBrowserListener />
                  <AuthProvider>
                    <Routes />
                  </AuthProvider>
                </DialogProvider>
              </NavigationProvider>
            </Router>
          </div>
          <ToastContainer />
        </QueryClientProvider>
      </AppConfigProvider>
    </>
  )
}

export default App
