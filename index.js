const shiny = document.querySelector(".shiny");

shiny.addEventListener("mousemove", (e) => {
    const { x, y } = shiny.getBoundingClientRect();
    shiny.style.setProperty("--x", `${e.clientX - x}`);
    shiny.style.setProperty("--y", `${e.clientY - y}`);
});
