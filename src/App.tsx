import './App.scss';

import routes from '@src/constants/routes';
import Login from '@src/pages/Login/Login';
import Registration from '@src/pages/Registration/Registration';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import MainRouter from './components/MainRouter/MainRouter';
import useAppSelector from './hooks/useAppSelector';

function App() {
  const isAuth = useAppSelector((state) => state.userReducer.isAuthorized);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainRouter />} />

        <Route
          path={routes.login}
          element={!isAuth ? <Login /> : <Navigate to={routes.movies} />}
        />
        <Route
          path={routes.registration}
          element={!isAuth ? <Registration /> : <Navigate to={routes.movies} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
