import './App.css';
import React from "react";
import NavbarComponent from "./components/NavbarComponent";
import RegisterComponent from "./components/RegisterComponent";
import {AuthProvider, useAuth} from "./contexts/AuthContext";
import DashboardComponent from "./components/DashboardComponent";
import TouristBadgesComponent from "./components/TouristBadgesComponent";

const App = () => {


    return (
        <div className="App">
            <AuthProvider>
                <TouristBadgesComponent />
            </AuthProvider>
        </div>
    );
}

export default App;
