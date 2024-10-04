import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const width = 8
  const CandyColor = ['blue', 'green', 'red', 'orange', 'yellow', 'purple']

  const [currentColor, sertCurrentColorArrange] = useState([])

  const checkForColoumofThree = () => {
    for (let i = 0; i <=47; i++) {
      const coloumofThree = [i, i + width, i + width * 2]
      const decideColor = currentColor[i]
      if (coloumofThree.every(square => currentColor[square] == decideColor)) {
        coloumofThree.forEach(square => currentColor[square] = '')

      }
    }
  }

  const checkForRowofThree = () => {
    for (let i = 0; i < 64; i++) {
      const RowfThree = [i, i + 1, i + 2]
      const decideColor = currentColor[i]
      const notvaild = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      if (notvaild.includes(i)) continue

      if (RowfThree.every(square => currentColor[square] == decideColor)) {
        RowfThree.forEach(square => currentColor[square] = '')

      }
    }
  }

  const checkForRowofFour = () => {
    for (let i = 0; i < 64; i++) {
      const RowfFour = [i, i + 1, i + 2, i + 3]
      const decideColor = currentColor[i]
      const notvaild = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      if (notvaild.includes(i)) continue

      if (RowfFour.every(square => currentColor[square] == decideColor)) {
        RowfFour.forEach(square => currentColor[square] = '')

      }
    }
  }


  const checkForColoumofFour = () => {
    for (let i = 0; i <= 39; i++) {
      const coloumofFour = [i, i + width, i + width * 2, i + width * 3]
      const decideColor = currentColor[i]
      if (coloumofFour.every(square => currentColor[square] == decideColor)) {
        coloumofFour.forEach(square => currentColor[square] = '')

      }
    }
  }


  const moveintoSquareBewlo = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstWRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isfirstRow = firstWRow.includes(i)

      if (isfirstRow && currentColor[i] === '') {
        let randomcolor = Math.floor(Math.random() * CandyColor.length)
        currentColor[i] = CandyColor[randomcolor]
      }
      if ((currentColor[i + width]) === '') {
        currentColor[i + width] = currentColor[i]
        currentColor[i] = ""
      }
    }
  }

  const DragStart = (e) => {

  }
  const DragDrop = (e) => {

  }
  const DragEnd = (e) => {

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
    <div className='app'>
      <div className='game'>
        {currentColor.map((candyColor, index) => (
          <img src="" alt="" key={index} style={{ backgroundColor: candyColor }}
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


  )
}

export default App
