import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TrainingUnit from './training-unit';
import TrainingUnitDetail from './training-unit-detail';
import TrainingUnitUpdate from './training-unit-update';
import TrainingUnitDeleteDialog from './training-unit-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TrainingUnitUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TrainingUnitUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TrainingUnitDetail} />
      <ErrorBoundaryRoute path={match.url} component={TrainingUnit} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TrainingUnitDeleteDialog} />
  </>
);

export default Routes;
