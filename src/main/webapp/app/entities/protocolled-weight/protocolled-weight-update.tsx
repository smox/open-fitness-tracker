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
import { getEntity, updateEntity, createEntity, reset } from './protocolled-weight.reducer';
import { IProtocolledWeight } from 'app/shared/model/protocolled-weight.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProtocolledWeightUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProtocolledWeightUpdate = (props: IProtocolledWeightUpdateProps) => {
  const [weightId, setWeightId] = useState('0');
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { protocolledWeightEntity, weights, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/protocolled-weight');
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
    values.time = convertDateTimeToServer(values.time);

    if (errors.length === 0) {
      const entity = {
        ...protocolledWeightEntity,
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
          <h2 id="openfitnesstrackerApp.protocolledWeight.home.createOrEditLabel">
            <Translate contentKey="openfitnesstrackerApp.protocolledWeight.home.createOrEditLabel">
              Create or edit a ProtocolledWeight
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : protocolledWeightEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="protocolled-weight-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="protocolled-weight-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="timeLabel" for="protocolled-weight-time">
                  <Translate contentKey="openfitnesstrackerApp.protocolledWeight.time">Time</Translate>
                </Label>
                <AvInput
                  id="protocolled-weight-time"
                  type="datetime-local"
                  className="form-control"
                  name="time"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.protocolledWeightEntity.time)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="protocolled-weight-weight">
                  <Translate contentKey="openfitnesstrackerApp.protocolledWeight.weight">Weight</Translate>
                </Label>
                <AvInput id="protocolled-weight-weight" type="select" className="form-control" name="weight.id">
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
                <Label for="protocolled-weight-user">
                  <Translate contentKey="openfitnesstrackerApp.protocolledWeight.user">User</Translate>
                </Label>
                <AvInput id="protocolled-weight-user" type="select" className="form-control" name="user.id">
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
              <Button tag={Link} id="cancel-save" to="/protocolled-weight" replace color="info">
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
  protocolledWeightEntity: storeState.protocolledWeight.entity,
  loading: storeState.protocolledWeight.loading,
  updating: storeState.protocolledWeight.updating,
  updateSuccess: storeState.protocolledWeight.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProtocolledWeightUpdate);
