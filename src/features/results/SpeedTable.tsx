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
            <th className="cadence-column" scope="col">
              Cadence
            </th>
            {gears.map(({ ring, cog }) => (
              <th key={`${ring}x${cog}`} scope="col">
                {ring}×{cog}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cadences.map((cadence) => (
            <tr key={cadence}>
              <th scope="row" className="cadence-column">
                {cadence} rpm
              </th>
              {gears.map(({ ring, cog }) => {
                const kmh = speedKmh(ring, cog, cadence, circumference);
                return (
                  <td key={`${ring}x${cog}`} className={speedColor(kmh)}>
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