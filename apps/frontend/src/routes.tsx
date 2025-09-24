import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage.tsx'
import { AuthLayout } from './pages/AuthLayout.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
// import RecipesPage from './pages/RecipesPage'
// import AddRecipePage from './pages/AddRecipePage'
// import ProtectedRoute from './components/ProtectedRoute'
// import NotFoundPage from './pages/NotFoundPage'

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<HomePage />} />

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* <Route path="/recipes" element={<RecipesPage />} /> */}

        {/* Routes protégées */}
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/add-recipe" element={<AddRecipePage />} />
        </Route> */}

        {/* Route 404 */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes