import { RIMS, TIRE_WIDTHS } from "../../gear";
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

        <fieldset className="setting-row unit-setting">
          <legend className="setting-label">Units</legend>
          <div className="unit-switch">
            <label>
              <input
                type="radio"
                name="unit"
                checked={settings.unit === "kmh"}
                onChange={() => onSettingChange("unit", "kmh")}
              />
              <span>km/h</span>
            </label>
            <label>
              <input
                type="radio"
                name="unit"
                checked={settings.unit === "mph"}
                onChange={() => onSettingChange("unit", "mph")}
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
              value={settings.cadFrom}
              min={1}
              aria-label="Starting cadence in rpm"
              onChange={(event) =>
                onSettingChange("cadFrom", Number(event.target.value))
              }
            />
            <span className="range-word">to</span>
            <input
              type="number"
              className={`${gearInput} cadence-input`}
              value={settings.cadTo}
              min={1}
              aria-label="Ending cadence in rpm"
              onChange={(event) =>
                onSettingChange("cadTo", Number(event.target.value))
              }
            />
            <span className="range-word">by</span>
            <input
              type="number"
              className={`${gearInput} cadence-input cadence-step`}
              value={settings.cadBy}
              min={1}
              aria-label="Cadence increment in rpm"
              onChange={(event) =>
                onSettingChange("cadBy", Number(event.target.value))
              }
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
  );
}