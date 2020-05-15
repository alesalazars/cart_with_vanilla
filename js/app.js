// VARIABLES
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');



// LISTENERS
cargarEventListeners();

function cargarEventListeners(){
  // Dispara cuando se presiona agregar carrito
  cursos.addEventListener('click', comprarCurso);

  // Cuando se elimina un curso del carrito
  carrito.addEventListener('click', eliminarCurso);

  // Vaciar carrito completo
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

  // Al cargar el documento, mostrar local storage
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}




// FUNCIONES

// Funcion que añade el curso al carrito
function comprarCurso(e){
  e.preventDefault();
  // Delegation para agregar-carrito
  if(e.target.classList.contains('agregar-carrito')){
    const curso = e.target.parentElement.parentElement;
    // Enviamos el curso seleccionado para tomar sus datos
    leerDatosCurso(curso);
  }
}


// Lee los datos del curso
function leerDatosCurso(curso){
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
  }

  insertarCarrito(infoCurso);
}


// Muestra el curso seleccionado en el Carrito
function insertarCarrito(curso){
  contruirTemplateCurso(curso);
  guardarCursoLocalStorage(curso);
}


// Construye el template del curso en el carrito
function contruirTemplateCurso(curso){
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <img src="${curso.imagen}" width=100/>
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
      <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
  `;
  listaCursos.appendChild(row);
}


// Elimina el curso del carrito en el DOM
function eliminarCurso(e){
  e.preventDefault();
  let curso,
    cursoId;
  if(e.target.classList.contains('borrar-curso')){
    e.target.parentElement.parentElement.remove()
    curso = e.target.parentElement.parentElement
    cursoId = curso.querySelector('a').getAttribute('data-id');
  }

  eliminarCursoLocalStorage(cursoId);
}


// Elimina todos los cursos del carrito en el DOM
function vaciarCarrito(){
  //forma lenta de hacerlo
  // listaCursos.innerHTML = '';
  

  // forma rapida y recomendada
  while(listaCursos.firstChild){
    listaCursos.removeChild(listaCursos.firstChild)
  }

  // Vaciar local storage
  vaciarLocalStorage();

  return false;
}


// Almacena cursos en el carrito a local storage
function guardarCursoLocalStorage(curso){
  let cursos;

  // toma el valor de un array con datos de local storage o vacio
  cursos = obtenerCursosLocalStorage();

  // el curso seleccionado se agrega al array
  cursos.push(curso);

  localStorage.setItem('cursos', JSON.stringify(cursos))
}


// comprueba que haya elementos en local storage
function obtenerCursosLocalStorage(){
  let cursosLS;

  // comprobamos si hay algo en local storage
  if(localStorage.getItem('cursos') === null){
    cursosLS = [];
  }else{
    cursosLS = JSON.parse(localStorage.getItem('cursos'));
  }
  return cursosLS;
}


// Imprime los cursos de local storage en el carrito
function leerLocalStorage(){
  let cursosLS;
  cursosLS = obtenerCursosLocalStorage();
  
  cursosLS.forEach(function(curso){
    // construir el template
    contruirTemplateCurso(curso);
  });
}


// Eliminar el curso por el ID en local storage
function eliminarCursoLocalStorage(curso){
  let cursosLS;

  // obtenemos el array de cursos
  cursosLS = obtenerCursosLocalStorage();

  // iteramos comparando  el ID del curso borrado con los del local storage
  cursosLS.forEach(function(cursoLS,index){
    if(cursoLS.id === curso){
      cursosLS.splice(index,1);
    }
  });

  // añadimos el array actual a local storage
  localStorage.setItem('cursos', JSON.stringify(cursosLS));
}


// elimina todos los cursos de local storage
function vaciarLocalStorage(){
  localStorage.clear();
}