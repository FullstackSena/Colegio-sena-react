import sena from "../../assets/logoSena.png";
import style from "../Navbar/Navbar.module.css";  // Importa el archivo CSS    
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleNavigateRegister = () => {
    navigate("/register");
  }
  const handleNavigateLogin = () => {
    navigate("/login");
  }
  const handleNavigateHome = () => {
    navigate("/");
  }

  return (
    <nav className={style.navbar}>
      <div className={style.logoContainer}>
        <img onClick={handleNavigateHome} src={sena} alt="Logo SENA" className={style.logo} />
      </div>
      <div className={style.navContent}>
        <ul className={style.navList}>
          <li onClick={handleNavigateHome}>Home</li>
          <li>Sobre el Colegio</li>
          <li>Estudiantes</li>
          <li>Profesores</li>
          <li>Administrativos</li>
        </ul>
        <button className={style.accessBtn} onClick={handleNavigateRegister}>Registro</button>
        <button className={style.accessBtn} onClick={handleNavigateLogin}>Login</button>
      </div>
    </nav>
  );
};

export default NavBar;


