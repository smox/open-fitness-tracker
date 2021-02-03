export interface IApplicationSettings {
  id?: number;
  defaultTheme?: string;
  defaultWarmupTime?: number;
  defaultPreWorkoutTime?: number;
  defaultSetCount?: number;
}

export const defaultValue: Readonly<IApplicationSettings> = {};
