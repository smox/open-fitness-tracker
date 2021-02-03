import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './completed-training.reducer';
import { ICompletedTraining } from 'app/shared/model/completed-training.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompletedTrainingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CompletedTraining = (props: ICompletedTrainingProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { completedTrainingList, match, loading } = props;
  return (
    <div>
      <h2 id="completed-training-heading">
        <Translate contentKey="openfitnesstrackerApp.completedTraining.home.title">Completed Trainings</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openfitnesstrackerApp.completedTraining.home.createLabel">Create new Completed Training</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {completedTrainingList && completedTrainingList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.completedTraining.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.completedTraining.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.completedTraining.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.completedTraining.trainingUnits">Training Units</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {completedTrainingList.map((completedTraining, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${completedTraining.id}`} color="link" size="sm">
                      {completedTraining.id}
                    </Button>
                  </td>
                  <td>
                    {completedTraining.startDate ? (
                      <TextFormat type="date" value={completedTraining.startDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {completedTraining.endDate ? (
                      <TextFormat type="date" value={completedTraining.endDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{completedTraining.user ? completedTraining.user.id : ''}</td>
                  <td>
                    {completedTraining.trainingUnits ? (
                      <Link to={`training-unit/${completedTraining.trainingUnits.id}`}>{completedTraining.trainingUnits.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${completedTraining.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${completedTraining.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${completedTraining.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openfitnesstrackerApp.completedTraining.home.notFound">No Completed Trainings found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ completedTraining }: IRootState) => ({
  completedTrainingList: completedTraining.entities,
  loading: completedTraining.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTraining);
