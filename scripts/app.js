// building the game grid variables
const width = 20
const height = 30
const gameGrid = width * height
const cells = []

// this may look epically ridiculous, but was actually pretty quite using excel and a bit of copy and pasting.  As the board doesn't change size, I thought it was worth just getting these down so I can manage the different areas with a higher degree of control.
const noGoZoneCells = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,520,540,560,39,59,79,99,119,139,159,179,199,219,239,259,279,299,319,339,359,379,399,419,439,459,479,499,519,539,559,579,42,43,45,46,47,49,51,52,53,54,56,57,29,62,63,65,66,67,69,71,72,73,74,76,77,82,83,85,86,87,89,91,92,93,94,96,97,122,123,125,127,128,129,130,131,132,134,136,137,142,143,145,147,148,149,150,151,152,154,156,157,165,169,174,181,182,183,185,186,187,189,191,192,193,194,196,197,198,201,202,203,205,206,207,209,211,212,213,214,216,217,218,221,222,223,225,234,236,237,238,241,242,243,245,254,256,257,258,281,282,283,285,294,296,297,298,301,302,303,305,314,316,317,318,321,322,323,325,334,336,337,338,341,342,343,345,347,348,349,350,351,352,354,356,357,358,361,362,363,365,367,368,369,370,371,372,374,376,377,378,389,390,402,403,405,406,407,409,410,412,413,414,416,417,422,423,425,426,427,429,430,432,433,434,436,437,443,456,461,463,465,467,468,469,470,471,472,474,476,478,481,483,485,487,488,489,490,491,492,494,496,498,505,509,514,522,523,524,525,526,527,529,531,532,533,534,535,536,537,542,543,544,545,546,547,549,551,552,553,554,555,556,557,247,248,249,250,251,252,267,268,269,270,271,272,287,288,289,290,291,292,307,308,309,310,311,312]
const ghostTownCells = [247,248,249,250,251,252,267,268,269,270,271,272,287,288,289,290,291,292,307,308,309,310,311,312]
const pills = [21,22,23,24,25,26,27,28,30,31,32,33,34,35,36,37,38,41,44,48,50,55,58,121,124,126,133,135,138,64,68,70,75,81,84,88,90,95,98,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,141,144,146,153,155,158,161,162,163,164,166,167,168,170,171,172,173,175,176,177,178,184,204,224,244,264,284,304,324,344,364,195,215,235,255,275,295,315,335,355,375,381,382,383,384,385,386,387,388,391,392,393,394,395,396,397,398,401,404,408,411,415,418,421,424,428,431,435,438,442,444,445,446,447,448,449,450,451,452,453,454,455,457,462,464,466,473,475,477,482,484,486,493,495,497,501,502,503,504,506,507,508,510,511,512,513,515,516,517,518,521,528,530,538,541,548,550,558,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578]
const superpills = [61, 78, 441, 458]
const ghostBoundary = [263, 264, 266, 273, 274, 275, 229, 109, 329, 449, 569]
const ghostTownEnter = 229


const ghosts = ['red', 'blue', 'pink', 'orange']
let ghostPosition = [64, 75, 503, 517]
// const ghostYBoundary = [14, 14, 14, 14]
// const ghostXBoundary = [9, 9, 9, 9]
const ghostY = [null, null, null, null]
const ghostX = [null, null, null, null]
const ghostDistanceX = [null, null, null, null]
const ghostDistanceY = [null, null, null, null]
const breakLoop = 3
let pacmanPosition = 569


let timerId = null
let timerIdTwo = null
let timerIdThree = null
let timerIdFour = null
let timerIdFive = null
let ghostEatingTimer = null
const ghostDangerTimer = 30000
const lifeCells = []

const ghostSpeed = 2000
let lives = 3
let score = 0


// DOM grabbing
const grid = document.querySelector('.game-grid') 
const showScore = document.querySelector('.score')
const showLives = document.querySelector('.totalLives')
const startBtn = document.querySelector('.startBtn')


// functions

function pacmanLives() {
  for (let i = 0; i < lives; i++){
    const lifeCell = document.createElement('div')
    showLives.appendChild(lifeCell)
    lifeCells.push(lifeCell)
    // lifeCell.classList.add('lives')
    lifeCell.innerHTML = lives
  }
}


