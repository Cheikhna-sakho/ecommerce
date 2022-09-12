import React from 'react'
import { useNavigate } from 'react-router-dom';
import {VscExpandAll} from 'react-icons/vsc';

const ButtonSetting = ({Navigate}) => {

  Navigate = useNavigate()
  return (

    <button type="submit" onClick={() => Navigate('addarticle')} >
      <h6><VscExpandAll style={{height: 40, width: 50}}/></h6>
    </button>
  )
}
export default ButtonSetting;