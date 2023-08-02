import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'

import { AuthProvider } from './context/authContext'
import { TodoProvider } from './context/todoContext'
import { TodoRoutes } from './routes/Routes'

import Loader from './components/ui/Loader'
import Navbar from './components/Navbar'

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto lg:px-52 md:px-16 px-4">
            <Navbar />
            <Suspense fallback={<Loader />}>
              <TodoRoutes />
            </Suspense>
          </main>
        </BrowserRouter>
      </TodoProvider>
    </AuthProvider>
  )
}

export default App