function startGame() {

  console.log('live', lives)
  removeGhost()
  removePacman()
  ghostPosition = [64, 75, 503, 517]
  pacmanPosition = 569
  clearInterval(timerId)
  timerId = null
  timerIdTwo = null
  pacmanLives()
  addGhost()
  addPacman()
  document.addEventListener('keyup', handleKeyUp)
  for ( let i = 0; i < ghosts.length; i++) {  
    // ghostMovement(i)
    spookyMoving(i)
  }
}
startBtn.addEventListener('click', startGame)

function spookyMoving(i) {
  clearInterval(ghostEatingTimer)
  timerId = setInterval(() => {
    if (ghostPosition[0] === pacmanPosition
    || ghostPosition[1] === pacmanPosition
    || ghostPosition[2] === pacmanPosition
    || ghostPosition[3] === pacmanPosition) {
      pacmanIsDead()
    } else {
      const pacmanY = Math.floor(pacmanPosition / width)
      ghostY[i] = Math.floor(ghostPosition[i] / width)
      const pacmanX = Math.floor(pacmanPosition % width)
      ghostX[i] = Math.floor(ghostPosition[i] % width)
      console.log('pm x ', pacmanX, 'pm y ', pacmanY)
      console.log('gh x ', ghostX, 'gh y ', ghostY)

      ghostDistanceX[i] = (Math.abs(ghostX[i] - pacmanX)) 
      ghostDistanceY[i] = (Math.abs(ghostY[i] - pacmanY))

      console.log('ghostDistanceX', ghostDistanceX, 'ghostDistanceY', ghostDistanceY)

      if (ghostDistanceX[i] >= ghostDistanceY[i]){
        console.log('here 1')
        // move horizontally
        if (pacmanPosition >= ghostPosition[i]) {
          // move right
          if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')) {
            // if no border to the right
            removeGhost()
            ghostPosition[i] ++
            addGhost()
            return
          } else if (!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')){
            // must be a border on the right, so let's go down
            removeGhost()
            ghostPosition[i] += 20
            addGhost()
            return
          } else if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')) {
            // must be border below and to right, so let's go up 3 spaces to break the trap
            upThreeToBreakTrap(i)
            return
          }
        } else if (pacmanPosition < ghostPosition[i]) {
          //  move left
          if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')){
            // if no border to the left
            removeGhost()
            ghostPosition[i] --
            addGhost()
            return
          } else if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')){
            // must be a border on the left, so let's go up
            removeGhost()
            ghostPosition[i] -= 20
            addGhost()
            return
          } else if (!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')) {
            // must be border above and to left, so let's go down 3 to break the trap
            downThreeToBreakTrap(i)
            return
          }
        }
      } else if (ghostDistanceX[i] < ghostDistanceY[i]) {
        // move vertically
        if (pacmanPosition > ghostPosition[i]) {
          // move down
          if (!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')){
            // if no border below
            removeGhost()
            ghostPosition[i] += 20
            addGhost()
            return
          } else if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')){
            console.log('here vert 4')
            // must be a border below, so let's go right
            removeGhost()
            ghostPosition[i] ++
            addGhost()
            return
          } else if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')) {
            console.log('here vert 5')
            // must be border below and to right, so let's go left 3 to break the trap
            leftThreeToBreakTrap(i)
            return
          }
        } else if (pacmanPosition < ghostPosition[i]) {
          console.log('here vert 2')
          // move up
          if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')){
            console.log('here vert 3')
            // if no border above
            removeGhost()
            ghostPosition[i] -= 20
            addGhost()
            return
          } else if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')){
            console.log('here vert 4')
            // must be a border above, so let's go left
            removeGhost()
            ghostPosition[i] --
            addGhost()
            return
          } else if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')) {
            console.log('here vert 5')
            // must be border above and to left, so let's go right 3 to break the trap
            rightThreeToBreakTrap(i)
            return
          }
        }
      }
    }
  }, ghostSpeed)
}

// function pacmanEatingGhosts(i) {
//   // 30" timer for ghost eating
//   ghostEatingTimer = timerId = setInterval(() => {
//     timerId = setInterval(() => {
//       if (ghostPosition[0] === pacmanPosition
//     || ghostPosition[1] === pacmanPosition
//     || ghostPosition[2] === pacmanPosition
//     || ghostPosition[3] === pacmanPosition) {
//         ghostIsDead(i)
//       } else {
//         const pacmanY = Math.floor(pacmanPosition / width)
//         ghostY[i] = Math.floor(ghostPosition[i] / width)
//         const pacmanX = Math.floor(pacmanPosition % width)
//         ghostX[i] = Math.floor(ghostPosition[i] % width)
//         console.log('pm x ', pacmanX, 'pm y ', pacmanY)
//         console.log('gh x ', ghostX, 'gh y ', ghostY)

