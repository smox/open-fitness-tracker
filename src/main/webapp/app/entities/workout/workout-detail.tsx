import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './workout.reducer';
import { IWorkout } from 'app/shared/model/workout.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWorkoutDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WorkoutDetail = (props: IWorkoutDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { workoutEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.workout.detail.title">Workout</Translate> [<b>{workoutEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openfitnesstrackerApp.workout.name">Name</Translate>
            </span>
          </dt>
          <dd>{workoutEntity.name}</dd>
          <dt>
            <span id="sets">
              <Translate contentKey="openfitnesstrackerApp.workout.sets">Sets</Translate>
            </span>
          </dt>
          <dd>{workoutEntity.sets}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.workout.user">User</Translate>
          </dt>
          <dd>{workoutEntity.user ? workoutEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.workout.language">Language</Translate>
          </dt>
          <dd>{workoutEntity.language ? workoutEntity.language.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/workout" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/workout/${workoutEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ workout }: IRootState) => ({
  workoutEntity: workout.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDetail);
