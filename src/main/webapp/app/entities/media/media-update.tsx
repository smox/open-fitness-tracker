import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ITrainingUnit } from 'app/shared/model/training-unit.model';
import { getEntities as getTrainingUnits } from 'app/entities/training-unit/training-unit.reducer';
import { IWorkout } from 'app/shared/model/workout.model';
import { getEntities as getWorkouts } from 'app/entities/workout/workout.reducer';
import { ILanguage } from 'app/shared/model/language.model';
import { getEntities as getLanguages } from 'app/entities/language/language.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './media.reducer';
import { IMedia } from 'app/shared/model/media.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMediaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MediaUpdate = (props: IMediaUpdateProps) => {
  const [idstrainingUnits, setIdstrainingUnits] = useState([]);
  const [idsworkouts, setIdsworkouts] = useState([]);
  const [userId, setUserId] = useState('0');
  const [languageId, setLanguageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { mediaEntity, users, trainingUnits, workouts, languages, loading, updating } = props;

  const { binaryData, binaryDataContentType } = mediaEntity;

  const handleClose = () => {
    props.history.push('/media');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getTrainingUnits();
    props.getWorkouts();
    props.getLanguages();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...mediaEntity,
        ...values,
        trainingUnits: mapIdList(values.trainingUnits),
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
          <h2 id="openfitnesstrackerApp.media.home.createOrEditLabel">
            <Translate contentKey="openfitnesstrackerApp.media.home.createOrEditLabel">Create or edit a Media</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : mediaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="media-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="media-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="media-name">
                  <Translate contentKey="openfitnesstrackerApp.media.name">Name</Translate>
                </Label>
                <AvField id="media-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="kindLabel" for="media-kind">
                  <Translate contentKey="openfitnesstrackerApp.media.kind">Kind</Translate>
                </Label>
                <AvField id="media-kind" type="text" name="kind" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="binaryDataLabel" for="binaryData">
                    <Translate contentKey="openfitnesstrackerApp.media.binaryData">Binary Data</Translate>
                  </Label>
                  <br />
                  {binaryData ? (
                    <div>
                      {binaryDataContentType ? (
                        <a onClick={openFile(binaryDataContentType, binaryData)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {binaryDataContentType}, {byteSize(binaryData)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('binaryData')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_binaryData" type="file" onChange={onBlobChange(false, 'binaryData')} />
                  <AvInput type="hidden" name="binaryData" value={binaryData} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="additionalInformationLabel" for="media-additionalInformation">
                  <Translate contentKey="openfitnesstrackerApp.media.additionalInformation">Additional Information</Translate>
                </Label>
                <AvField id="media-additionalInformation" type="text" name="additionalInformation" />
              </AvGroup>
              <AvGroup>
                <Label for="media-user">
                  <Translate contentKey="openfitnesstrackerApp.media.user">User</Translate>
                </Label>
                <AvInput id="media-user" type="select" className="form-control" name="user.id">
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
                <Label for="media-trainingUnits">
                  <Translate contentKey="openfitnesstrackerApp.media.trainingUnits">Training Units</Translate>
                </Label>
                <AvInput
                  id="media-trainingUnits"
                  type="select"
                  multiple
                  className="form-control"
                  name="trainingUnits"
                  value={mediaEntity.trainingUnits && mediaEntity.trainingUnits.map(e => e.id)}
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
                <Label for="media-workouts">
                  <Translate contentKey="openfitnesstrackerApp.media.workouts">Workouts</Translate>
                </Label>
                <AvInput
                  id="media-workouts"
                  type="select"
                  multiple
                  className="form-control"
                  name="workouts"
                  value={mediaEntity.workouts && mediaEntity.workouts.map(e => e.id)}
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
                <Label for="media-language">
                  <Translate contentKey="openfitnesstrackerApp.media.language">Language</Translate>
                </Label>
                <AvInput id="media-language" type="select" className="form-control" name="language.id">
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
              <Button tag={Link} id="cancel-save" to="/media" replace color="info">
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
  workouts: storeState.workout.entities,
  languages: storeState.language.entities,
  mediaEntity: storeState.media.entity,
  loading: storeState.media.loading,
  updating: storeState.media.updating,
  updateSuccess: storeState.media.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getTrainingUnits,
  getWorkouts,
  getLanguages,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MediaUpdate);
