import React from 'react';
import MenuButton from './MenuButton';
import IconPlaceholder from '../ui/IconPlaceholder';

export default function RightNav({ onOpenUpgrades, onOpenAchievements, onOpenRebirths }) {
  return (
    <aside className="flex flex-col gap-4">
      <MenuButton 
        icon={<IconPlaceholder name="UPG" />} 
        label="Upgrades" 
        color="amber" 
        onClick={onOpenUpgrades} 
      />
      <MenuButton 
        icon={<IconPlaceholder name="ACH" />}
        label="Achievements"
        color="indigo"
        onClick={onOpenAchievements}
      />
      <MenuButton
        icon={<IconPlaceholder name="REB" />}
        label="Rebirths"
        color="rose"
        onClick={onOpenRebirths}
      />
    </aside>
  );
}