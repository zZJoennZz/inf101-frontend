import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="menu">
            <ul>
                <li><NavLink to="/home" className={({ isActive }) => isActive ? "active" : ''}>Home</NavLink></li>
                <li><NavLink to="/clients" className={({ isActive }) => isActive ? "active" : ''}>Clients</NavLink></li>
                {/* <li><NavLink to="/visits" className={({ isActive }) => isActive ? "active" : ''}>Visits</NavLink></li> */}
            </ul>
        </div>
    )
}

export default Menu
