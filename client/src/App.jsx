import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AuthProvider } from './context/authContext'
import { TodoProvider } from './context/todoContext'
import { TodoRoutes2 } from './routes'

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto lg:px-52 md:px-16 px-4">
            <Navbar />
            <TodoRoutes2 />
          </main>
        </BrowserRouter>
      </TodoProvider>
    </AuthProvider>
  )
}

export default App
