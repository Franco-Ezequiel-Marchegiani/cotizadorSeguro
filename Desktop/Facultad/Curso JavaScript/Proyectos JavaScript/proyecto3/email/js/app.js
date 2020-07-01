// *** Variables ***
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');





// *** Event Listener ***
eventListeners();

function eventListeners() {
     // Inicio de la aplicación y deshabilitación del submit
     document.addEventListener('DOMContentLoaded', inicioApp);

     // Campos del formulario
     email.addEventListener('blur', validarCampo);
     asunto.addEventListener('blur', validarCampo);
     mensaje.addEventListener('blur', validarCampo);

     // Botón "Enviar" submit
     formularioEnviar.addEventListener('submit', enviarEmail);

     // Botón de "reset"
     resetBtn.addEventListener('click', resetFormulario);
}



// *** Funciones ***

function inicioApp() {
     // Deshabilitar el envio

     btnEnviar.disabled = true;
}

// Valida que el usuario interactue con el campo

function validarCampo() {
     
     // Valida la longitud del texto y que no esté vacío
     validarLongitud(this);

     //Validar únicamente el Email
     if(this.type === 'email') {
          validarEmail(this);
     }

     let errores = document.querySelectorAll('.error');
     if(email.value !== '' && asunto.value !== '' && mensaje.value !== ''){
          if(errores.length === 0){
               btnEnviar.disabled = false;
          }
     }
}


//Resetear el formulaio
function resetFormulario(e) {
     formularioEnviar.reset();
     
     e.preventDefault();
}


// Cuando se envia el correo
function enviarEmail(e) {
     //Spinner al presionar "Enviar"
     const spinnerGif = document.querySelector('#spinner');
     spinnerGif.style.display = 'block';

     //Gif que envía email
     const enviado = document.createElement('img');
     enviado.src = 'img/mail.gif';
     enviado.style.display = 'block';

     // Ocultar Spinner y mostrar gif de enviado

     setTimeout(function() {
          spinnerGif.style.display = 'none';

          document.querySelector('#loaders').appendChild( enviado );

          setTimeout(function() {
               enviado.remove();
               formularioEnviar.reset();
          }, 5000);
     }, 3000);

     e.preventDefault();
}


// Verifica la longitud del texto en los campos

function validarLongitud(campo) {

     console.log(campo.value.length);

     if(campo.value.length > 0) {
          campo.style.borderBottomColor = 'green';
          campo.classList.remove('error');
     } else {
          campo.style.borderBottomColor = 'red';
          campo.classList.add('error');
     }
}

// Verifica que el campo "Email" tenga un "@"
function validarEmail(campo) {
     const mensaje = campo.value;
     if(mensaje.indexOf('@') !== -1){
          campo.style.borderBottomColor = 'green';
          campo.classList.remove('error');
     } else{
          campo.style.borderBottomColor = 'red';
          campo.classList.add('error');
     }
}