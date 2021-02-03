import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export interface INutrition {
  id?: number;
  time?: string;
  carbs?: number;
  fat?: number;
  protein?: number;
  fiber?: number;
  kcal?: number;
  user?: IUser;
}

export const defaultValue: Readonly<INutrition> = {};
