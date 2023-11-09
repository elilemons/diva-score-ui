import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider } from '@components/appProviders/Auth'
import { InAppBrowserListener } from '@components/elements/InAppBrowserListener'
import { OnRouteChange } from '@components/elements/OnRouteChange'
import { Routes } from '@root/views/Routes'
import { Slide, toast, ToastContainer } from 'react-toastify'

import { DialogProvider } from '@components/appProviders/Dialogs'
import { NavigationProvider } from '@components/appProviders/Navigation'
import 'react-toastify/dist/ReactToastify.css'

import classes from './App.module.css'

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
        <ToastContainer
          position={toast.POSITION.BOTTOM_CENTER}
          transition={Slide}
          autoClose={2000}
        />
      </QueryClientProvider>
    </>
  )
}

export default App
