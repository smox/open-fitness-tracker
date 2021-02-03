import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CompletedTraining from './completed-training';
import CompletedTrainingDetail from './completed-training-detail';
import CompletedTrainingUpdate from './completed-training-update';
import CompletedTrainingDeleteDialog from './completed-training-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CompletedTrainingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CompletedTrainingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CompletedTrainingDetail} />
      <ErrorBoundaryRoute path={match.url} component={CompletedTraining} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CompletedTrainingDeleteDialog} />
  </>
);

export default Routes;
