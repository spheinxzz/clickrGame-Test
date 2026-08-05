import React from 'react';
import MenuButton from './MenuButton';
import { ASSET_PATHS } from '../../../public/assets/index.js';

export default function LeftNav({ onOpenShop, onOpenGemShop, onOpenSettings, onOpenLeaderboard }) {
  return (
    <aside className="flex flex-col gap-4">
      <MenuButton 
        iconSrc={ASSET_PATHS.icons.shop} 
        label="Shop" 
        color="emerald" 
        onClick={onOpenShop} 
      />
      <MenuButton 
        iconSrc={ASSET_PATHS.icons.gem} 
        label="Gem Shop" 
        color="purple" 
        badge="HOT"
        onClick={onOpenGemShop} 
      />
      <MenuButton 
        iconSrc={ASSET_PATHS.icons.settings} 
        label="Settings" 
        color="gray" 
        onClick={onOpenSettings} 
      />
      <MenuButton
        iconSrc={ASSET_PATHS.icons.leaderboard}
        label="Leaderboard"
        color="amber"
        badge="New"
        onClick={onOpenLeaderboard}
      />
    </aside>
  );
}