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
import { getEntity, updateEntity, createEntity, reset } from './nutrition.reducer';
import { INutrition } from 'app/shared/model/nutrition.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INutritionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NutritionUpdate = (props: INutritionUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { nutritionEntity, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/nutrition');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...nutritionEntity,
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
          <h2 id="openfitnesstrackerApp.nutrition.home.createOrEditLabel">
            <Translate contentKey="openfitnesstrackerApp.nutrition.home.createOrEditLabel">Create or edit a Nutrition</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : nutritionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="nutrition-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="nutrition-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="timeLabel" for="nutrition-time">
                  <Translate contentKey="openfitnesstrackerApp.nutrition.time">Time</Translate>
                </Label>
                <AvInput
                  id="nutrition-time"
                  type="datetime-local"
                  className="form-control"
                  name="time"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.nutritionEntity.time)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="carbsLabel" for="nutrition-carbs">
                  <Translate contentKey="openfitnesstrackerApp.nutrition.carbs">Carbs</Translate>
                </Label>
                <AvField id="nutrition-carbs" type="text" name="carbs" />
              </AvGroup>
              <AvGroup>
                <Label id="fatLabel" for="nutrition-fat">
                  <Translate contentKey="openfitnesstrackerApp.nutrition.fat">Fat</Translate>
                </Label>
                <AvField id="nutrition-fat" type="text" name="fat" />
              </AvGroup>
              <AvGroup>
                <Label id="proteinLabel" for="nutrition-protein">
                  <Translate contentKey="openfitnesstrackerApp.nutrition.protein">Protein</Translate>
                </Label>
                <AvField id="nutrition-protein" type="text" name="protein" />
              </AvGroup>
              <AvGroup>
                <Label id="fiberLabel" for="nutrition-fiber">
                  <Translate contentKey="openfitnesstrackerApp.nutrition.fiber">Fiber</Translate>
                </Label>
                <AvField id="nutrition-fiber" type="text" name="fiber" />
              </AvGroup>
              <AvGroup>
                <Label id="kcalLabel" for="nutrition-kcal">
                  <Translate contentKey="openfitnesstrackerApp.nutrition.kcal">Kcal</Translate>
                </Label>
                <AvField id="nutrition-kcal" type="text" name="kcal" />
              </AvGroup>
              <AvGroup>
                <Label for="nutrition-user">
                  <Translate contentKey="openfitnesstrackerApp.nutrition.user">User</Translate>
                </Label>
                <AvInput id="nutrition-user" type="select" className="form-control" name="user.id">
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
              <Button tag={Link} id="cancel-save" to="/nutrition" replace color="info">
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
  nutritionEntity: storeState.nutrition.entity,
  loading: storeState.nutrition.loading,
  updating: storeState.nutrition.updating,
  updateSuccess: storeState.nutrition.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NutritionUpdate);
