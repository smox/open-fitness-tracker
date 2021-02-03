import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IWeight } from 'app/shared/model/weight.model';
import { getEntities as getWeights } from 'app/entities/weight/weight.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './target-weight.reducer';
import { ITargetWeight } from 'app/shared/model/target-weight.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITargetWeightUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TargetWeightUpdate = (props: ITargetWeightUpdateProps) => {
  const [weightId, setWeightId] = useState('0');
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { targetWeightEntity, weights, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/target-weight');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getWeights();
    props.getUsers();
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
        ...targetWeightEntity,
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
          <h2 id="openfitnesstrackerApp.targetWeight.home.createOrEditLabel">
            <Translate contentKey="openfitnesstrackerApp.targetWeight.home.createOrEditLabel">Create or edit a TargetWeight</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : targetWeightEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="target-weight-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="target-weight-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="startDateLabel" for="target-weight-startDate">
                  <Translate contentKey="openfitnesstrackerApp.targetWeight.startDate">Start Date</Translate>
                </Label>
                <AvInput
                  id="target-weight-startDate"
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.targetWeightEntity.startDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="target-weight-endDate">
                  <Translate contentKey="openfitnesstrackerApp.targetWeight.endDate">End Date</Translate>
                </Label>
                <AvInput
                  id="target-weight-endDate"
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.targetWeightEntity.endDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="target-weight-weight">
                  <Translate contentKey="openfitnesstrackerApp.targetWeight.weight">Weight</Translate>
                </Label>
                <AvInput id="target-weight-weight" type="select" className="form-control" name="weight.id">
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
                <Label for="target-weight-user">
                  <Translate contentKey="openfitnesstrackerApp.targetWeight.user">User</Translate>
                </Label>
                <AvInput id="target-weight-user" type="select" className="form-control" name="user.id">
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
              <Button tag={Link} id="cancel-save" to="/target-weight" replace color="info">
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
  targetWeightEntity: storeState.targetWeight.entity,
  loading: storeState.targetWeight.loading,
  updating: storeState.targetWeight.updating,
  updateSuccess: storeState.targetWeight.updateSuccess,
});

const mapDispatchToProps = {
  getWeights,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TargetWeightUpdate);
