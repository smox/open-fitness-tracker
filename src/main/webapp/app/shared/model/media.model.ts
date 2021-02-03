import { IUser } from 'app/shared/model/user.model';
import { ITrainingUnit } from 'app/shared/model/training-unit.model';
import { IWorkout } from 'app/shared/model/workout.model';
import { ILanguage } from 'app/shared/model/language.model';

export interface IMedia {
  id?: number;
  name?: string;
  kind?: string;
  binaryDataContentType?: string;
  binaryData?: any;
  additionalInformation?: string;
  user?: IUser;
  trainingUnits?: ITrainingUnit[];
  workouts?: IWorkout[];
  language?: ILanguage;
}

export const defaultValue: Readonly<IMedia> = {};
