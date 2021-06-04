import './App.css';
import React from "react";
import NavbarComponent from "./components/NavbarComponent";
import RegisterComponent from "./components/RegisterComponent";

function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <div className="main">
                <RegisterComponent/>
            </div>
        </div>
    );
}

export default App;