//         ghostDistanceX[i] = (Math.abs(ghostX[i] - pacmanX)) 
//         ghostDistanceY[i] = (Math.abs(ghostY[i] - pacmanY))

//         console.log('ghostDistanceX', ghostDistanceX, 'ghostDistanceY', ghostDistanceY)

//         if (ghostDistanceX[i] <= ghostDistanceY[i]){
//           console.log('here 1')
//           // move horizontally
//           if (pacmanPosition <= ghostPosition[i]) {
//           // move right
//             if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')) {
//             // if no border to the right
//               removeEatableGhost()
//               ghostPosition[i] ++
//               addEatableGhost()
//               return
//             } else if (!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')){
//             // must be a border on the right, so let's go down
//               removeEatableGhost()
//               ghostPosition[i] += 20
//               addEatableGhost()
//               return
//             } else if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')) {
//             // must be border below and to right, so let's go up 3 spaces to break the trap
//               upThreeToBreakTrap(i)
//               return
//             }
//           } else if (pacmanPosition > ghostPosition[i]) {
//           //  move left
//             if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')){
//             // if no border to the left
//               removeEatableGhost()
//               ghostPosition[i] --
//               addEatableGhost()
//               return
//             } else if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')){
//             // must be a border on the left, so let's go up
//               removeEatableGhost()
//               ghostPosition[i] -= 20
//               addEatableGhost()
//               return
//             } else if (!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')) {
//             // must be border above and to left, so let's go down 3 to break the trap
//               downThreeToBreakTrap(i)
//               return
//             }
//           }
//         } else if (ghostDistanceX[i] > ghostDistanceY[i]) {
//         // move vertically
//           if (pacmanPosition > ghostPosition[i]) {
//           // move down
//             if (!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')){
//             // if no border below
//               removeEatableGhost()
//               ghostPosition[i] += 20
//               addEatableGhost()
//               return
//             } else if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')){
//               console.log('here vert 4')
//               // must be a border below, so let's go right
//               removeEatableGhost()
//               ghostPosition[i] ++
//               addEatableGhost()
//               return
//             } else if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')) {
//               console.log('here vert 5')
//               // must be border below and to right, so let's go left 3 to break the trap
//               leftThreeToBreakTrap(i)
//               return
//             }
//           } else if (pacmanPosition > ghostPosition[i]) {
//             console.log('here vert 2')
//             // move up
//             if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')){
//               console.log('here vert 3')
//               // if no border above
//               removeEatableGhost()
//               ghostPosition[i] -= 20
//               addEatableGhost()
//               return
//             } else if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')){
//               console.log('here vert 4')
//               // must be a border above, so let's go left
//               removeEatableGhost()
//               ghostPosition[i] --
//               addEatableGhost()
//               return
//             } else if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')) {
//               console.log('here vert 5')
//               // must be border above and to left, so let's go right 3 to break the trap
//               rightThreeToBreakTrap(i)
//               return
//             }
//           }
//         }
//       }
//     }, ghostSpeed)
//   }, ghostDangerTimer)
// }

// function ghostIsDead() {
//   if (ghostPosition[0] === pacmanPosition) {
//     ghostPosition[0].classList.remove('eatable-ghost')
//     ghostPosition[0].classList.remove('ghost-eyes')
//     ghostEyesGoToGhostTown()
//   } else if (ghostPosition[1] === pacmanPosition) {
//     ghostPosition[1].classList.remove('eatable-ghost')
//     ghostPosition[1].classList.remove('ghost-eyes')
//     ghostEyesGoToGhostTown()
//   } else if (ghostPosition[2] === pacmanPosition) {
//     ghostPosition[2].classList.remove('eatable-ghost')
//     ghostPosition[2].classList.remove('ghost-eyes')
//     ghostEyesGoToGhostTown()
//   } else if (ghostPosition[3] === pacmanPosition) {
//     ghostPosition[3].classList.remove('eatable-ghost')
//     ghostPosition[3].classList.remove('ghost-eyes')
//     ghostEyesGoToGhostTown()
//   }
// }

// function ghostEyesGoToGhostTown() {
// if (ghostPosition[i] > ghostTownEnter) {

// }

// }

