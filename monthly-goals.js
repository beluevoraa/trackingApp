document.addEventListener("DOMContentLoaded", function () {
    const goalContainer = document.getElementById("goal-container");
    const addGoalButton = document.getElementById("add-goal");

    // Cargar metas guardadas en Local Storage
    function cargarMetas() {
        goalContainer.innerHTML = "";
        const metas = JSON.parse(localStorage.getItem("metas")) || [];

        metas.forEach((meta, index) => {
            agregarMeta(meta.titulo, meta.texto, meta.pasos, meta.fecha, index, false);
        });
    }

    // Guardar metas en Local Storage
    function guardarMetas() {
        const metas = [];
        document.querySelectorAll(".goal").forEach((meta) => {
            metas.push({
                titulo: meta.querySelector(".goal-title").textContent,
                texto: meta.querySelector(".goal-text").value,
                pasos: meta.querySelector(".goal-steps").value,
                fecha: meta.querySelector(".goal-date").textContent
            });
        });
        localStorage.setItem("metas", JSON.stringify(metas));
    }

    // Eliminar una meta
    function eliminarMeta(metaDiv) {
        metaDiv.remove();
        guardarMetas();
    }

    // Agregar una meta nueva
    function agregarMeta(titulo = "", texto = "", pasos = "", fecha = "", index = null, guardar = true) {
        const goalDiv = document.createElement("div");
        goalDiv.classList.add("goal");

        goalDiv.innerHTML = `
            <div class="goal-header">
                <h3 class="goal-title">${titulo || "Nueva Meta"}</h3>
                <div class="goal-actions">
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                    <button class="complete-btn"><i class="fas fa-check"></i></button>
                </div>
            </div>
            <p class="goal-date">${fecha || "Sin fecha"}</p>
            <div class="goal-content">
                <input type="text" class="goal-title-input" placeholder="Escribí el título..." value="${titulo}">
                <textarea class="goal-text" name="goal-text" placeholder="Escribí tu meta acá...">${texto}</textarea>
                <textarea class="goal-steps" name="goal-steps" placeholder="Pasos a seguir...">${pasos}</textarea>
                <button class="accept-btn">Aceptar</button>
            </div>
        `;

        // Agregar eventos a los botones de eliminar y completar
        goalDiv.querySelector(".delete-btn").addEventListener("click", function () {
            eliminarMeta(goalDiv);
        });

        goalDiv.querySelector(".complete-btn").addEventListener("click", function () {
            eliminarMeta(goalDiv);
        });

        // Evento para abrir/cerrar la meta SOLO si se hace clic en el título
        goalDiv.querySelector(".goal-title").addEventListener("click", function () {
            goalDiv.classList.toggle("open");
            const content = goalDiv.querySelector(".goal-content");
            if (goalDiv.classList.contains("open")) {
                content.style.display = "block"; // Muestra el contenido al abrir
            } else {
                content.style.display = "none"; // Oculta el contenido al cerrar
            }
        });

        // Botón Aceptar guarda la meta con el título personalizado
        goalDiv.querySelector(".accept-btn").addEventListener("click", function () {
            const fechaActual = new Date().toLocaleDateString();
            goalDiv.querySelector(".goal-date").textContent = `Creada el: ${fechaActual}`;

            // Guardar el título personalizado en la meta
            const nuevoTitulo = goalDiv.querySelector(".goal-title-input").value.trim();
            if (nuevoTitulo) {
                goalDiv.querySelector(".goal-title").textContent = nuevoTitulo;
            }

            guardarMetas();
        });

        goalContainer.appendChild(goalDiv);
        if (guardar) guardarMetas();
    }

    // Evento para agregar nuevas metas
    addGoalButton.addEventListener("click", function () {
        agregarMeta();
    });

    // Cargar las metas cuando se abre la página
    cargarMetas();
});

function lanzarConfeti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Llamá esta función cuando el usuario marque una meta como completa
document.querySelectorAll(".complete-btn").forEach((btn) => {
    btn.addEventListener("click", lanzarConfeti);
});


const frasesMotivadoras = [
    "🌟 ¡Nunca te rindas! Grandes cosas toman tiempo.",
    "💪 Hoy es un gran día para alcanzar tus metas.",
    "✨ Cree en ti misma. ¡Podés con todo!",
    "🚀 ¡Un paso a la vez hacia tus sueños!",
    "🌸 Las pequeñas acciones diarias crean grandes cambios."
];

window.addEventListener("DOMContentLoaded", function () {
    const fraseRandom = frasesMotivadoras[Math.floor(Math.random() * frasesMotivadoras.length)];
    document.querySelector("#motivacion").textContent = fraseRandom;
});
