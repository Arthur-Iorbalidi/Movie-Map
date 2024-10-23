import './App.scss';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import routes from './constants/routes';
import Account from './pages/Account/Account';
import Actors from './pages/Actors/Actors';
import DetailedActor from './pages/DetailedActor/DetailedActor';
import DetailedDirector from './pages/DetailedDirector/DetailedDirector';
import DetailedMovie from './pages/DetailedMovie/DetailedMovie';
import Directors from './pages/Directors/Directors';
import Favorites from './pages/Favorites/Favorites';
import Login from './pages/Login/Login';
import Movies from './pages/Movies/Movies';
import Registration from './pages/Registration/Registration';

function App() {
  const isAuth = false;

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/*" element={<Navigate to={routes.movies} replace />} />
          <Route path={routes.movies} element={<Movies />} />
          <Route path={routes.actors} element={<Actors />} />
          <Route path={routes.directors} element={<Directors />} />
          <Route path={routes.detailedMovie} element={<DetailedMovie />} />
          <Route path={routes.detailedActor} element={<DetailedActor />} />
          <Route
            path={routes.detailedDirector}
            element={<DetailedDirector />}
          />
          <Route
            path={routes.userAccount}
            element={
              isAuth ? <Account /> : <Navigate to={routes.registration} />
            }
          />
          <Route
            path={routes.favorites}
            element={
              isAuth ? <Favorites /> : <Navigate to={routes.registration} />
            }
          />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.registration} element={<Registration />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
