let grid;
let rows = 10;
let columns = 10;
let neighborCount = 0;

// Create a 2D Array 
let squares = Array(rows);
for (let i = 0; i < rows; ++i) {
    squares[i] = new Array(columns);
}

function closeModal() {
    let modal = document.getElementById("popup");
    /* console.log("modal:")
    console.log(modal)
    console.log("closing modal"); */
    modal.style.display="none";
    Tone.start();
}

window.onload = () => {
    // Create grid of squares
    grid = document.getElementById("grid");
    console.log(grid);

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            let squareHtml = document.createElement("div");
            let divId = `r${i}c${j}`;
            squareHtml.id = divId;
            squareHtml.style.backgroundColor = "blue"
            grid.appendChild(squareHtml);

            let newSquare = {
                square: squareHtml,
                alive: 0
            };

            squareHtml.addEventListener("click", () => {
                if (newSquare.square.style.backgroundColor == "green") { 
                    newSquare.square.style.backgroundColor = "blue";
                    newSquare.alive = 0;
                } else {
                    newSquare.square.style.backgroundColor = "green";
                    newSquare.alive = 1;
                } 
                console.log("toggling square " + divId);
            })
            
            squares[i][j] = newSquare;
        }
    }

    setInterval(advanceClock, 1000);
}

function advanceClock () {

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            neighborCount = 0;

            /* The outer if statements account for the squares along the border
            / that don't have all 8 neighbors. Categories of squares:
              
            All neighbors
            Top border: no upper neighbors, i = 0
            Right border: no right neighbors, j = columns - 1
            Bottom border: no bottom neighbors, i = rows - 1
            Left border: no left neighbors, j = 0
            Corners: only three neighbors 
            */
            
            // Top row 
            
            if (i == 0) {
                // Top left corner
                if (j == 0) {
                    if (squares[i][j + 1].alive == 1)
                        neighborCount++;
                    if (squares[i+1][j].alive == 1)
                        neighborCount++; 
                    if (squares[i+1][j+1].alive == 1)
                        neighborCount++;  
                    console.log(squares[i][j + 1].alive);
                    console.log(squares[i+1][j].alive);
                    console.log(squares[i+1][j + 1].alive);
                    console.log("neighborCount: " + neighborCount); 
                }
                /*
                else if (j = columns - 1) {

                }
                else {

                } 
                */
            }
            
            

            /*
            if (squares[i-1][j] != undefined && squares[i-1][j].data-alive == "1")
                neighborCount++;
            if (squares[i-1][j+1] != undefined && squares[i-1][j+1].data-alive == "1")
                neighborCount++;
            if (squares[i+1][j] != undefined && squares[i+1][j].data-alive == "1")
                neighborCount++;
            if (squares[i+1][j-1] != undefined && squares[i+1][j-1].data-alive == "1")
                neighborCount++;
            if (squares[i+1][j+1] != undefined && squares[i+1][j+1].data-alive == "1")
                neighborCount++;
            if (squares[i][j-1] != undefined && squares[i][j-1].data-alive == "1")
                neighborCount++;
            if (squares[i-1][j-1] != undefined && squares[i-1][j-1].data-alive == "1")
                neighborCount++;
            if (squares[i+1][j-1] != undefined && squares[i+1][j-1].data-alive == "1")
                neighborCount++;
            */

            /*
            if (squares[i+1][j].data-alive == "1")
                neighborCount++;
            if (squares[i][j-1].data-alive == "1")
                neighborCount++;
            if (squares[i][j+1].data-alive == "1")
                neighborCount++;
            if (squares[i-1][j-1].data-alive == "1")
                neighborCount++;    
            if (squares[i+1][j-1].data-alive == "1")
                neighborCount++;
            if (squares[i+1][j+1].data-alive == "1")
                neighborCount++;
            */

            // console.log("neighborCount for row " + i + " column " + j + ": " + neighborCount);
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