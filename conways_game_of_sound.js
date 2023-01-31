//let squares = document.getElementById("grid");

//squares.style.color = "blue";
let grid;

let rows = 10;
let columns = 10;
let squares = Array(rows);

for (let i = 0; i < rows; ++i) {
    squares[i] = new Array(columns);
}

window.onload = () => {
    // Create grid of squares
    grid = document.getElementById("grid");
    console.log(grid);

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            let newSquare = document.createElement("div");
            let divId = `r${i}c${j}`;
            newSquare.id = divId;
            newSquare.setAttribute("alive", 0);
            newSquare.addEventListener("click", () => {
                if (newSquare.style.backgroundColor == "white") { 
                    newSquare.style.backgroundColor = "black";
                    newSquare.setAttribute("alive", "0");
                } else {
                    newSquare.style.backgroundColor = "white";
                    newSquare.setAttribute("alive", "1");
                } 
            })
            grid.appendChild(newSquare);
            squares[i][j] = newSquare;
        }
    }

    setInterval(advanceClock, 1000);
}

function closeModal() {
    let modal = document.getElementById("popup");
    /* console.log("modal:")
    console.log(modal)
    console.log("closing modal"); */
    modal.style.display="none";
    Tone.start();
}

function advanceClock () {

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            let neighborCount = 0;

            /* The outer if statements account for the squares along the border
            / that don't have all 8 neighbors. Categories of squares:
              
            All neighbors
            Top border: no upper neighbors, i = 0
            Right border: no right neighbors, j = columns
            Bottom border: no bottom neighbors, i = rows
            Left border: no left neighbors, j = 0
            Corners: only three neighbors, 
            */
            
            if (i != 0) {
                if (squares[i-1][j] != undefined && squares[i-1][j].alive == "1")
                    neighborCount++;
                if (squares[i-1][j+1] != undefined && squares[i-1][j+1].alive == "1")
                    neighborCount++;
            }

            else if (i != rows - 1) {
                if (squares[i+1][j] != undefined && squares[i+1][j].alive == "1")
                    neighborCount++;
                if (squares[i+1][j-1] != undefined && squares[i+1][j-1].alive == "1")
                    neighborCount++;
                if (squares[i+1][j+1] != undefined && squares[i+1][j+1].alive == "1")
                    neighborCount++;
            }

            else if (j != 0) {
                if (squares[i][j-1] != undefined && squares[i][j-1].alive == "1")
                    neighborCount++;
                if (squares[i+1][j-1] != undefined && squares[i+1][j-1].alive == "1")
                    neighborCount++;
            }

            else if (i != 0 && j != 0) {
                if (squares[i-1][j-1] != undefined && squares[i-1][j-1].alive == "1")
                neighborCount++;
            }

            /*
            if (squares[i+1][j].alive == "1")
                neighborCount++;
            if (squares[i][j-1].alive == "1")
                neighborCount++;
            if (squares[i][j+1].alive == "1")
                neighborCount++;
            if (squares[i-1][j-1].alive == "1")
                neighborCount++;    
            if (squares[i+1][j-1].alive == "1")
                neighborCount++;
            if (squares[i+1][j+1].alive == "1")
                neighborCount++;
            */

            console.log("neighborCount for row " + i + " column " + j + ": " + neighborCount);
        }
    }
}

/*

loop through squares

examine neighbors:

r-1, c
r+1, c
r, c-1
r, c+1
r-1, c-1
r-1, c+1
r+1, c-1
r+1, c+1


*/