export type Unit = "kmh" | "mph";

export const RIMS = [
  { bsd: 622, label: "622 mm (700c / 29 in)" },
  { bsd: 584, label: "584 mm (650b / 27.5 in)" },
  { bsd: 571, label: "571 mm (650c)" },
  { bsd: 559, label: "559 mm (26 in)" },
  { bsd: 406, label: "406 mm (20 in)" },
];

export const TIRE_WIDTHS = [23, 25, 28, 30, 32, 35, 38, 40, 45, 50];

const MAX_CADENCE_COLUMNS = 40;
const KM_PER_MILE = 1.609344;

export function parseTeeth(input: string): number[] {
  return input
    .split(/[\s,;]+/)
    .map((s) => Number(s))
    .filter((n) => Number.isInteger(n) && n > 0 && n <= 100);
}

export function cadenceSteps(from: number, to: number, by: number): number[] {
  if (!(from > 0) || !(to >= from) || !(by > 0)) return [];
  const steps: number[] = [];
  for (let c = from; c <= to && steps.length < MAX_CADENCE_COLUMNS; c += by) {
    steps.push(c);
  }
  return steps;
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

export function toUnit(kmh: number, unit: Unit): number {
  return unit === "kmh" ? kmh : kmh / KM_PER_MILE;
}

export function speedColor(kmh: number): string {
  if (kmh >= 20) return "speed-fast";
  if (kmh >= 10) return "speed-medium";
  return "speed-slow";
}
