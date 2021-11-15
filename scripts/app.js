// building the game grid variables
const width = 20
const height = 30
const gameGrid = width * height
const cells = []

// this may look epically ridiculous, but was actually pretty quite using excel and a bit of copy and pasting.  As the board doesn't change size, I thought it was worth just getting these down so I can manage the different areas with a higher degree of control.
const noGoZoneCells = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,520,540,560,39,59,79,99,119,139,159,179,199,219,239,259,279,299,319,339,359,379,399,419,439,459,479,499,519,539,559,579,42,43,45,46,47,49,51,52,53,54,56,57,29,62,63,65,66,67,69,71,72,73,74,76,77,82,83,85,86,87,89,91,92,93,94,96,97,122,123,125,127,128,129,130,131,132,134,136,137,142,143,145,147,148,149,150,151,152,154,156,157,165,169,174,181,182,183,185,186,187,189,191,192,193,194,196,197,198,201,202,203,205,206,207,209,211,212,213,214,216,217,218,221,222,223,225,234,236,237,238,241,242,243,245,254,256,257,258,281,282,283,285,294,296,297,298,301,302,303,305,314,316,317,318,321,322,323,325,334,336,337,338,341,342,343,345,347,348,349,350,351,352,354,356,357,358,361,362,363,365,367,368,369,370,371,372,374,376,377,378,389,390,402,403,405,406,407,409,410,412,413,414,416,417,422,423,425,426,427,429,430,432,433,434,436,437,443,456,461,463,465,467,468,469,470,471,472,474,476,478,481,483,485,487,488,489,490,491,492,494,496,498,505,509,514,522,523,524,525,526,527,529,531,532,533,534,535,536,537,542,543,544,545,546,547,549,551,552,553,554,555,556,557,247,248,249,250,251,252,267,268,269,270,271,272,287,288,289,290,291,292,307,308,309,310,311,312]
const ghostTownCells = [247,248,249,250,251,252,267,268,269,270,271,272,287,288,289,290,291,292,307,308,309,310,311,312]
const blueBorders = [39,59,79,99,119,139,159,179]


let pacmanPosition = 104
let redGhostPosition = 561
let timerId = null
let timerIdTwo = null

const ghostSpeed = 1000

// DOM grabbing
const grid = document.querySelector('.game-grid') 

// functions
function buildTheGameGrid () {
  for (let i = 0; i < gameGrid; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cell.innerText = i
    cells.push(cell)
    noGoZoneCells.some(ngz => {
      const block = ngz.valueOf()
      if (i === block) {
        cell.classList.add('noGoZoneCells')
      } 
    })
    ghostTownCells.some(gtz => {
      const block = gtz.valueOf()
      if (i === block) {
        cell.classList.add('ghostTownCells')
      } 
    })
    blueBorders.some(bbs => {
      const block = bbs.valueOf()
      if (i === block) {
        cell.classList.add('blueBordeCells')
      } 
    }) 
  }
}
buildTheGameGrid()

function addPacman() {
  cells[pacmanPosition].classList.add('pacman')
}

function removePacman() {
  cells[pacmanPosition].classList.remove('pacman')
}

function handleKeyUp(ev) {
  removePacman()
  switch (ev.code) {
    case 'ArrowRight':
      if (!cells[pacmanPosition + 1].classList.contains('noGoZoneCells')) {
        pacmanPosition++
      }
      break
    case  'ArrowLeft':
      if (!cells[pacmanPosition - 1].classList.contains('noGoZoneCells')) {
        pacmanPosition--
      }
      break
    case 'ArrowDown':
      if (!cells[pacmanPosition + 20].classList.contains('noGoZoneCells')) {
        pacmanPosition += 20
      }
      break
    case 'ArrowUp': 
      if (!cells[pacmanPosition - 20].classList.contains('noGoZoneCells')) {
        pacmanPosition -=  20
      }
      break
  }
  addPacman()
}


// event handling
document.addEventListener('keyup', handleKeyUp)




