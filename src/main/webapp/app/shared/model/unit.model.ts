import { IWeight } from 'app/shared/model/weight.model';
import { ILanguage } from 'app/shared/model/language.model';

export interface IUnit {
  id?: number;
  name?: string;
  shortName?: string;
  weights?: IWeight[];
  language?: ILanguage;
}

export const defaultValue: Readonly<IUnit> = {};
