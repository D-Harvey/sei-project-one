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
const wormholes = [278, 261]
const ghostTownEnter = 229
let superPoints = 0

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




let pacmanY = Math.floor(pacmanPosition / width)

let pacmanX = Math.floor(pacmanPosition % width)




const ghostDangerTimer = 30000
let lifeCells = []




let ghostSpeed = 500
const ghostDeadSpeed = 200



// DOM grabbing
const grid = document.querySelector('.game-grid') 
const showScore = document.querySelector('.score')
const showLives = document.querySelector('.totalLives')
const easyBtn = document.querySelector('.easy')
const mediumBtn = document.querySelector('.medium')
const hardBtn = document.querySelector('.hard')
const sound = document.querySelector('#audio')
const gameover = document.querySelector('.graphic')


// functions

// information window functions
let lives = 3
function buildingPacmanLivesDivsOnInfoScreen() {
  
  // console.log('lf 1', lifeCells)
  // for (let i = 0; i < lives; i++){
  //   const lifeCell = document.createElement('div')
  //   showLives.appendChild(lifeCell)
  //   lifeCells.push(lifeCell)
  //   // lifeCell.classList.add('lives')
  //   lifeCell.innerHTML = lives
  const lifeCell = document.querySelector('.livesLeft')
  lifeCell.innerText = lives
}

let score = 0
function showingScore() {
  showScore.innerText = score
  // if (score === 2330) {
  //   window.alert('You Win!!')
  //   return
  // }
}

// sound effect functions
function handleOpeningMusic () {
  sound.src = 'assets/sounds/pacman_beginning.wav'
  sound.play()
}

function handleInGameMusic () {
  sound.src = 'assets/sounds/pacman_chomp.wav'
  sound.play()
}

function handleDeathMusic () {
  sound.src = 'assets/sounds/pacman_death.wav'
  sound.play()
}

// game window functions
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
    wormholes.some(wormhole => {
      const block = wormhole.valueOf()
      if (i === block) {
        cell.classList.add('wormhole')
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

// in game functions
function startGame() {
  gameover.classList.remove('gameOver')
  gameover.classList.add('graphic')
  lives = 3
  removeGhost()
  removePacman()
  ghostPosition = [64, 75, 503, 517]
  pacmanPosition = 569
  buildingPacmanLivesDivsOnInfoScreen()
  addGhost()
  addPacman()
  document.addEventListener('keyup', handleKeyUp)
  for ( let i = 0; i < ghosts.length; i++) {  
    spookyMoving(i)
  }
}

function startGameAgain() {
  console.log('here')
  if (lives >= 1){
    console.log('here2')
    removeGhost()
    removePacman()
    ghostPosition = [64, 75, 503, 517]
    pacmanPosition = 569
    lives --
    buildingPacmanLivesDivsOnInfoScreen()
    addGhost()
    addPacman()
    document.addEventListener('keyup', handleKeyUp)
    for ( let i = 0; i < ghosts.length; i++) {  
      spookyMoving(i)
    }
  } else {
    gameover.classList.remove('graphic')
    gameover.classList.add('gameOver')
}
}

function easyLevel() {
  ghostSpeed = 1000
  startGame()
}
easyBtn.addEventListener('click', easyLevel)

function mediumLevel() {
  ghostSpeed = 200
  startGame()
}
mediumBtn.addEventListener('click', mediumLevel)

function hardLevel() {
  ghostSpeed = 100
  startGame()
}
hardBtn.addEventListener('click', hardLevel)

// ghost movement
function spookyMoving(i) {
  superPoints = 0
  removeEatableGhost(i)
  removeGhostEyes(i)
  const timerId = setInterval(() => {
    if (ghostPosition[0] === pacmanPosition
    || ghostPosition[1] === pacmanPosition
    || ghostPosition[2] === pacmanPosition
    || ghostPosition[3] === pacmanPosition
    ) {
      clearInterval(timerId)
      return pacmanIsDead()
    }
    else if (superPoints === 10 
    ) {
      pacmanEatingGhosts(i)
      clearInterval(timerId)
      return 
    } else if (ghostPosition[i] === 278) {
      removeGhost()
      ghostPosition[i] = 262
      addGhost()
    } else if (ghostPosition[i] === 261) {
      removeGhost()
      ghostPosition[i] = 277
      addGhost()
    }
    
    else {
      console.log('still in spooky')
      

      pacmanY = Math.floor(pacmanPosition / width)
      pacmanX = Math.floor(pacmanPosition % width)


      ghostY[i] = Math.floor(ghostPosition[i] / width)
      ghostX[i] = Math.floor(ghostPosition[i] % width)


      ghostDistanceY[i] = (Math.abs(ghostY[i] - pacmanY))
      ghostDistanceX[i] = (Math.abs(ghostX[i] - pacmanX)) 


      if (ghostDistanceX[i] >= ghostDistanceY[i]){
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
            // upThreeToBreakTrap(i)
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
            // downThreeToBreakTrap(i)
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
            // must be a border below, so let's go right
            removeGhost()
            ghostPosition[i] ++
            addGhost()
            return
          } else if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')) {
            // must be border below and to right, so let's go left 3 to break the trap
            // leftThreeToBreakTrap(i)
            return
          }
        } else if (pacmanPosition < ghostPosition[i]) {
          // move up
          if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')){
            // if no border above
            removeGhost()
            ghostPosition[i] -= 20
            addGhost()
            return
          } else if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')){
            // must be a border above, so let's go left
            removeGhost()
            ghostPosition[i] --
            addGhost()
            return
          } else if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')) {
            // must be border above and to left, so let's go right 3 to break the trap
            // rightThreeToBreakTrap(i)
            return
          }
        }
      }
    }
  }, ghostSpeed)
}

