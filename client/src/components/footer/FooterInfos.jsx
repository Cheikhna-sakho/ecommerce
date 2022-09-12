import React from 'react'
import FooterCopyRight from './FooterCopyRight'
import { Link } from "react-router-dom";
import  modelFooter from "../footer/model/modelFooter"

const FooterInfos = () => {

  return (
    <div>
      <footer>
        <div className="globalFooter">
          <div className="footerContent">
            {modelFooter.map((section, i) => (
              <section key={i} className="sectionFooter">
                <ul>
                  <p className="titleFooter">{section.title}</p>
                  {section.options.map((options, i) => (
                    <li key={i} className="optionsFooter">
                      <Link to="#">{options}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
        <FooterCopyRight />
      </footer>
    </div>
  );
}

export default FooterInfos