import React from 'react'
import {CgLogOff} from 'react-icons/cg';
const ButtonLogout = ({handleClear}) => {

  return (

    <button type="submit" onClick={handleClear} >
      <h6><CgLogOff style={{height: 30, width: 40}}/></h6>    
    </button>

  )
}

export default ButtonLogout;