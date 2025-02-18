// Detectar si hay un modo oscuro guardado en Local Storage
if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
}

const toggleDarkMode = document.querySelector("#dark-mode-toggle");

toggleDarkMode.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Guardar el estado del modo oscuro
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
    } else {
        localStorage.setItem("dark-mode", "disabled");
    }
});
