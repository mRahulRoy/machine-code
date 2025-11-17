"use client"

const Screen = () => {

    return (
        <div className='w-full flex justify-center mb-3 py-8'>
            <div className='relative'>
                {/* Screen */}
                <div className='w-[800px] h-[50px] bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-t-[100%] border-t-4 border-x-4 border-gray-600 shadow-2xl'>
                    {/* Shine effect */}
                    <div className='absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-t-[100%]'></div>

                    {/* Screen text */}
                    <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <div className='text-white font-bold text-2xl -mt-7 tracking-[0.5em] drop-shadow-lg'>
                            SCREEN
                        </div>

                    </div>
                </div>
                {/* Shadow beneath screen */}
                <div className='w-[800px] h-8 bg-gradient-to-b from-black/40 to-transparent blur-sm'></div>
            </div>
        </div>
    )
}

export default Screen
