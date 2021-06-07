import React from 'react';
import NavbarComponent from "./NavbarComponent";
import RegisterComponent from "./RegisterComponent";
import {useAuth} from "../contexts/AuthContext";
import DashboardComponent from "./DashboardComponent";


const TouristBadgesComponent = () => {

    const {currentUser} = useAuth();

    return (
        <div>
            <NavbarComponent/>
            <main className="main">
                {currentUser ? <DashboardComponent/> : <RegisterComponent/>}
            </main>
        </div>
    );
};

export default TouristBadgesComponent;