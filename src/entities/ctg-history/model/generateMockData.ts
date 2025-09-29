enum HistoryStatus {
  Normal = "Нормальный",
  Doubtful = "Сомнительный",
  Pathological = "Патологическая",
  Preterminal = "Претерминальная",
}

interface CTGHistory {
  id: number;
  date: Date;
  gestation: string;
  figo: HistoryStatus;
  forecast: HistoryStatus;
  stv: number;
  hr: number;
  uc: number;
  acceleration: number;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 👉 возвращаем именно ключ enum
function randomStatusKey(): keyof typeof HistoryStatus {
  const keys = Object.keys(HistoryStatus) as (keyof typeof HistoryStatus)[];
  return keys[randInt(0, keys.length - 1)];
}

function randomDateString(): string {
  const day = Math.floor(Math.random() * 20) + 1; // 1–20 число
  const dayStr = String(day).padStart(2, "0");
  return `2025-08-${dayStr}`;
}

export function generateMockHistory(count = 15): string {
  return Array.from({ length: count }, (_, i) => {
    const dateStr = randomDateString();

    const figoKey = randomStatusKey();
    const forecastKey = randomStatusKey();

    return `{
      id: ${i + 1},
      date: new Date("${dateStr}"),
      gestation: "${Math.floor(Math.random() * 4) + 37}+${Math.floor(Math.random() * 7)} нед",
      hr: ${randInt(110, 160)},
      uc: ${randInt(5, 50)},
      stv: ${(Math.random() * 8 + 2).toFixed(1)},
      acceleration: ${randInt(0, 5)},
      figo: HistoryStatus.${figoKey},
      forecast: HistoryStatus.${forecastKey},
    }`;
  }).join(",\n");
}

console.log(generateMockHistory(15));
