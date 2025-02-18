// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Función para cargar los hábitos guardados en localStorage
    function cargarHabitos() {
        document.querySelectorAll(".circle-container input").forEach((checkbox) => {
            const habitId = checkbox.id;
            const estadoGuardado = localStorage.getItem(habitId);

            if (estadoGuardado === "true") {
                checkbox.checked = true;
            }
        });
    }

    // Función para guardar los hábitos en localStorage
    function guardarHabitos() {
        document.querySelectorAll(".circle-container input").forEach((checkbox) => {
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    }

    // Detectar cambios en los checkboxes y guardarlos
    document.querySelectorAll(".circle-container input").forEach((checkbox) => {
        checkbox.addEventListener("change", guardarHabitos);
    });

    // Cargar hábitos guardados al abrir la página
    cargarHabitos();
});

