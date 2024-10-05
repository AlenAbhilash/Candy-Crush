import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import blue from './assets/images/b.png'
import green from './assets/images/g.png'
import orange from './assets/images/o.png'
import pruple from './assets/images/p.png'
import red from './assets/images/r.png'
import yellow from './assets/images/y.png'
import balnk from './assets/images/bl.png'
import ScoreBoard from './components/score'

function App() {
  const width = 8
  const CandyColor = [blue, green, red, orange, yellow, pruple]

  const [currentColor, sertCurrentColorArrange] = useState([])
  const [squareBeignDragged, setsquareBeignDragged] = useState(null)
  const [squareBeignRPlaced, setsquareBeignRPlaced] = useState(null)
  const [scoreDispaly, setscoreDispaly] = useState(0)

  const checkForColoumofThree = () => {
    for (let i = 0; i <= 47; i++) {
      const coloumofThree = [i, i + width, i + width * 2]
      const decideColor = currentColor[i]
      const isbalnk = currentColor[i] === balnk
      if (coloumofThree.every(square => currentColor[square] === decideColor && currentColor[square] !== balnk)) {
        setscoreDispaly((score) => score + 3)
        coloumofThree.forEach(square => currentColor[square] = balnk)
        return true
      }
    }
  }

  const checkForRowofThree = () => {
    for (let i = 0; i < 64; i++) {
      const RowfThree = [i, i + 1, i + 2]
      const decideColor = currentColor[i]
      const isbalnk = currentColor[i] === balnk
      const notvaild = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      if (notvaild.includes(i)) continue

      if (RowfThree.every(square => currentColor[square] === decideColor && currentColor[square] !== balnk)) {
        setscoreDispaly((score) => score + 3)
        RowfThree.forEach(square => currentColor[square] = balnk)
        return true
      }
    }
  }

  const checkForRowofFour = () => {
    for (let i = 0; i < 64; i++) {
      const RowfFour = [i, i + 1, i + 2, i + 3]
      const decideColor = currentColor[i]
      const isbalnk = currentColor[i] === balnk
      const notvaild = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      if (notvaild.includes(i)) continue

      if (RowfFour.every(square => currentColor[square] === decideColor && currentColor[square] !== balnk)) {
        setscoreDispaly((score) => score + 4)
        RowfFour.forEach(square => currentColor[square] = balnk)
        return true
      }
    }
  }

  const checkForColoumofFour = () => {
    for (let i = 0; i <= 39; i++) {
      const coloumofFour = [i, i + width, i + width * 2, i + width * 3]
      const decideColor = currentColor[i]
      const isbalnk = currentColor[i] === balnk
      if (coloumofFour.every(square => currentColor[square] === decideColor && currentColor[square] !== balnk)) {
        setscoreDispaly((score) => score + 4)
        coloumofFour.forEach(square => currentColor[square] = balnk)
        return true
      }
    }
  }

  const moveintoSquareBewlo = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstWRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isfirstRow = firstWRow.includes(i)

      if (isfirstRow && currentColor[i] === balnk) {
        let randomcolor = Math.floor(Math.random() * CandyColor.length)
        currentColor[i] = CandyColor[randomcolor]
      }
      if ((currentColor[i + width]) === balnk) {
        currentColor[i + width] = currentColor[i]
        currentColor[i] = balnk
      }
    }
  }

  const DragStart = (e) => {
    setsquareBeignDragged(e.target)
  }
  const DragDrop = (e) => {
    setsquareBeignRPlaced(e.target)
  }
  const DragEnd = () => {
    const squareBeingDraggedid = parseInt(squareBeignDragged.getAttribute('data-id'))
    const squareBeingReplaceid = parseInt(squareBeignRPlaced.getAttribute('data-id'))
    currentColor[squareBeingReplaceid] = squareBeignDragged.getAttribute('src')
    currentColor[squareBeingDraggedid] = squareBeignRPlaced.getAttribute('src')

    const validMoves = [
      squareBeingReplaceid - 1,
      squareBeingDraggedid - width,
      squareBeingDraggedid + 1,
      squareBeignDragged + width
    ]
    const vaildMove = validMoves.includes(squareBeingReplaceid)
    const isARowoffour = checkForColoumofFour()
    const isAcolmoffour = checkForRowofFour()
    const isARowofthree = checkForColoumofThree()
    const isAcolumofThree = checkForRowofThree()
    if (squareBeingReplaceid && vaildMove && (isARowoffour || isAcolmoffour || isARowofthree || isAcolumofThree)) {
      setsquareBeignDragged(null)
      setsquareBeignRPlaced(null)
    } else {
      currentColor[squareBeingReplaceid] = squareBeignRPlaced.getAttribute('src')
      currentColor[squareBeingDraggedid] = squareBeignDragged.getAttribute('src')
      sertCurrentColorArrange([...currentColor])
    }
  }

  const createBoard = () => {
    const randomColorArragment = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = CandyColor[Math.floor(Math.random() * CandyColor.length)]
      randomColorArragment.push(randomColor)
    }
    sertCurrentColorArrange(randomColorArragment)
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColoumofFour()
      checkForRowofFour()
      checkForColoumofThree()
      checkForRowofThree()
      moveintoSquareBewlo()
      sertCurrentColorArrange([...currentColor])
    }, 100)
    return () => clearInterval(timer)
  }, [checkForColoumofFour, checkForRowofFour, checkForColoumofThree, checkForRowofThree, moveintoSquareBewlo, currentColor])

  return (
    <>
      <div className='text-center justify-content-center align-items-center d-flex'>
        <ScoreBoard score={scoreDispaly} />
      </div>
      <div className='app'>
        <div className='game'>
          {currentColor.map((candyColor, index) => (
            <img src={candyColor} alt="" key={index}
              data-id={index} draggable={true} onDragOver={(e) => e.preventDefault()}
              onDragStart={DragStart}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={DragDrop}
              onDragEnd={DragEnd}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
