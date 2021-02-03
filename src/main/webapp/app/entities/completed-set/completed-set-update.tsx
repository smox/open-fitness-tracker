import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IWeight } from 'app/shared/model/weight.model';
import { getEntities as getWeights } from 'app/entities/weight/weight.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ICompletedTraining } from 'app/shared/model/completed-training.model';
import { getEntities as getCompletedTrainings } from 'app/entities/completed-training/completed-training.reducer';
import { IWorkout } from 'app/shared/model/workout.model';
import { getEntities as getWorkouts } from 'app/entities/workout/workout.reducer';
import { getEntity, updateEntity, createEntity, reset } from './completed-set.reducer';
import { ICompletedSet } from 'app/shared/model/completed-set.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompletedSetUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompletedSetUpdate = (props: ICompletedSetUpdateProps) => {
  const [weightId, setWeightId] = useState('0');
  const [userId, setUserId] = useState('0');
  const [completedTrainingsId, setCompletedTrainingsId] = useState('0');
  const [workoutsId, setWorkoutsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { completedSetEntity, weights, users, completedTrainings, workouts, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/completed-set');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getWeights();
    props.getUsers();
    props.getCompletedTrainings();
    props.getWorkouts();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...completedSetEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="openfitnesstrackerApp.completedSet.home.createOrEditLabel">
            <Translate contentKey="openfitnesstrackerApp.completedSet.home.createOrEditLabel">Create or edit a CompletedSet</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : completedSetEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="completed-set-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="completed-set-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="setLabel" for="completed-set-set">
                  <Translate contentKey="openfitnesstrackerApp.completedSet.set">Set</Translate>
                </Label>
                <AvField id="completed-set-set" type="string" className="form-control" name="set" />
              </AvGroup>
              <AvGroup>
                <Label id="repetitionsLabel" for="completed-set-repetitions">
                  <Translate contentKey="openfitnesstrackerApp.completedSet.repetitions">Repetitions</Translate>
                </Label>
                <AvField id="completed-set-repetitions" type="string" className="form-control" name="repetitions" />
              </AvGroup>
              <AvGroup>
                <Label for="completed-set-weight">
                  <Translate contentKey="openfitnesstrackerApp.completedSet.weight">Weight</Translate>
                </Label>
                <AvInput id="completed-set-weight" type="select" className="form-control" name="weight.id">
                  <option value="" key="0" />
                  {weights
                    ? weights.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="completed-set-user">
                  <Translate contentKey="openfitnesstrackerApp.completedSet.user">User</Translate>
                </Label>
                <AvInput id="completed-set-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="completed-set-completedTrainings">
                  <Translate contentKey="openfitnesstrackerApp.completedSet.completedTrainings">Completed Trainings</Translate>
                </Label>
                <AvInput id="completed-set-completedTrainings" type="select" className="form-control" name="completedTrainings.id">
                  <option value="" key="0" />
                  {completedTrainings
                    ? completedTrainings.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="completed-set-workouts">
                  <Translate contentKey="openfitnesstrackerApp.completedSet.workouts">Workouts</Translate>
                </Label>
                <AvInput id="completed-set-workouts" type="select" className="form-control" name="workouts.id">
                  <option value="" key="0" />
                  {workouts
                    ? workouts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/completed-set" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  weights: storeState.weight.entities,
  users: storeState.userManagement.users,
  completedTrainings: storeState.completedTraining.entities,
  workouts: storeState.workout.entities,
  completedSetEntity: storeState.completedSet.entity,
  loading: storeState.completedSet.loading,
  updating: storeState.completedSet.updating,
  updateSuccess: storeState.completedSet.updateSuccess,
});

const mapDispatchToProps = {
  getWeights,
  getUsers,
  getCompletedTrainings,
  getWorkouts,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompletedSetUpdate);
