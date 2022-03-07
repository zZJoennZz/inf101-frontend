import React from 'react';
import { Navigate } from 'react-router-dom';
import './home.scss';

const HomeNotLoggedIn = ({ runLogin, isAuthenticated }) => {
    let [loginCred, setLoginCred] = React.useState(false);

    const onChangeText = (e) => setLoginCred({...loginCred, [e.target.name] : e.target.value});

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        runLogin(loginCred);
    }

    return (
        <div className="home-not-logged-in">
            {
                isAuthenticated ? 
                    <Navigate to="/home" />
                :
                <div className="inner-content">
                    <div className="row">
                        <div className="col-12 login-form">

                            <h1>You need to login in order to access the system</h1>
                            <hr className="divider" />

                            <form onSubmit={onSubmitLogin}>
                                <div>
                                    <input type="text" onChange={onChangeText} name="username" id="username" className="login-text-input" placeholder="Username" autoComplete="username" />
                                </div>
                                <div>
                                    <input type="password" onChange={onChangeText} name="password" id="password" className="login-text-input" placeholder="Password" autoComplete="current-password" />
                                </div>
                                <button className="login-button">Login <i className="fas fa-arrow-right"></i></button>
                            </form>

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default HomeNotLoggedIn;
