import React from "react";

import "./sass/App.scss";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components

import Loading from "./components/Loading/Loading";

//api
import axios from "axios";
import SideBar from "./components/SideBar";
import CenterContent from "./components/CenterContent";
import RightBar from "./components/RightBar";

const App = () => {
  let [isLoading, setIsLoading] = React.useState(false);
  let [isAuth, setIsAuth] = React.useState(false);

  const login = async (logDetail) => {
    setIsLoading(true);
    setIsAuth(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    let frmData = new FormData();
    frmData.append("username", logDetail.username);
    frmData.append("password", logDetail.password);
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}signin`, frmData, {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
            "Allow-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          toast("Login success!");
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("token", `Bearer ${res.data.token}`);
          localStorage.setItem("username", res.data.username);
          setIsAuth(true);
          setIsLoading(false);
        })
        .catch((err) => {
          toast(`${err}`);
          setIsAuth(false);
          setIsLoading(false);
        });
    } catch (error) {
      toast(`${error}`);
      setIsAuth(false);
      setIsLoading(false);
    }
  };

  const logout = async () => {
    let config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Allow-Control-Allow-Origin": "*",
      },
    };
    setIsLoading(true);

    await axios
      .post(`${process.env.REACT_APP_API_URL}signout`, null, config)
      .then((res) => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        setIsAuth(false);
      });

    setIsLoading(false);
  };

  React.useEffect(() => {
    setIsLoading(true);
    const validateToken = async () => {
      try {
        await axios
          .post(`${process.env.REACT_APP_API_URL}validate`, null, {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Allow-Control-Allow-Origin": "*",
            },
          })
          .then((res) => {
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("username", res.data.username);
            setIsAuth(true);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsAuth(false);
            setIsLoading(false);
            console.log(err);
          });
      } catch (error) {
        setIsAuth(false);
        setIsLoading(false);
        console.log(error);
      }
    };
    validateToken();
  }, []);
  return (
    <div className="App">
      <div className="row">
        {isLoading ? (
          <div className="row">
            <div className="col-12">
              <Loading />
            </div>
          </div>
        ) : (
          <main className="flex">
            <SideBar isAuth={isAuth} />
            <CenterContent isAuth={isAuth} login={login} />
            <RightBar isAuth={isAuth} logout={logout} />
          </main>
        )}
      </div>
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
        theme="light"
      />
    </div>
  );
};

export default App;
