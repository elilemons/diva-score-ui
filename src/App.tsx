import './App.css'
import { AuthProvider } from '@components/appProviders/Auth'
import { DIVARoutes } from '@root/views/Routes'
import { QueryClient, QueryClientProvider } from 'react-query'

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
    <QueryClientProvider client={queryClient}>
      <div className='app'>
        <AuthProvider>
          <DIVARoutes />
        </AuthProvider>
      </div>
    </QueryClientProvider>
  )
}

export default App
