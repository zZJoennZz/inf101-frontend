import { Route, Routes } from 'react-router-dom';
import './sass/App.scss';

//components
import Logo from './components/Logo/Logo';
import Menu from './components/Menu/Menu';
import UserMenus from './components/UserMenus/UserMenus';

//pages
//import Test from './pages/Test';
import Clients from './pages/Clients/Clients';
import ViewClient from './pages/Clients/ViewClient';
import ViewRecord from './pages/Clients/ViewRecord';
import HomeNotLoggedIn from './pages/Home/HomeNotLoggedIn';
import Visits from './pages/Visits/Visits';
import NewRecord from './pages/Clients/NewRecord';

import FormGenerator from './pages/FormGenerator/FormGenerator';

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
            <Route path="/clients/:clientId" element={
              <ViewClient />
            } />
            <Route path="/clients/records/:clientId/:inputId" element={
              <ViewRecord />
            } />
            <Route path="/clients/records/new/:clientId" element={
              <NewRecord />
            } />
            <Route path="/visits" element={
              <Visits />
            } />
            <Route path="/generate-form" element={
              <FormGenerator />
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
