export default function typeIcon(data) {
  const types = data?.types[0].type.name;

  const whatType =
    types === "fire"
      ? "🔥"
      : types === "water"
      ? "💧"
      : types === "grass"
      ? "🍃"
      : types === "electric"
      ? "⚡"
      : types === "fighting"
      ? "⚔️"
      : types === "rock"
      ? "🪨"
      : types === "bug"
      ? "🪲"
      : types === "psychic"
      ? "🔮"
      : types === "dark"
      ? "🌑"
      : types === "poison"
      ? "💀"
      : types === "ice"
      ? "🧊"
      : types === "ghost"
      ? "👻"
      : types === "dragon"
      ? "🐉"
      : types === "fairy"
      ? "🧚🏻"
      : types === "steel"
      ? "🔩"
      : types === "ground"
      ? "⛰️"
      : "";

  return whatType;
}
