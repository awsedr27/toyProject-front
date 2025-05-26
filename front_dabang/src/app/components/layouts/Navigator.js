"use client"
import "./navigator.css";
import BtnLogin from "../buttons/BtnLogin";
import BtnLogout from "../buttons/BtnLogout";
import BtnSingUp from "../buttons/BtnSignUp";

function NavigatorClick(token) {
    
}

export default function Header({ isLoggedIn }) {

    return (
        <div className="navigator">
            <ul>
                <li>Button1</li>
                <li>Button2</li>
                <li>Button3</li>
                <li>Button4</li>
                <li>Button5</li>
                <li>Button6</li>
            </ul>
        </div>
    );
}