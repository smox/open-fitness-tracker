import { ICompletedTraining } from 'app/shared/model/completed-training.model';
import { IUser } from 'app/shared/model/user.model';
import { IWorkout } from 'app/shared/model/workout.model';
import { ILanguage } from 'app/shared/model/language.model';
import { ITrainingSchedule } from 'app/shared/model/training-schedule.model';
import { IMedia } from 'app/shared/model/media.model';
import { DayOfWeek } from 'app/shared/model/enumerations/day-of-week.model';

export interface ITrainingUnit {
  id?: number;
  name?: string;
  dayOfWeek?: DayOfWeek;
  time?: string;
  pauseTime?: number;
  warumupTime?: number;
  preworkoutCountdownTime?: number;
  completedTrainings?: ICompletedTraining[];
  user?: IUser;
  workouts?: IWorkout[];
  language?: ILanguage;
  trainingSchedules?: ITrainingSchedule[];
  medias?: IMedia[];
}

export const defaultValue: Readonly<ITrainingUnit> = {};
