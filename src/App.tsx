import { Suspense, useEffect } from "react";
import { MainLayout } from "./layouts/MainLayout";
import { AppLoader } from "./components/AppLoader";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes";
import { MAIN_PAGE } from "./routes/pathnames";

import DashboardPage from "./pages/Dashboard";
import "./styles/themes/default/theme.scss";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { selectThemeStatus } from "./store/Slices/theme";
import { getDesignTokens } from "./layouts/theme";
import { createTheme } from "@mui/material";
import { auth, database } from "./services/Firebase/firebase";
import { onValue, ref } from "firebase/database";
import { authLogout, updateUser } from "./store/Slices/auth";
import Protected from "./routes/Protected";
import { setFavorites } from "./store/Slices/favorites";

function App() {
  // const userId = useAppSelector(state => state.auth.user.id)
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => {
    state.auth.user;
  });
  useEffect(() => {
    const listen = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        onValue(ref(database, `users/${currentUser.uid}/`), (snapshot) => {
          const data = snapshot.val();
          const userData = {
            id: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            emailVerified: currentUser.emailVerified,
            isAnonymous: currentUser.isAnonymous,
            phoneNumber: data.phone ? data.phone : null,
            photoURL: currentUser.photoURL,
            role: data.role ? data.role : "none",
          };
          dispatch(updateUser({ user: userData }));
          dispatch(setFavorites({ value: data.favorites }));
        });
      } else {
        dispatch(authLogout());
      }
    });
    return () => {
      listen();
    };
  }, []);
  const mode = useSelector((state: RootState) => selectThemeStatus(state));
  // @ts-ignore
  const theme = createTheme(getDesignTokens(mode));

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Suspense fallback={<AppLoader show />}>
          <Routes>
            {appRoutes.map(({ path, Component, role }) => (
              <Route key={path} path={path} element={<Protected role={role}><Component /></Protected>} />
            ))}
            <Route
              key={MAIN_PAGE}
              path={MAIN_PAGE}
              element={<DashboardPage />}
            />
          </Routes>
        </Suspense>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
