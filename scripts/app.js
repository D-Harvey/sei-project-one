
const grid = document.querySelector('.game-grid') 

const width = 20
const height = 30
const gameGrid = width * height
const cells = []

function buildTheGameGrid () {
  for (let i = 0; i < gameGrid; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cell.innerText = i
    cells.push(cell)
  }
}

buildTheGameGrid()
console.log(typeof cells[1])
cells[1].classList.add('pacman')
console.log(cells)