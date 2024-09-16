import React, { useState } from 'react';
import styles from './Register.module.css';
import NavBar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    
    const backAPI = import.meta.env.VITE_APP_BACK;
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();


    // Manejador de cambios de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejador de envío de formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el envío por defecto
        console.log('Datos del formulario:', formData);

        try {
            const response = await fetch( `${backAPI}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();

                console.log('Registro exitoso:', data);
                // Aquí puedes manejar la respuesta, por ejemplo, redirigir al usuario o mostrar un mensaje
                navigate('/login');
            } else {
                console.error('Error en la solicitud:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
    <div>
    <NavBar />
        <div className={styles.registerContainer}>
            <h1 className={styles.title}>Registro de Administrador</h1>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>Nombre:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Registrar</button>
            </form>
        </div>
    </div>
    );
};

export default Register;