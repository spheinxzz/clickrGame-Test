import React from 'react';
import MoneyDisplay from './components/header/MoneyDisplay';
import GemsDisplay from './components/header/GemsDisplay';
import LeftNav from './components/navigation/LeftNav';
import RightNav from './components/navigation/RightNav';
import ClickerButton from './components/clicker/ClickerButton';

export default function GameLayout({
  money = 1250000,
  ratePerSec = 4500,
  gems = 250,
  clickerImgSrc = '',
  onMainClick = () => {
    return;
  },
  onOpenShop = () => {
    return;
  },
  onOpenGemShop = () => {
    return;
  },
  onOpenSettings = () => {
    return;
  },
  onOpenLeaderboard = () => {
    return;
  },
  onOpenUpgrades = () => {
    return;
  },
  onOpenAchievements = () => {
    return;
  },
  onOpenRebirths = () => {
    return;
  },
}) {
  return (
    <div 
      className="relative w-screen h-screen bg-[#242222] text-white overflow-hidden select-none flex flex-col justify-between p-6"
    >
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" 
      />

      <header 
        className="w-full flex justify-center items-center gap-6 z-10 pt-2"
      >
        <div 
          className="flex items-center justify-center gap-4"
        >
          <MoneyDisplay 
            amount={money} 
            ratePerSec={ratePerSec} 
          />
          <GemsDisplay 
            amount={gems} 
          />
        </div>
      </header>

      <main 
        className="flex-1 w-full flex items-center justify-between px-8 z-10 my-auto"
      >
        <div 
          className="flex items-center justify-start min-w-[200px]"
        >
          <LeftNav 
            onOpenShop={
              onOpenShop
            }
            onOpenGemShop={
              onOpenGemShop
            }
            onOpenSettings={
              onOpenSettings
            }
            onOpenLeaderboard={
              onOpenLeaderboard
            }
          />
        </div>

        <div 
          className="flex-1 flex flex-col justify-center items-center relative"
        >
          <ClickerButton 
            onClick={
              onMainClick
            } 
            imgSrc={
              clickerImgSrc
            } 
          />
        </div>

        <div 
          className="flex items-center justify-end min-w-[200px]"
        >
          <RightNav 
            onOpenUpgrades={
              onOpenUpgrades
            }
            onOpenAchievements={
              onOpenAchievements
            }
            onOpenRebirths={
              onOpenRebirths
            }
          />
        </div>
      </main>

      <div 
        className="h-4 w-full pointer-events-none z-10" 
      />
    </div>
  );
}