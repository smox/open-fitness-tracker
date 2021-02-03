import { Moment } from 'moment';
import { IWeight } from 'app/shared/model/weight.model';
import { IUser } from 'app/shared/model/user.model';

export interface ITargetWeight {
  id?: number;
  startDate?: string;
  endDate?: string;
  weight?: IWeight;
  user?: IUser;
}

export const defaultValue: Readonly<ITargetWeight> = {};
