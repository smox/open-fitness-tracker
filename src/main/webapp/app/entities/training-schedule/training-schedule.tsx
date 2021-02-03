import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './training-schedule.reducer';
import { ITrainingSchedule } from 'app/shared/model/training-schedule.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrainingScheduleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TrainingSchedule = (props: ITrainingScheduleProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { trainingScheduleList, match, loading } = props;
  return (
    <div>
      <h2 id="training-schedule-heading">
        <Translate contentKey="openfitnesstrackerApp.trainingSchedule.home.title">Training Schedules</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openfitnesstrackerApp.trainingSchedule.home.createLabel">Create new Training Schedule</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {trainingScheduleList && trainingScheduleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingSchedule.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingSchedule.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingSchedule.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingSchedule.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingSchedule.trainingUnits">Training Units</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.trainingSchedule.language">Language</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {trainingScheduleList.map((trainingSchedule, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${trainingSchedule.id}`} color="link" size="sm">
                      {trainingSchedule.id}
                    </Button>
                  </td>
                  <td>{trainingSchedule.name}</td>
                  <td>
                    {trainingSchedule.startDate ? (
                      <TextFormat type="date" value={trainingSchedule.startDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {trainingSchedule.endDate ? <TextFormat type="date" value={trainingSchedule.endDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{trainingSchedule.user ? trainingSchedule.user.id : ''}</td>
                  <td>
                    {trainingSchedule.trainingUnits
                      ? trainingSchedule.trainingUnits.map((val, j) => (
                          <span key={j}>
                            <Link to={`training-unit/${val.id}`}>{val.id}</Link>
                            {j === trainingSchedule.trainingUnits.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {trainingSchedule.language ? (
                      <Link to={`language/${trainingSchedule.language.id}`}>{trainingSchedule.language.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${trainingSchedule.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${trainingSchedule.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${trainingSchedule.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openfitnesstrackerApp.trainingSchedule.home.notFound">No Training Schedules found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ trainingSchedule }: IRootState) => ({
  trainingScheduleList: trainingSchedule.entities,
  loading: trainingSchedule.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TrainingSchedule);
