import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AuthProvider } from './context/authContext'
import { TodoProvider } from './context/todoContext'
import { TodoRoutes } from './routes/Routes'
import { Suspense } from 'react'

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto lg:px-52 md:px-16 px-4">
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar />
              <TodoRoutes />
            </Suspense>
          </main>
        </BrowserRouter>
      </TodoProvider>
    </AuthProvider>
  )
}

export default App
