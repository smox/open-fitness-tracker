import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TrainingSchedule from './training-schedule';
import TrainingScheduleDetail from './training-schedule-detail';
import TrainingScheduleUpdate from './training-schedule-update';
import TrainingScheduleDeleteDialog from './training-schedule-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TrainingScheduleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TrainingScheduleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TrainingScheduleDetail} />
      <ErrorBoundaryRoute path={match.url} component={TrainingSchedule} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TrainingScheduleDeleteDialog} />
  </>
);

export default Routes;
