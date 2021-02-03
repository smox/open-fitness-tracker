import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ILanguage } from 'app/shared/model/language.model';
import { getEntities as getLanguages } from 'app/entities/language/language.reducer';
import { ITrainingUnit } from 'app/shared/model/training-unit.model';
import { getEntities as getTrainingUnits } from 'app/entities/training-unit/training-unit.reducer';
import { IMedia } from 'app/shared/model/media.model';
import { getEntities as getMedia } from 'app/entities/media/media.reducer';
import { getEntity, updateEntity, createEntity, reset } from './workout.reducer';
import { IWorkout } from 'app/shared/model/workout.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IWorkoutUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WorkoutUpdate = (props: IWorkoutUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [languageId, setLanguageId] = useState('0');
  const [trainingUnitsId, setTrainingUnitsId] = useState('0');
  const [mediasId, setMediasId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { workoutEntity, users, languages, trainingUnits, media, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/workout');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getLanguages();
    props.getTrainingUnits();
    props.getMedia();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...workoutEntity,
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
          <h2 id="openfitnesstrackerApp.workout.home.createOrEditLabel">
            <Translate contentKey="openfitnesstrackerApp.workout.home.createOrEditLabel">Create or edit a Workout</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : workoutEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="workout-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="workout-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="workout-name">
                  <Translate contentKey="openfitnesstrackerApp.workout.name">Name</Translate>
                </Label>
                <AvField id="workout-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="setsLabel" for="workout-sets">
                  <Translate contentKey="openfitnesstrackerApp.workout.sets">Sets</Translate>
                </Label>
                <AvField id="workout-sets" type="string" className="form-control" name="sets" />
              </AvGroup>
              <AvGroup>
                <Label for="workout-user">
                  <Translate contentKey="openfitnesstrackerApp.workout.user">User</Translate>
                </Label>
                <AvInput id="workout-user" type="select" className="form-control" name="user.id">
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
                <Label for="workout-language">
                  <Translate contentKey="openfitnesstrackerApp.workout.language">Language</Translate>
                </Label>
                <AvInput id="workout-language" type="select" className="form-control" name="language.id">
                  <option value="" key="0" />
                  {languages
                    ? languages.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/workout" replace color="info">
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
  users: storeState.userManagement.users,
  languages: storeState.language.entities,
  trainingUnits: storeState.trainingUnit.entities,
  media: storeState.media.entities,
  workoutEntity: storeState.workout.entity,
  loading: storeState.workout.loading,
  updating: storeState.workout.updating,
  updateSuccess: storeState.workout.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getLanguages,
  getTrainingUnits,
  getMedia,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutUpdate);
