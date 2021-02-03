import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './training-unit.reducer';
import { ITrainingUnit } from 'app/shared/model/training-unit.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrainingUnitProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TrainingUnit = (props: ITrainingUnitProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { trainingUnitList, match, loading } = props;
  return (
    <div>
      <h2 id="training-unit-heading">
        <Translate contentKey="openfitnesstrackerApp.trainingUnit.home.title">Training Units</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openfitnesstrackerApp.trainingUnit.home.createLabel">Create new Training Unit</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {trainingUnitList && trainingUnitList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.dayOfWeek">Day Of Week</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.time">Time</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.pauseTime">Pause Time</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.warumupTime">Warumup Time</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.preworkoutCountdownTime">Preworkout Countdown Time</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.workouts">Workouts</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.language">Language</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {trainingUnitList.map((trainingUnit, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${trainingUnit.id}`} color="link" size="sm">
                      {trainingUnit.id}
                    </Button>
                  </td>
                  <td>{trainingUnit.name}</td>
                  <td>
                    <Translate contentKey={`openfitnesstrackerApp.DayOfWeek.${trainingUnit.dayOfWeek}`} />
                  </td>
                  <td>{trainingUnit.time}</td>
                  <td>{trainingUnit.pauseTime}</td>
                  <td>{trainingUnit.warumupTime}</td>
                  <td>{trainingUnit.preworkoutCountdownTime}</td>
                  <td>{trainingUnit.user ? trainingUnit.user.id : ''}</td>
                  <td>
                    {trainingUnit.workouts
                      ? trainingUnit.workouts.map((val, j) => (
                          <span key={j}>
                            <Link to={`workout/${val.id}`}>{val.id}</Link>
                            {j === trainingUnit.workouts.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {trainingUnit.language ? <Link to={`language/${trainingUnit.language.id}`}>{trainingUnit.language.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${trainingUnit.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${trainingUnit.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${trainingUnit.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openfitnesstrackerApp.trainingUnit.home.notFound">No Training Units found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ trainingUnit }: IRootState) => ({
  trainingUnitList: trainingUnit.entities,
  loading: trainingUnit.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TrainingUnit);
