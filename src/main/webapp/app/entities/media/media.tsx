import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './media.reducer';
import { IMedia } from 'app/shared/model/media.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMediaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Media = (props: IMediaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { mediaList, match, loading } = props;
  return (
    <div>
      <h2 id="media-heading">
        <Translate contentKey="openfitnesstrackerApp.media.home.title">Media</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openfitnesstrackerApp.media.home.createLabel">Create new Media</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {mediaList && mediaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.media.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.media.kind">Kind</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.media.binaryData">Binary Data</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.media.additionalInformation">Additional Information</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.media.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.media.trainingUnits">Training Units</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.media.workouts">Workouts</Translate>
                </th>
                <th>
                  <Translate contentKey="openfitnesstrackerApp.media.language">Language</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {mediaList.map((media, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${media.id}`} color="link" size="sm">
                      {media.id}
                    </Button>
                  </td>
                  <td>{media.name}</td>
                  <td>{media.kind}</td>
                  <td>
                    {media.binaryData ? (
                      <div>
                        {media.binaryDataContentType ? (
                          <a onClick={openFile(media.binaryDataContentType, media.binaryData)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {media.binaryDataContentType}, {byteSize(media.binaryData)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{media.additionalInformation}</td>
                  <td>{media.user ? media.user.id : ''}</td>
                  <td>
                    {media.trainingUnits
                      ? media.trainingUnits.map((val, j) => (
                          <span key={j}>
                            <Link to={`training-unit/${val.id}`}>{val.id}</Link>
                            {j === media.trainingUnits.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {media.workouts
                      ? media.workouts.map((val, j) => (
                          <span key={j}>
                            <Link to={`workout/${val.id}`}>{val.id}</Link>
                            {j === media.workouts.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>{media.language ? <Link to={`language/${media.language.id}`}>{media.language.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${media.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${media.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${media.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openfitnesstrackerApp.media.home.notFound">No Media found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ media }: IRootState) => ({
  mediaList: media.entities,
  loading: media.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Media);
