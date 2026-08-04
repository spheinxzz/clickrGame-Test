import React, {
  useState
} from "react";


import MoneyDisplay from "./components/header/MoneyDisplay";
import GemsDisplay from "./components/header/GemsDisplay";
import LevelDisplay from "./components/header/LevelDisplay";

import OfflineReward from "./components/ui/OfflineReward";


import LeftNav from "./components/navigation/LeftNav";
import RightNav from "./components/navigation/RightNav";


import ClickerButton from "./components/clicker/ClickerButton";


import NotificationDisplay from "./components/ui/NotificationDisplay";


import Shop from "./components/menus/Shop";
import GemShop from "./components/menus/GemShop";
import UpgradeMenu from "./components/menus/UpgradeMenu";
import AchievementMenu from "./components/menus/AchievementMenu";
import SettingsMenu from "./components/menus/SettingsMenu";
import RebirthMenu from "./components/menus/RebirthMenu";


import LoginButton from "./components/auth/LoginButton";



export default function GameLayout(){


  const [menu,setMenu] = useState(null);



  return (

    <div

      className="
        relative
        w-screen
        h-screen
        bg-[#242222]
        text-white
        overflow-hidden
        flex
        flex-col
        p-6
      "

    >



      <NotificationDisplay />

      <OfflineReward />





      <div

        className="
          absolute
          top-5
          right-5
          z-40
        "

      >

        <LoginButton />

      </div>







      <header

        className="
          flex
          justify-center
          gap-5
          items-center
        "

      >


        <MoneyDisplay />

        <GemsDisplay />

        <LevelDisplay />


      </header>







      <main

        className="
          flex-1
          flex
          justify-between
          items-center
          px-8
        "

      >



        <LeftNav

          onOpenShop={()=>setMenu("shop")}

          onOpenGemShop={()=>setMenu("gemShop")}

          onOpenSettings={()=>setMenu("settings")}

        />





        <ClickerButton />





        <RightNav

          onOpenUpgrades={()=>setMenu("upgrades")}

          onOpenAchievements={()=>setMenu("achievements")}

          onOpenRebirths={()=>setMenu("rebirths")}

        />



      </main>







      {
        menu === "shop" && (

          <Shop

            onClose={()=>setMenu(null)}

          />

        )
      }





      {
        menu === "gemShop" && (

          <GemShop

            onClose={()=>setMenu(null)}

          />

        )
      }





      {
        menu === "upgrades" && (

          <UpgradeMenu

            onClose={()=>setMenu(null)}

          />

        )
      }





      {
        menu === "achievements" && (

          <AchievementMenu

            onClose={()=>setMenu(null)}

          />

        )
      }





      {
        menu === "settings" && (

          <SettingsMenu

            onClose={()=>setMenu(null)}

          />

        )
      }





      {
        menu === "rebirths" && (

          <RebirthMenu

            onClose={()=>setMenu(null)}

          />

        )
      }



    </div>

  );

}