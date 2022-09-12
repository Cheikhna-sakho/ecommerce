import React from 'react'

const Button = ({title}) => {
  return (
    
    <div className="w-full md:w-1/2 px-20 mx-auto">

        <button type="submit" className="register-btn px-5 py-1 shadow-sm font-medium rounded-md bg-green-600">
            <span className="text-gray-100 text-lg">{title}</span>
        </button>
    </div>
  )
}

export default Button