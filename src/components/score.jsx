import React from 'react'

function ScoreBoard({ score }) {
  return (
    <div className='w-42 h-42'>
      <img src="https://i.ibb.co/vLMhJyC/Whats-App-Image-2024-10-05-at-17-26-30-5e8a1b92.jpg" alt="" className='rounded-2xl w-44 h-44' />
      <h2 className='inline-block absolute top-[71px] left-[753px] font-bold font-serif text-white text-xl'>{score}</h2>
    </div>
  )
}

export default ScoreBoard
