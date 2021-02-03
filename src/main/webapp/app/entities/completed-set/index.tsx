import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CompletedSet from './completed-set';
import CompletedSetDetail from './completed-set-detail';
import CompletedSetUpdate from './completed-set-update';
import CompletedSetDeleteDialog from './completed-set-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CompletedSetUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CompletedSetUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CompletedSetDetail} />
      <ErrorBoundaryRoute path={match.url} component={CompletedSet} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CompletedSetDeleteDialog} />
  </>
);

export default Routes;
