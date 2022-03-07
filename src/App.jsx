import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './sass/App.scss';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import HomeLoggedIn from './pages/Home/HomeLoggedIn';
import Visits from './pages/Visits/Visits';
import NewRecord from './pages/Clients/NewRecord';

import FormGenerator from './pages/FormGenerator/FormGenerator';

//api 
import api from './api/api';

const App = () => {
  let [isAuth, setIsAuth] = React.useState(false);

  const login = async (logDetail) => {
    
    setIsAuth(false);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');

    let frmData = new FormData();
    frmData.append('username', logDetail.username);
    frmData.append('password', logDetail.password);
    try {
      await api.post('signin', frmData)
        .then(res => {
          toast('Login success!');
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('token', `Bearer ${res.data.token}`);
          setIsAuth(true);
        })
        .catch(err => {
          toast(`${err}`);
          setIsAuth(false);
        });
    } catch (error) {
      toast(`${error}`);
      setIsAuth(false);
    }

  }

  const logout = async () => {
    setIsAuth(false);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }

   React.useEffect(() => {
    const validateToken = async () => {
      try {
        setIsAuth(false);
        await api.post('validate')
          .then(res => {
            localStorage.setItem('userId', res.data.userId);
            setIsAuth(true);
          })
          .catch(err => {
            setIsAuth(false);
            console.log(err);
          })
      } catch (error) {
        setIsAuth(false);
        console.log(error);
      }
    }
    validateToken();
   }, []);
  
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
                <HomeNotLoggedIn runLogin={login} isAuthenticated={isAuth} />
              }/>
              <Route exact path="/home" element={
                <HomeLoggedIn isAuthenticated={isAuth} />
              } />
              <Route path="/clients" element={
                <Clients isAuthenticated={isAuth} />
              } />
              <Route path="/clients/:clientId" element={
                <ViewClient  isAuthenticated={isAuth} />
              } />
              <Route path="/clients/records/:clientId/:inputId" element={
                <ViewRecord isAuthenticated={isAuth} />
              } />
              <Route path="/clients/records/new/:clientId" element={
                <NewRecord isAuthenticated={isAuth} />
              } />
              <Route path="/visits" element={
                <Visits isAuthenticated={isAuth} />
              } />
              <Route path="/generate-form" element={
                <FormGenerator />
              } />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover 
          />
        </div>
        <div className="col-3 right-bar full-height">
          <UserMenus runLogout={logout} isAuthenticated={isAuth} />
        </div>
      </div>
    </div>
  );
}

export default App;
