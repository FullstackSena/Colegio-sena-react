import React, { useState } from 'react';
import styles from './Login.module.css';
import NavBar from '../Navbar/Navbar';
import loginImage from '../../assets/ColegioSena.webp';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  
  const backAPI = import.meta.env.VITE_APP_BACK;
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Estado para manejar el mensaje de respuesta del servidor
  const [responseMessage, setResponseMessage] = useState('');

  // Manejador de cambios de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/register");
  }
  const handleNavigateManageStudents = () => {
    navigate("/managestudents");
  }

  


  // Manejador de envío de formulario utilizando async/await
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Configura la URL de tu API
    const url = `${backAPI}/api/auth/login`;

    try {
      // Realiza la solicitud POST usando async/await
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token en el localStorage o sessionStorage
        localStorage.setItem('token', data.token);
        console.log('Inicio de sesión exitoso:', data);
        setResponseMessage('Inicio de sesión exitoso');
        navigate("/managestudents");
        // Aquí puedes redirigir al usuario o realizar otra acción después de un inicio de sesión exitoso
      } else {
        console.log('Error:', data);
        setResponseMessage('Error: ' + (data.error || 'Credenciales incorrectas.'));
      }

    } catch (error) {
      // Manejar errores de la solicitud
      setResponseMessage('Error en la solicitud, por favor intenta nuevamente.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className={styles.loginContainer}>
        <div className={styles.logoContainer}>
          <img src={loginImage} alt="SENA logo" className={styles.logo} />
        </div>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h1 className={styles.title}>Ingreso</h1>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Ingresar</button>
          <br/>
          {responseMessage && <p className={styles.responseMessage}>{responseMessage}</p>}
          <br/>
          <div className={styles.linksContainer}>
            <a href="/forgot-password" className={styles.link}>Olvidaste la contraseña</a>
              <br />
            <a onClick={handleNavigate} className={styles.link} >Registrarse</a>
            <br />
            <br />
            <br />
            <br />
            <a href="/terms" className={styles.link}>Términos y condiciones</a>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
