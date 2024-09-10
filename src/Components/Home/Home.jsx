import React from "react";
import NavBar from "../Navbar/Navbar.jsx";
import style from "../Home/Home.module.css"; // Importa el archivo CSS modular
import senaImagen from "../../assets/senaSena.png"; // Importa la imagen
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/register");
  }
  const handleNavigateLogin = () => {
    navigate("/login");
  }
  return (
    <div>
      <NavBar />
      <div className={style.homeContainer}>
        <div className={style.textSection}>
          <h1>Colegio Sena</h1>
          <p>En esta página web tendremos acceso a la información del colegio Sena</p>
          <div className={style.buttonGroup}>
            <button className={style.btn} onClick={handleNavigate}>Registro</button>
            <button className={style.btn} onClick={handleNavigateLogin}>Ingreso</button>
          </div>
        </div>
        <div className={style.imageSection}>
         <img src={senaImagen} alt="Logo SENA" className={style.studentImage} />
        </div>
      </div>
    </div>
  );
};

export default Home;
