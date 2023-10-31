import './App.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider } from '@components/appProviders/Auth'
import { InAppBrowserListener } from '@components/elements/InAppBrowserListener'
import { OnRouteChange } from '@components/elements/OnRouteChange'
import { Routes } from '@root/views/Routes'
import { Slide, toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

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
        <div className='app'>
          <Router>
            <OnRouteChange />
            <InAppBrowserListener />
            <AuthProvider>
              <Routes />
            </AuthProvider>
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
