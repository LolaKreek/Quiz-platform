import { Suspense } from 'react'
import { MainLayout } from './layouts/MainLayout'
import { AppLoader } from './components/AppLoader'
import { Route, Routes } from "react-router-dom";
import { appRoutes } from './routes'
import { MAIN_PAGE } from './routes/pathnames';

import DashboardPage from './pages/Dashboard';
import './styles/themes/default/theme.scss';
import './App.css'
import { ThemeProvider } from '@emotion/react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { selectThemeStatus } from './store/Slices/theme';
import { getDesignTokens } from './layouts/theme';
import { createTheme } from '@mui/material';

function App() {
  // const userId = useAppSelector(state => state.auth.user.id)
  const mode = useSelector((state: RootState) => selectThemeStatus(state))
  // @ts-ignore
  const theme = createTheme(getDesignTokens(mode));

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default App
