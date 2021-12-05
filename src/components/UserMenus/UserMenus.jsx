import React from 'react';
import { Link } from 'react-router-dom';

const UserMenus = () => {
    const isAdmin = true;
    return (
        <div className="usermenus">
            <div className="usermenus-div">
                <img src="https://i.postimg.cc/YqDt5jpm/user-img.jpg" alt="Joenn" className="usermenus-user-img" />
                <div className="usermenus-welcome">Hello, <span className="usermenus-name">Joenn</span>!</div>
                <ul className="usermenus-ul">
                    <li className="usermenus-li"><Link to="google.com">Change Password</Link></li>
                    <li className="usermenus-li"><Link to="google.com">Logout</Link></li>
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
                <Link to="google.com">Problems? Contact admin!</Link>
            </div>
        </div>
    )
}

export default UserMenus
