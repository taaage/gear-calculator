import { speedColor, speedKmh, type GearPair } from "../../gear";

type Props = {
  gears: GearPair[];
  cadences: number[];
  circumference: number;
};

export function SpeedTable({ gears, cadences, circumference }: Props) {
  return (
    <div className="table-scroll">
      <table className="speed-table" aria-label="Gear speeds in km/h">
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
                return (
                  <td key={cadence} className={speedColor(kmh)}>
                    {kmh.toFixed(1)}
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