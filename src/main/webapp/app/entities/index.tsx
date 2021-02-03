import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApplicationSettings from './application-settings';
import UserSettings from './user-settings';
import TrainingSchedule from './training-schedule';
import TrainingUnit from './training-unit';
import Workout from './workout';
import CompletedTraining from './completed-training';
import CompletedSet from './completed-set';
import Nutrition from './nutrition';
import TargetWeight from './target-weight';
import ProtocolledWeight from './protocolled-weight';
import Weight from './weight';
import Unit from './unit';
import Media from './media';
import Language from './language';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}application-settings`} component={ApplicationSettings} />
      <ErrorBoundaryRoute path={`${match.url}user-settings`} component={UserSettings} />
      <ErrorBoundaryRoute path={`${match.url}training-schedule`} component={TrainingSchedule} />
      <ErrorBoundaryRoute path={`${match.url}training-unit`} component={TrainingUnit} />
      <ErrorBoundaryRoute path={`${match.url}workout`} component={Workout} />
      <ErrorBoundaryRoute path={`${match.url}completed-training`} component={CompletedTraining} />
      <ErrorBoundaryRoute path={`${match.url}completed-set`} component={CompletedSet} />
      <ErrorBoundaryRoute path={`${match.url}nutrition`} component={Nutrition} />
      <ErrorBoundaryRoute path={`${match.url}target-weight`} component={TargetWeight} />
      <ErrorBoundaryRoute path={`${match.url}protocolled-weight`} component={ProtocolledWeight} />
      <ErrorBoundaryRoute path={`${match.url}weight`} component={Weight} />
      <ErrorBoundaryRoute path={`${match.url}unit`} component={Unit} />
      <ErrorBoundaryRoute path={`${match.url}media`} component={Media} />
      <ErrorBoundaryRoute path={`${match.url}language`} component={Language} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
