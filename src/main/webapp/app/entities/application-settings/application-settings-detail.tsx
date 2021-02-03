import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './application-settings.reducer';
import { IApplicationSettings } from 'app/shared/model/application-settings.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationSettingsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationSettingsDetail = (props: IApplicationSettingsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { applicationSettingsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.applicationSettings.detail.title">ApplicationSettings</Translate> [
          <b>{applicationSettingsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="defaultTheme">
              <Translate contentKey="openfitnesstrackerApp.applicationSettings.defaultTheme">Default Theme</Translate>
            </span>
          </dt>
          <dd>{applicationSettingsEntity.defaultTheme}</dd>
          <dt>
            <span id="defaultWarmupTime">
              <Translate contentKey="openfitnesstrackerApp.applicationSettings.defaultWarmupTime">Default Warmup Time</Translate>
            </span>
          </dt>
          <dd>{applicationSettingsEntity.defaultWarmupTime}</dd>
          <dt>
            <span id="defaultPreWorkoutTime">
              <Translate contentKey="openfitnesstrackerApp.applicationSettings.defaultPreWorkoutTime">Default Pre Workout Time</Translate>
            </span>
          </dt>
          <dd>{applicationSettingsEntity.defaultPreWorkoutTime}</dd>
          <dt>
            <span id="defaultSetCount">
              <Translate contentKey="openfitnesstrackerApp.applicationSettings.defaultSetCount">Default Set Count</Translate>
            </span>
          </dt>
          <dd>{applicationSettingsEntity.defaultSetCount}</dd>
        </dl>
        <Button tag={Link} to="/application-settings" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/application-settings/${applicationSettingsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ applicationSettings }: IRootState) => ({
  applicationSettingsEntity: applicationSettings.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationSettingsDetail);
