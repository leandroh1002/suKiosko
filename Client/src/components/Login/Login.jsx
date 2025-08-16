import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
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

        if (!username || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, completa todos los campos.',
            });
            return;
        }

        try {
            const response = await axios.post('/login', { username, password });

            if (response.status === 200) {
                dispatch(empleadoLoginSuccess(response.data));
                navigate(PATHROUTES.HOME);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: error.response.data.error,
                });
            } else {
                console.error('An error occurred during login:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrió un error durante el inicio de sesión.',
                });
            }
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
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.loginButton}>Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