// function upThreeToBreakTrap(i) {
//   console.log('spookyindex17', i)
//   // console.log('up three to break trap')
//   if (
//     (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] - 40].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] - 60].classList.contains('noGoZoneCells'))
//     // || ghostY[i] > 4
    
//   ) {
//     for (let up = 0; up < breakLoop; up++) {
//       console.log('spookyindex18', i)
//       timerIdTwo = setInterval(() => {
//         removeGhost()
//         ghostPosition[i] -= 20
//         addGhost()
//       }, ghostSpeed)
//     }
//     spookyMoving(i)
//   } else if (!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] + 40].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] + 60].classList.contains('noGoZoneCells')){
//       console.log('spookyindex19', i)
//     // console.log('ESLE IF up three to break trap')
//     downThreeToBreakTrap(i)
//   }
// }

// function downThreeToBreakTrap(i) {
//   // console.log('down three to break trap')
//   if ((!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] + 40].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] + 60].classList.contains('noGoZoneCells'))
//   // || ghostY[i] < 25
//   ) {
//     for (let down = 0; down < breakLoop; down++) {
//       timerIdThree = setInterval(() => {
//         removeGhost()
//         ghostPosition[i] += 20
//         addGhost()
//       }, ghostSpeed)
//     }
//     spookyMoving(i)
//   } else if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] - 40].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] - 60].classList.contains('noGoZoneCells')){
//     console.log('ESLE IF down three to break trap')
//     upThreeToBreakTrap(i)
//   }
// }

// function leftThreeToBreakTrap(i) {
//   console.log('left three to break trap')
  
//   if ((!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] - 2].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] - 3].classList.contains('noGoZoneCells'))
//   // || ghostX[i] > 4
//   ) {
//     for (let left = 0; left < breakLoop; left++) {
//       timerIdFour = setInterval(() => {
//         removeGhost()
//         ghostPosition[i] -= 1
//         addGhost()
//       }, ghostSpeed)
//     }
//     spookyMoving(i)
//   } else if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] + 2].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] + 3].classList.contains('noGoZoneCells')) {
//     console.log('ESLE IF left three to break trap')
//     rightThreeToBreakTrap(i)
//   }
// }