function upThreeToBreakTrap(i) {
  console.log('up three to break trap')
  if ((!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] - 40].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] - 60].classList.contains('noGoZoneCells'))
    && ghostY[i] > 4) {
    for (let up = 0; up < breakLoop; up++) {
      timerIdTwo = setInterval(() => {
        removeGhost()
        ghostPosition[i] -= 20
        addGhost()
      }, ghostSpeed)
    }
  } else if (!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] + 40].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] + 60].classList.contains('noGoZoneCells')){
    console.log('ESLE IF up three to break trap')
    downThreeToBreakTrap(i)
  }
}

function downThreeToBreakTrap(i) {
  console.log('down three to break trap')
  if ((!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] + 40].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] + 60].classList.contains('noGoZoneCells'))
    && ghostY[i] < 25) {
    for (let down = 0; down < breakLoop; down++) {
      timerIdThree = setInterval(() => {
        removeGhost()
        ghostPosition[i] += 20
        addGhost()
      }, ghostSpeed)
    }
  } else if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] - 40].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] - 60].classList.contains('noGoZoneCells')){
    console.log('ESLE IF down three to break trap')
    upThreeToBreakTrap(i)
  }
}

function leftThreeToBreakTrap(i) {
  console.log('left three to break trap')
  
  if ((!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] - 2].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] - 3].classList.contains('noGoZoneCells'))
    && ghostX[i] > 4) {
    for (let left = 0; left < breakLoop; left++) {
      timerIdFour = setInterval(() => {
        removeGhost()
        ghostPosition[i] -= 1
        addGhost()
      }, ghostSpeed)
    }
  } else if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] + 2].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] + 3].classList.contains('noGoZoneCells')) {
    console.log('ESLE IF left three to break trap')
    rightThreeToBreakTrap(i)
  }
}

function rightThreeToBreakTrap(i) {
  console.log('right three to break trap')
  console.log('TIME')
  if ((!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] + 2].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] + 3].classList.contains('noGoZoneCells'))
    && ghostX < 15) {
    for (let right = 0; right < breakLoop; right++) {
      timerIdFive = setInterval(() => {
        console.log('IN LOOP right three to break trap')
        removeGhost()
        ghostPosition[i] += 3
        addGhost()
      }, ghostSpeed)
    }
  } else if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] - 2].classList.contains('noGoZoneCells')
    && !cells[ghostPosition[i] - 3].classList.contains('noGoZoneCells')) {
    console.log('ESLE IF right three to break trap')
    leftThreeToBreakTrap(i)
  }
}

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
    pills.some(pill => {
      const block = pill.valueOf()
      if (i === block) {
        cell.classList.add('pills')
      } 
    }) 
    superpills.some(pill => {
      const block = pill.valueOf()
      if (i === block) {
        cell.classList.add('super')
      } 
    }) 
    // ghostBoundary.some(bound => {
    //   const block = bound.valueOf()
    //   if (i === block) {
    //     cell.classList.add('boundary')
    //   } 
    // }) 
  }
}

function addPacman() {
  cells[pacmanPosition].classList.add('pacman')
}

function removePacman() {
  cells[pacmanPosition].classList.remove('pacman')
}

function handleKeyUp(ev) {
  console.log(score)
  if (ghostPosition[0] === pacmanPosition
    || ghostPosition[1] === pacmanPosition
    || ghostPosition[2] === pacmanPosition
    || ghostPosition[3] === pacmanPosition) {
    console.log('score', score, 'lives', lives)
    return
  } else {
    removePacman()
    switch (ev.code) {
      case 'ArrowRight':
        if (!cells[pacmanPosition + 1].classList.contains('noGoZoneCells')) {
          pacmanPosition++
          pacmanEats()
        }
        break
      case  'ArrowLeft':
        if (!cells[pacmanPosition - 1].classList.contains('noGoZoneCells')) {
          pacmanPosition--
          pacmanEats()
        }
        break
      case 'ArrowDown':
        if (!cells[pacmanPosition + 20].classList.contains('noGoZoneCells')) {
          pacmanPosition += 20
          pacmanEats()
        }
        break
      case 'ArrowUp': 
        if (!cells[pacmanPosition - 20].classList.contains('noGoZoneCells')) {
          pacmanPosition -=  20
          pacmanEats()
        }
        break
    }
    addPacman()
  }
}

function pacmanEats() {
  if (cells[pacmanPosition].classList.contains('pills')) {
    score += 10
    cells[pacmanPosition].classList.remove('pills')
    showingScore()
  } else if (cells[pacmanPosition].classList.contains('super')) {
    score += 100
    cells[pacmanPosition].classList.remove('super')
    // pacmanEatingGhosts()
    showingScore()
  }
}

