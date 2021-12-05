import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.scss';

const Menu = () => {
    return (
        <div className="menu">
            <ul>
                <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/clients" activeClassName="active">Clients</NavLink></li>
                <li><NavLink to="/visits" activeClassName="active">Visits</NavLink></li>
            </ul>
        </div>
    )
}

export default Menu
