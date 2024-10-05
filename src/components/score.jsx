import React from 'react'

function ScoreBoard({score}) {
  return (
    <div className='score-borded p-12 bg-pink-400 w-25 h-25 rounded-2xl'>
       <div className='w-30 h-12 bg-blue-500 p-3 rounded-xl'>
       <h2 className='font-bold text-white  font-serif'> Score: {score}</h2>
       </div>
    </div>
  )
}

export default ScoreBoard