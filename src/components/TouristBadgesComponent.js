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
            <div className="main">
                {currentUser ? <DashboardComponent/> : <RegisterComponent/>}
            </div>
        </div>
    );
};

export default TouristBadgesComponent;