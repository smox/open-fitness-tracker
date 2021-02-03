import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ITrainingUnit } from 'app/shared/model/training-unit.model';
import { getEntities as getTrainingUnits } from 'app/entities/training-unit/training-unit.reducer';
import { getEntity, updateEntity, createEntity, reset } from './completed-training.reducer';
import { ICompletedTraining } from 'app/shared/model/completed-training.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompletedTrainingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompletedTrainingUpdate = (props: ICompletedTrainingUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [trainingUnitsId, setTrainingUnitsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { completedTrainingEntity, users, trainingUnits, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/completed-training');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getTrainingUnits();
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
        ...completedTrainingEntity,
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
          <h2 id="openfitnesstrackerApp.completedTraining.home.createOrEditLabel">
            <Translate contentKey="openfitnesstrackerApp.completedTraining.home.createOrEditLabel">
              Create or edit a CompletedTraining
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : completedTrainingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="completed-training-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="completed-training-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="startDateLabel" for="completed-training-startDate">
                  <Translate contentKey="openfitnesstrackerApp.completedTraining.startDate">Start Date</Translate>
                </Label>
                <AvInput
                  id="completed-training-startDate"
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.completedTrainingEntity.startDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="completed-training-endDate">
                  <Translate contentKey="openfitnesstrackerApp.completedTraining.endDate">End Date</Translate>
                </Label>
                <AvInput
                  id="completed-training-endDate"
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.completedTrainingEntity.endDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="completed-training-user">
                  <Translate contentKey="openfitnesstrackerApp.completedTraining.user">User</Translate>
                </Label>
                <AvInput id="completed-training-user" type="select" className="form-control" name="user.id">
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
                <Label for="completed-training-trainingUnits">
                  <Translate contentKey="openfitnesstrackerApp.completedTraining.trainingUnits">Training Units</Translate>
                </Label>
                <AvInput id="completed-training-trainingUnits" type="select" className="form-control" name="trainingUnits.id">
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
              <Button tag={Link} id="cancel-save" to="/completed-training" replace color="info">
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
  completedTrainingEntity: storeState.completedTraining.entity,
  loading: storeState.completedTraining.loading,
  updating: storeState.completedTraining.updating,
  updateSuccess: storeState.completedTraining.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getTrainingUnits,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTrainingUpdate);
