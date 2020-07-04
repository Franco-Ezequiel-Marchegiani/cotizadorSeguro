// Cotizador Constructor
// Constructor para Seguro
// Proceso utilizando clases
class Seguro {

     constructor (marca, anio, tipo) {
     this.marca = marca,
     this.anio = anio,
     this.tipo = tipo
     }
     
     cotizarSeguro() {
          /*
               1 = americano 1.15
               2 = asiatico 1.05
               3 = europeo 1.35
          */
          let cantidad;
          const base = 2000;
     
          switch(this.marca){
               case '1':
                    cantidad = base * 1.15;
                    break;
               case '2':
                    cantidad = base * 1.05;
                    break;
               case '3':
                    cantidad = base * 1.35;
                    break;
          }
     
     
          // Leer el año
          const diferencia = new Date().getFullYear() - this.anio;
          // Cada año de diferencia hay que reducir 3% el valor del seguro
          cantidad -= ((diferencia * 3) * cantidad) / 100;
          
          /*
           Si el seguro es básico se multiplica por 30% más
           Si el seguro es completo 50% más
           */
          if(this.tipo === 'basico') {
               cantidad *= 1.30;
          } else {
               cantidad *= 1.50;
          }
          return cantidad;
         
     
     }
}

// Todo lo que se muestra
class Interfaz {
     mostrarMensaje(mensaje, tipo) {
          const div = document.createElement('div');
     
          if(tipo === 'error') {
               div.classList.add('mensaje', 'error');
          } else {
               div.classList.add('mensaje', 'correcto');
          }
          div.innerHTML = `${mensaje}`;
          formulario.insertBefore(div, document.querySelector('.form-group'));
     
          setTimeout(function() {
               document.querySelector('.mensaje').remove();
          }, 3000);
     }
     mostrarResultado(seguro, total) {
          const resultado = document.getElementById('resultado');
          let marca;
          switch(seguro.marca) {
               case '1':
                    marca = 'Americano';
                    break;
               case '2':
                    marca = 'Asiatico'; 
                    break;
               case '3':
                    marca = 'Europeo';
                    break;     
          }
          //Div
          const div = document.createElement('div');
          // Información mostrada en pantalla
          div.innerHTML = `
            <p clasS='header'>   Tu Resumen: </p>
            <p>   Marca ${marca} </p>
            <p>   Año: ${seguro.anio} </p>
            <p>   tipo: ${seguro.tipo} </p>
            <p>   Total: $ ${total} </p>
          `;
     
          // Spinner
          const spinner = document.querySelector('#cargando img');
          spinner.style.display = 'block';
          setTimeout(function() {
               spinner.style.display = 'none';
               resultado.appendChild(div);
          }, 3000);
     
     }
}

// EventListener
const formulario = document.getElementById('cotizar-seguro');

// Lectura de datos del index.html

formulario.addEventListener('submit', function(e) {
     e.preventDefault();

     // Lee la marca seleccionada del "select" (toma los valores <value>)
     const marca = document.getElementById('marca');
     const marcaSeleccionada = marca.options[marca.selectedIndex].value;

     //Lee el año seleccionado del <select>
     const anio = document.getElementById('anio');
     const anioSeleccionado = anio.options[anio.selectedIndex].value;


     //Lee el valor del radio seleccionado
     const tipo = document.querySelector('input[name="tipo"]:checked').value;

     //Crea instancia de interfaz
     const interfaz = new Interfaz();


     //Revisamos que los campos no estén vacios
     if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '' ) {
          //Interfaz imprimiendo un error
          interfaz.mostrarMensaje('Faltan datos, revisar el formulario e intentar nuevamente', 'error');
     } else {
          // Limpiar resultados anteriores
          const resultados = document.querySelector('#resultado div');
          if(resultados != null){
               resultados.remove();
          }

          //Instanciar seguro y mostrar interfaz
          const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
          
          // Corizar el seguro
          const cantidad = seguro.cotizarSeguro();

          // Mostrar el resultado
          interfaz.mostrarResultado(seguro, cantidad);
          interfaz.mostrarMensaje('Cotizando...', 'exito');
     }
     
})
 // Habilita los años en la barra
const max = new Date().getFullYear(),
      min = max - 23;

const selectAnios = document.getElementById('anio');
for(let i = max; i > min; i--) {
     let option = document.createElement('option');
     option.value = i;
     option.innerHTML = i;
     selectAnios.appendChild(option);
}