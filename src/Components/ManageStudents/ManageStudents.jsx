import React, { useState, useEffect } from 'react';
import styles from './ManageStudents.module.css';
import NavBar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const ManageStudents = () => {
    const backAPI = import.meta.env.VITE_APP_BACK;
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        grade: '',
        id: '',
    });
    const [editingStudent, setEditingStudent] = useState(null); // Almacena el estudiante en edición
    const [loading, setLoading] = useState(false); // Indica si hay una solicitud en proceso
    const [errorMessage, setErrorMessage] = useState(''); // Para manejar errores

    // Fetch inicial para obtener los estudiantes
    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${backAPI}/api/students/`);
                const data = await response.json();
                setStudents(data);
                console.log(data);
            } catch (error) {
                setErrorMessage('Error al obtener la lista de estudiantes');
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, [backAPI]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Método para agregar un nuevo estudiante
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch(`${backAPI}/api/students/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newStudent = await response.json();
                setStudents([...students, newStudent]);
                setFormData({ name: '', email: '', grade: '' });
            } else {
                setErrorMessage('Error al agregar estudiante');
            }
        } catch (error) {
            setErrorMessage('Error de red al agregar estudiante');
        } finally {
            setLoading(false);
        }
    };

    // Método para iniciar la edición de un estudiante
    const startEditStudent = (student) => {
        setFormData({
            name: student.name,
            id: student._id,
            email: student.email,
            grade: student.grade,
        });
        setEditingStudent(student);
        console.log(student._id); // Establece el estudiante en edición
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingStudent) return;
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch(`${backAPI}/api/students/${editingStudent._id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const updatedStudent = await response.json();
                setStudents(students.map(student =>
                    student._id === editingStudent._id ? updatedStudent : student
                ));
                setFormData({ name: '', email: '', grade: '', id: '' });
                setEditingStudent(null);
                setErrorMessage('Estudiante actualizado correctamente'); // Mensaje de éxito
            } else {
                setErrorMessage('Error al actualizar el estudiante');
            }
        } catch (error) {
            setErrorMessage('Error de red al actualizar el estudiante');
        } finally {
            setLoading(false);
        }
    };


    // Método para eliminar un estudiante
    const handleDelete = async (studentId) => {
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch(`${backAPI}/api/students/${studentId}/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setErrorMessage('Estudiante borrado correctamente');
                setStudents(students.filter(student => student._id !== studentId));
            } else {
                setErrorMessage('Error al eliminar estudiante');
            }
        } catch (error) {
            setErrorMessage('Error de red al eliminar estudiante');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NavBar />
            <div className={styles.manageStudentsContainer}>
                <h1 className={styles.title}>Gestión de Estudiantes</h1>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                
                <form onSubmit={editingStudent ? handleUpdate : handleSubmit} className={styles.manageStudentsForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.input}
                            required
                            disabled={loading}
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
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="grade" className={styles.label}>Grado:</label>
                        <input
                            type="text"
                            id="grade"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            className={styles.input}
                            required
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {editingStudent ? 'Guardar Cambios' : 'Agregar Estudiante'}
                    </button>
                </form>

                {loading && <p className={styles.loadingMessage}>Procesando...</p>}
                
                <div className={styles.studentsList}>
                    <h2 className={styles.subtitle}>Lista de estudiantes registrados en la base de datos</h2>
                    <ul className={styles.list}>
                        {students.map((student) => (
                            <li key={student._id}  className={styles.listItem}>
                               
                                <p className={styles.listItemText}>
                                    <strong>Nombre:</strong> {student.name}
                                </p>
                                <p className={styles.listItemText}>
                                    <strong>Correo Electrónico:</strong> {student.email}
                                </p>
                                <p className={styles.listItemText}>
                                    <strong>Grado:</strong> {student.grade}
                                </p>
                                <button
                                    onClick={() => startEditStudent(student)}
                                    className={styles.editButton}
                                    disabled={loading}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(student._id)}
                                    className={styles.deleteButton}
                                    disabled={loading}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ManageStudents;