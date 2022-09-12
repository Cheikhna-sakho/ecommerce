import React from 'react'

const RadioPayment = ({ id, onChange, dataId, title, ...radioProps }) => {
    
  return (
    <div className="flex justify-between">
      <input id={id} data-id={dataId} onChange={onChange} {...radioProps} />

      <label
        htmlFor={id}
        className="ml-3 block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
    </div>
  );
};

export default RadioPayment