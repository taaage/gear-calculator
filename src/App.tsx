import { useMemo, useState } from "react";
import {
  RIMS,
  TIRE_WIDTHS,
  cadenceSteps,
  parseTeeth,
  speedColor,
  speedKmh,
  toUnit,
  wheelCircumferenceM,
  type Unit,
} from "./gear";

const gearInput = "gear-input";

export default function App() {
  const [chainrings, setChainrings] = useState("38");
  const [sprockets, setSprockets] = useState("11,32");
  const [unit, setUnit] = useState<Unit>("kmh");
  const [bsd, setBsd] = useState(622);
  const [tire, setTire] = useState(28);
  const [cadFrom, setCadFrom] = useState(70);
  const [cadTo, setCadTo] = useState(100);
  const [cadBy, setCadBy] = useState(5);

  const rings = useMemo(() => parseTeeth(chainrings), [chainrings]);
  const cogs = useMemo(() => parseTeeth(sprockets), [sprockets]);
  const cadences = useMemo(
    () => cadenceSteps(cadFrom, cadTo, cadBy),
    [cadFrom, cadTo, cadBy]
  );
  const circumference = wheelCircumferenceM(bsd, tire);
  const gears = rings.flatMap((ring) => cogs.map((cog) => ({ ring, cog })));
  const unitLabel = unit === "kmh" ? "km/h" : "mph";
  const cadenceLabel = cadences.length
    ? `${cadences[0]}–${cadences[cadences.length - 1]}`
    : "your selected range";

  return (
    <main className="calculator">
      <header className="page-heading">
        <p className="eyebrow">RIDE SETUP</p>
        <h1>Gear speed calculator</h1>
      </header>

      <section className="settings" aria-label="Calculator settings">
        <div className="settings-grid">
          <label className="setting-row">
            <span className="setting-label">Chainrings</span>
          <input
            className={gearInput}
            value={chainrings}
            onChange={(e) => setChainrings(e.target.value)}
            aria-label="Chainring teeth, comma-separated"
          />
          </label>

          <label className="setting-row">
            <span className="setting-label">Rim size</span>
            <select
              className={gearInput}
              value={bsd}
              onChange={(e) => setBsd(Number(e.target.value))}
            >
              {RIMS.map((r) => (
                <option key={r.bsd} value={r.bsd}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>

          <label className="setting-row">
            <span className="setting-label">Sprockets</span>
          <input
            className={gearInput}
            value={sprockets}
            onChange={(e) => setSprockets(e.target.value)}
            aria-label="Sprocket teeth, comma-separated"
          />
          </label>

          <label className="setting-row">
            <span className="setting-label">Tire size</span>
            <select
              className={`${gearInput} tire-select`}
              value={tire}
              onChange={(e) => setTire(Number(e.target.value))}
            >
              {TIRE_WIDTHS.map((w) => (
                <option key={w} value={w}>
                  {w} mm
                </option>
              ))}
            </select>
          </label>

          <fieldset className="setting-row unit-setting">
            <legend className="setting-label">Units</legend>
            <div className="unit-switch">
              <label>
                <input
                  type="radio"
                  name="unit"
                  checked={unit === "kmh"}
                  onChange={() => setUnit("kmh")}
                />
                <span>km/h</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="unit"
                  checked={unit === "mph"}
                  onChange={() => setUnit("mph")}
                />
                <span>mph</span>
              </label>
            </div>
          </fieldset>

          <div className="setting-row cadence-setting">
            <span className="setting-label">Cadence</span>
            <div className="cadence-inputs">
            <input
              type="number"
              className={`${gearInput} cadence-input`}
              value={cadFrom}
              min={1}
              aria-label="Starting cadence in rpm"
              onChange={(e) => setCadFrom(Number(e.target.value))}
            />
            <span className="range-word">to</span>
            <input
              type="number"
              className={`${gearInput} cadence-input`}
              value={cadTo}
              min={1}
              aria-label="Ending cadence in rpm"
              onChange={(e) => setCadTo(Number(e.target.value))}
            />
            <span className="range-word">by</span>
            <input
              type="number"
              className={`${gearInput} cadence-input cadence-step`}
              value={cadBy}
              min={1}
              aria-label="Cadence increment in rpm"
              onChange={(e) => setCadBy(Number(e.target.value))}
            />
            <span className="rpm-label">rpm</span>
          </div>
        </div>
        </div>

        <div className="settings-foot">
          <span>Wheel circumference</span>
          <strong>{(circumference * 1000).toFixed(0)} mm</strong>
        </div>
      </section>

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
          <div className="table-scroll">
            <table className="speed-table" aria-label={`Gear speeds in ${unitLabel}`}>
              <thead>
                <tr className="text-text-secondary">
                  <th className="gear-column" scope="col">
                    <span>Gear</span>
                  </th>
                  {cadences.map((c) => (
                    <th key={c} scope="col">
                      {c}
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
                    {cadences.map((c) => {
                      const kmh = speedKmh(ring, cog, c, circumference);
                      const displayedSpeed = toUnit(kmh, unit);
                      return (
                        <td
                          key={c}
                          className={speedColor(displayedSpeed)}
                        >
                          {displayedSpeed.toFixed(1)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="legend">
          <span className="legend-dot legend-fast" /> 20+ {unitLabel}
          <span className="legend-dot legend-medium" /> 10–20 {unitLabel}
          <span className="legend-dot legend-slow" /> Under 10 {unitLabel}
        </p>
      </section>
    </main>
  );
}
