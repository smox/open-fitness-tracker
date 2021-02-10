import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './application-settings.reducer';


export interface IApplicationSettingsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ApplicationSettings = (props: IApplicationSettingsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { applicationSettingsList, match, loading } = props;
  return (
    <div>
      <h2 id="application-settings-heading">
        <Translate contentKey="openfitnesstrackerApp.applicationSettings.home.title">Application Settings</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openfitnesstrackerApp.applicationSettings.home.createLabel">Create new Application Settings</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {applicationSettingsList && applicationSettingsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.applicationSettings.defaultTheme">Default Theme</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.applicationSettings.defaultWarmupTime">Default Warmup Time</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.applicationSettings.defaultPreWorkoutTime">
                    Default Pre Workout Time
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.applicationSettings.defaultSetCount">Default Set Count</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {applicationSettingsList.map((applicationSettings, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${applicationSettings.id}`} color="link" size="sm">
                      {applicationSettings.id}
                    </Button>
                  </td>
                  <td>{applicationSettings.defaultTheme}</td>
                  <td>{applicationSettings.defaultWarmupTime}</td>
                  <td>{applicationSettings.defaultPreWorkoutTime}</td>
                  <td>{applicationSettings.defaultSetCount}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${applicationSettings.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${applicationSettings.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${applicationSettings.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openfitnesstrackerApp.applicationSettings.home.notFound">No Application Settings found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ applicationSettings }: IRootState) => ({
  applicationSettingsList: applicationSettings.entities,
  loading: applicationSettings.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationSettings);
