import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
//other css

import "react-toastify/dist/ReactToastify.css";
//components
import SideBar from "./components/SideBar";
import CenterContent from "./components/CenterContent";
import RightBar from "./components/RightBar";

const App = () => {
  let [isLoading, setIsLoading] = React.useState(false);
  let [isAuth, setIsAuth] = React.useState(false);
  let [isAdmin, setIsAdmin] = React.useState(false);

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
          if (res.status === 200) {
            toast("Login success!");
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("token", `Bearer ${res.data.token}`);
            localStorage.setItem("username", res.data.username);
            setIsAuth(true);
            setIsLoading(false);
            if (res.data.is_admin === 1) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } else {
            setIsAuth(false);
            setIsLoading(false);
          }
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
      .then(() => {
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
            if (res.status === 200) {
              localStorage.setItem("userId", res.data.userId);
              localStorage.setItem("username", res.data.username);
              setIsAuth(true);
              setIsLoading(false);
            } else {
              setIsAuth(false);
              setIsLoading(false);
            }
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
        <main className="flex">
          <SideBar isAuth={isAuth} />
          <CenterContent isLoading={isLoading} isAuth={isAuth} login={login} />
          <RightBar isAdmin={isAdmin} isAuth={isAuth} logout={logout} />
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
};

export default App;
