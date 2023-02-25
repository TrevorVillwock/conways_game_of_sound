# Soundscape Sandbox

To run this project, you'll need to install Node.js and npm: https://nodejs.org/en/download/

After the npm package http-server has been installed globally with `npm install -g http-server`, run the program wih `http-server` from the command line.

Conway's Game of Life is a type of cellular automaton invented by the British mathmetician John Conway in 1970. Cellular automata are mathematical systems defined by a set of cells that interact with the cells around them according to a set of rules. Each cell has its own state defined by a certain number of parameters; in Conway's Game of Life the cells have only one parameter, which is whether they are "alive." The rules according to http://www.conwaylife.com are as follows:

Any live cell with fewer than two live neighbours dies (referred to as underpopulation).
Any live cell with more than three live neighbours dies (referred to as overpopulation).
Any live cell with two or three live neighbours lives, unchanged, to the next generation.
Any dead cell with exactly three live neighbours comes to life.

The Game of Life is a 2D automaton, but cellular automata with any number of dimensions are possible.

Click a square to make it alive. Once you have created the pattern you want, press the spacebar to begin running the clock. Pressing the spacebar again will stop the clock. Each square is mapped to a note of the G major pentatonic scale.