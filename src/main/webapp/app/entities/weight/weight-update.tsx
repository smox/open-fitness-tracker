import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITargetWeight } from 'app/shared/model/target-weight.model';
import { getEntities as getTargetWeights } from 'app/entities/target-weight/target-weight.reducer';
import { IProtocolledWeight } from 'app/shared/model/protocolled-weight.model';
import { getEntities as getProtocolledWeights } from 'app/entities/protocolled-weight/protocolled-weight.reducer';
import { ICompletedSet } from 'app/shared/model/completed-set.model';
import { getEntities as getCompletedSets } from 'app/entities/completed-set/completed-set.reducer';
import { IUnit } from 'app/shared/model/unit.model';
import { getEntities as getUnits } from 'app/entities/unit/unit.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './weight.reducer';
import { IWeight } from 'app/shared/model/weight.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IWeightUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WeightUpdate = (props: IWeightUpdateProps) => {
  const [targetWeightId, setTargetWeightId] = useState('0');
  const [protocolledWeightId, setProtocolledWeightId] = useState('0');
  const [completedSetId, setCompletedSetId] = useState('0');
  const [unitsId, setUnitsId] = useState('0');
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { weightEntity, targetWeights, protocolledWeights, completedSets, units, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/weight');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTargetWeights();
    props.getProtocolledWeights();
    props.getCompletedSets();
    props.getUnits();
    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...weightEntity,
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
          <h2 id="openfitnesstrackerApp.weight.home.createOrEditLabel">
            <Translate contentKey="openfitnesstrackerApp.weight.home.createOrEditLabel">Create or edit a Weight</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : weightEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="weight-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="weight-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="amountLabel" for="weight-amount">
                  <Translate contentKey="openfitnesstrackerApp.weight.amount">Amount</Translate>
                </Label>
                <AvField id="weight-amount" type="text" name="amount" />
              </AvGroup>
              <AvGroup>
                <Label for="weight-units">
                  <Translate contentKey="openfitnesstrackerApp.weight.units">Units</Translate>
                </Label>
                <AvInput id="weight-units" type="select" className="form-control" name="units.id">
                  <option value="" key="0" />
                  {units
                    ? units.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="weight-user">
                  <Translate contentKey="openfitnesstrackerApp.weight.user">User</Translate>
                </Label>
                <AvInput id="weight-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/weight" replace color="info">
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
  targetWeights: storeState.targetWeight.entities,
  protocolledWeights: storeState.protocolledWeight.entities,
  completedSets: storeState.completedSet.entities,
  units: storeState.unit.entities,
  users: storeState.userManagement.users,
  weightEntity: storeState.weight.entity,
  loading: storeState.weight.loading,
  updating: storeState.weight.updating,
  updateSuccess: storeState.weight.updateSuccess,
});

const mapDispatchToProps = {
  getTargetWeights,
  getProtocolledWeights,
  getCompletedSets,
  getUnits,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WeightUpdate);
