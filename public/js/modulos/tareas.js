import Swal from 'sweetalert2';
import axios from 'axios';

import { actualizarAvance } from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {


    tareas.addEventListener('click', (e) => {
        /* console.log(e.target.classList); */
        if (e.target.classList.contains('fa-check-circle')) {
            //console.log('Actualizando...');
            const icono = e.target;

            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            /* console.log(idTarea); */

            //Request hacia /tareas/:id

            const url = `${location.origin}/tareas/${idTarea}`;
            /* console.log(url); */
            axios.patch(url, { idTarea })
                .then(function (respuesta) {
                    /* console.log(respuesta); */

                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo');

                        actualizarAvance();
                    }
                })
        }

        if (e.target.classList.contains('fa-trash')) {
            /* console.log('Eliminando...'); */
            /* console.log(e.target); */
            const tareaHTML = e.target.parentElement.parentElement;
            const idTarea = tareaHTML.dataset.tarea;

            /* console.log(tareaHTML);
            console.log(idTarea); */

            Swal.fire({
                title: 'Desear borrar esta tarea?',
                text: "Una tarea eliminada no se puede recuperrar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    //Enviar delete por medio de axios
                    /* console.log('Eliminando...'); */
                    const url = `${location.origin}/tareas/${idTarea}`;
                    axios.delete(url, { params: { idTarea } })
                        .then(function (respuesta) {
                            /* console.log(respuesta); */
                            if (respuesta.status === 200) {
                                //Eliminar Nodo
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                //Optional alerta
                                Swal.fire(
                                    'Tarea eliminada!',
                                    'Tarea eliminada correctamente',
                                    'success'
                                )
                                    actualizarAvance();
                            }
                        });

                }
            });

        }

    });

}

export default tareas;
