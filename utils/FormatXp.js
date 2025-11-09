export function formatXP(xp) {
  if (xp === null || xp === undefined || isNaN(xp)) return "0 XP";
  if (xp >= 1_000_000) {
    return (xp / 1_000_000).toFixed(1) + "M XP";
  } else if (xp >= 1_000) {
    return (xp / 1_000).toFixed(1) + "K XP";
  }
  return xp + " XP";
}
