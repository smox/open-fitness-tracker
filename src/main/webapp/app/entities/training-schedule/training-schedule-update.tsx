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
import { ITrainingUnit } from 'app/shared/model/training-unit.model';
import { getEntities as getTrainingUnits } from 'app/entities/training-unit/training-unit.reducer';
import { ILanguage } from 'app/shared/model/language.model';
import { getEntities as getLanguages } from 'app/entities/language/language.reducer';
import { getEntity, updateEntity, createEntity, reset } from './training-schedule.reducer';
import { ITrainingSchedule } from 'app/shared/model/training-schedule.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITrainingScheduleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TrainingScheduleUpdate = (props: ITrainingScheduleUpdateProps) => {
  const [idstrainingUnits, setIdstrainingUnits] = useState([]);
  const [userId, setUserId] = useState('0');
  const [languageId, setLanguageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { trainingScheduleEntity, users, trainingUnits, languages, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/training-schedule');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getTrainingUnits();
    props.getLanguages();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const entity = {
        ...trainingScheduleEntity,
        ...values,
        trainingUnits: mapIdList(values.trainingUnits),
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
          <h2 id="openfitnesstrackerApp.trainingSchedule.home.createOrEditLabel">
            <Translate contentKey="openfitnesstrackerApp.trainingSchedule.home.createOrEditLabel">
              Create or edit a TrainingSchedule
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : trainingScheduleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="training-schedule-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="training-schedule-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="training-schedule-name">
                  <Translate contentKey="openfitnesstrackerApp.trainingSchedule.name">Name</Translate>
                </Label>
                <AvField id="training-schedule-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="startDateLabel" for="training-schedule-startDate">
                  <Translate contentKey="openfitnesstrackerApp.trainingSchedule.startDate">Start Date</Translate>
                </Label>
                <AvInput
                  id="training-schedule-startDate"
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.trainingScheduleEntity.startDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="training-schedule-endDate">
                  <Translate contentKey="openfitnesstrackerApp.trainingSchedule.endDate">End Date</Translate>
                </Label>
                <AvInput
                  id="training-schedule-endDate"
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.trainingScheduleEntity.endDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="training-schedule-user">
                  <Translate contentKey="openfitnesstrackerApp.trainingSchedule.user">User</Translate>
                </Label>
                <AvInput id="training-schedule-user" type="select" className="form-control" name="user.id">
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
                <Label for="training-schedule-trainingUnits">
                  <Translate contentKey="openfitnesstrackerApp.trainingSchedule.trainingUnits">Training Units</Translate>
                </Label>
                <AvInput
                  id="training-schedule-trainingUnits"
                  type="select"
                  multiple
                  className="form-control"
                  name="trainingUnits"
                  value={trainingScheduleEntity.trainingUnits && trainingScheduleEntity.trainingUnits.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {trainingUnits
                    ? trainingUnits.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="training-schedule-language">
                  <Translate contentKey="openfitnesstrackerApp.trainingSchedule.language">Language</Translate>
                </Label>
                <AvInput id="training-schedule-language" type="select" className="form-control" name="language.id">
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
              <Button tag={Link} id="cancel-save" to="/training-schedule" replace color="info">
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
  trainingUnits: storeState.trainingUnit.entities,
  languages: storeState.language.entities,
  trainingScheduleEntity: storeState.trainingSchedule.entity,
  loading: storeState.trainingSchedule.loading,
  updating: storeState.trainingSchedule.updating,
  updateSuccess: storeState.trainingSchedule.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getTrainingUnits,
  getLanguages,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TrainingScheduleUpdate);
