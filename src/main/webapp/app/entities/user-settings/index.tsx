import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserSettings from './user-settings';
import UserSettingsDetail from './user-settings-detail';
import UserSettingsUpdate from './user-settings-update';
import UserSettingsDeleteDialog from './user-settings-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserSettingsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserSettingsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserSettingsDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserSettings} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserSettingsDeleteDialog} />
  </>
);

export default Routes;
