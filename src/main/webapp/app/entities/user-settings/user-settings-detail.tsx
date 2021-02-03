import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-settings.reducer';
import { IUserSettings } from 'app/shared/model/user-settings.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserSettingsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserSettingsDetail = (props: IUserSettingsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userSettingsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.userSettings.detail.title">UserSettings</Translate> [<b>{userSettingsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="selectedTheme">
              <Translate contentKey="openfitnesstrackerApp.userSettings.selectedTheme">Selected Theme</Translate>
            </span>
          </dt>
          <dd>{userSettingsEntity.selectedTheme}</dd>
          <dt>
            <span id="defaultWarmupTime">
              <Translate contentKey="openfitnesstrackerApp.userSettings.defaultWarmupTime">Default Warmup Time</Translate>
            </span>
          </dt>
          <dd>{userSettingsEntity.defaultWarmupTime}</dd>
          <dt>
            <span id="defaultPreWorkoutTime">
              <Translate contentKey="openfitnesstrackerApp.userSettings.defaultPreWorkoutTime">Default Pre Workout Time</Translate>
            </span>
          </dt>
          <dd>{userSettingsEntity.defaultPreWorkoutTime}</dd>
          <dt>
            <span id="defaultSetCount">
              <Translate contentKey="openfitnesstrackerApp.userSettings.defaultSetCount">Default Set Count</Translate>
            </span>
          </dt>
          <dd>{userSettingsEntity.defaultSetCount}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.userSettings.user">User</Translate>
          </dt>
          <dd>{userSettingsEntity.user ? userSettingsEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.userSettings.selectedLanguage">Selected Language</Translate>
          </dt>
          <dd>{userSettingsEntity.selectedLanguage ? userSettingsEntity.selectedLanguage.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-settings" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-settings/${userSettingsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userSettings }: IRootState) => ({
  userSettingsEntity: userSettings.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsDetail);
