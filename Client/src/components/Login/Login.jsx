import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PATHROUTES from '../../helpers/PathRoutes.helper';
import styles from './Login.module.scss';
import { empleadoLoginSuccess } from '../../redux/actions';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/login', { username, password });

            if (response.status === 200) {
                dispatch(empleadoLoginSuccess(response.data));
                navigate(PATHROUTES.HOME);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>Login</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.loginButton}>Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
