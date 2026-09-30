import { speedColor, speedKmh, toUnit, type GearPair, type Unit } from "../../gear";

type Props = {
  gears: GearPair[];
  cadences: number[];
  circumference: number;
  unit: Unit;
};

export function SpeedTable({ gears, cadences, circumference, unit }: Props) {
  const unitLabel = unit === "kmh" ? "km/h" : "mph";

  return (
    <div className="table-scroll">
      <table className="speed-table" aria-label={`Gear speeds in ${unitLabel}`}>
        <thead>
          <tr className="text-text-secondary">
            <th className="gear-column" scope="col">
              <span>Gear</span>
            </th>
            {cadences.map((cadence) => (
              <th key={cadence} scope="col">
                {cadence}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {gears.map(({ ring, cog }) => (
            <tr key={`${ring}x${cog}`}>
              <th scope="row" className="gear-column gear-name">
                <span>{ring}×{cog}</span>
              </th>
              {cadences.map((cadence) => {
                const kmh = speedKmh(ring, cog, cadence, circumference);
                const speed = toUnit(kmh, unit);
                return (
                  <td key={cadence} className={speedColor(speed)}>
                    {speed.toFixed(1)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}