import React from 'react'

const InputSmall = ({inputData}) => {

  return (

    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={inputData.id}>
            {inputData.title}
          </label>
          <input id={inputData.id}  type={inputData.type} required onChange={ e => {inputData.setData(e.target.value)}} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"/>
    </div>
  )
}

export default InputSmall;