import React from 'react'
import Nav from "./Nav"
import "./Home.css"

function Home(){
    return (
        <div className="bg">
            <Nav />
            <h1>This is the home page</h1>
        </div>
    );
}

export default Home;