import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApplicationSettings from './application-settings';
import ApplicationSettingsDetail from './application-settings-detail';
import ApplicationSettingsUpdate from './application-settings-update';
import ApplicationSettingsDeleteDialog from './application-settings-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApplicationSettingsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApplicationSettingsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApplicationSettingsDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApplicationSettings} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ApplicationSettingsDeleteDialog} />
  </>
);

export default Routes;
