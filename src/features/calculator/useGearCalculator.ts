import { useMemo, useState } from "react";
import {
  cadenceSteps,
  parseTeeth,
  wheelCircumferenceM,
  type GearPair,
} from "../../gear";

export type CalculatorSettings = {
  chainrings: string;
  sprockets: string;
  bsd: number;
  tire: number;
  cadFrom: number;
  cadTo: number;
  cadBy: number;
};

export type SettingUpdater = <K extends keyof CalculatorSettings>(
  key: K,
  value: CalculatorSettings[K],
) => void;

const DEFAULT_SETTINGS: CalculatorSettings = {
  chainrings: "38",
  sprockets: "11,32",
  bsd: 622,
  tire: 28,
  cadFrom: 70,
  cadTo: 100,
  cadBy: 5,
};

export function useGearCalculator() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const updateSetting: SettingUpdater = (key, value) =>
    setSettings((current) => ({ ...current, [key]: value }));

  const rings = useMemo(
    () => parseTeeth(settings.chainrings),
    [settings.chainrings],
  );
  const cogs = useMemo(() => parseTeeth(settings.sprockets), [settings.sprockets]);
  const cadences = useMemo(
    () => cadenceSteps(settings.cadFrom, settings.cadTo, settings.cadBy),
    [settings.cadFrom, settings.cadTo, settings.cadBy],
  );
  const circumference = wheelCircumferenceM(settings.bsd, settings.tire);
  const gears: GearPair[] = rings.flatMap((ring) =>
    cogs.map((cog) => ({ ring, cog })),
  );

  return {
    settings,
    updateSetting,
    circumference,
    gears,
    cadences,
  };
}