import React, { useState } from "react"
import "./Nav.css"
import { Link } from "react-router-dom"

function Nav(){

    const [menu, setMenu] = useState(false)

    const linkStyle = {
        textDecoration: "none"
    }

    return(
        <div>
            <button onClick={() => setMenu(prev => !prev)} className="open-menu">
                Menu
            </button>


            <div>
                {menu && (
                    <div className="nav-links">
                        <div className="Nav">
                            <Link className="Home" to="/" style={linkStyle}>
                                <button onClick={() => setMenu(false)}>Home</button>
                            </Link>
                            <Link className="Dice" to="/Dice" style={linkStyle}>
                                <button onClick={() => setMenu(false)}>Dice</button>
                            </Link>
                            <Link className="About Me" to="/About" style={linkStyle}>
                                <button onClick={() => setMenu(false)}>About Me</button>
                          </Link>        
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Nav;