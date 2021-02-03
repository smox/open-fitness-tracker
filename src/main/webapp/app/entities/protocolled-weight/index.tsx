import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProtocolledWeight from './protocolled-weight';
import ProtocolledWeightDetail from './protocolled-weight-detail';
import ProtocolledWeightUpdate from './protocolled-weight-update';
import ProtocolledWeightDeleteDialog from './protocolled-weight-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProtocolledWeightUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProtocolledWeightUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProtocolledWeightDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProtocolledWeight} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProtocolledWeightDeleteDialog} />
  </>
);

export default Routes;
