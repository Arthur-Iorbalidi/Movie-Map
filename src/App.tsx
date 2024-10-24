import './App.scss';

import Footer from '@src/components/Footer/Footer';
import Header from '@src/components/Header/Header';
import routes from '@src/constants/routes';
import Account from '@src/pages/Account/Account';
import Actors from '@src/pages/Actors/Actors';
import DetailedActor from '@src/pages/DetailedActor/DetailedActor';
import DetailedDirector from '@src/pages/DetailedDirector/DetailedDirector';
import DetailedMovie from '@src/pages/DetailedMovie/DetailedMovie';
import Directors from '@src/pages/Directors/Directors';
import Favorites from '@src/pages/Favorites/Favorites';
import Login from '@src/pages/Login/Login';
import Movies from '@src/pages/Movies/Movies';
import Registration from '@src/pages/Registration/Registration';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const isAuth = false;

  return (
    <BrowserRouter>
      <Header />
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
            path={routes.account}
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
      <Footer />
    </BrowserRouter>
  );
}

export default App;
