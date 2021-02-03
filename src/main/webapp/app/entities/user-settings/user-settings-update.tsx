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
import { getEntity, updateEntity, createEntity, reset } from './user-settings.reducer';
import { IUserSettings } from 'app/shared/model/user-settings.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserSettingsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserSettingsUpdate = (props: IUserSettingsUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [selectedLanguageId, setSelectedLanguageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { userSettingsEntity, users, languages, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/user-settings');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getLanguages();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...userSettingsEntity,
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
          <h2 id="openfitnesstrackerApp.userSettings.home.createOrEditLabel">
            <Translate contentKey="openfitnesstrackerApp.userSettings.home.createOrEditLabel">Create or edit a UserSettings</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : userSettingsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-settings-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-settings-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="selectedThemeLabel" for="user-settings-selectedTheme">
                  <Translate contentKey="openfitnesstrackerApp.userSettings.selectedTheme">Selected Theme</Translate>
                </Label>
                <AvField id="user-settings-selectedTheme" type="text" name="selectedTheme" />
              </AvGroup>
              <AvGroup>
                <Label id="defaultWarmupTimeLabel" for="user-settings-defaultWarmupTime">
                  <Translate contentKey="openfitnesstrackerApp.userSettings.defaultWarmupTime">Default Warmup Time</Translate>
                </Label>
                <AvField id="user-settings-defaultWarmupTime" type="text" name="defaultWarmupTime" />
              </AvGroup>
              <AvGroup>
                <Label id="defaultPreWorkoutTimeLabel" for="user-settings-defaultPreWorkoutTime">
                  <Translate contentKey="openfitnesstrackerApp.userSettings.defaultPreWorkoutTime">Default Pre Workout Time</Translate>
                </Label>
                <AvField id="user-settings-defaultPreWorkoutTime" type="text" name="defaultPreWorkoutTime" />
              </AvGroup>
              <AvGroup>
                <Label id="defaultSetCountLabel" for="user-settings-defaultSetCount">
                  <Translate contentKey="openfitnesstrackerApp.userSettings.defaultSetCount">Default Set Count</Translate>
                </Label>
                <AvField id="user-settings-defaultSetCount" type="string" className="form-control" name="defaultSetCount" />
              </AvGroup>
              <AvGroup>
                <Label for="user-settings-user">
                  <Translate contentKey="openfitnesstrackerApp.userSettings.user">User</Translate>
                </Label>
                <AvInput id="user-settings-user" type="select" className="form-control" name="user.id">
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
                <Label for="user-settings-selectedLanguage">
                  <Translate contentKey="openfitnesstrackerApp.userSettings.selectedLanguage">Selected Language</Translate>
                </Label>
                <AvInput id="user-settings-selectedLanguage" type="select" className="form-control" name="selectedLanguage.id">
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
              <Button tag={Link} id="cancel-save" to="/user-settings" replace color="info">
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
  userSettingsEntity: storeState.userSettings.entity,
  loading: storeState.userSettings.loading,
  updating: storeState.userSettings.updating,
  updateSuccess: storeState.userSettings.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getLanguages,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsUpdate);