// function rightThreeToBreakTrap(i) {
//   console.log('right three to break trap')
//   console.log('TIME')
//   if ((!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] + 2].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] + 3].classList.contains('noGoZoneCells'))
//   // || ghostX[i] < 15
//   ) {
//     for (let right = 0; right < breakLoop; right++) {
//       timerIdFive = setInterval(() => {
//         console.log('IN LOOP right three to break trap')
//         removeGhost()
//         ghostPosition[i] += 3
//         addGhost()
//       }, ghostSpeed)
//     }
//     spookyMoving(i)
//   } else if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] - 2].classList.contains('noGoZoneCells')
//     && !cells[ghostPosition[i] - 3].classList.contains('noGoZoneCells')) {
//     console.log('ESLE IF right three to break trap')
//     leftThreeToBreakTrap(i)
//   }
// }

function addGhost() {
  cells[ghostPosition[0]].classList.add('red-ghost')
  cells[ghostPosition[1]].classList.add('blue-ghost')
  cells[ghostPosition[2]].classList.add('pink-ghost')
  cells[ghostPosition[3]].classList.add('orange-ghost')
}

function removeGhost() {
  cells[ghostPosition[0]].classList.remove('red-ghost')
  cells[ghostPosition[1]].classList.remove('blue-ghost')
  cells[ghostPosition[2]].classList.remove('pink-ghost')
  cells[ghostPosition[3]].classList.remove('orange-ghost')
  // cells[ghostPosition[4]].classList.remove('hunter-ghost')
}

// pacman movements
function handleKeyUp(ev) {
  
  if (ghostPosition[0] === pacmanPosition
    || ghostPosition[1] === pacmanPosition
    || ghostPosition[2] === pacmanPosition
    || ghostPosition[3] === pacmanPosition
  ) {
    return
  } else if (pacmanPosition === 278) {
    removePacman()
    pacmanPosition = 262
    addPacman()
  } else if (pacmanPosition === 261) {
    removePacman()
    pacmanPosition = 277
    addPacman()
  } else {
    
    switch (ev.code) {
      case 'ArrowRight':
        if (!cells[pacmanPosition + 1].classList.contains('noGoZoneCells')) {
          removePacman()
          pacmanPosition++
          addPacman()
          pacmanEats()
        }
        break
      case  'ArrowLeft':
        if (!cells[pacmanPosition - 1].classList.contains('noGoZoneCells')) {
          removePacman()
          pacmanPosition--
          addPacmanLeft()
          pacmanEats()
        }
        break
      case 'ArrowDown':
        if (!cells[pacmanPosition + 20].classList.contains('noGoZoneCells')) {
          removePacman()
          pacmanPosition += 20
          addPacmanDown()
          pacmanEats()
        }
        break
      case 'ArrowUp': 
        if (!cells[pacmanPosition - 20].classList.contains('noGoZoneCells')) {
          removePacman()
          pacmanPosition -=  20
          addPacmanUp()
          pacmanEats()
        }
        break
    }
    
  }
}

function addPacman() {
  cells[pacmanPosition].classList.add('pacman')
}
function addPacmanLeft() {
  cells[pacmanPosition].classList.add('pacmanLeft')
}
function addPacmanUp() {
  cells[pacmanPosition].classList.add('pacmanUp')
}
function addPacmanDown() {
  cells[pacmanPosition].classList.add('pacmanDown')
}
function removePacman() {
  cells[pacmanPosition].classList.remove('pacman')
  cells[pacmanPosition].classList.remove('pacmanLeft')
  cells[pacmanPosition].classList.remove('pacmanUp')
  cells[pacmanPosition].classList.remove('pacmanDown')
}

function pacmanEats() {
  if (cells[pacmanPosition].classList.contains('pills')) {
    score += 10
    cells[pacmanPosition].classList.remove('pills')
    handleInGameMusic()
    showingScore()
  } else if (cells[pacmanPosition].classList.contains('super')) {
    score += 100
    superPoints = 10
    cells[pacmanPosition].classList.remove('super')
    removeGhost()
    // addEatableGhost()
    // pacmanEatingGhosts(i)
    showingScore()
  }
}

function pacmanIsDead() {
  handleDeathMusic()
  // lives --
  console.log(lives)
  startGameAgain()
  return
}

// pacman eating ghosts

