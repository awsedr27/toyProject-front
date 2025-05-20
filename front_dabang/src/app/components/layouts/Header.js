"use client"

import BtnLogin from "../buttons/BtnLogin";
import BtnLogout from "../buttons/BtnLogout";
import BtnSingUp from "../buttons/BtnSignUp";

function handleLogin(token) {
    
}

export default function Header({ _isLoggedIn }) {
    return (
    <>
    <div class='headerDiv'>
      <BtnLogin isLoggedIn={_isLoggedIn}/>
      <BtnSingUp isLoggedIn={_isLoggedIn}/>
      <BtnLogout isLoggedIn={_isLoggedIn}/>
    </div>
    </>
  );
}