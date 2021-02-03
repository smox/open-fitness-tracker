import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './media.reducer';
import { IMedia } from 'app/shared/model/media.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMediaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MediaDetail = (props: IMediaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { mediaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.media.detail.title">Media</Translate> [<b>{mediaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openfitnesstrackerApp.media.name">Name</Translate>
            </span>
          </dt>
          <dd>{mediaEntity.name}</dd>
          <dt>
            <span id="kind">
              <Translate contentKey="openfitnesstrackerApp.media.kind">Kind</Translate>
            </span>
          </dt>
          <dd>{mediaEntity.kind}</dd>
          <dt>
            <span id="binaryData">
              <Translate contentKey="openfitnesstrackerApp.media.binaryData">Binary Data</Translate>
            </span>
          </dt>
          <dd>
            {mediaEntity.binaryData ? (
              <div>
                {mediaEntity.binaryDataContentType ? (
                  <a onClick={openFile(mediaEntity.binaryDataContentType, mediaEntity.binaryData)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {mediaEntity.binaryDataContentType}, {byteSize(mediaEntity.binaryData)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="additionalInformation">
              <Translate contentKey="openfitnesstrackerApp.media.additionalInformation">Additional Information</Translate>
            </span>
          </dt>
          <dd>{mediaEntity.additionalInformation}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.media.user">User</Translate>
          </dt>
          <dd>{mediaEntity.user ? mediaEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.media.trainingUnits">Training Units</Translate>
          </dt>
          <dd>
            {mediaEntity.trainingUnits
              ? mediaEntity.trainingUnits.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {mediaEntity.trainingUnits && i === mediaEntity.trainingUnits.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.media.workouts">Workouts</Translate>
          </dt>
          <dd>
            {mediaEntity.workouts
              ? mediaEntity.workouts.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {mediaEntity.workouts && i === mediaEntity.workouts.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.media.language">Language</Translate>
          </dt>
          <dd>{mediaEntity.language ? mediaEntity.language.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/media" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/media/${mediaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ media }: IRootState) => ({
  mediaEntity: media.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MediaDetail);