function addEatableGhost(i) {
  cells[ghostPosition[i]].classList.add('eatable-ghost')
  // cells[ghostPosition[1]].classList.add('eatable-ghost')
  // cells[ghostPosition[2]].classList.add('eatable-ghost')
  // cells[ghostPosition[3]].classList.add('eatable-ghost')
  // cells[ghostPosition[4]].classList.add('hunter-ghost')
  // console.log('ghost position', ghostPosition)
}

function removeEatableGhost(i) {
  cells[ghostPosition[i]].classList.remove('eatable-ghost')
  // cells[ghostPosition[i]].classList.remove('eatable-ghost')
  // cells[ghostPosition[i]].classList.remove('eatable-ghost')
  // cells[ghostPosition[i]].classList.remove('eatable-ghost')
  // cells[ghostPosition[4]].classList.remove('hunter-ghost')
}


function pacmanEatingGhosts(i) {
  console.log('just into eating ghosts', i)
  // 30" timer for ghost eating
  removeGhost()
  console.log('eating ghosts')
  let ghostsec = 0
  const ghostEatingTimer = setInterval(() => {
    console.log('just into interval', i)
    console.log('ghost timer', ghostEatingTimer)
    cells[230].classList.remove('ghost-eyes')
    ghostsec ++
    if (ghostsec >= 30) {
      clearInterval(ghostEatingTimer)
      // console.log('in ticker')
      return spookyMoving(i)
    } 
    {console.log('gh sec', ghostsec)
      console.log('in ghost actions')
      if (ghostPosition[0] === pacmanPosition
    || ghostPosition[1] === pacmanPosition
    || ghostPosition[2] === pacmanPosition
    || ghostPosition[3] === pacmanPosition) {
        score += 500
        return ghostIsDead(i)
      } 
      // else {
      console.log('into else')
      ghostsec ++

      pacmanY = Math.floor(pacmanPosition / width)
      pacmanX = Math.floor(pacmanPosition % width)
      console.log('pm y', pacmanY)
      console.log('pm x', pacmanX)

      ghostY[i] = Math.floor(ghostPosition[i] / width)
      ghostX[i] = Math.floor(ghostPosition[i] % width)
      console.log('gh y', ghostY) 
      console.log('gh x', ghostX) 

      ghostDistanceY[i] = (Math.abs(ghostY[i] - pacmanY))
      ghostDistanceX[i] = (Math.abs(ghostX[i] - pacmanX)) 
      console.log('gh dis y', ghostDistanceY) 
      console.log('gh dis x', ghostDistanceX) 
      
      if (ghostDistanceX[i] <= ghostDistanceY[i]){
        console.log('here 1')
        // move horizontally
        if (pacmanPosition <= ghostPosition[i]) {
          // move right
          console.log('here 2')
          if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')) {
            console.log('here 3')
            // if no border to the right
            removeEatableGhost(i)
            ghostPosition[i] ++
            addEatableGhost(i)
            return
          }  if (!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')){
            // must be a border on the right, so let's go down
            removeEatableGhost(i)
            ghostPosition[i] += 20
            addEatableGhost(i)
            return
          } 
          else if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')) {
            // must be border below and to right, so let's go up 3 spaces to break the trap
            // upThreeToBreakTrap(i)
            return
          }
        } else if (pacmanPosition > ghostPosition[i]) {
          //  move left
          if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')){
            // if no border to the left
            removeEatableGhost(i)
            ghostPosition[i] --
            addEatableGhost(i)
            return
          } else if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')){
            // must be a border on the left, so let's go up
            removeEatableGhost(i)
            ghostPosition[i] -= 20
            addEatableGhost(i)
            return
          } else if (!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')) {
            // must be border above and to left, so let's go down 3 to break the trap
            // downThreeToBreakTrap(i)
            return
          }
        }
      } else if (ghostDistanceX[i] > ghostDistanceY[i]) {
        console.log('here 5')
        // move vertically
        if (pacmanPosition > ghostPosition[i]) {
          console.log('here 6')
          // move down
          if (!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')){
            console.log('here 7')
            // if no border below
            removeEatableGhost(i)
            ghostPosition[i] += 20
            addEatableGhost(i)
            return
          } else if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')){
            // console.log('here vert 4')
            // must be a border below, so let's go right
            removeEatableGhost(i)
            ghostPosition[i] ++
            addEatableGhost(i)
            return
          } else if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')) {
            // console.log('here vert 5')
            // must be border below and to right, so let's go left 3 to break the trap
            // leftThreeToBreakTrap(i)
            return
          }
        } else if (pacmanPosition > ghostPosition[i]) {
          // console.log('here vert 2')
          // move up
          if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')){
            // console.log('here vert 3')
            // if no border above
            removeEatableGhost(i)
            ghostPosition[i] -= 20
            addEatableGhost(i)
            return
          } else if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')){
            // console.log('here vert 4')
            // must be a border above, so let's go left
            removeEatableGhost(i)
            ghostPosition[i] --
            addEatableGhost(i)
            return
          } else if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')) {
            // console.log('here vert 5')
            // must be border above and to left, so let's go right 3 to break the trap
            // rightThreeToBreakTrap(i)
            return
          }
        }
      }
      // }
    }
    console.log('here too?')
  }, 1000)
}

