import Swal from 'sweetalert2';

export const actualizarAvance = () => {

    //TODO: Selccionar las tareas exitentes

    const tareas = document.querySelectorAll('li.tarea');

    if (tareas.length) {

        //TODO: Selecionar lastareas completadas

        const tareasCompletadas = document.querySelectorAll('i.completo');

        //TODO: Calcular el avance

        const avance = Math.round((tareasCompletadas.length / tareas.length) * 100);

        //TODO: Mostrar el avance

        const procentaje = document.querySelector('#porcentaje');
        procentaje.style.width = avance + '%';


        if (avance === 100) {

            Swal.fire(
                'Proyecto terminado!',
                'Haz realizado todas las tareas del proyecto',
                'success')
        }

    }



}
