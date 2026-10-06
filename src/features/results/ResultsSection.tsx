import type { GearPair } from "../../gear";
import { SpeedTable } from "./SpeedTable";

type Props = {
  gears: GearPair[];
  cadences: number[];
  circumference: number;
};

export function ResultsSection({
  gears,
  cadences,
  circumference,
}: Props) {
  const unitLabel = "km/h";
  const cadenceLabel = cadences.length
    ? `${cadences[0]}–${cadences[cadences.length - 1]}`
    : "your selected range";

  return (
    <section className="results" aria-live="polite">
      <div className="results-heading">
        <div>
          <p className="eyebrow">YOUR GEAR RANGE</p>
          <h2>How fast at {cadenceLabel} rpm?</h2>
        </div>
        <span className="unit-note">Speed in {unitLabel}</span>
      </div>

      {gears.length === 0 || cadences.length === 0 ? (
        <p className="empty-state">
          Enter valid gear teeth and a cadence range to see your speeds.
        </p>
      ) : (
        <SpeedTable
          gears={gears}
          cadences={cadences}
          circumference={circumference}
        />
      )}

      <p className="legend">
        <span className="legend-dot legend-fast" /> 20+ {unitLabel}
        <span className="legend-dot legend-medium" /> 10–20 {unitLabel}
        <span className="legend-dot legend-slow" /> Under 10 {unitLabel}
      </p>
    </section>
  );
}