function ghostIsDead(i) {
  if (ghostPosition[i] === pacmanPosition) {
    cells[ghostPosition[i]].classList.remove('eatable-ghost')
    cells[ghostPosition[i]].classList.add('ghost-eyes')
    ghostEyesGoToGhostTown(i)
  } 
}

function ghostEyesGoToGhostTown(i) {
  console.log('eyes', i)
  const ghostEyesTimer = setInterval(() => {
    
    if (ghostPosition[i] === ghostTownEnter) {
      cells[230].classList.remove('ghost-eyes')
      clearInterval(ghostEyesTimer)
      console.log('gets to ghoat town')
      
      // spookyMoving(i)
    }
    if (ghostPosition[i] < ghostTownEnter) {
      // move right
      if (!cells[ghostPosition[i] + 1].classList.contains('noGoZoneCells')) {
        // if no border to the right
        removeGhostEyes(i)
        ghostPosition[i] ++
        addGhostEyes(i)
        return
      } else if (!cells[ghostPosition[i] + 20].classList.contains('noGoZoneCells')){
        // must be a border on the right, so let's go down
        removeGhostEyes(i)
        ghostPosition[i] += 20
        addGhostEyes(i)
        return
      } else if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')) {
        // must be border below and to right, so let's go up 3 spaces to break the trap
        // upThreeToBreakTrap(i)
      }
    } else if (ghostPosition[i] > ghostTownEnter) {
      if (!cells[ghostPosition[i] - 1].classList.contains('noGoZoneCells')) {
        // if no border to the left
        removeGhostEyes(i)
        ghostPosition[i] --
        addGhostEyes(i)
        return
      } else if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')){
        // must be a border on the left, so let's go down
        removeGhostEyes(i)
        ghostPosition[i] -= 20
        addGhostEyes(i)
        return
      } else if (!cells[ghostPosition[i] - 20].classList.contains('noGoZoneCells')) {
        // must be border below and to right, so let's go up 3 spaces to break the trap
        // upThreeToBreakTrap(i)
      }
    }
  }, ghostDeadSpeed)

}

function addGhostEyes(i) {
  cells[ghostPosition[i]].classList.add('ghost-eyes')
  // cells[ghostPosition[1]].classList.add('eatable-ghost')
  // cells[ghostPosition[2]].classList.add('eatable-ghost')
  // cells[ghostPosition[3]].classList.add('eatable-ghost')
  // cells[ghostPosition[4]].classList.add('hunter-ghost')
  // console.log('ghost position', ghostPosition)
}

function removeGhostEyes(i) {
  cells[ghostPosition[i]].classList.remove('ghost-eyes')
  cells[230].classList.remove('ghost-eyes')
  // cells[ghostPosition[1]].classList.remove('eatable-ghost')
  // cells[ghostPosition[2]].classList.remove('eatable-ghost')
  // cells[ghostPosition[3]].classList.remove('eatable-ghost')
  // cells[ghostPosition[4]].classList.remove('hunter-ghost')
}

// START GAME
buildTheGameGrid()
// handleOpeningMusic()
showingScore()
buildingPacmanLivesDivsOnInfoScreen()








