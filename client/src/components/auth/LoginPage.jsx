import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

function LoginPage({ login }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const  {email, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        login(email,password);
        }

    return (<Fragment>
         <form onSubmit={e=> onSubmit(e)}>
        <div className="auth-block">
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Войти в систему</span>
                   
                    <div className="input-field">
                        <input id="email" type="email" name="email" 
                               value={email} onChange={e=> onChange(e)} required />
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div className="input-field">
                        <input id="password" type="password" required 
                               name="password" value={password} onChange={e=> onChange(e)}/>
                        <label htmlFor="password">Пароль:</label>
                    </div>
                   
                </div>
                <div className="card-action">
                    <button className="modal-action btn waves-effect">Войти</button>
                    
                </div>
            </div>
        </div>
        </form>
    </Fragment>
    )
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage);