import React from 'react';
import MenuButton from './MenuButton';
import IconPlaceholder from '../ui/IconPlaceholder';

export default function LeftNav({ onOpenShop, onOpenGemShop, onOpenSettings }) {
  return (
    <aside className="flex flex-col gap-4">
      <MenuButton 
        icon={<IconPlaceholder name="SHP" />} 
        label="Shop" 
        color="emerald" 
        onClick={onOpenShop} 
      />
      <MenuButton 
        icon={<IconPlaceholder name="GEM" />} 
        label="Gem Shop" 
        color="purple" 
        badge="HOT"
        onClick={onOpenGemShop} 
      />
      <MenuButton 
        icon={<IconPlaceholder name="SET" />} 
        label="Settings" 
        color="gray" 
        onClick={onOpenSettings} 
      />
    </aside>
  );
}