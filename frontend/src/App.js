 import React from 'react' 
 import InicioSesion from './components/InicioSesion';
 import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import Registro from './components/Registro';
 import Bienvenida from './components/Bienvenida';
 
 function  App() {
   return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InicioSesion />}></Route>
          <Route path='/registro' element={<Registro />}></Route>
          <Route path='/bienvenida' element={<Bienvenida />}></Route>
        </Routes>

      </BrowserRouter>
   )
 }
 
export default App;
