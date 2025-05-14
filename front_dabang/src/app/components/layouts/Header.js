"use client"

import BtnLogin from "../buttons/BtnLogin";
import BtnLogout from "../buttons/BtnLogout";
import BtnSingUp from "../buttons/BtnSignUp";

function handleLogin(token) {
    
}

export default function Header({ isLoggedIn }) {

    return (
    <>
      <BtnLogin/>
      <BtnSingUp/>
      {/* {isLoggedIn ? (
        <BtnLogout/>
      ) : (
        <>
          <BtnLogin/>
          <BtnSingUp/>
        </>
      )} */}
    </>
  );
}