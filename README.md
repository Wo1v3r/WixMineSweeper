![alt text](https://preview.ibb.co/c141fk/Selection_053.png)
# Minesweeper
A MineSweeper game for WIX home assignment:

Made with Angular 4 using Angular CLI , Angular Material2 for design components.
A Working example as of 17.5.2017 on: https://wo1v3r.github.io/WixMineSweeper/

Using [Angular CLI](https://github.com/angular/angular-cli):
-Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- Upon Loading a 12x12 board will appear with 30 mines on it (Medium difficulty)
- Left click a cell to reveal it, its' proximity of mines shows as a number\color
- You can start a new game by pressing the 'New Game' button and enter desired values
- You can choose a difficulty (Unicorn, Robot , Cowboy ) on the creation menu, this will alter the number of flags you have at your disposal. (And also alter the board's theme!)

### How to play:

- To restart the game with the latest settings, you can also press the bomb icon on the top of the page
- If you want to cheat, You can toggle the 'Superman Mode' to reveal the board
- Have fun and don't explode!


## Running unit tests

- Testing was done using Karma
- Tests files are with <Name>.spec.ts suffix 
- Tests are written for every Angular component, and for the two data-type classes

Using [Angular CLI](https://github.com/angular/angular-cli):
-Run `npm install && ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


### Development Notes:

- The high number of cells available counters the gameplay, therefore I used intuitive color palletes in order to make the game playable on wider boards too
- The game works correctly up to 300x300
- Superman mode some times crashes the browser after 50,000 cells

