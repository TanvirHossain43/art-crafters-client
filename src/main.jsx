import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import AuthProviders from './Providers/AuthProviders'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from './Components/Shared/ThemeContext/ThemeProvider'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProviders>
          <RouterProvider router={router} />
        </AuthProviders>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
