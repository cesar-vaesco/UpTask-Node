
import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

btnEliminar.addEventListener('click', () => {
    Swal.fire({
        title: 'Desear borrar este proyecto?',
        text: "Un proyecto eliminado no se puede recuperrar!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Proyecto eliminado!',
                'El registro del proyecto ha sido borrado.',
                'success'
            )
        }
    });

    setTimeout(() => {
        window.location.href = '/'
    }, 3000);
});
