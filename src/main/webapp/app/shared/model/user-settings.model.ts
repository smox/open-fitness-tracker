import { IUser } from 'app/shared/model/user.model';
import { ILanguage } from 'app/shared/model/language.model';

export interface IUserSettings {
  id?: number;
  selectedTheme?: string;
  defaultWarmupTime?: number;
  defaultPreWorkoutTime?: number;
  defaultSetCount?: number;
  user?: IUser;
  selectedLanguage?: ILanguage;
}

export const defaultValue: Readonly<IUserSettings> = {};
