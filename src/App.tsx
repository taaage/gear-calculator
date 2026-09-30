import { ResultsSection } from "./features/results/ResultsSection";
import { SettingsSection } from "./features/settings/SettingsSection";
import { useGearCalculator } from "./features/calculator/useGearCalculator";

export default function App() {
  const { settings, updateSetting, circumference, gears, cadences } =
    useGearCalculator();

  return (
    <main className="calculator">
      <header className="page-heading">
        <p className="eyebrow">RIDE SETUP</p>
        <h1>Gear speed calculator</h1>
      </header>
      <SettingsSection
        settings={settings}
        circumference={circumference}
        onSettingChange={updateSetting}
      />
      <ResultsSection
        gears={gears}
        cadences={cadences}
        circumference={circumference}
        unit={settings.unit}
      />
    </main>
  );
}
