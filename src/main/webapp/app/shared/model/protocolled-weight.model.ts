import { Moment } from 'moment';
import { IWeight } from 'app/shared/model/weight.model';
import { IUser } from 'app/shared/model/user.model';

export interface IProtocolledWeight {
  id?: number;
  time?: string;
  weight?: IWeight;
  user?: IUser;
}

export const defaultValue: Readonly<IProtocolledWeight> = {};
