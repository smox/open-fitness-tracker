import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TargetWeight from './target-weight';
import TargetWeightDetail from './target-weight-detail';
import TargetWeightUpdate from './target-weight-update';
import TargetWeightDeleteDialog from './target-weight-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TargetWeightUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TargetWeightUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TargetWeightDetail} />
      <ErrorBoundaryRoute path={match.url} component={TargetWeight} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TargetWeightDeleteDialog} />
  </>
);

export default Routes;
