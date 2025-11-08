export function getRank(level) {
  if (level >= 50) return "Grandmaster";
  if (level >= 40) return "Master";
  if (level >= 30) return "Expert";
  if (level >= 20) return "Advanced";
  if (level >= 10) return "Intermediate";
  return "Beginner";
}
