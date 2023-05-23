import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import validation from './ValidacionRegistro';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registro() {
    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contraseña: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    console.log();
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        console.log(errors);
        if (errors.nombre === "" && errors.apellido === "" && errors.email === "" && errors.contraseña === ""){
            axios.post('http://localhost:5000/registro',{
            nombre: values.nombre,
            apellido: values.apellido,
            email: values.email,
            contraseña: values.contraseña,
            rol: values.rol
        })
            .then(res => {
                navigate('/');
            })
            .catch(err => console.error(err))          
        }
    }

    return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
         <div className='bg-white p-3 rounded w-25'>
            <h2>Registrarse</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='nb-3'>
                    <label htmlFor="nombre"><strong>Nombre</strong></label>
                    <input type="nombre" name="nombre" placeholder='Ingresa aqui tu Nombre'
                     onChange = {handleInput} className='form-control rounded-0'/>
                     {errors.nombre && <p className='text-danger'>{errors.nombre}</p>}
                </div>
                <div className='nb-3'>
                    <label htmlFor="apellido"><strong>Apellido</strong></label>
                    <input type="apellido" name="apellido" placeholder='Ingresa aqui tu Apellido'
                    onChange = {handleInput} className='form-control rounded-0'/>
                    {errors.apellido && <p className='text-danger'>{errors.apellido}</p>}
                </div>
                <div className='nb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" name="email" placeholder="Ingresa aqui tu Email" 
                    onChange = {handleInput} className='form-control rounded-0'/>
                    {errors.email && <p className='text-danger'>{errors.email}</p>}
                </div>
                <div className='nb-3'>
                    <label htmlFor="contraseña"><strong>Contraseña</strong></label>
                    <input type="contraseña" name="contraseña" placeholder="Ingresa aqui tu Contraseña" 
                    onChange = {handleInput} className='form-control rounded-0' />
                    {errors.contraseña && <p className='text-danger'>{errors.contraseña}</p>}
                </div>
                <div className='nb-3'>
                    <label htmlFor="rol"><strong>Rol</strong></label>
                    <select name="rol" className='form-control rounded-0'>
                    <option value="Usuario">Usuario</option>
                    <option value="Administrador">Administrador</option>
                    </select>
                </div>
                <p></p>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Registrarse</button>
                <p></p>
                <Link to ="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Inicio de Sesion</Link>
                
            </form>

         </div>

    </div>
  )
}

export default Registro