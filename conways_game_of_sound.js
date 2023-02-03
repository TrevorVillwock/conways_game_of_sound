let grid;
let rows = 10;
let columns = 10;
let neighborCount = 0;
let running = 0; // Boolean for whether clock is running 

// Create a 2D Array to represent the grid for conway's game of life
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

document.addEventListener("keypress", (event) => {
    console.log(event.code);
    if (event.code == "Space") {
        if (running) {    
            console.log("stopping");
            stop();
        } else { 
            console.log("starting");
            running = 1;
            start();
        } 
    }
})

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
                html: squareHtml,
                alive: 0
            };

            squareHtml.addEventListener("click", () => {
                if (newSquare.html.style.backgroundColor == "green") { 
                    newSquare.html.style.backgroundColor = "blue";
                    newSquare.alive = 0;
                } else {
                    newSquare.html.style.backgroundColor = "green";
                    newSquare.alive = 1;
                } 
                console.log("toggling square " + divId);
            })
            
            squares[i][j] = newSquare;

            // start();
        }
    }
}

function start(){
    running = 1;
    setInterval(advanceClock, 1000);
};

function stop(){
    running = 0;
}

function advanceClock () {

    while (running) {
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
                        /*console.log(squares[i][j + 1].alive);
                        console.log(squares[i+1][j].alive);
                        console.log(squares[i+1][j + 1].alive);
                        console.log("neighborCount: " + neighborCount);
                        */
                    }
                    // Top right corner
                    else if (j == columns - 1) {
                        if (squares[i+1][j].alive == 1)
                            neighborCount++;
                        if (squares[i][j-1].alive == 1)
                            neighborCount++; 
                        if (squares[i+1][j-1].alive == 1)
                            neighborCount++;
                    }
                    // Other squares
                    else {
                        if (squares[i][j-1].alive == 1)
                            neighborCount++;
                        if (squares[i][j+1].alive == 1)
                            neighborCount++;
                        if (squares[i+1][j-1].alive == 1)
                            neighborCount++; 
                        if (squares[i+1][j+1].alive == 1)
                            neighborCount++;
                    }     
                } 
                
                // Bottom row
                else if (i == rows - 1) {
                    // Bottom left corner
                    if (j == 0) {
                        if (squares[i][j + 1].alive == 1)
                            neighborCount++;
                        if (squares[i-1][j].alive == 1)
                            neighborCount++; 
                        if (squares[i-1][j+1].alive == 1)
                            neighborCount++;  
                        console.log(squares[i][j + 1].alive);
                        console.log(squares[i-1][j].alive);
                        console.log(squares[i-1][j + 1].alive);
                        console.log("neighborCount: " + neighborCount); 
                    }

                    // Bottom right corner
                    else if (j == columns - 1) {
                        if (squares[i-1][j].alive == 1)
                            neighborCount++;
                        if (squares[i][j-1].alive == 1)
                            neighborCount++; 
                        if (squares[i-1][j-1].alive == 1)
                            neighborCount++;
                    }

                    // Other squares
                    else {
                        if (squares[i][j-1].alive == 1)
                            neighborCount++;
                        if (squares[i][j+1].alive == 1)
                            neighborCount++;
                        if (squares[i+1][j-1].alive == 1)
                            neighborCount++; 
                        if (squares[i+1][j+1].alive == 1)
                            neighborCount++;
                    }
                } 
                
                // Middle rows
                else {
                    if (j == 0) {
                        if (squares[i][j+1].alive == 1)
                            neighborCount++;
                        if (squares[i-1][j].alive == 1)
                            neighborCount++;
                        if (squares[i-1][j+1].alive == 1)
                            neighborCount++;
                        if (squares[i+1][j].alive == 1)
                            neighborCount++;
                        if (squares[i+1][j+1].alive == 1)
                            neighborCount++; 
                    }
                    else if (j == columns - 1) {
                        if (squares[i][j-1].alive == 1)
                            neighborCount++;
                        if (squares[i-1][j].alive == 1)
                            neighborCount++;
                        if (squares[i-1][j-1].alive == 1)
                            neighborCount++;
                        if (squares[i+1][j].alive == 1)
                            neighborCount++;
                        if (squares[i+1][j-1].alive == 1)
                            neighborCount++;
                    }
                    else {
                        if (squares[i][j-1].alive == 1)
                            neighborCount++;
                        if (squares[i][j+1].alive == 1)
                            neighborCount++;
                        if (squares[i-1][j].alive == 1)
                            neighborCount++;
                        if (squares[i-1][j-1].alive == 1)
                            neighborCount++;
                        if (squares[i-1][j+1].alive == 1)
                            neighborCount++;
                        if (squares[i+1][j-1].alive == 1)
                            neighborCount++;
                        if (squares[i+1][j].alive == 1)
                            neighborCount++;
                        if (squares[i+1][j+1].alive == 1)
                            neighborCount++;
                    }
                }

                // The algorithm for Conway's Game of Life
                if (neighborCount < 2 || neighborCount > 3) {
                    squares[i][j].alive = 0;
                    squares[i][j].html.style.backgroundColor = "blue";
                }
                if (neighborCount == 3) {
                    squares[i][j].alive = 1;
                    squares[i][j].html.style.backgroundColor = "green";
                }

                console.log("neighborCount for row " + i + " column " + j + ": " + neighborCount);
                neighborCount = 0;
            }
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