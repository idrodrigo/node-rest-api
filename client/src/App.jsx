import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AuthProvider } from './context/authContext'
import { TodoProvider } from './context/todoContext'
import { TodoRoutes } from './routes'




function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <TodoRoutes />
          </main>
        </BrowserRouter>
      </TodoProvider>
    </AuthProvider>
  )
}

export default App
