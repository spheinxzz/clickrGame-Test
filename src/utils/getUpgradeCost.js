export default function getUpgradeCost(baseCost, level) {

  const multiplier = 1.15;

  return Math.floor(
    baseCost * Math.pow(multiplier, level)
  );

}