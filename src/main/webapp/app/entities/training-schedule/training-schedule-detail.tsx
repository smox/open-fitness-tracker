import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './training-schedule.reducer';
import { ITrainingSchedule } from 'app/shared/model/training-schedule.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrainingScheduleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TrainingScheduleDetail = (props: ITrainingScheduleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { trainingScheduleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.trainingSchedule.detail.title">TrainingSchedule</Translate> [
          <b>{trainingScheduleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openfitnesstrackerApp.trainingSchedule.name">Name</Translate>
            </span>
          </dt>
          <dd>{trainingScheduleEntity.name}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="openfitnesstrackerApp.trainingSchedule.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {trainingScheduleEntity.startDate ? (
              <TextFormat value={trainingScheduleEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="openfitnesstrackerApp.trainingSchedule.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            {trainingScheduleEntity.endDate ? (
              <TextFormat value={trainingScheduleEntity.endDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.trainingSchedule.user">User</Translate>
          </dt>
          <dd>{trainingScheduleEntity.user ? trainingScheduleEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.trainingSchedule.trainingUnits">Training Units</Translate>
          </dt>
          <dd>
            {trainingScheduleEntity.trainingUnits
              ? trainingScheduleEntity.trainingUnits.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {trainingScheduleEntity.trainingUnits && i === trainingScheduleEntity.trainingUnits.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.trainingSchedule.language">Language</Translate>
          </dt>
          <dd>{trainingScheduleEntity.language ? trainingScheduleEntity.language.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/training-schedule" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/training-schedule/${trainingScheduleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ trainingSchedule }: IRootState) => ({
  trainingScheduleEntity: trainingSchedule.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TrainingScheduleDetail);
