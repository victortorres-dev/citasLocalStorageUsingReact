import React, {useState} from 'react';
import uuid from 'uuid/v4';

//aplicamos destructuring para recibir los props desde el componente padre "App"-> crearCita, aqui crearCita alamacenara cada cita obtenida del form y esta misma serra recibida en el padre para ser mostrada
const Formulario = ({agregarCita}) => {
    //Crear State de citas
    const [cita, actualizarCita] = useState({
        // cuando se carga por primera vez, no se tienen datos por eso se inicializa vacio
        //- se agregan los campos del form
        //el state se inicia con lo que el proyecto pida
        //como agregar a estos datos la data que viene del form?, utilizando en el form el metodo onChange{handleChange}-->básicamente actualizar el state
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });

    //agregar mas states permite mantener de mejor forma el proyecto
    //es muy conveniente manejar un state para los errores en la validacion:
    const [error, actualizarError] = useState(false)

    //Función que se ejecuta cada que el usuario escribe en un input, su finalidad es obtener los datos que llegan de esos inputs
    //----actualizarState
    //-------------------cada que el onChange cambia se le pasa el evento "e"
    const handleChange = e => {
        //life hacks con "e":
        //e.target.name: permite saber el nombre del input en el que se esta escribiendo
        //console.log(e.target.name);
        //toca extraer el contenido que el usuario esta escribiendo y llevarlo al state

        //! El state no debe ser modificado directamente, para eso se usa la funcion que reescribe al state
        actualizarCita({
            //colocando la informacion del input,  dentro del satate(de la propiedad a la que se le quiere agregar)
            //traemos una copia del state con todos sus "atributos", y los reescribimos en el campo o input en el que se este escribiendo
            ...cita,//siempre se toma una copia del state, de otra forma elimina lo que habia previamente
            [e.target.name]: e.target.value//va guardando cada valor  con su correspondiente name
        })
    }

    //handleChange nos permitio leer el contenido y colocarlo en el state al mismo tiempo, 
    //ahora debemos extraer los datos --> colocandolos como el value de su respectivo input,
    //faacilita el escribir cita.mascota, cita.propietario ...
    //tambien nos ayuda a resetear el formulario.
    //aplicando entonces el  "Destructuring"...
    const { mascota, propietario, fecha, hora, sintomas} = cita;

    //cuando el usuario preciona "Agrregar cita", o basicamente se envia el formulario
    //entonces al presionar el evento submit, se ejecuta la funcion submitCita:
    const submitCita = e =>{
        //Es importante evitar que los datos se manden por defecto como GET los query params, para ello agregamos un evento para prevenir que se envia por defecto por query strings
        e.preventDefault();

        //Ahora siempre es importante manejar estas acciones:

        //VALIDAR LA INFORMACIÓN:, siempre debe validarse antes de mandar la data a la BD
        //trim(), permite eliminar espacios en blanco al inicio y final de un string
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            console.log('Hay un error');
            //cuando existe una validacion es importante siempre poner return para que el resto del codigo no continue ejecutandose
            //dado que aqui; en la validacion pueda presentarse un error, es aqui que el state error debe actualizarse
            actualizarError(true);
            return;
        }

        //cuando los datos son correctos el error debe ser actualizado nuevamente ->false
        actualizarError(false);


        //ASIGNAR ID, Para poder mostrar registros repetidos, pero con una Key
        // para la practicidad de este ejercicio es mejor agregar un id de una libreria, ya que no se esta trabajando con una db
        //dado que cita es un objeto, podemos agregarle otra propiedad, en este caso un id
        cita.id = uuid();
        console.log(cita);

        //CREAR LA CITA, para mostrarla en el state principal
        //entonces a la funcion "agregarCita" solo resta agregarle cada "cita", que eventualmente ya posee un id
        agregarCita(cita);

        //REINICIAR EL FORM
        actualizarCita({
            mascota: '',
            propietario:'',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }


    return(
        <>
        <h2>Crear cita</h2>
        {/* ----si error === true, ------------------------------------------------en caso contrario un "null", para que no imprima nada... como en esta parte no se puede poner un if, se agrega un ternario:*/}
        {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
        <form
        //Una vez que los datos de los inputs sean leidos, agregamos el evento al form que permita enviar la data (por GET)
        //entonces el evento que escucha es el submit
        onSubmit={submitCita}

        >
            <label htmlFor="">Nombre Mascota</label>
            <input type="text"
            name="mascota"
            className="u-full-width"
            placeholder="Nombre Mascota"
            onChange={handleChange}
            value={mascota}
            />
            <label htmlFor="">Nombre Dueño</label>
            <input type="text"
            name="propietario"
            className="u-full-width"
            placeholder="Nombre Dueño"
            onChange={handleChange}
            value={propietario}
            />
            <label htmlFor="">Fecha</label>
            <input type="date"
            name="fecha"
            className="u-full-width"
            placeholder="Nombre Dueño"
            onChange={handleChange}
            value={fecha}
            />
            <label htmlFor="">Hora</label>
            <input type="time"
            name="hora"
            className="u-full-width"
            onChange={handleChange}
            value={hora}
            />
            <label htmlFor="">Síntomas</label>
            <textarea
            name="sintomas" 
            className="u-full-width"
            onChange={handleChange}
            value={sintomas}
            >
            </textarea>
            <button
            type="submit"
            className="u-full-width button-primary"
            >Agregar Cita</button>
        </form>
        </>
    );
}

export default Formulario;