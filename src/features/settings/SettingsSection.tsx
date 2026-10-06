import {
  CADENCE_INTERVALS,
  MAX_CADENCE_RPM,
  MIN_CADENCE_RPM,
  RIMS,
  TIRE_WIDTHS,
} from "../../gear";
import type {
  CalculatorSettings,
  SettingUpdater,
} from "../calculator/useGearCalculator";

type Props = {
  settings: CalculatorSettings;
  circumference: number;
  onSettingChange: SettingUpdater;
};

const gearInput = "gear-input";

export function SettingsSection({
  settings,
  circumference,
  onSettingChange,
}: Props) {
  return (
    <section className="settings" aria-label="Calculator settings">
      <div className="settings-grid">
        <label className="setting-row">
          <span className="setting-label">Chainrings</span>
          <input
            className={gearInput}
            value={settings.chainrings}
            onChange={(event) =>
              onSettingChange("chainrings", event.target.value)
            }
            aria-label="Chainring teeth, comma-separated"
          />
        </label>

        <label className="setting-row">
          <span className="setting-label">Rim size</span>
          <select
            className={gearInput}
            value={settings.bsd}
            onChange={(event) =>
              onSettingChange("bsd", Number(event.target.value))
            }
          >
            {RIMS.map((rim) => (
              <option key={rim.bsd} value={rim.bsd}>
                {rim.label}
              </option>
            ))}
          </select>
        </label>

        <label className="setting-row">
          <span className="setting-label">Sprockets</span>
          <input
            className={gearInput}
            value={settings.sprockets}
            onChange={(event) =>
              onSettingChange("sprockets", event.target.value)
            }
            aria-label="Sprocket teeth, comma-separated"
          />
        </label>

        <label className="setting-row">
          <span className="setting-label">Tire size</span>
          <select
            className={`${gearInput} tire-select`}
            value={settings.tire}
            onChange={(event) =>
              onSettingChange("tire", Number(event.target.value))
            }
          >
            {TIRE_WIDTHS.map((width) => (
              <option key={width} value={width}>
                {width} mm
              </option>
            ))}
          </select>
        </label>

        <div className="setting-row cadence-setting">
          <span className="setting-label">Cadence</span>
          <div className="cadence-controls">
            <label className="cadence-slider">
              <span className="cadence-slider-heading">
                <span>Min RPM</span>
                <output>{settings.cadFrom}</output>
              </span>
              <input
                type="range"
                min={MIN_CADENCE_RPM}
                max={settings.cadTo}
                step={1}
                value={settings.cadFrom}
                aria-label="Minimum cadence in RPM"
                onChange={(event) =>
                  onSettingChange("cadFrom", Number(event.target.value))
                }
              />
            </label>

            <label className="cadence-slider">
              <span className="cadence-slider-heading">
                <span>Max RPM</span>
                <output>{settings.cadTo}</output>
              </span>
              <input
                type="range"
                min={settings.cadFrom}
                max={MAX_CADENCE_RPM}
                step={1}
                value={settings.cadTo}
                aria-label="Maximum cadence in RPM"
                onChange={(event) =>
                  onSettingChange("cadTo", Number(event.target.value))
                }
              />
            </label>

            <fieldset className="cadence-interval">
              <legend>Interval</legend>
              <div className="cadence-interval-options">
                {CADENCE_INTERVALS.map((interval) => (
                  <label key={interval}>
                    <input
                      type="radio"
                      name="cadence-interval"
                      checked={settings.cadBy === interval}
                      onChange={() => onSettingChange("cadBy", interval)}
                    />
                    <span>{interval}</span>
                  </label>
                ))}
              </div>
              <span className="cadence-rpm-unit">rpm</span>
            </fieldset>

            <p className="cadence-hint">
              Choose up to 40 cadence values. Narrow the range or increase the
              interval if it is too wide.
            </p>
          </div>
        </div>
      </div>

      <div className="settings-foot">
        <span>Wheel circumference</span>
        <strong>{(circumference * 1000).toFixed(0)} mm</strong>
      </div>
    </section>
  );
}