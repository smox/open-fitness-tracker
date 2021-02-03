import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './target-weight.reducer';
import { ITargetWeight } from 'app/shared/model/target-weight.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITargetWeightProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TargetWeight = (props: ITargetWeightProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { targetWeightList, match, loading } = props;
  return (
    <div>
      <h2 id="target-weight-heading">
        <Translate contentKey="openfitnesstrackerApp.targetWeight.home.title">Target Weights</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openfitnesstrackerApp.targetWeight.home.createLabel">Create new Target Weight</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {targetWeightList && targetWeightList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.targetWeight.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.targetWeight.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.targetWeight.weight">Weight</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.targetWeight.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {targetWeightList.map((targetWeight, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${targetWeight.id}`} color="link" size="sm">
                      {targetWeight.id}
                    </Button>
                  </td>
                  <td>
                    {targetWeight.startDate ? <TextFormat type="date" value={targetWeight.startDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{targetWeight.endDate ? <TextFormat type="date" value={targetWeight.endDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{targetWeight.weight ? <Link to={`weight/${targetWeight.weight.id}`}>{targetWeight.weight.id}</Link> : ''}</td>
                  <td>{targetWeight.user ? targetWeight.user.id : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${targetWeight.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${targetWeight.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${targetWeight.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openfitnesstrackerApp.targetWeight.home.notFound">No Target Weights found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ targetWeight }: IRootState) => ({
  targetWeightList: targetWeight.entities,
  loading: targetWeight.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TargetWeight);
