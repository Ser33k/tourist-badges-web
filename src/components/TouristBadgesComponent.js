import React from 'react';
import NavbarComponent from "./NavbarComponent";
import RegisterComponent from "./RegisterComponent";
import {useAuth} from "../contexts/AuthContext";
import DashboardComponent from "./DashboardComponent";
import FooterComponent from "./FooterComponent";


const TouristBadgesComponent = () => {

    const {currentUser} = useAuth();

    return (
        <div>
            <NavbarComponent/>
            <main className="main">
                {currentUser ? <DashboardComponent/> : <RegisterComponent/>}
            </main>
            <FooterComponent />
        </div>
    );
};

export default TouristBadgesComponent;