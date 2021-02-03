import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './completed-training.reducer';
import { ICompletedTraining } from 'app/shared/model/completed-training.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompletedTrainingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompletedTrainingDetail = (props: ICompletedTrainingDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { completedTrainingEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.completedTraining.detail.title">CompletedTraining</Translate> [
          <b>{completedTrainingEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="startDate">
              <Translate contentKey="openfitnesstrackerApp.completedTraining.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {completedTrainingEntity.startDate ? (
              <TextFormat value={completedTrainingEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="openfitnesstrackerApp.completedTraining.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            {completedTrainingEntity.endDate ? (
              <TextFormat value={completedTrainingEntity.endDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.completedTraining.user">User</Translate>
          </dt>
          <dd>{completedTrainingEntity.user ? completedTrainingEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.completedTraining.trainingUnits">Training Units</Translate>
          </dt>
          <dd>{completedTrainingEntity.trainingUnits ? completedTrainingEntity.trainingUnits.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/completed-training" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/completed-training/${completedTrainingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ completedTraining }: IRootState) => ({
  completedTrainingEntity: completedTraining.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTrainingDetail);
