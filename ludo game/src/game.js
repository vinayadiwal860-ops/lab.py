export const COLORS = [
  { id: "red", name: "Ruby", hex: "#ef5261", start: 0, home: 0, corner: "southwest" },
  { id: "green", name: "Jade", hex: "#63c995", start: 13, home: 1, corner: "northwest" },
  { id: "yellow", name: "Amber", hex: "#f0bd55", start: 26, home: 2, corner: "northeast" },
  { id: "blue", name: "Sapphire", hex: "#5c9cf5", start: 39, home: 3, corner: "southeast" },
];

const firstSegment = [
  [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [5, 6], [4, 6],
  [3, 6], [2, 6], [1, 6], [0, 7], [1, 8], [2, 8],
];

function rotatePoint([row, col], turns) {
  let r = row;
  let c = col;
  for (let i = 0; i < turns; i += 1) [r, c] = [c, 14 - r];
  return [r, c];
}

export const TRACK = Array.from({ length: 4 }, (_, turn) =>
  firstSegment.map((point) => rotatePoint(point, turn)),
).flat();
export const SAFE_CELLS = new Set([0, 8, 13, 21, 26, 34, 39, 47]);
export const HOME_LANES = [
  [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]],
  [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]],
  [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8]],
  [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7]],
];

export const DICE_THEMES = [
  { id: "classic", name: "Classic", finish: "#f5f2e9", dot: "#202222" },
  { id: "gold", name: "Gilded", finish: "#d7a94b", dot: "#633d09" },
  { id: "diamond", name: "Crystal", finish: "#a9e3ed", dot: "#237889" },
  { id: "neon", name: "Neon", finish: "#7b5cf1", dot: "#f6f1ff" },
  { id: "fire", name: "Ember", finish: "#e95d30", dot: "#fff2cf" },
  { id: "ice", name: "Glacier", finish: "#77c8ec", dot: "#123d73" },
  { id: "galaxy", name: "Cosmos", finish: "#29254d", dot: "#a8f4ff" },
  { id: "royal", name: "Royal", finish: "#8d58bd", dot: "#ffd986" },
  { id: "wood", name: "Walnut", finish: "#956044", dot: "#f1d4a2" },
  { id: "carbon", name: "Carbon", finish: "#383c42", dot: "#f4f4f0" },
];

export const BOARD_THEMES = [
  { id: "wood", name: "Warm walnut", surface: "#5d3b2b", tile: "#efe2ca", accent: "#d3aa76" },
  { id: "marble", name: "Ivory marble", surface: "#373b42", tile: "#e9e9e5", accent: "#a8abb4" },
  { id: "royal", name: "Royal gold", surface: "#20182b", tile: "#e6d5aa", accent: "#c89b48" },
  { id: "neon", name: "Cyber night", surface: "#11132b", tile: "#232746", accent: "#72e7f2" },
  { id: "space", name: "Deep space", surface: "#171527", tile: "#26243d", accent: "#8f85ce" },
  { id: "nature", name: "Forest", surface: "#263c31", tile: "#d9e3cd", accent: "#83a66d" },
  { id: "dark", name: "Obsidian", surface: "#1d2022", tile: "#303435", accent: "#767d7d" },
  { id: "candy", name: "Sweet shop", surface: "#533448", tile: "#f4dce6", accent: "#e39cbe" },
];

export const MODE_OPTIONS = [
  { id: "local", title: "Pass & play", subtitle: "Four friends, one board", icon: "♟" },
  { id: "duel", title: "Head to head", subtitle: "Two players · opposite sides", icon: "◈" },
  { id: "human-ai", title: "Play the realm", subtitle: "You vs. clever opponents", icon: "✦" },
  { id: "ai-ai", title: "Watch the table", subtitle: "A match between AIs", icon: "◉" },
];

export function makePlayers(mode, opponentCount = 3) {
  const activeColors = mode === "duel" ? [COLORS[0], COLORS[2]]
    : mode === "human-ai" ? COLORS.slice(0, Math.min(4, opponentCount + 1))
      : COLORS;
  return activeColors.map((color, index) => ({
    ...color,
    isAI: mode === "ai-ai" || (mode === "human-ai" && index > 0),
    tokens: Array.from({ length: 4 }, (_, token) => ({ id: `${color.id}-${token}`, progress: -1 })),
  }));
}

