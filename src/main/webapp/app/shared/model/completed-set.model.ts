import { IWeight } from 'app/shared/model/weight.model';
import { IUser } from 'app/shared/model/user.model';
import { ICompletedTraining } from 'app/shared/model/completed-training.model';
import { IWorkout } from 'app/shared/model/workout.model';

export interface ICompletedSet {
  id?: number;
  set?: number;
  repetitions?: number;
  weight?: IWeight;
  user?: IUser;
  completedTrainings?: ICompletedTraining;
  workouts?: IWorkout;
}

export const defaultValue: Readonly<ICompletedSet> = {};
