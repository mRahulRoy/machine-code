import React from 'react'
export const dynamic = "force-dynamic";
const page = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos").then(res => res.json())

  return (
    <div>
      <h2>Products</h2>
      {
        res?.map((item: any, index: any) => {
          return <div key={index} className='bg-amber-400 my-3 text-black'>
            <h2>{item.title}</h2>
          </div>
        })
      }
    </div>
  )
}

export default page