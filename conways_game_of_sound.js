//let squares = document.getElementById("grid");

//squares.style.color = "blue";
let grid;

let rows = 10;
let columns = 100;

window.onload = () => {
    // Create grid of squares
    grid = document.getElementById("grid");
    console.log(grid);

    //let newRow = document.createElement("div");
    //grid.appendChild(newRow);

    for (let j = 0; j < columns; ++j) {
        console.log("making rows");
        let newColumn = document.createElement("div");
        let divId = `r1c${j}`;
        newColumn.id = divId;
        grid.appendChild(newColumn);
    }

    // for (let i = 0; i < rows; ++i) {
    //     for (let j = 0; j < columns; ++j) {
    //         let newColumn = document.createElement("div");
    //         let divId = `r${i}c${j}`;
    //         newColumn.id = divId;
    //         newRow.appendChild(newColumn);
    //     }
    // }

}



function closeModal() {
    let modal = document.getElementById("popup");
    /* console.log("modal:")
    console.log(modal)
    console.log("closing modal"); */
    modal.style.display="none";
    Tone.start();
}