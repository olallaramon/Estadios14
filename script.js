document.addEventListener("DOMContentLoaded", () => {
    const stadium = document.getElementById("stadium");

    // Agregar un nuevo elemento al estadio
    window.addElement = (type) => {
        const element = createElement(type);
        stadium.appendChild(element);
    };

    // Generar un estadio aleatorio
    window.generateRandomStadium = () => {
        stadium.innerHTML = ""; // Limpiar el estadio
        const areas = ["vip", "press", "recreation", "players"];
        for (let i = 0; i < 10; i++) {
            const randomType = areas[Math.floor(Math.random() * areas.length)];
            const element = createElement(randomType);
            element.style.left = Math.random() * (stadium.offsetWidth - 50) + "px";
            element.style.top = Math.random() * (stadium.offsetHeight - 50) + "px";
            stadium.appendChild(element);
        }
    };

    // Crear un nuevo elemento
    function createElement(type) {
        const element = document.createElement("div");
        element.className = `element ${type}`;
        element.innerText = type.charAt(0).toUpperCase() + type.slice(1);
        element.style.left = "10px";
        element.style.top = "10px";

        // Hacer el elemento arrastrable
        element.addEventListener("mousedown", dragElement);

        // Hacer el elemento intercambiable
        element.addEventListener("dblclick", () => {
            const newType = prompt("Ingresa el nuevo tipo (vip, press, recreation, players):", type);
            if (newType && ["vip", "press", "recreation", "players"].includes(newType)) {
                element.className = `element ${newType}`;
                element.innerText = newType.charAt(0).toUpperCase() + newType.slice(1);
            }
        });

        return element;
    }

    function dragElement(event) {
        const element = event.target;
        let offsetX = event.clientX - element.offsetLeft;
        let offsetY = event.clientY - element.offsetTop;

        function moveAt(e) {
            element.style.left = e.clientX - offsetX + "px";
            element.style.top = e.clientY - offsetY + "px";
        }

        function stopDrag() {
            document.removeEventListener("mousemove", moveAt);
            document.removeEventListener("mouseup", stopDrag);
        }

        document.addEventListener("mousemove", moveAt);
        document.addEventListener("mouseup", stopDrag);
    }
});