function pacmanIsDead() {
  timerId = null
  clearInterval(timerId)
  clearInterval(timerIdTwo)
  lives --
  return
}

function addGhost() {
  cells[ghostPosition[0]].classList.add('red-ghost')
  cells[ghostPosition[1]].classList.add('blue-ghost')
  cells[ghostPosition[2]].classList.add('pink-ghost')
  cells[ghostPosition[3]].classList.add('orange-ghost')
  // cells[ghostPosition[4]].classList.add('hunter-ghost')
  console.log('ghost position', ghostPosition)
}

function removeGhost() {
  cells[ghostPosition[0]].classList.remove('red-ghost')
  cells[ghostPosition[1]].classList.remove('blue-ghost')
  cells[ghostPosition[2]].classList.remove('pink-ghost')
  cells[ghostPosition[3]].classList.remove('orange-ghost')
  // cells[ghostPosition[4]].classList.remove('hunter-ghost')
}

// function addEatableGhost() {
//   cells[ghostPosition[0]].classList.add('eatable-ghost')
//   cells[ghostPosition[1]].classList.add('eatable-ghost')
//   cells[ghostPosition[2]].classList.add('eatable-ghost')
//   cells[ghostPosition[3]].classList.add('eatable-ghost')
//   // cells[ghostPosition[4]].classList.add('hunter-ghost')
//   console.log('ghost position', ghostPosition)
// }

// function removeEatableGhost() {
//   cells[ghostPosition[0]].classList.remove('eatable-ghost')
//   cells[ghostPosition[1]].classList.remove('eatable-ghost')
//   cells[ghostPosition[2]].classList.remove('eatable-ghost')
//   cells[ghostPosition[3]].classList.remove('eatable-ghost')
//   // cells[ghostPosition[4]].classList.remove('hunter-ghost')
// }

function showingScore() {
  showScore.innerText = score
  if (score === 2330) {
    window.alert('You Win!!')
    return
  }
}

// event handling



buildTheGameGrid()










// function ghostMovement(i) {
//   console.log('ghost index', i)
//   clearInterval(timerIdTwo)
//   timerId = setInterval(() => {
//     if (ghostPosition[0] === pacmanPosition
//       || ghostPosition[1] === pacmanPosition
//       || ghostPosition[2] === pacmanPosition
//       || ghostPosition[3] === pacmanPosition) {
//       pacmanIsDead()
//     } else {
//       const pacmanY = Math.floor(pacmanPosition / width)
//       ghostY[i] = Math.floor(ghostPosition[i] / width)
//       const pacmanX = Math.floor(pacmanPosition % width)
//       ghostX[i] = Math.floor(ghostPosition[i] % width)
//       console.log('pm x ', pacmanX, 'pm y ', pacmanY)
//       console.log('gh x ', ghostX, 'gh y ', ghostY)
//       console.log(ghostPosition)
      
