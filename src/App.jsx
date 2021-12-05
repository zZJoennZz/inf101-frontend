import { Route, Routes } from 'react-router-dom';
import './sass/App.scss';

//components
import Logo from './components/Logo/Logo';
import Menu from './components/Menu/Menu';
import UserMenus from './components/UserMenus/UserMenus';

//pages
//import Test from './pages/Test';
import Clients from './pages/Clients/Clients';
import HomeNotLoggedIn from './pages/Home/HomeNotLoggedIn';
import Visits from './pages/Visits/Visits';

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-3 left-bar full-height">
          <Logo />
          <Menu />
        </div>
        <div className="col-6 main-center full-height">
          <Routes>
            <Route exact path="/" element={
              <HomeNotLoggedIn />
            } />
            <Route exact path="/home" element={
              <h1>This is home web page when logged in</h1>
            } />
            <Route path="/clients" element={
              <Clients />
            } />
            <Route path="/visits" element={
              <Visits />
            } />
          </Routes>
        </div>
        <div className="col-3 right-bar full-height">
          <UserMenus />
        </div>
      </div>
    </div>
  );
}

export default App;
