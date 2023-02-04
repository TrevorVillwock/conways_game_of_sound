let grid;
let rows = 10;
let columns = 10;
let neighborCount = 0;
let running = 0; // Boolean for whether clock is running 
let clockID; // Id returned by setInterval to use for stopping clock
let tempo = 1000; // milliseconds per clock tick

// Create a 2D Array to represent the current state of the grid for conway's game of life
let currentSquares = Array(rows);
for (let i = 0; i < rows; ++i) {
    currentSquares[i] = new Array(columns);
}

// Create a 2D Array to represent the current state of the grid for conway's game of life
let nextSquares = Array(rows);
for (let i = 0; i < rows; ++i) {
    nextSquares[i] = new Array(columns);
}

// Specify frequencies for squares
let pitches = ["G", "A", "B", "D", "E"];
let octaves = 5;

// Create synthesizer
let polySynth = new Tone.PolySynth(Tone.Synth, {maxPolyphony: 200}).toDestination();

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
        let octave = 2 + i % octaves;
        for (let j = 0; j < columns; ++j) {
            let squareHtml = document.createElement("div");
            let divId = `r${i}c${j}`;
            squareHtml.id = divId;
            squareHtml.style.backgroundColor = "blue";
            grid.appendChild(squareHtml);
            let pitchName = pitches[j % pitches.length] + octave;

            console.log(pitchName);
            
            let newSquare = {
                html: squareHtml,
                alive: 0,
                pitch: pitchName
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
            
            currentSquares[i][j] = newSquare;
            nextSquares[i][j] = newSquare;
        }
    }
}

function start(){
    running = 1;
    clockID = setInterval(advanceClock, tempo);
};

function stop(){
    running = 0;
    clearInterval(clockID);
}

function advanceClock () {

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            neighborCount = 0;

            /* The outer if statements account for the squares along the border
            / that don't have all 8 neighbors. Categories of squares:
            
            Edge and corner cases:
            Top border: no upper neighbors, i = 0
            Right border: no right neighbors, j = columns - 1
            Bottom border: no bottom neighbors, i = rows - 1
            Left border: no left neighbors, j = 0
            Corners: only three neighbors 

            The rest of the squares have 8 neighbors to examine:
            i-1, j
            i+1, j
            i, j-1
            i, j+1
            i-1, j-1
            i-1, j+1
            i+1, j-1
            i+1, j+1

            Edge and corner cases are general concepts in programming outside of this program with literal edges and corners.
            An edge case is when one parameter is at an extreme, and a corner case is when one or more parameters are at extremes at the same time.
            */
            
            // Top row 
            if (i == 0) {
                // Top left corner
                if (j == 0) {
                    if (currentSquares[i][j + 1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i+1][j].alive == 1)
                        neighborCount++; 
                    if (currentSquares[i+1][j+1].alive == 1)
                        neighborCount++;  
                    /*console.log(currentSquares[i][j + 1].alive);
                    console.log(currentSquares[i+1][j].alive);
                    console.log(currentSquares[i+1][j + 1].alive);
                    console.log("neighborCount: " + neighborCount);
                    */
                }
                // Top right corner
                else if (j == columns - 1) {
                    if (currentSquares[i+1][j].alive == 1)
                        neighborCount++;
                    if (currentSquares[i][j-1].alive == 1)
                        neighborCount++; 
                    if (currentSquares[i+1][j-1].alive == 1)
                        neighborCount++;
                }
                // Other squares
                else {
                    if (currentSquares[i][j-1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i][j+1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i+1][j-1].alive == 1)
                        neighborCount++; 
                    if (currentSquares[i+1][j+1].alive == 1)
                        neighborCount++;
                }     
            } 
            
            // Bottom row
            else if (i == rows - 1) {
                // Bottom left corner
                if (j == 0) {
                    if (currentSquares[i][j + 1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i-1][j].alive == 1)
                        neighborCount++; 
                    if (currentSquares[i-1][j+1].alive == 1)
                        neighborCount++;  
                    /*console.log(currentSquares[i][j + 1].alive);
                    console.log(currentSquares[i-1][j].alive);
                    console.log(currentSquares[i-1][j + 1].alive);
                    console.log("neighborCount: " + neighborCount);*/ 
                }

                // Bottom right corner
                else if (j == columns - 1) {
                    if (currentSquares[i-1][j].alive == 1)
                        neighborCount++;
                    if (currentSquares[i][j-1].alive == 1)
                        neighborCount++; 
                    if (currentSquares[i-1][j-1].alive == 1)
                        neighborCount++;
                }

                // Other squares
                else {
                    if (currentSquares[i][j-1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i][j+1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i-1][j-1].alive == 1)
                        neighborCount++; 
                    if (currentSquares[i-1][j+1].alive == 1)
                        neighborCount++;
                }
            } 
            
            // Middle rows
            else {
                if (j == 0) {
                    if (currentSquares[i][j+1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i-1][j].alive == 1)
                        neighborCount++;
                    if (currentSquares[i-1][j+1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i+1][j].alive == 1)
                        neighborCount++;
                    if (currentSquares[i+1][j+1].alive == 1)
                        neighborCount++; 
                }
                else if (j == columns - 1) {
                    if (currentSquares[i][j-1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i-1][j].alive == 1)
                        neighborCount++;
                    if (currentSquares[i-1][j-1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i+1][j].alive == 1)
                        neighborCount++;
                    if (currentSquares[i+1][j-1].alive == 1)
                        neighborCount++;
                }
                else {
                    if (currentSquares[i][j-1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i][j+1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i-1][j].alive == 1)
                        neighborCount++;
                    if (currentSquares[i-1][j-1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i-1][j+1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i+1][j-1].alive == 1)
                        neighborCount++;
                    if (currentSquares[i+1][j].alive == 1)
                        neighborCount++;
                    if (currentSquares[i+1][j+1].alive == 1)
                        neighborCount++;
                }
            }

            // The algorithm for Conway's Game of Life
            if (neighborCount < 2 || neighborCount > 3) {
                nextSquares[i][j].alive = 0;
                nextSquares[i][j].html.style.backgroundColor = "blue";
            }
            if (neighborCount == 3) {
                nextSquares[i][j].alive = 1;
                nextSquares[i][j].html.style.backgroundColor = "green";
            }

            if (currentSquares[i][j].alive) {
                polySynth.triggerAttackRelease(currentSquares[i][j].pitch, 1.0);
            }

            // console.log("neighborCount for row " + i + " column " + j + ": " + neighborCount);
            neighborCount = 0;
        }
    }

    currentSquares = nextSquares;
}