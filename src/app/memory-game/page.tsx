"use client"
import React, { useEffect, useRef, useState } from 'react'

interface ICell {
  id: number;
  value: number
}
function shuffleArray(array: ICell[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = ~~(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

function generateBoard(size: number) {
  const totalSize = size * (size - 1);
  const unshuffledArray = new Array(totalSize).fill(null).map((it, index: number) => {
    let id = Date.now();
    return {
      value: ~~(index / 2),
      id: id + index,
    }
  })
  return shuffleArray(unshuffledArray);
}
const page = () => {

  const [gridSize, setGridSize] = useState(4);
  const [board, setBoard] = useState<ICell[]>(generateBoard(gridSize));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [attempCount, setAttempCount] = useState(0);


  useEffect(() => {
    setBoard(generateBoard(gridSize));
    setIsWon(false);
    setSolved([]);
  }, [gridSize])

  useEffect(() => {
    if (solved.length == board.length) {
      setIsWon(true);
    }
  }, [solved])


  function doesPairMatced(indx2: number) {
    const [indx1] = flipped;
    console.log(board[indx1]?.value, board[indx2]?.value)
    if (board[indx1]?.value === board[indx2]?.value) {
      setSolved([...solved, indx1, indx2])
      setFlipped([]);
    } else {
      setTimeout(() => {
        setFlipped([])
      }, 1000);
    }

  }

  function onCellClick(index: number) {
    if (flipped.includes(index)) return;
    if (flipped.length == 0) {
      setFlipped([index]);
    }
    if (flipped.length == 1) {
      setFlipped([...flipped, index])
      setAttempCount(attempCount + 1);
      doesPairMatced(index)
    }
  }

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div>
        <h1 className='text-center'>Memory Game</h1>
        <div className='flex items-center gap-4'>
          <span>Slide to change Game Size from {gridSize} to ?</span>
          <input type="range" value={gridSize} min={4} max={10} onChange={(e) => {
            const size = +e.target.value;
            setGridSize(size)
          }} />
        </div>

        <div className='bg-white h-full mt-5 w-full grid justify-items-center gap-3 p-3 rounded-2xl' style={{
          gridTemplateColumns: `repeat(${gridSize},1fr) `
        }}>
          {
            board?.map((item: ICell, index: number) => {
              const isFLipped = flipped.includes(index);
              const isSolved = (id: number) => solved.includes(id);
              return <div onClick={onCellClick.bind(this, index)} key={item.id} className={`${isSolved(index) ? "bg-green-400" : isFLipped ? "bg-blue-400" : "bg-gray-400"} transition-all duration-75 flex items-center justify-center cursor-pointer rounded-2xl  h-[50px] w-[50px]`}>
                <p className='font-bold text-3xl'>
                  {isSolved(index) || isFLipped ? item.value : "?"}
                </p>
              </div>
            })
          }
        </div>
        <div>
          {isWon && <h2 className='text-green-400 font-black text-3xl'>You Won</h2>}
          <span>Total Attempts : {attempCount}</span>
          <button onClick={() => {
            setIsWon(false)
            setSolved([]);
          }} className='p-2 rounded-3xl bg-blue-300 '>Reset</button>
        </div>


      </div>
    </div>
  )
}

export default page