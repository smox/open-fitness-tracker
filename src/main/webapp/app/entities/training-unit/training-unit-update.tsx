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
import { IWorkout } from 'app/shared/model/workout.model';
import { getEntities as getWorkouts } from 'app/entities/workout/workout.reducer';
import { ILanguage } from 'app/shared/model/language.model';
import { getEntities as getLanguages } from 'app/entities/language/language.reducer';
import { ITrainingSchedule } from 'app/shared/model/training-schedule.model';
import { getEntities as getTrainingSchedules } from 'app/entities/training-schedule/training-schedule.reducer';
import { IMedia } from 'app/shared/model/media.model';
import { getEntities as getMedia } from 'app/entities/media/media.reducer';
import { getEntity, updateEntity, createEntity, reset } from './training-unit.reducer';
import { ITrainingUnit } from 'app/shared/model/training-unit.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITrainingUnitUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TrainingUnitUpdate = (props: ITrainingUnitUpdateProps) => {
  const [idsworkouts, setIdsworkouts] = useState([]);
  const [userId, setUserId] = useState('0');
  const [languageId, setLanguageId] = useState('0');
  const [trainingSchedulesId, setTrainingSchedulesId] = useState('0');
  const [mediasId, setMediasId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { trainingUnitEntity, users, workouts, languages, trainingSchedules, media, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/training-unit');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getWorkouts();
    props.getLanguages();
    props.getTrainingSchedules();
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
        ...trainingUnitEntity,
        ...values,
        workouts: mapIdList(values.workouts),
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
          <h2 id="openfitnesstrackerApp.trainingUnit.home.createOrEditLabel">
            <Translate contentKey="openfitnesstrackerApp.trainingUnit.home.createOrEditLabel">Create or edit a TrainingUnit</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : trainingUnitEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="training-unit-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="training-unit-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="training-unit-name">
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.name">Name</Translate>
                </Label>
                <AvField id="training-unit-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="dayOfWeekLabel" for="training-unit-dayOfWeek">
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.dayOfWeek">Day Of Week</Translate>
                </Label>
                <AvInput
                  id="training-unit-dayOfWeek"
                  type="select"
                  className="form-control"
                  name="dayOfWeek"
                  value={(!isNew && trainingUnitEntity.dayOfWeek) || 'MONDAY'}
                >
                  <option value="MONDAY">{translate('openfitnesstrackerApp.DayOfWeek.MONDAY')}</option>
                  <option value="TUESDAY">{translate('openfitnesstrackerApp.DayOfWeek.TUESDAY')}</option>
                  <option value="WEDNESDAY">{translate('openfitnesstrackerApp.DayOfWeek.WEDNESDAY')}</option>
                  <option value="THURSDAY">{translate('openfitnesstrackerApp.DayOfWeek.THURSDAY')}</option>
                  <option value="FRIDAY">{translate('openfitnesstrackerApp.DayOfWeek.FRIDAY')}</option>
                  <option value="SATURDAY">{translate('openfitnesstrackerApp.DayOfWeek.SATURDAY')}</option>
                  <option value="SUNDAY">{translate('openfitnesstrackerApp.DayOfWeek.SUNDAY')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="timeLabel" for="training-unit-time">
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.time">Time</Translate>
                </Label>
                <AvField id="training-unit-time" type="text" name="time" />
              </AvGroup>
              <AvGroup>
                <Label id="pauseTimeLabel" for="training-unit-pauseTime">
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.pauseTime">Pause Time</Translate>
                </Label>
                <AvField id="training-unit-pauseTime" type="text" name="pauseTime" />
              </AvGroup>
              <AvGroup>
                <Label id="warumupTimeLabel" for="training-unit-warumupTime">
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.warumupTime">Warumup Time</Translate>
                </Label>
                <AvField id="training-unit-warumupTime" type="text" name="warumupTime" />
              </AvGroup>
              <AvGroup>
                <Label id="preworkoutCountdownTimeLabel" for="training-unit-preworkoutCountdownTime">
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.preworkoutCountdownTime">Preworkout Countdown Time</Translate>
                </Label>
                <AvField id="training-unit-preworkoutCountdownTime" type="text" name="preworkoutCountdownTime" />
              </AvGroup>
              <AvGroup>
                <Label for="training-unit-user">
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.user">User</Translate>
                </Label>
                <AvInput id="training-unit-user" type="select" className="form-control" name="user.id">
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
                <Label for="training-unit-workouts">
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.workouts">Workouts</Translate>
                </Label>
                <AvInput
                  id="training-unit-workouts"
                  type="select"
                  multiple
                  className="form-control"
                  name="workouts"
                  value={trainingUnitEntity.workouts && trainingUnitEntity.workouts.map(e => e.id)}
                >
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
              <AvGroup>
                <Label for="training-unit-language">
                  <Translate contentKey="openfitnesstrackerApp.trainingUnit.language">Language</Translate>
                </Label>
                <AvInput id="training-unit-language" type="select" className="form-control" name="language.id">
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
              <Button tag={Link} id="cancel-save" to="/training-unit" replace color="info">
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
  workouts: storeState.workout.entities,
  languages: storeState.language.entities,
  trainingSchedules: storeState.trainingSchedule.entities,
  media: storeState.media.entities,
  trainingUnitEntity: storeState.trainingUnit.entity,
  loading: storeState.trainingUnit.loading,
  updating: storeState.trainingUnit.updating,
  updateSuccess: storeState.trainingUnit.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getWorkouts,
  getLanguages,
  getTrainingSchedules,
  getMedia,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TrainingUnitUpdate);
