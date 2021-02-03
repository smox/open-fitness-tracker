import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { ITrainingUnit } from 'app/shared/model/training-unit.model';
import { ILanguage } from 'app/shared/model/language.model';

export interface ITrainingSchedule {
  id?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  user?: IUser;
  trainingUnits?: ITrainingUnit[];
  language?: ILanguage;
}

export const defaultValue: Readonly<ITrainingSchedule> = {};
