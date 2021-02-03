import { IUserSettings } from 'app/shared/model/user-settings.model';
import { ITrainingSchedule } from 'app/shared/model/training-schedule.model';
import { ITrainingUnit } from 'app/shared/model/training-unit.model';
import { IWorkout } from 'app/shared/model/workout.model';
import { IUnit } from 'app/shared/model/unit.model';
import { IMedia } from 'app/shared/model/media.model';

export interface ILanguage {
  id?: number;
  name?: string;
  shortName?: string;
  userSettings?: IUserSettings[];
  trainingSchedules?: ITrainingSchedule[];
  trainingUnits?: ITrainingUnit[];
  workouts?: IWorkout[];
  units?: IUnit[];
  medias?: IMedia[];
}

export const defaultValue: Readonly<ILanguage> = {};