//       // chasing up and left 
//       if ((ghostY[i] > pacmanY) 
//       && !cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')
//       && !cells[ghostPosition[i] - 20].classList.contains('boundary')) {
//         removeGhost()
//         ghostPosition[i] -= 20
//         addGhost()
//         return
//       } else if ((ghostY[i] > pacmanY)
//         && cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells') 
//         && !cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')
//         && !cells[ghostPosition[i] - 1].classList.contains('boundary')) {
//         removeGhost()
//         ghostPosition[i] --
//         addGhost()
//         return
//       } else if (ghostY[i] > pacmanY 
//         && cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells') 
//         && cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')
//         && !cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')
//         && !cells[ghostPosition[i] + 1].classList.contains('boundary')
//         && ghostY[i] !== 1) {
//         keepGoingRightUntilUp(i)
//         return
//       } else if (ghostPosition[i] > pacmanPosition 
//         && cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells') 
//         && cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')
//         && ghostY[i] === 1) {
//         keepGoingDownUntilLeft(i)
//         return
//       } else if (ghostY[i] === pacmanY
//             && ghostPosition[i] > pacmanPosition
//             && !cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')
//             && !cells[ghostPosition[i] - 1].classList.contains('boundary')) {
//         removeGhost()
//         ghostPosition[i] --
//         addGhost()
//         return
//       } else if (ghostY[i] === pacmanY
//         && ghostPosition[i] > pacmanPosition
//         && cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')) {
//         console.log('here??', i)
//         keepGoingDownUntilLeft(i)
//         return
//       } 
//       // chasing down and right
//       else if ((ghostY[i] < pacmanY) 
//       && !cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')
//       && !cells[ghostPosition[i] + 20].classList.contains('boundary')) {
//         removeGhost()
//         ghostPosition[i] += 20
//         addGhost()
//         return
//       } else if ((ghostY[i] < pacmanY)
//         && cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells') 
//         && !cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')
//         && !cells[ghostPosition[i] + 1].classList.contains('boundary')) {
//         removeGhost()
//         ghostPosition[i] ++
//         addGhost()
//         return
//       } else if (ghostY[i] < pacmanY 
//         && cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells') 
//         && cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')
//         && !cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')
//         && !cells[ghostPosition[i] - 1].classList.contains('boundary')
//         && ghostY[i] !== 1) {
//         keepGoingLeftUntilDown(i)
//         return
//       } else if (ghostPosition[i] < pacmanPosition 
//         && cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells') 
//         && cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')
//         && ghostY[i] === 1) {
//         keepGoingUpUntilRight(i)
//         return
//       } else if (ghostY[i] === pacmanY
//             && ghostPosition[i] < pacmanPosition
//             && !cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')
//             && !cells[ghostPosition[i] + 1].classList.contains('boundary')) {
//         removeGhost()
//         ghostPosition[i] ++
//         addGhost()
//         return
//       } else if (ghostY[i] === pacmanY
//         && ghostPosition[i] < pacmanPosition
//         && cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')) {
//         keepGoingUpUntilRight(i)
//         return
//       } else if (ghostPosition[i] < pacmanPosition 
//         && (ghostX[i] - pacmanX) < 20
//         && cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')) {
//         removeGhost()
//         ghostPosition[i] --
//         addGhost()
//       } 
//     }
//   }, ghostSpeed)
// }

// function keepGoingRightUntilUp(i) {
//   clearInterval(timerIdTwo)
//   timerIdTwo = setInterval(() => {
//     if (ghostPosition[i] > pacmanPosition 
//       && !cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')
//       && !cells[ghostPosition[i] + 1].classList.contains('boundary')
//       && cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')) {
//       removeGhost()
//       ghostPosition[i] ++
//       addGhost()
//     } else if (ghostPosition[i] > pacmanPosition 
//       && !cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')
//       && !cells[ghostPosition[i] - 20].classList.contains('boundary')){
//       ghostMovement()
//     }
//   }, ghostSpeed)
// }

// function keepGoingDownUntilLeft(i) {
//   clearInterval(timerIdTwo)
//   timerIdTwo = setInterval(() => {
//     if (ghostPosition[i] > pacmanPosition 
//       && !cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')
//       && !cells[ghostPosition[i] + 20].classList.contains('boundary')
//       && cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')) {
//       removeGhost()
//       ghostPosition[i] += 20
//       addGhost()
//     } else if (ghostPosition[i] > pacmanPosition 
//       && !cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')
//       && !cells[ghostPosition[i] - 1].classList.contains('boundary')){
//       removeGhost()
//       ghostPosition[i] --
//       addGhost()
//       ghostMovement()
//     }
//   }, ghostSpeed)
// }

// function keepGoingLeftUntilDown(i) {
//   clearInterval(timerIdTwo)
//   timerIdTwo = setInterval(() => {
//     if (ghostPosition[i] < pacmanPosition 
//       && !cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')
//       && !cells[ghostPosition[i] - 1].classList.contains('boundary')
//       && cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')) {
//       removeGhost()
//       ghostPosition[i] --
//       addGhost()
//     } else if (ghostPosition[i] < pacmanPosition 
//       && !cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')
//       && !cells[ghostPosition[i] + 20].classList.contains('boundary')){
//       ghostMovement()
//     }
//   }, ghostSpeed)
// }

// function keepGoingUpUntilRight(i) {
//   clearInterval(timerIdTwo)
//   timerIdTwo = setInterval(() => {
//     if (ghostPosition[i] < pacmanPosition 
//       && !cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')
//       && !cells[ghostPosition[i] - 20].classList.contains('boundary')
//       && cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')) {
//       removeGhost()
//       ghostPosition[i] -= 20
//       addGhost()
//     } else if (ghostPosition[i] < pacmanPosition 
//       && !cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')
//       && !cells[ghostPosition[i] + 1].classList.contains('boundary')){
//       removeGhost()
//       ghostPosition[i] ++
//       addGhost()
//       ghostMovement()
//     }
//   }, ghostSpeed)
// }












