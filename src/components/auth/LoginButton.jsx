import React from "react";

import {
  useContext
} from "react";


import {
  AuthContext
} from "../../context/AuthContext";



export default function LoginButton(){


  const {
    user,
    loginGoogle,
    logout
  } = useContext(AuthContext);




  if(user){

    return (

      <button
        onClick={logout}
        className="
          bg-red-500
          px-4
          py-2
          rounded-xl
          font-bold
        "
      >

        Logout

      </button>

    );

  }



  return (

    <button

      onClick={loginGoogle}

      className="
        bg-emerald-500
        px-4
        py-2
        rounded-xl
        font-bold
      "

    >

      Login with Google

    </button>

  );


}