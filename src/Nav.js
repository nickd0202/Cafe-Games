import React from "react"
import "./Nav.css"
import { Link } from "react-router-dom"

function Nav(){


    const linkStyle = {
        textDecoration: "none"
    }

    return(
        <div className="Nav">
            <Link className="Home" to="/" style={linkStyle}>
                <button>Home</button>
            </Link>
            <Link className="Dice" to="/Dice" style={linkStyle}>
                <button>Dice</button>
            </Link>
            <Link className="About Me" to="/About" style={linkStyle}>
                <button>About Me</button>
            </Link>
            {/*<Link className="Home" to="/" style={linkStyle}>
                <button>Home</button>
            </Link> */}
            
        </div>
    );
}

export default Nav;