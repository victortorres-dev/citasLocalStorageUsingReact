import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import PropTypes from 'prop-types';

function App() {

  //------------------Almacenando en localStorage LAS CITAS ------------//
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = []; //pasamos este arreglo vacío como parametro al useState de citas
  }

  //------------------Almacenando en localStorage------------//

  //generamos un state principal que es el que va a contener todas las citas, debe estar en este componente ya que es qui donde se creara el listado de las citas
  //Arreglo de todas las CITAS
  //INICIALIZACIOS EL ARREGLO DEL USEsTATE VACIO, YA QUE SONmuchas citas las que contendra, pero de momento se inicia sin nada
  //basicamente este, nos va a permitir almacenar las citas que se traigan del componente Form
  const [citas, guardarCitas] = useState(citasIniciales);

  //El use effect sirve para realizar ciertas operaciones cuando el state cambia
  //para decirle a useEffect que solo se ejecute una vez, se le pasa un arreglo vacio, para evitar que se cicle en consultas a apis por ejemplo
  useEffect(() => {
    //console.log('Algo pasa con las citas ...')
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }}, [citas, citasIniciales]);//le pasamos el state citas, para que sepa cuando debe ejecutarse, en este caso, se ejecuta cada vez que se actualiza "citas"

  //Funcion que tome las citas actuales y agregue la nueva
  //tomamos la "cita" del componente "Formulario"
  //una vez que agregarCita ya regresa al componente padre, esta ejecuta su funcion que es...
  const agregarCita = cita => {
    //console.log(cita);//comprobamos que la cita que viene de Form, este llegando correctamente
    //ahora solo actualizamos al state de citas
    guardarCitas([
      ...citas, //trayendo todas las citas que ya existen
      cita//y las que se van agregando
    ]);
  }
  //Funcion que elimina una cita por su id
  const eliminarCita = id => {
    //en filter !==, esto permite eliminar el id exacto
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    //actualizamos el state nuevamente con las nuevas citas-->las que no fueron eliminadas
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional para las citas
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

  return (
    <>
    <h1>Administrador de Pacientes</h1>

    <div className="container">
      <div className="row">
        <div className="one-half column">
          <Formulario
          // el componente padre "App", necesita agregar las citas que vienen del componente hijo "Form", por lo que le envia la funcion "agregarCita" como props del hijo, para obtener cada cita
          //el componente hijo "Formulario, debe recibir entonces la funcion agregarCita, como sus props "
          agregarCita={agregarCita}
          ></Formulario>
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {/* //ahora es posible iterar el arreglo de citas, para mostrar cada cita en un componente card */}
          {citas.map(cita => (
            <Cita
              //Cuando se itera de esta forma en react siempre es importante pasarle un key
              //OJO, que se le esta pasando al componente Cita los props de key y cita, este los tiene que recibir en el componente hijo Cita, para mostrarlos en esta parte donde se llama
              key = {cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

Formulario.propTypes = {
  agregarCita: PropTypes.func.isRequired
}

export default App;
