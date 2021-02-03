import { Moment } from 'moment';
import { ICompletedSet } from 'app/shared/model/completed-set.model';
import { IUser } from 'app/shared/model/user.model';
import { ITrainingUnit } from 'app/shared/model/training-unit.model';

export interface ICompletedTraining {
  id?: number;
  startDate?: string;
  endDate?: string;
  completedSets?: ICompletedSet[];
  user?: IUser;
  trainingUnits?: ITrainingUnit;
}

export const defaultValue: Readonly<ICompletedTraining> = {};
