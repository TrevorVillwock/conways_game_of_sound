let grid; // will eventually hold html element to which all grid squares are attached as children
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

// Create a 2D Array to represent the state of the grid after the next clock tick
let nextSquares = Array(rows);
for (let i = 0; i < rows; ++i) {
    nextSquares[i] = new Array(columns);
}

/* We need two separate arrays because each square should change based on its present
/ surrounding conditions, not those after the next clock tick when the cells around it
/ may have changed. For example, cells in the second row shouldn't be affected by cells
/ in the first row becoming alive or dying in the same pass of the for loops through the
/ grid. */

// Specify frequencies for squares
let pitches = ["G", "A", "B", "D", "E"];
let octaves = 5;

let envelope = new Tone.AmplitudeEnvelope({
    attack: 0.25,
    decay: 0,
    sustain: 0.25,
    release: 0.25
}).toDestination();

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

            let synth = new Tone.Synth().connect(envelope);
            
            let newSquare = {
                html: squareHtml,
                alive: 0,
                pitch: pitchName,
                instrument: synth,
                env: envelope
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

    envelope.triggerAttackRelease("0.25");

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            neighborCount = 0;
            
            if (j > 0 && currentSquares[i][j-1].alive == 1)
                neighborCount++;
            if (j < columns - 1 && currentSquares[i][j+1].alive == 1)
                neighborCount++;
            if (i > 0 && currentSquares[i-1][j].alive == 1)
                neighborCount++;
            if (i > 0 && j > 0 && currentSquares[i-1][j-1].alive == 1)
                neighborCount++;
            if (i > 0 && j < columns - 1 && currentSquares[i-1][j+1].alive == 1)
                neighborCount++;
            if (i < rows - 1 && j > 0 && currentSquares[i+1][j-1].alive == 1)
                neighborCount++;
            if (i < rows - 1 && currentSquares[i+1][j].alive == 1)
                neighborCount++;
            if (i < rows - 1 && j < columns - 1 && currentSquares[i+1][j+1].alive == 1)
                neighborCount++;

            // The algorithm for Conway's Game of Life
            if (neighborCount < 2 || neighborCount > 3) {
                nextSquares[i][j].alive = 0;
                nextSquares[i][j].html.style.backgroundColor = "blue";
            }
            if (neighborCount == 3 && !nextSquares[i][j].alive) {
                nextSquares[i][j].alive = 1;
                nextSquares[i][j].html.style.backgroundColor = "green";
            }

            if (currentSquares[i][j].alive) {
                currentSquares[i][j].instrument.triggerAttackRelease(currentSquares[i][j].pitch, 1.0);
                //currentSquares[i][j].env.triggerAttackRelease();
            }

            // console.log("neighborCount for row " + i + " column " + j + ": " + neighborCount);
            neighborCount = 0;
        }
    }

    currentSquares = nextSquares;
}