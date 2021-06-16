### Tecnologías utilizadas en este proyecto
- Node.js y librerías para crear el backend
- Pug para renderizar las vistas
- Mysql para guardar la información en la bases de datos
- Heroku como hosting de nuestra app


### URL del proyecto
http://nameless-beach-69704.herokuapp.com/


Acciones que se pueden realizar en esta app:

- Crear cuenta de usuarios
- Validar su cuenta vía correo electrónico
- Recuperar contraseña
- Iniciar sesión
- Crear, eliminar, editar y listar proyectos
- Agregar, eliminar, editar y listar tareas a los proyectos
- Ver el avance de las tareas
- Cerrar sesión


![Crear cuenta](public/img/crear-cuenta.png)
![Validar cuenta](public/img/mailtrap.png)
![Iniciar sesion](public/img/iniciar-sesion.png)
![Sesion iniciada](public/img/sesion-iniciada.png)
![Agregando proyecto](public/img/agrgando-proyecto.png)
![Agregando tarea](public/img/agregando-tareas.png)



## Pasos para desplegar en HEROKU

Primero, se debe de tener nuestro repositorio en github hospedado

Después, teniendo instalado heroku CLI en nuestro equipo se digita en la terminal en el directorio donde esta nuestro proyecto
el siguiente script,:
- heroku create --remote production

Siguiente se manda desde GIT a Heroku para que lo que se tienen en github se refleje en HEROKU
- git push production main

![Seleccionado mysql](public/img/mysql_heroku.png)

EN https://dashboard.heroku.com/ de nuestra cuenta en HEROKU donde se encuentras detalles de nuestra aplicación
se selecciona la base de datos para cargar nuestra información, para esta aplicación es CLEARDB_MYSQL
![setting heroku](public/img/seleccioar_base_mysql.png)

Después de seleccionada la base de datos, en HEROKU se extraen las variables de configuración dando click a settings y después buscando la opción "Reveal Config Vars"

Ya desplega la opción "Reveal Config Vars" vamos encontrar la variable de configuración donde viene toda la información para conectar con las variables de conexión que requerimos para conectar nuestra base de datos
![Editar variables](public/img/var_config.png)

Partes de la variable de conexión  CLEARDB_DATABASE_URL

mysql://usuario@us-cdbr-east-04.cleardb.com/heroku_57c31b57ab749cd?reconnect=true

mysql://usuario:password@nombre_dominio/nombre_base_datos?reconnect=true

Extrayendo información de la variable

 usuario b71ad90aesdsa3df3804
 password 750sdd3ds128ac
 nombre_dominio us-cdbr-eassadaxt-04.clesdsadasdardb.com
 nombre_base_datos heroku_57c31sddsdqwb57ab749cd

Para configurar las variables se deben de extraer los valores y asignarlas con el nombre como se hayan declarado en el archivo variables.env

### Actualizar nuestra app en producción

Habiendo hecho push a la nube de github, toca actualizar nuestra app hospedada en HEROKU y eso se hace con el siguiente comando:

git push production main   --> main por el nombre de la rama en la cuál se encuentra nuestra app lista para subir a producción

### Validar cuenta
la cuenta se valida por correo en https://mailtrap.io/

#### Arrancar servidor

    npm start

- npm install -D	--save-dev	Instala el paquete en el proyecto, como dependencia de desarrollo.
- npm install	--save-prod	    Instala el paquete en el proyecto, como dependencia de producción.
- npm install -g	--global	Instala el paquete en el sistema, sin asociarlo al proyecto.


### Instalaciones del proyecto

 ### - Dependencias de producción

        - express
        - pug
        - mysql2  ----> npm install --save mysql2
        - sequelize ----> npm install --save sequelize
        - express-validator ----> npm i --save express-validator
        - slug ----> npm i --save slug
        - shortid ----> npm i shortid
        - bcrypt(encriptar contraseña) --->npm i -save bcrypt-nodejs
        - cookie-parser ---> npm install --save cookie-parser
        - express-session ---> npm install --save  express-session
        - passport  --->  npm i --save passport
        - nodemailer --->  npm install --save nodemailer
        - juice --->   npm install --save juice
        - html-to-text --->   npm install --save  html-to-text
        - dotenv --->  npm install --save dotenv


        - Mailtrap ---> https://mailtrap.io/  revisar envío de correos


  ### - Dependencias de desarrollo
        - nodemon


### -
