import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './application-settings.reducer';
import { IApplicationSettings } from 'app/shared/model/application-settings.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApplicationSettingsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationSettingsUpdate = (props: IApplicationSettingsUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { applicationSettingsEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/application-settings');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...applicationSettingsEntity,
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
          <h2 id="openfitnesstrackerApp.applicationSettings.home.createOrEditLabel">
            <Translate contentKey="openfitnesstrackerApp.applicationSettings.home.createOrEditLabel">
              Create or edit a ApplicationSettings
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : applicationSettingsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="application-settings-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="application-settings-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="defaultThemeLabel" for="application-settings-defaultTheme">
                  <Translate contentKey="openfitnesstrackerApp.applicationSettings.defaultTheme">Default Theme</Translate>
                </Label>
                <AvField id="application-settings-defaultTheme" type="text" name="defaultTheme" />
              </AvGroup>
              <AvGroup>
                <Label id="defaultWarmupTimeLabel" for="application-settings-defaultWarmupTime">
                  <Translate contentKey="openfitnesstrackerApp.applicationSettings.defaultWarmupTime">Default Warmup Time</Translate>
                </Label>
                <AvField id="application-settings-defaultWarmupTime" type="text" name="defaultWarmupTime" />
              </AvGroup>
              <AvGroup>
                <Label id="defaultPreWorkoutTimeLabel" for="application-settings-defaultPreWorkoutTime">
                  <Translate contentKey="openfitnesstrackerApp.applicationSettings.defaultPreWorkoutTime">
                    Default Pre Workout Time
                  </Translate>
                </Label>
                <AvField id="application-settings-defaultPreWorkoutTime" type="text" name="defaultPreWorkoutTime" />
              </AvGroup>
              <AvGroup>
                <Label id="defaultSetCountLabel" for="application-settings-defaultSetCount">
                  <Translate contentKey="openfitnesstrackerApp.applicationSettings.defaultSetCount">Default Set Count</Translate>
                </Label>
                <AvField id="application-settings-defaultSetCount" type="string" className="form-control" name="defaultSetCount" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/application-settings" replace color="info">
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
  applicationSettingsEntity: storeState.applicationSettings.entity,
  loading: storeState.applicationSettings.loading,
  updating: storeState.applicationSettings.updating,
  updateSuccess: storeState.applicationSettings.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationSettingsUpdate);
