//let squares = document.getElementById("grid");

//squares.style.color = "blue";
let grid;

window.onload = () => {
    grid = document.getElementById("grid");
    console.log(grid)

    for (let i = 0; i < 64; ++i) {
        let newDiv = document.createElement("div");
        grid.appendChild(newDiv);
    }
}



function closeModal() {
    let modal = document.getElementById("popup");
    /* console.log("modal:")
    console.log(modal)
    console.log("closing modal"); */
    modal.style.display="none";
    Tone.start();
}