
const grid = document.querySelector('.game-board')
console.log(grid)

const width = 20
const height = 30
const gameGrid = width * height
const cells = []

console.log(gameGrid)

function buildTheGameGrid () {
  for (let i = 0; i < gameGrid; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cell.innerText = i
    cells.push(cell)
  }
}

buildTheGameGrid()

console.log(cells)