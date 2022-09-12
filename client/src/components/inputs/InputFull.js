import React from 'react'

const InputFull = ({inputData}) => {
  return (
    <div className="w-full px-3">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
     htmlFor={inputData.id}>
      {inputData.title}
    </label>
    <input id={inputData.id} value={inputData.value} type={inputData.type} 
    required onChange={ (e) => inputData.setData(e.target.value)}
     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
  </div>
  )
}

export default InputFull