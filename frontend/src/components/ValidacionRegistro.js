function validation(values){
    let error = {}
    const email_pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ 
    const contraseña_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if(!values.nombre){
        error.nombre = 'El campo nombre es obligatorio'
    }else {
        error.nombre = ''
    }
    if(!values.apellido){
        error.apellido = 'El campo apellido es obligatorio'
    } else {
        error.apellido = ''
    }
    if(!values.email){
        error.email = 'El campo email es obligatorio'
    }else if(!email_pattern.test(values.email)){
        error.email = 'El formato de email es incorrecto'
    }else {
        error.email = ''
    }

    if(!values.contraseña){
        error.contraseña = 'El campo contraseña es obligatorio'
    }else if(!contraseña_pattern.test(values.contraseña)){
        error.contraseña = 'La contraseña debe contener mínimo 8 caracteres, al menos una letra, y al menos un dígito'
    } else {
        error.contraseña = ''
    }
    return error;
}

export default validation;