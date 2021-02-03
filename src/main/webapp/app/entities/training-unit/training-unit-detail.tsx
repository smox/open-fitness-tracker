import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './training-unit.reducer';
import { ITrainingUnit } from 'app/shared/model/training-unit.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrainingUnitDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TrainingUnitDetail = (props: ITrainingUnitDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { trainingUnitEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.trainingUnit.detail.title">TrainingUnit</Translate> [<b>{trainingUnitEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openfitnesstrackerApp.trainingUnit.name">Name</Translate>
            </span>
          </dt>
          <dd>{trainingUnitEntity.name}</dd>
          <dt>
            <span id="dayOfWeek">
              <Translate contentKey="openfitnesstrackerApp.trainingUnit.dayOfWeek">Day Of Week</Translate>
            </span>
          </dt>
          <dd>{trainingUnitEntity.dayOfWeek}</dd>
          <dt>
            <span id="time">
              <Translate contentKey="openfitnesstrackerApp.trainingUnit.time">Time</Translate>
            </span>
          </dt>
          <dd>{trainingUnitEntity.time}</dd>
          <dt>
            <span id="pauseTime">
              <Translate contentKey="openfitnesstrackerApp.trainingUnit.pauseTime">Pause Time</Translate>
            </span>
          </dt>
          <dd>{trainingUnitEntity.pauseTime}</dd>
          <dt>
            <span id="warumupTime">
              <Translate contentKey="openfitnesstrackerApp.trainingUnit.warumupTime">Warumup Time</Translate>
            </span>
          </dt>
          <dd>{trainingUnitEntity.warumupTime}</dd>
          <dt>
            <span id="preworkoutCountdownTime">
              <Translate contentKey="openfitnesstrackerApp.trainingUnit.preworkoutCountdownTime">Preworkout Countdown Time</Translate>
            </span>
          </dt>
          <dd>{trainingUnitEntity.preworkoutCountdownTime}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.trainingUnit.user">User</Translate>
          </dt>
          <dd>{trainingUnitEntity.user ? trainingUnitEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.trainingUnit.workouts">Workouts</Translate>
          </dt>
          <dd>
            {trainingUnitEntity.workouts
              ? trainingUnitEntity.workouts.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {trainingUnitEntity.workouts && i === trainingUnitEntity.workouts.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.trainingUnit.language">Language</Translate>
          </dt>
          <dd>{trainingUnitEntity.language ? trainingUnitEntity.language.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/training-unit" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/training-unit/${trainingUnitEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ trainingUnit }: IRootState) => ({
  trainingUnitEntity: trainingUnit.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TrainingUnitDetail);
