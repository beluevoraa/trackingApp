document.addEventListener("DOMContentLoaded", function () {
    const gratitudeContainer = document.getElementById("gratitude-container");

    // Crear 31 días con inputs y botones de "Aceptar"
    function crearListaDeGratitud() {
        gratitudeContainer.innerHTML = "";

        for (let i = 1; i <= 31; i++) {
            const entryDiv = document.createElement("div");
            entryDiv.classList.add("gratitude-entry");

            entryDiv.innerHTML = `
                <label for="day-${i}">Día ${i}:</label>
                <input type="text" id="day-${i}" placeholder="Hoy estoy agradecida por..." data-day="${i}">
                <button class="accept-btn" data-day="${i}">✔</button>
            `;

            gratitudeContainer.appendChild(entryDiv);
        }

        cargarGratitud();
    }

    // Guardar la entrada en Local Storage (solo la del día editado)
    function guardarGratitud(day) {
        const savedEntries = JSON.parse(localStorage.getItem("gratitude")) || {};
        const input = document.querySelector(`#day-${day}`);

        savedEntries[day] = input.value;
        localStorage.setItem("gratitude", JSON.stringify(savedEntries));

        // Cambiar el fondo del input para que se vea guardado
        input.classList.add("saved");
    }

    // Cargar entradas guardadas
    function cargarGratitud() {
        const savedEntries = JSON.parse(localStorage.getItem("gratitude")) || {};

        document.querySelectorAll(".gratitude-entry input").forEach((input) => {
            if (savedEntries[input.dataset.day]) {
                input.value = savedEntries[input.dataset.day];
                input.classList.add("saved"); // Aplicamos el color beige si ya estaba guardado
            }
        });
    }

    // Evento para guardar solo cuando se aprieta el botón "Aceptar"
    document.addEventListener("click", function (event) {
        if (event.target.matches(".accept-btn")) {
            const day = event.target.dataset.day;
            guardarGratitud(day);
            event.target.classList.add("saved"); // Efecto de guardado
            setTimeout(() => event.target.classList.remove("saved"), 1000); // Lo quitamos después de 1 seg
        }
    });

    // Generar la lista de gratitud
    crearListaDeGratitud();
});


