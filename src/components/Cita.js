import React from 'react';
import PropTypes from 'prop-types';

//el hijo cita debe recibir del padre App los porps con los que va a trabajar
const Cita = ({cita, eliminarCita}) => (
    <div className="cita">
        <p>Mascota: <span>{cita.mascota}</span></p>
        <p>Dueño: <span>{cita.propietario}</span></p>
        <p>Fecha: <span>{cita.fecha}</span></p>
        <p>Hora: <span>{cita.hora}</span></p>
        <p>Síntomas: <span>{cita.sintomas}</span></p>

        <button className="button eliminar u-full-width"
        //en este caso es importante que este sea creado en el componente padre puesto que es ahi donde se tienen todas las citas
        //tiene que ser un arrow function para que espere a que suceda ese onClick
        onClick={ () => eliminarCita(cita.id) }

        >Eliminar &times;</button>
    </div>
);

Cita.propTypes = {
    cita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired
}

export default Cita;