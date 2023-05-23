import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import validation from './ValidacionInicioSesion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function InicioSesion() {

  const [values, setValues] = useState({
    email: '',
    contraseña: ''
  })
    const navigate = useNavigate();
    const[errors, setErrors] = useState({})

    const handleInput = (event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (errors.email === "" && errors.contraseña === ""){
          axios.post('http://localhost:8081/iniciosesion',values)
          .then(res => {
              navigate('/bienvenida');
          })
          .catch(err => console.error(err))     
      }
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
         <div className='bg-white p-3 rounded w-25'>
          <h2>Iniciar Sesión</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='nb-3'>
                    <label htmlfor="email"><strong>Email</strong></label>
                    <input type="email" name="email" placeholder='Ingresa aqui tu Email'
                    onChange = {handleInput} className='form-control rounded-0'/>
                    {errors.email && <p className='text-danger'>{errors.email}</p>}
                  </div>
                <div className='nb-3'>
                    <label htmlfor="contraseña"><strong>Contraseña</strong></label>
                    <input type="contraseña" name="contraseña" placeholder='Ingresa aqui tu Contraseña'
                    onChange = {handleInput} className='form-control rounded-0' />
                    {errors.contraseña && <p className='text-danger'>{errors.contraseña}</p>}
                </div>
                <p></p>
                <button type= 'submit' className='btn btn-success w-100 rounded-0'>Ingresar</button>
                <p></p>
                <Link to ="/registro" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Crear Cuenta</Link>
            </form>

         </div>

    </div>
  )
}

export default InicioSesion