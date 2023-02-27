let grid; // will eventually hold html element to which all grid squares are attached as children
let ROWS = 10;
let COLUMNS = 10;
let running = false; // Boolean for whether clock is running 
let clockID; // Id returned by setInterval to use for stopping clock
let TEMPO = 1000; // milliseconds per clock tick

// Create a 2D Array to represent the current state of the grid for conway's game of life
let currentSquares = Array(ROWS);
for (let i = 0; i < ROWS; ++i) {
    currentSquares[i] = new Array(COLUMNS);
}

// Create a 2D Array to represent the state of the grid after the next clock tick
let nextSquares = Array(ROWS);
for (let i = 0; i < ROWS; ++i) {
    nextSquares[i] = new Array(COLUMNS);
}

/* We need two separate arrays because each square should change based on its present
/ surrounding conditions, not those after the next clock tick when the cells around it
/ may have changed. For example, cells in the second row shouldn't be affected by cells
/ in the first row becoming alive or dying in the same pass of the for loops through the
/ grid. */

// Specify frequencies for squares
let pitches = ["G", "A", "B", "D", "E"];
let octaves = 5;

let reverb = new Tone.Reverb({decay: 10}).toDestination();

let envelope = new Tone.AmplitudeEnvelope({
    attack: 0.25,
    decay: 0,
    sustain: 0.25,
    release: 0.25
}).connect(reverb);

function closeModal() {
    let modal = document.getElementById("popup");
    modal.style.display="none";
    Tone.start();
}

document.addEventListener("keypress", (event) => {
  console.log(event.code);
  if (event.code == "Space") {
      // by default, space scrolls down. this prevents this
      event.preventDefault();
        if (running) {    
            console.log("stopping");
            stop();
        } else { 
            console.log("starting");
            running = true;
            start();
        } 
    }
})

window.onload = () => {
    // Create grid of squares
    grid = document.getElementById("grid");
    console.log(grid);

    for (let i = 0; i < COLUMNS; ++i) {
        let octave = 2 + i % octaves;
        for (let j = 0; j < ROWS; ++j) {
            let squareHtml = document.createElement("div");
            let divId = `r${i}c${j}`;
            squareHtml.id = divId;
            squareHtml.style.backgroundColor = "blue";
            grid.appendChild(squareHtml);
            let pitchName = pitches[j % pitches.length] + octave;
            
            console.log(pitchName);

            // Volume is in decibels
            let synth = new Tone.Synth({volume: -30}).connect(envelope);
            
            let newCurrentSquare = {
                html: squareHtml,
                alive: false,
                pitch: pitchName,
                instrument: synth,
            };

            let newNextSquare = {
                color: "blue",
                alive: false,
                pitch: pitchName,
                instrument: synth,
            };

            squareHtml.addEventListener("click", () => {
                if (newCurrentSquare.html.style.backgroundColor == "green") { 
                    newCurrentSquare.html.style.backgroundColor = "blue";
                    newCurrentSquare.alive = false;
                } else {
                    newCurrentSquare.html.style.backgroundColor = "green";
                    newCurrentSquare.alive = true;
                } 
                console.log("toggling square " + divId);
            })
            
            currentSquares[i][j] = newCurrentSquare;
            nextSquares[i][j] = newNextSquare;
        }
    }
}

function start(){
    running = true;
    clockID = setInterval(advanceClock, TEMPO);
};

function stop(){
    running = false;
    clearInterval(clockID);
}

function advanceClock() {
    // The 0.5 here means that the envelope will trigger the release 0.5 seconds after the attack
    envelope.triggerAttackRelease("0.5");
    for (let i = 0; i < ROWS; ++i) {
        for (let j = 0; j < COLUMNS; ++j) {
            let neighborCount = 0;
            
            if (j > 0 && currentSquares[i][j-1].alive)
                neighborCount++;
            if (j < COLUMNS - 1 && currentSquares[i][j+1].alive)
                neighborCount++;
            if (i > 0 && currentSquares[i-1][j].alive)
                neighborCount++;
            if (i > 0 && j > 0 && currentSquares[i-1][j-1].alive)
                neighborCount++;
            if (i > 0 && j < COLUMNS - 1 && currentSquares[i-1][j+1].alive)
                neighborCount++;
            if (i < ROWS - 1 && j > 0 && currentSquares[i+1][j-1].alive)
                neighborCount++;
            if (i < ROWS - 1 && currentSquares[i+1][j].alive)
                neighborCount++;
            if (i < ROWS - 1 && j < COLUMNS - 1 && currentSquares[i+1][j+1].alive)
                neighborCount++;

            // The algorithm for Conway's Game of Life
            if (neighborCount < 2 || neighborCount > 3) {
                nextSquares[i][j].alive = false;
                nextSquares[i][j].color = "blue";
            }

            if (neighborCount == 2 && currentSquares[i][j].alive) {
                nextSquares[i][j].alive = true;
                nextSquares[i][j].color = "green";
            }

            if (neighborCount == 3) {
                nextSquares[i][j].alive = true;
                nextSquares[i][j].color = "green";
            }

            if (currentSquares[i][j].alive) {
                currentSquares[i][j].instrument.triggerAttackRelease(currentSquares[i][j].pitch, 1.0);
            }

            // console.log("neighborCount for row " + i + " column " + j + ": " + neighborCount);
        }
    }

    for (let i = 0; i < COLUMNS; ++i) {
        for (let j = 0; j < ROWS; ++j) {
            currentSquares[i][j].alive = nextSquares[i][j].alive;
            currentSquares[i][j].html.style.backgroundColor = nextSquares[i][j].color;
        }
    }
}