import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './protocolled-weight.reducer';
import { IProtocolledWeight } from 'app/shared/model/protocolled-weight.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProtocolledWeightProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ProtocolledWeight = (props: IProtocolledWeightProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { protocolledWeightList, match, loading } = props;
  return (
    <div>
      <h2 id="protocolled-weight-heading">
        <Translate contentKey="openfitnesstrackerApp.protocolledWeight.home.title">Protocolled Weights</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openfitnesstrackerApp.protocolledWeight.home.createLabel">Create new Protocolled Weight</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {protocolledWeightList && protocolledWeightList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.protocolledWeight.time">Time</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.protocolledWeight.weight">Weight</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.protocolledWeight.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {protocolledWeightList.map((protocolledWeight, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${protocolledWeight.id}`} color="link" size="sm">
                      {protocolledWeight.id}
                    </Button>
                  </td>
                  <td>
                    {protocolledWeight.time ? <TextFormat type="date" value={protocolledWeight.time} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {protocolledWeight.weight ? (
                      <Link to={`weight/${protocolledWeight.weight.id}`}>{protocolledWeight.weight.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{protocolledWeight.user ? protocolledWeight.user.id : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${protocolledWeight.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${protocolledWeight.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${protocolledWeight.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openfitnesstrackerApp.protocolledWeight.home.notFound">No Protocolled Weights found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ protocolledWeight }: IRootState) => ({
  protocolledWeightList: protocolledWeight.entities,
  loading: protocolledWeight.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProtocolledWeight);
