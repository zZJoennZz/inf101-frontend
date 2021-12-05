import React from 'react';
import './home.scss';

const HomeNotLoggedIn = () => {
    return (
        <div className="home-not-logged-in">
            <div className="inner-content">
                <div className="row">
                    <div className="col-12 login-form">

                        <h1>You need to login in order to access the system</h1>
                        <hr className="divider" />
                        <form action="#">
                            <div>
                                <input type="text" name="username" id="username" className="login-text-input" placeholder="Username" />
                            </div>
                            <div>
                                <input type="password" name="password" id="password" className="login-text-input" placeholder="Password" />
                            </div>
                            <button className="login-button">Login <i class="fas fa-arrow-right"></i></button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeNotLoggedIn;
