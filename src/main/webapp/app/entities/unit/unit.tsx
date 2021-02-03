import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './unit.reducer';
import { IUnit } from 'app/shared/model/unit.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUnitProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Unit = (props: IUnitProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { unitList, match, loading } = props;
  return (
    <div>
      <h2 id="unit-heading">
        <Translate contentKey="openfitnesstrackerApp.unit.home.title">Units</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openfitnesstrackerApp.unit.home.createLabel">Create new Unit</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {unitList && unitList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.unit.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.unit.shortName">Short Name</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.unit.language">Language</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {unitList.map((unit, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${unit.id}`} color="link" size="sm">
                      {unit.id}
                    </Button>
                  </td>
                  <td>{unit.name}</td>
                  <td>{unit.shortName}</td>
                  <td>{unit.language ? <Link to={`language/${unit.language.id}`}>{unit.language.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${unit.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${unit.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${unit.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openfitnesstrackerApp.unit.home.notFound">No Units found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ unit }: IRootState) => ({
  unitList: unit.entities,
  loading: unit.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Unit);
