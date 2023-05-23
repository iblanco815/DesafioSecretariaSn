const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

// Parsea el body de una peticion http
app.use(bodyParser.json());

// Configuracion de la base de datos
const dataBase = new Sequelize('login-register', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Se define el modelo de la base de datos
const modelUser = dataBase.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  contraseña: { type: DataTypes.STRING, allowNull: false },
  rol: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.TIME, allowNull: false },
  updatedAt: { type: DataTypes.TIME, allowNull: false },
});

// Conexion con la base de datos
try {
  dataBase.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Registro de usaurio
app.post('/registro', (req, res) => {
  const { nombre, apellido, email, contraseña, rol } = req.body;
  console.log("prueba")
  if (!nombre || !apellido || !contraseña || !rol) {
    res.json({ message: 'Los campos nombre, apellido o contraseña son obligatorios' });
  } else if (!email) {
    res.json({ message: 'el campo email es obligatorio' });
  } else {
    modelUser
      .findOne({ where: { email: email } })
      .then((user) => {
        if (user) {
          res.json({ message: 'User already registed' });
        } else {
          bcrypt.hash(contraseña, 10, (error, passEncrypt) => {
            if (error) {
              res.json(error);
            } else {
              const newUser = modelUser.build({
                nombre: nombre,
                apellido: apellido,
                email: email,
                contraseña: passEncrypt,
                rol: rol,
              });
              newUser
                .save()
                .then((user) => {
                  res.json({ message: 'User created correctly', user: {
                        id: user.getDataValue("id"),
                        nombre: user.getDataValue("nombre"),
                        apellido: user.getDataValue("apellido"),
                        rol: user.getDataValue("rol"),
                      } });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

// Login de usuario
app.post('/', (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    res.json({ message: 'los campos email o contraseña son obligatorios' });
  } else {
    modelUser
      .findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          res.json({ message: 'User no found' });
        } else {
          bcrypt
            .compare(contraseña, user.getDataValue('contraseña'))
            .then((isCorrect) => {
              if (isCorrect) {
                if (user.getDataValue('rol') === 'administrador') {
                  modelUser
                    .findAll({ attributes: ['nombre', 'apellido', 'email', 'contraseña'] })
                    .then((users) => {
                      res.json({
                        id: user.getDataValue("id"),
                        nombre: user.getDataValue("nombre"),
                        apellido: user.getDataValue("apellido"),
                        rol: user.getDataValue("rol"),
                        data: users,
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } else {
                  res.json({
                    id: user.getDataValue("id"),
                    nombre: user.getDataValue("nombre"),
                    apellido: user.getDataValue("apellido"),
                    rol: user.getDataValue("rol"),
                  });
                }
              } else {
                res.json({ message: 'contraseña invalida' });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.listen(5000, () => {
  console.log('Server running http://localhost:5000');
});