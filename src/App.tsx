import { Suspense } from 'react'
import { MainLayout } from './layouts/MainLayout'
import { AppLoader } from './components/AppLoader'
import { Route, Routes } from "react-router-dom";
import { appRoutes } from './routes'
import { MAIN_PAGE } from './routes/pathnames'
import './App.css'
import DashboardPage from './pages/Dashboard';

function App() {
  // const userId = useAppSelector(state => state.auth.user.id)

  return (
    <MainLayout>
      <Suspense fallback={<AppLoader show />}>
          <Routes>
            {appRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route key={MAIN_PAGE} path={MAIN_PAGE} element={<DashboardPage />} />
          </Routes>
      </Suspense>
    </MainLayout>
  )
}

export default App
