import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './completed-set.reducer';
import { ICompletedSet } from 'app/shared/model/completed-set.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompletedSetProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CompletedSet = (props: ICompletedSetProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { completedSetList, match, loading } = props;
  return (
    <div>
      <h2 id="completed-set-heading">
        <Translate contentKey="openfitnesstrackerApp.completedSet.home.title">Completed Sets</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openfitnesstrackerApp.completedSet.home.createLabel">Create new Completed Set</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {completedSetList && completedSetList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.completedSet.set">Set</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.completedSet.repetitions">Repetitions</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.completedSet.weight">Weight</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.completedSet.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.completedSet.completedTrainings">Completed Trainings</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.completedSet.workouts">Workouts</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {completedSetList.map((completedSet, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${completedSet.id}`} color="link" size="sm">
                      {completedSet.id}
                    </Button>
                  </td>
                  <td>{completedSet.set}</td>
                  <td>{completedSet.repetitions}</td>
                  <td>{completedSet.weight ? <Link to={`weight/${completedSet.weight.id}`}>{completedSet.weight.id}</Link> : ''}</td>
                  <td>{completedSet.user ? completedSet.user.id : ''}</td>
                  <td>
                    {completedSet.completedTrainings ? (
                      <Link to={`completed-training/${completedSet.completedTrainings.id}`}>{completedSet.completedTrainings.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{completedSet.workouts ? <Link to={`workout/${completedSet.workouts.id}`}>{completedSet.workouts.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${completedSet.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${completedSet.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${completedSet.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openfitnesstrackerApp.completedSet.home.notFound">No Completed Sets found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ completedSet }: IRootState) => ({
  completedSetList: completedSet.entities,
  loading: completedSet.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompletedSet);
