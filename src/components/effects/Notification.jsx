import React from "react";

export default function Notification({

  title,

  description

}){


  return (

    <div

      className="
        bg-[#242222]
        border
        border-emerald-400/40
        rounded-xl
        px-5
        py-3
        shadow-xl
        animate-notificationEnter
        w-72
      "

    >

      <h3 className="
        text-emerald-400
        font-black
      ">

        {title}

      </h3>


      <p className="
        text-gray-300
        text-sm
      ">

        {description}

      </p>


    </div>

  );

}