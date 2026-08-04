export default function formatNumber(number) {

  if (number < 1000) {
    return Math.floor(number).toString();
  }


  const suffixes = [
    "",
    "K",
    "M",
    "B",
    "T",
    "Qd",
    "Qt",
    "Sx",
    "Sp",
    "Oc",
    "No",
    "Dc"
  ];


  const tier = Math.floor(
    Math.log10(number) / 3
  );


  const suffix = suffixes[tier] || "∞";


  const scaled =
    number / Math.pow(1000, tier);


  let formatted;


  if (scaled >= 100) {
    formatted = Math.floor(scaled);
  }

  else if (scaled >= 10) {
    formatted = scaled.toFixed(1);
  }

  else {
    formatted = scaled.toFixed(2);
  }


  return `${formatted}${suffix}`;

}