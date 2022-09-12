import React from 'react'
import { useNavigate } from 'react-router-dom';

const ButtonPopularity = ({title}, {Navigate}) => {

    Navigate = useNavigate();
  return (
    <div className="w-full md:w-1/2 px-20 mx-auto">

        <button type="submit" onClick={() => Navigate('allPopularity')} className="register-btn px-5 py-1 shadow-sm font-medium rounded-md bg-gray-600">
            <span className="text-gray-100 text-lg">{title}</span>
        </button>
    </div>
  )
}

export default ButtonPopularity