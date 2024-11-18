import React from 'react'

const NewsLetter = () => {

const handleSubmit = (event) =>{
    event.preventDefault();
}

  return (
    <div className=' text-center '>
        <p>Subscribe now & get 20% off</p>
        <p className='text-gray-700 mt-6 mb-3 '>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quisquam?
        </p>
        <form onClick={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
            <button className=' bg-black text-white text:xs px-10 py-4 '>SUBSCRIBE</button>
        </form>

    </div>
  )
}

export default NewsLetter