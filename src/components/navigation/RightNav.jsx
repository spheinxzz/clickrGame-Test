import React from 'react';
import MenuButton from './MenuButton';
import { ASSET_PATHS } from '../../../public/assets/index.js';

export default function RightNav({ onOpenUpgrades, onOpenAchievements, onOpenRebirths }) {
  return (
    <aside className="flex flex-col gap-4">
      <MenuButton 
        iconSrc={ASSET_PATHS.icons.upgrades} 
        label="Upgrades" 
        color="amber" 
        onClick={onOpenUpgrades} 
      />
      <MenuButton 
        iconSrc={ASSET_PATHS.icons.achievements} 
        label="Achievements" 
        color="indigo" 
        onClick={onOpenAchievements} 
      />
      <MenuButton 
        iconSrc={ASSET_PATHS.icons.rebirths} 
        label="Rebirths" 
        color="rose" 
        onClick={onOpenRebirths} 
      />
    </aside>
  );
}