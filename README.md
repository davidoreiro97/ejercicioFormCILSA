# Pasos que se realizan para poder cargar el formulario descriptos *en formato de caso de uso*.
# <a href="https://davidoreiro97.github.io/ejercicioFormCILSA/" target="_blank">Ver form</a>
---
# Nombre del caso de uso : Registro de usuario.
## Actor principal : Usuario.
## Proposito : Permitir al usuario registrarse con sus datos personales.

## Precondiciones : 
  - El usuario tiene acceso a la interfaz del formulario.
  - EL formulario esta disponible.

## Postcondiciones :
  - Los datos del usuario se enviaron y se almacenaron correctamente.
  - El usuario recibio una notificación de éxito.

## Reglas de negocio : 
  - El campo nombre es obligatorio, solo puede contener letras.
  - El campo apellido es obligatorio, solo puede contener letras.
  - El campo email es obligatorio, el email solo puede pertenecer a los dominios : gmail, yahoo, outlook, aol, icloud, protonmail, zoho, gmx, yandex y sus TLD.
  - El conjunto de campos de la fecha de nacimiento es obligatorio, la fecha debe estar comprendida entre el 01/01/1900 y la fecha del día de hoy (inclusive).
  - El un valor en el país de residencia es obligatorio.
## Flujos del caso de uso
- ### Principal
1. El sistema muestra el formulario de registro.
2. El usuario ingresa su nombre.
3. El usuario ingresa su apellido.
4. El usuario ingresa su email.
5. El usuario ingresa su fecha de nacimiento.
6. El usuario selecciona su país de residencia entre las opciones del menú desplegable.
7. El usuario envía el formulario presionando el botón "Enviar".
8. El sistema valida todos los campos.
9. El sistema almacena la información del formulario en la base de datos.
10. El sistema muestra la notificación de éxito al usuario.
- ### Alternativos
#### Alternativo 1 : El usuario ingresa un __nombre inválido__
- 2.1 El usuario ingresa un nombre inválido en el campo nombre.
- 2.2 El sistema detecta la invalidez del campo nombre basándose en las RN.
- 2.3 El sistema muestra en la UI el mensaje de error correspondiente a la RN que se incumplió.
- 2.4 El sistema permite al usuario corregir el campo nombre.
- 2.5 El flujo principal se reanuda en el paso 2.

#### Alternativo 2 : El usuario ingresa un __apellido inválido__
- 3.1 El usuario ingresa un apellido inválido en el campo apellido.
- 3.2 El sistema detecta la invalidez del campo apellido basándose en las RN.
- 3.3 El sistema muestra en la UI el mensaje de error correspondiente a la RN que se incumplió.
- 3.4 El sistema permite al usuario corregir el campo apellido.
- 3.5 El flujo principal se reanuda en el paso 3.

#### Alternativo 3 : El usuario ingresa un __email inválido__
- 4.1 El usuario ingresa un email inválido en el campo email.
- 4.2 El sistema detecta la invalidez del campo email basándose en las RN.
- 4.3 El sistema muestra en la UI el mensaje de error correspondiente a la RN que se incumplió.
- 4.4 El sistema permite al usuario corregir el campo email.
- 4.5 El flujo principal se reanuda en el paso 4.

#### Alternativo 4 : El usuario ingresa una __fecha de nacimiento inválida__
- 5.1 El usuario ingresa un fecha de nacimiento inválida en los campos de fecha de nacimiento.
- 5.2 El sistema detecta la invalidez en los campos de la fecha de nacimiento basándose en las RN.
- 5.3 El sistema muestra en la UI el mensaje de error correspondiente a la RN que se incumplió.
- 5.4 El sistema permite al usuario corregir el campo fecha de nacimiento.
- 5.5 El flujo principal se reanuda en el paso 5.

#### Alternativo 5 : El sistema encuentra __campos inválidos al enviar el formulario__
- 8.1 El sistema detecta la invalidez de los campos en el formulario.
- 8.2 El sistema muestra en la UI el/los mensaje/s de error correspondientes a la RNs que se incumplieron.
- 8.3 El sistema permite al usuario corregir los campos que contienen errores.
- 8.4 El flujo principal se reanuda en el paso 1.

#### Alternativo 6 : El sistema __no puede almacenar los datos del formulario__
- 9.1 El sistema por algún error (problemas de conexión, envío de tipos de datos inválidos, etc) no puede almacenar los datos en la base de datos.
- 9.2 El sistema muestra en la UI el mensaje de error "Hubo un problema al cargar los datos. Intente nuevamente.".
- 9.3 El usuario tiene la opción de reenviar el formulario o volverlo a completar.
  - 9.3.a.1 El usuario selecciona volver a completar el formulario.
  - 9.3.a.2 El flujo principal se reanuda en el paso 1.
  - 9.3.b.1 El usuario selecciona reenviar el fomrulario.
  - 9.3.b.2 El flujo principal se reanuda en el paso 9.
