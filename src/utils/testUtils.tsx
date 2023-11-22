import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '@components/appProviders/Auth'
import { DialogProvider } from '@components/appProviders/Dialogs'
import { NavigationProvider } from '@components/appProviders/Navigation'
import { theme } from '@root/theme'
import { render, RenderOptions } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: Infinity,
      structuralSharing: false,
    },
  },
})

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavigationProvider>
            <DialogProvider>
              {/* <OnRouteChange /> */}
              {/* <InAppBrowserListener /> */}
              <AuthProvider>{children}</AuthProvider>
            </DialogProvider>
          </NavigationProvider>
        </Router>
        {/* <ToastContainer /> */}
      </QueryClientProvider>
    </ChakraProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
