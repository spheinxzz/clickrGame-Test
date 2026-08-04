import { supabase } from "../supabase/client";



export async function saveCloudGame(
  userId,
  game
){

  if(!userId){

    return false;

  }



  try {


    const { error } =

      await supabase

        .from("saves")

        .upsert({

          user_id:userId,

          data:game,

          updated_at:new Date()

        });



    if(error){

      console.error(
        "Cloud save failed:",
        error
      );

      return false;

    }



    return true;


  }

  catch(error){


    console.error(
      "Cloud save error:",
      error
    );


    return false;


  }

}









export async function loadCloudGame(
  userId
){

  if(!userId){

    return null;

  }



  try {


    const { data,error } =

      await supabase

        .from("saves")

        .select("data")

        .eq(
          "user_id",
          userId
        )

        .single();



    if(error){

      return null;

    }



    return data.data;


  }

  catch(error){


    console.error(
      "Cloud load error:",
      error
    );


    return null;


  }

}









export async function deleteCloudGame(
  userId
){

  if(!userId){

    return false;

  }



  try {


    const { error } =

      await supabase

        .from("saves")

        .delete()

        .eq(
          "user_id",
          userId
        );



    if(error){

      console.error(
        "Cloud delete failed:",
        error
      );

      return false;

    }



    return true;


  }

  catch(error){


    console.error(
      "Cloud delete error:",
      error
    );


    return false;


  }

}