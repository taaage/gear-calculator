export type GearPair = { ring: number; cog: number };

export const RIMS = [
  { bsd: 622, label: "622 mm (700c / 29 in)" },
  { bsd: 584, label: "584 mm (650b / 27.5 in)" },
  { bsd: 571, label: "571 mm (650c)" },
  { bsd: 559, label: "559 mm (26 in)" },
  { bsd: 406, label: "406 mm (20 in)" },
];

export const TIRE_WIDTHS = [23, 25, 28, 30, 32, 35, 38, 40, 45, 50];

export const MIN_CADENCE_RPM = 40;
export const MAX_CADENCE_RPM = 160;
export const MAX_CADENCE_COLUMNS = 40;
export const CADENCE_INTERVALS = [1, 2, 5, 10] as const;

export function parseTeeth(input: string): number[] {
  return input
    .split(/[\s,;]+/)
    .map((s) => Number(s))
    .filter((n) => Number.isInteger(n) && n > 0 && n <= 100);
}

export function cadenceSteps(from: number, to: number, by: number): number[] {
  if (!(from > 0) || !(to >= from) || !(by > 0)) return [];
  if (cadenceColumnCount(from, to, by) > MAX_CADENCE_COLUMNS) return [];
  const steps: number[] = [];
  for (let c = from; c <= to; c += by) {
    steps.push(c);
  }
  return steps;
}

export function cadenceColumnCount(from: number, to: number, by: number): number {
  if (!(from > 0) || !(to >= from) || !(by > 0)) return 0;
  return Math.floor((to - from) / by) + 1;
}

// Approximates tire height as equal to its width.
export function wheelCircumferenceM(bsd: number, tireMm: number): number {
  return (Math.PI * (bsd + 2 * tireMm)) / 1000;
}

export function speedKmh(
  chainring: number,
  sprocket: number,
  cadence: number,
  circumferenceM: number
): number {
  return (cadence * (chainring / sprocket) * circumferenceM * 60) / 1000;
}

export function speedColor(kmh: number): string {
  if (kmh >= 20) return "speed-fast";
  if (kmh >= 10) return "speed-medium";
  return "speed-slow";
}
