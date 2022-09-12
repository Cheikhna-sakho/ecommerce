import React from 'react'
import { Link } from "react-router-dom";
import modelFooterCopy from "../footer/model/modelFooterCopy"

const FooterCopyRight = () => {

  return (
    <div className="footerCopy">
      <div className="container copy">
        <p className="mvc">©2022 3MVC</p>
        <ul className="copyList">
          {modelFooterCopy.map((copy, i) => (
            <li key={i} className="list">
              <Link to="#">{copy.option}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FooterCopyRight