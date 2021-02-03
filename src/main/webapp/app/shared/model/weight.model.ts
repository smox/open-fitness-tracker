import { ITargetWeight } from 'app/shared/model/target-weight.model';
import { IProtocolledWeight } from 'app/shared/model/protocolled-weight.model';
import { ICompletedSet } from 'app/shared/model/completed-set.model';
import { IUnit } from 'app/shared/model/unit.model';

export interface IWeight {
  id?: number;
  amount?: number;
  targetWeight?: ITargetWeight;
  protocolledWeight?: IProtocolledWeight;
  completedSet?: ICompletedSet;
  units?: IUnit;
}

export const defaultValue: Readonly<IWeight> = {};
