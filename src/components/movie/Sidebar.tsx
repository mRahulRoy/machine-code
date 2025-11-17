"use client"
import React, { useState } from 'react'
import RangePicker, { cellOptions } from './Tools'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux/hooks/hooks'
import { resetSelectedCell, setCurrentTicketType, setGridRange } from '@/redux/reducers/movie-slice'
import { CellOption, ticketInfoType } from '@/utils'
import { exportTheaterLayout } from '@/utils/utils'


const Sidebar = () => {
  const dispatch = useDispatch();
  const rangeSelectoer = useAppSelector((state) => state.movie.layoutGrid)
  const { currentSelectedTicketType, bookedSeats } = useAppSelector((state) => state.movie)

  function onRangeChange(type: string, value: number) {
    switch (type) {
      case "row":
        dispatch(setGridRange({ ...rangeSelectoer, type: "rows", value }))
        break;
      case "col":
        dispatch(setGridRange({ ...rangeSelectoer, type: "cols", value }))
        break;
      default:
        return;
    }
  }


  return (
    <div className='bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 h-full overflow-y-auto'>
      {/* Header */}
      <div className='sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 p-6'>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <div className='absolute inset-0 bg-amber-500/20 blur-xl rounded-full'></div>
            <p className='relative inline-flex h-14 w-14 items-center justify-center text-2xl font-bold bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900 rounded-full shadow-lg'>
              R
            </p>
          </div>
          <div>
            <span className='text-white text-xl font-bold tracking-wide'>Cinema</span>
            <p className='text-slate-400 text-xs'>Layout Designer</p>
          </div>
        </div>
      </div>

      <div className='p-6 space-y-8'>
        {/* Tools Section */}
        <div>
          <div className='flex items-center justify-between gap-2 mb-4'>
            <h2 className='text-amber-400 font-semibold text-sm uppercase tracking-wider'>Tools</h2>
            <button onClick={() => {
              exportTheaterLayout(bookedSeats)
            }} className='bg-amber-400 rounded-4xl px-3 text-black cursor-pointer'>Export </button>
          </div>

          <div className='bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 shadow-xl'>
            <p className='text-slate-300 font-medium mb-4 text-sm'>Manage Layout</p>

            <div className='space-y-4'>
              <RangePicker
                type='row'
                label="Rows"
                currentState="A-Z"
                value={rangeSelectoer.rows}
                min={10}
                max={80}
                onRangeChange={onRangeChange}
              />
              <RangePicker
                type='col'
                label="Columns"
                currentState="1-80"
                value={rangeSelectoer.cols}
                min={10}
                max={80}
                onRangeChange={onRangeChange}
              />

              <div className='mt-4 pt-4 border-t border-slate-700/50'>
                <div className='bg-slate-900/50 rounded-lg p-3 text-center'>
                  <p className='text-slate-400 text-xs mb-1'>Total Seats</p>
                  <p className='text-white font-bold text-lg'>
                    {rangeSelectoer.rows} × {rangeSelectoer.cols} = {rangeSelectoer.rows * rangeSelectoer.cols}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div>
          <div className='flex items-center gap-2 mb-4'>
            <div className='h-1 w-1 rounded-full bg-blue-400'></div>
            <h3 className='text-blue-400 font-semibold text-sm uppercase tracking-wider'>Actions</h3>
          </div>

          <div className='space-y-3'>
            {cellOptions?.map((item: CellOption, index: number) => {
              const isPrice = item.btnType == "PRICE";
              const isTicketBtnActive = typeof currentSelectedTicketType == "object";

              return (
                <div key={index}>
                  {isPrice ? (
                    <div className='space-y-3'>
                      <div className='flex items-center gap-2 mt-6 mb-3'>
                        <div className='h-1 w-1 rounded-full bg-purple-400'></div>
                        <h3 className='text-purple-400 font-semibold text-sm uppercase tracking-wider'>Ticket Types</h3>
                      </div>

                      {Object.entries(item?.children ?? {})?.map(([ticketName, ticketInfo]: [string, ticketInfoType], idx: number) => {
                        const isActive = isTicketBtnActive && ticketInfo.color == currentSelectedTicketType.color;

                        return (
                          <button
                            onClick={() => {
                              dispatch(resetSelectedCell());
                              dispatch(setCurrentTicketType(ticketInfo))
                            }}
                            key={idx}
                            className={`
                              group relative w-full overflow-hidden rounded-xl transition-all duration-300
                              ${isActive
                                ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-slate-900 shadow-lg shadow-green-400/20'
                                : 'hover:scale-[1.02] hover:shadow-lg'
                              }
                            `}
                          >
                            <div className={`
                              flex items-center justify-between px-5 py-4
                              ${isActive ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ticketInfo.color}
                              transition-colors duration-200
                            `}>
                              <div className='flex items-center gap-3'>
                                <div className={`
                                  w-2 h-2 rounded-full 
                                  ${isActive ? 'bg-white animate-pulse' : 'bg-white/50'}
                                `}></div>
                                <span className='text-white font-semibold text-sm'>
                                  {ticketInfo.label}
                                </span>
                              </div>

                              {ticketInfo.price !== undefined && (
                                <div className='flex items-center gap-2'>
                                  <span className='text-white/80 text-xs'>₹</span>
                                  <span className='text-white font-bold text-base'>
                                    {ticketInfo.price}
                                  </span>
                                </div>
                              )}
                            </div>

                            {isActive && (
                              <div className='absolute top-2 right-2'>
                                <div className='bg-white/20 backdrop-blur-sm rounded-full p-1'>
                                  <svg className='w-3 h-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(setCurrentTicketType(item.btnType))
                      }}
                      className={`
                        group relative w-full overflow-hidden rounded-xl transition-all duration-300
                        ${item.btnType == currentSelectedTicketType
                          ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-slate-900 shadow-lg shadow-green-400/20'
                          : 'hover:scale-[1.02] hover:shadow-lg'
                        }
                      `}
                    >
                      <div className={`
                        flex items-center justify-between px-5 py-4
                        ${item.btnType == currentSelectedTicketType
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : 'bg-slate-700/50 hover:bg-slate-700'
                        }
                        transition-colors duration-200
                      `}>
                        <div className='flex items-center gap-3'>
                          <div className={`
                            w-2 h-2 rounded-full 
                            ${item.btnType == currentSelectedTicketType ? 'bg-white animate-pulse' : 'bg-slate-400'}
                          `}></div>
                          <span className='text-white font-semibold text-sm'>
                            {item.label}
                          </span>
                        </div>

                        {item.btnType == currentSelectedTicketType && (
                          <div className='bg-white/20 backdrop-blur-sm rounded-full p-1'>
                            <svg className='w-3 h-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar