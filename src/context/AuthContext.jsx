import React, {
  createContext,
  useEffect,
  useState
} from "react";


import {
  supabase
} from "../supabase/client";



export const AuthContext =
  createContext(null);





export default function AuthProvider({

  children

}){


  const [user,setUser] =
    useState(null);



  const [loading,setLoading] =
    useState(true);





  useEffect(()=>{


    supabase.auth
      .getSession()
      .then(({data})=>{


        setUser(
          data.session?.user || null
        );


        setLoading(false);


      });





    const {

      data:listener

    } =

      supabase.auth
        .onAuthStateChange(

          (event,session)=>{


            setUser(
              session?.user || null
            );


          }

        );





    return ()=>{


      listener.subscription.unsubscribe();


    };


  },[]);









  async function loginGoogle(){


    const {error} =

      await supabase.auth
        .signInWithOAuth({

          provider:"google",

          options:{

            redirectTo:
              window.location.origin

          }

        });



    if(error){

      console.error(
        "Login failed:",
        error
      );

    }


  }









  async function logout(){


    await supabase.auth.signOut();


  }









  return (

    <AuthContext.Provider

      value={{

        user,

        loading,

        loginGoogle,

        logout

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}