export function nextActiveIndex(players, current) {
  for (let step = 1; step <= players.length; step += 1) {
    const index = (current + step) % players.length;
    if (players[index].tokens.some((token) => token.progress < 57)) return index;
  }
  return current;
}

export function tokenTrackIndex(player, progress) {
  return (player.start + progress) % 52;
}

export function isLegalMove(players, playerIndex, tokenIndex, roll) {
  if (!roll) return false;
  const token = players[playerIndex]?.tokens[tokenIndex];
  if (!token || token.progress === 57) return false;
  if (token.progress === -1) return roll === 6;
  return token.progress + roll <= 57;
}

export function legalMoves(players, playerIndex, roll) {
  return players[playerIndex].tokens
    .map((token, index) => isLegalMove(players, playerIndex, index, roll) ? index : -1)
    .filter((index) => index >= 0);
}

export function moveToken(players, playerIndex, tokenIndex, roll) {
  const updated = players.map((player) => ({ ...player, tokens: player.tokens.map((token) => ({ ...token })) }));
  const token = updated[playerIndex].tokens[tokenIndex];
  token.progress = token.progress === -1 ? 0 : token.progress + roll;
  const captured = [];

  if (token.progress < 52) {
    const landing = tokenTrackIndex(updated[playerIndex], token.progress);
    if (!SAFE_CELLS.has(landing)) {
      updated.forEach((opponent, opponentIndex) => {
        if (opponentIndex === playerIndex) return;
        opponent.tokens.forEach((other) => {
          if (other.progress >= 0 && other.progress < 52 && tokenTrackIndex(opponent, other.progress) === landing) {
            other.progress = -1;
            captured.push(other.id);
          }
        });
      });
    }
  }
  const won = updated[playerIndex].tokens.every((item) => item.progress === 57);
  return { players: updated, captured, won };
}

export function chooseAiMove(players, playerIndex, roll, difficulty = "medium") {
  const options = legalMoves(players, playerIndex, roll);
  if (!options.length) return -1;
  const scored = options.map((tokenIndex) => {
    const player = players[playerIndex];
    const token = player.tokens[tokenIndex];
    const nextProgress = token.progress < 0 ? 0 : token.progress + roll;
    const landingIndex = nextProgress < 52 ? tokenTrackIndex(player, nextProgress) : -1;
    const canCapture = landingIndex >= 0 && !SAFE_CELLS.has(landingIndex) && players.some((opponent, otherIndex) =>
      otherIndex !== playerIndex && opponent.tokens.some((other) => other.progress >= 0 && other.progress < 52
        && tokenTrackIndex(opponent, other.progress) === landingIndex));
    const onSafeCell = landingIndex >= 0 && SAFE_CELLS.has(landingIndex);
    const threatCount = landingIndex >= 0 ? players.reduce((total, opponent, otherIndex) => {
      if (otherIndex === playerIndex) return total;
      return total + opponent.tokens.filter((other) => {
        if (other.progress < 0 || other.progress >= 52) return false;
        const distance = (landingIndex - tokenTrackIndex(opponent, other.progress) + 52) % 52;
        return distance > 0 && distance <= 6;
      }).length;
    }, 0) : 0;
    const score = nextProgress === 57 ? 1000 : (canCapture ? 160 : 0) + (token.progress < 0 ? 35 : 0)
      + nextProgress * (difficulty === "easy" ? 0.8 : 1.5)
      + (onSafeCell ? 28 : 0) - (difficulty === "hard" ? threatCount * 32 : difficulty === "medium" ? threatCount * 14 : 0);
    return { tokenIndex, score, tie: Math.random() };
  });
  if (difficulty === "easy" && Math.random() < 0.45) return options[Math.floor(Math.random() * options.length)];
  scored.sort((a, b) => b.score - a.score || a.tie - b.tie);
  return scored[0].tokenIndex;
}