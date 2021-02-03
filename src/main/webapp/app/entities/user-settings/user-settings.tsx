import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-settings.reducer';
import { IUserSettings } from 'app/shared/model/user-settings.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserSettingsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const UserSettings = (props: IUserSettingsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { userSettingsList, match, loading } = props;
  return (
    <div>
      <h2 id="user-settings-heading">
        <Translate contentKey="openfitnesstrackerApp.userSettings.home.title">User Settings</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openfitnesstrackerApp.userSettings.home.createLabel">Create new User Settings</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {userSettingsList && userSettingsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.userSettings.selectedTheme">Selected Theme</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.userSettings.defaultWarmupTime">Default Warmup Time</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.userSettings.defaultPreWorkoutTime">Default Pre Workout Time</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.userSettings.defaultSetCount">Default Set Count</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.userSettings.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.userSettings.selectedLanguage">Selected Language</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userSettingsList.map((userSettings, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${userSettings.id}`} color="link" size="sm">
                      {userSettings.id}
                    </Button>
                  </td>
                  <td>{userSettings.selectedTheme}</td>
                  <td>{userSettings.defaultWarmupTime}</td>
                  <td>{userSettings.defaultPreWorkoutTime}</td>
                  <td>{userSettings.defaultSetCount}</td>
                  <td>{userSettings.user ? userSettings.user.id : ''}</td>
                  <td>
                    {userSettings.selectedLanguage ? (
                      <Link to={`language/${userSettings.selectedLanguage.id}`}>{userSettings.selectedLanguage.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userSettings.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userSettings.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userSettings.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="openfitnesstrackerApp.userSettings.home.notFound">No User Settings found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ userSettings }: IRootState) => ({
  userSettingsList: userSettings.entities,
  loading: userSettings.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
