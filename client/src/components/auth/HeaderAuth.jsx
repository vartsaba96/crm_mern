import React, { Fragment } from 'react';
import { Link } from "react-router-dom";


function HeaderAuth(props) {

    return (<Fragment>
        <header>
            <nav>
                <div className="nav-wrapper grey darken-1">
                    <a href="#" className="brand-logo">Newborn</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Регистрация</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    </Fragment>
    )
}

export default HeaderAuth;