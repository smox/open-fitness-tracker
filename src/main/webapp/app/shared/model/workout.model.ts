import { ICompletedSet } from 'app/shared/model/completed-set.model';
import { IUser } from 'app/shared/model/user.model';
import { ILanguage } from 'app/shared/model/language.model';
import { ITrainingUnit } from 'app/shared/model/training-unit.model';
import { IMedia } from 'app/shared/model/media.model';

export interface IWorkout {
  id?: number;
  name?: string;
  sets?: number;
  completedSets?: ICompletedSet[];
  user?: IUser;
  language?: ILanguage;
  trainingUnits?: ITrainingUnit[];
  medias?: IMedia[];
}

export const defaultValue: Readonly<IWorkout> = {};
