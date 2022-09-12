import React from 'react'

const ButtonComment = ({title, onClicked}) => {
  return (
    <div style={{marginTop: "20px"}}>      
        <button onClick={onClicked} type="submit" className="register-btn px-5 py-1 shadow-sm font-medium rounded-md bg-green-600">
            <span className="text-gray-100 text-sm">{title}</span>
        </button>    
    </div>
  );
}

export default ButtonComment