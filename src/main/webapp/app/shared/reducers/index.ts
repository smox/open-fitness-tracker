import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import applicationSettings, {
  ApplicationSettingsState
} from 'app/entities/application-settings/application-settings.reducer';
// prettier-ignore
import userSettings, {
  UserSettingsState
} from 'app/entities/user-settings/user-settings.reducer';
// prettier-ignore
import trainingSchedule, {
  TrainingScheduleState
} from 'app/entities/training-schedule/training-schedule.reducer';
// prettier-ignore
import trainingUnit, {
  TrainingUnitState
} from 'app/entities/training-unit/training-unit.reducer';
// prettier-ignore
import workout, {
  WorkoutState
} from 'app/entities/workout/workout.reducer';
// prettier-ignore
import completedTraining, {
  CompletedTrainingState
} from 'app/entities/completed-training/completed-training.reducer';
// prettier-ignore
import completedSet, {
  CompletedSetState
} from 'app/entities/completed-set/completed-set.reducer';
// prettier-ignore
import nutrition, {
  NutritionState
} from 'app/entities/nutrition/nutrition.reducer';
// prettier-ignore
import targetWeight, {
  TargetWeightState
} from 'app/entities/target-weight/target-weight.reducer';
// prettier-ignore
import protocolledWeight, {
  ProtocolledWeightState
} from 'app/entities/protocolled-weight/protocolled-weight.reducer';
// prettier-ignore
import weight, {
  WeightState
} from 'app/entities/weight/weight.reducer';
// prettier-ignore
import unit, {
  UnitState
} from 'app/entities/unit/unit.reducer';
// prettier-ignore
import media, {
  MediaState
} from 'app/entities/media/media.reducer';
// prettier-ignore
import language, {
  LanguageState
} from 'app/entities/language/language.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly applicationSettings: ApplicationSettingsState;
  readonly userSettings: UserSettingsState;
  readonly trainingSchedule: TrainingScheduleState;
  readonly trainingUnit: TrainingUnitState;
  readonly workout: WorkoutState;
  readonly completedTraining: CompletedTrainingState;
  readonly completedSet: CompletedSetState;
  readonly nutrition: NutritionState;
  readonly targetWeight: TargetWeightState;
  readonly protocolledWeight: ProtocolledWeightState;
  readonly weight: WeightState;
  readonly unit: UnitState;
  readonly media: MediaState;
  readonly language: LanguageState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  applicationSettings,
  userSettings,
  trainingSchedule,
  trainingUnit,
  workout,
  completedTraining,
  completedSet,
  nutrition,
  targetWeight,
  protocolledWeight,
  weight,
  unit,
  media,
  language,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
