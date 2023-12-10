import { Suspense, useEffect } from "react";
import { MainLayout } from "./layouts/MainLayout";
import { AppLoader } from "./components/AppLoader";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes";
import { MAIN_PAGE } from "./routes/pathnames";
import "./App.css";
import DashboardPage from "./pages/Dashboard";
import { auth, database } from "./services/Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { authLogout, updateUser } from "./store/Slices/auth";
import { RootState } from "./store";
import { onValue, ref } from "firebase/database";

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
            roles: data.roles ? data.roles : [],
          };
          dispatch(updateUser({ user: userData }));
        });
      } else {
        console.log(userState);
        console.log(123);
        dispatch(authLogout());
      }
    });
    return () => {
      listen();
    };
  }, []);

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
  );
}

export default App;