// ghost movement - create a loop where + or - 20 to get where pacman is, if 20 isnt possible then 1, until he gets to pacman
function redGhostMovement() {
  clearInterval(timerIdTwo)
  timerId = setInterval(() => {
    const pacmanY = Math.floor(pacmanPosition / width)
    const redGhostY = Math.floor(redGhostPosition / width)
    const pacmanX = Math.floor(pacmanPosition % width)
    const redGhostX = Math.floor(redGhostPosition % width)
    while (redGhostPosition !== pacmanPosition) {
      // chasing up and left 
      console.log('py', pacmanY)
      console.log('gy', redGhostY)
      console.log('px', pacmanX)
      console.log('gx', redGhostX)
      if ((redGhostY > pacmanY) && !cells[redGhostPosition - 20].classList.contains('noGoZoneCells')) {
        removeRedGhost()
        redGhostPosition -= 20
        console.log('> -20 happening?')
        addRedGhost()
        console.log('pm', pacmanPosition, 'rg', redGhostPosition)
        return
      } else if ((redGhostY > pacmanY)
        && cells[redGhostPosition - 20].classList.contains('noGoZoneCells') 
        && !cells[redGhostPosition - 1].classList.contains('noGoZoneCells')) {
        removeRedGhost()
        redGhostPosition --
        console.log('> -- happening?')
        addRedGhost()
        console.log('pm', pacmanPosition, 'rg', redGhostPosition)
        return
      } else if (redGhostY > pacmanY 
        && cells[redGhostPosition - 20].classList.contains('noGoZoneCells') 
        && cells[redGhostPosition - 1].classList.contains('noGoZoneCells')
        && !cells[redGhostPosition + 1].classList.contains('noGoZoneCells')) {
        keepGoingRightUntilUp()
        return
      } else if (redGhostPosition > pacmanPosition 
        && cells[redGhostPosition - 20].classList.contains('noGoZoneCells') 
        && cells[redGhostPosition - 1].classList.contains('noGoZoneCells')
        && !cells[redGhostPosition + 20].classList.contains('noGoZoneCells')) {
        removeRedGhost()
        redGhostPosition + 20
        console.log('> +20 happening?')
        addRedGhost()
        console.log('pm', pacmanPosition, 'rg', redGhostPosition)
        return
      } else if (redGhostY === pacmanY
            && !cells[redGhostPosition - 1].classList.contains('noGoZoneCells')) {
        removeRedGhost()
        redGhostPosition --
        console.log('> 0-20 -- happening?')
        addRedGhost()
        console.log('pm', pacmanPosition, 'rg', redGhostPosition)
        return
      } else if (redGhostY === pacmanY
        && cells[redGhostPosition - 1].classList.contains('noGoZoneCells')
        && !cells[redGhostPosition - 20].classList.contains('noGoZoneCells')) {
        removeRedGhost()
        redGhostPosition += 20
        console.log('> 0-20 - 20 happening?')
        addRedGhost()
        console.log('pm', pacmanPosition, 'rg', redGhostPosition)
        return
      }
    }

  }, ghostSpeed)
}



redGhostMovement() 

function addRedGhost() {
  cells[redGhostPosition].classList.add('red-ghost')
}
function removeRedGhost() {
  cells[redGhostPosition].classList.remove('red-ghost')
}

addRedGhost()

function keepGoingRightUntilUp() {
  clearInterval(timerId)
  timerIdTwo = setInterval(() => {
    if (!cells[redGhostPosition + 1].classList.contains('noGoZoneCells')
&& cells[redGhostPosition - 20].classList.contains('noGoZoneCells')) {
      removeRedGhost()
      redGhostPosition ++
      addRedGhost()
      console.log('keep going if pm', pacmanPosition, 'rg', redGhostPosition)
    } else if (!cells[redGhostPosition - 20].classList.contains('noGoZoneCells')){
      redGhostMovement()
    }
  }, ghostSpeed)
}

// function redGhostMovement() {
//   window.setInterval(() => {
//     const pacmanY = Math.floor(pacmanPosition / width)
//     const redGhostY = Math.floor(redGhostPosition / width)
//     while (redGhostPosition !== pacmanPosition) {
//       // chasing up and left 
// console.log('py', pacmanY)
// console.log('gy', redGhostY)
//       if ((redGhostY > pacmanY) && !cells[redGhostPosition - 20].classList.contains('noGoZoneCells')) {
//         removeRedGhost()
//         redGhostPosition -= 20
//         console.log('> -20 happening?')
//         addRedGhost()
//         console.log('pm', pacmanPosition, 'rg', redGhostPosition)
//         return
//       } else if (redGhostPosition > pacmanPosition 
//         && cells[redGhostPosition - 20].classList.contains('noGoZoneCells') 
//         && !cells[redGhostPosition - 1].classList.contains('noGoZoneCells')) {
//         removeRedGhost()
//         redGhostPosition --
//         console.log('> -- happening?')
//         addRedGhost()
//         console.log('pm', pacmanPosition, 'rg', redGhostPosition)
//         return
//       } else if (redGhostPosition > pacmanPosition 
//         && cells[redGhostPosition - 20].classList.contains('noGoZoneCells') 
//         && cells[redGhostPosition - 1].classList.contains('noGoZoneCells')
//         && !cells[redGhostPosition + 1].classList.contains('noGoZoneCells')) {
//         removeRedGhost()
//         redGhostPosition ++
//         console.log('> ++ happening?')
//         addRedGhost()
//         console.log('pm', pacmanPosition, 'rg', redGhostPosition)
//         return
//       } else if (redGhostPosition > pacmanPosition 
//         && cells[redGhostPosition - 20].classList.contains('noGoZoneCells') 
//         && cells[redGhostPosition - 1].classList.contains('noGoZoneCells')
//         && !cells[redGhostPosition + 20].classList.contains('noGoZoneCells')) {
//         removeRedGhost()
//         redGhostPosition + 20
//         console.log('> +20 happening?')
//         addRedGhost()
//         console.log('pm', pacmanPosition, 'rg', redGhostPosition)
//         return
//       } else if (redGhostY === pacmanY
//             && !cells[redGhostPosition - 1].classList.contains('noGoZoneCells')) {
//         removeRedGhost()
//         redGhostPosition --
//         console.log('> 0-20 -- happening?')
//         addRedGhost()
//         console.log('pm', pacmanPosition, 'rg', redGhostPosition)
//         return
//       } else if (redGhostY === pacmanY
//         && cells[redGhostPosition - 1].classList.contains('noGoZoneCells')
//         && !cells[redGhostPosition - 20].classList.contains('noGoZoneCells')) {
//         removeRedGhost()
//         redGhostPosition += 20
//         console.log('> 0-20 - 20 happening?')
//         addRedGhost()
//         console.log('pm', pacmanPosition, 'rg', redGhostPosition)
//         return
//       }
//     }

//   }, ghostSpeed)
// }
