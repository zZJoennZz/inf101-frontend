import React from 'react';
import { Link } from 'react-router-dom';

const UserMenus = ({ isAuthenticated, runLogout }) => {
    const isAdmin = true;
    return (
        <div className="usermenus">
            {
                isAuthenticated ? 
                    <>
                        <div className="usermenus-div">
                            <img src="https://i.postimg.cc/YqDt5jpm/user-img.jpg" alt="Joenn" className="usermenus-user-img" />
                            <div className="usermenus-welcome">Hello, <span className="usermenus-name">{localStorage.getItem('username')}</span>!</div>
                            <ul className="usermenus-ul">
                                <li className="usermenus-li"><Link to="google.com">Change Password</Link></li>
                                <li className="usermenus-li"><Link to={0} onClick={runLogout}>Logout</Link></li>
                            </ul>
                        </div>

                        { 
                            isAdmin && 
                            <div className="usermenus-div">
                                <div className="usermenus-welcome">Admin Panel</div>
                                <ul className="usermenus-ul">
                                    <li className="usermenus-li"><Link to="google.com">Manage User</Link></li>
                                    <li className="usermenus-li"><Link to="google.com">Manage Objects</Link></li>
                                </ul>
                            </div>
                        }

                        <div className="usermenus-footer">
                            {"{"} Made with a lot of ❤️ {"}"}
                        </div>
                    </>
                :
                    <></>
            }
        </div>
    )
}

export default UserMenus
