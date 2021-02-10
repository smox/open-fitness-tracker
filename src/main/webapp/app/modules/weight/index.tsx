import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import WeightAdd from './add/add';
import { ProtocolledWeightDeleteDialog } from 'app/entities/protocolled-weight/protocolled-weight-delete-dialog';


const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/add`} component={WeightAdd} />
  </div>
);

export default Routes;
