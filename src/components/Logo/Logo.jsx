import React from 'react';
import { Link } from 'react-router-dom';
import './logo.scss';

const Logo = () => {
    return (
        <div className="logo">
            <div className="logo-text">
                <Link to="/">inf101</Link>
            </div>
        </div>
    )
}

export default Logo
