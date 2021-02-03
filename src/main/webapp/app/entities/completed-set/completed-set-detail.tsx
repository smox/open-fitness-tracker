import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './completed-set.reducer';
import { ICompletedSet } from 'app/shared/model/completed-set.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompletedSetDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompletedSetDetail = (props: ICompletedSetDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { completedSetEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.completedSet.detail.title">CompletedSet</Translate> [<b>{completedSetEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="set">
              <Translate contentKey="openfitnesstrackerApp.completedSet.set">Set</Translate>
            </span>
          </dt>
          <dd>{completedSetEntity.set}</dd>
          <dt>
            <span id="repetitions">
              <Translate contentKey="openfitnesstrackerApp.completedSet.repetitions">Repetitions</Translate>
            </span>
          </dt>
          <dd>{completedSetEntity.repetitions}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.completedSet.weight">Weight</Translate>
          </dt>
          <dd>{completedSetEntity.weight ? completedSetEntity.weight.id : ''}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.completedSet.user">User</Translate>
          </dt>
          <dd>{completedSetEntity.user ? completedSetEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.completedSet.completedTrainings">Completed Trainings</Translate>
          </dt>
          <dd>{completedSetEntity.completedTrainings ? completedSetEntity.completedTrainings.id : ''}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.completedSet.workouts">Workouts</Translate>
          </dt>
          <dd>{completedSetEntity.workouts ? completedSetEntity.workouts.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/completed-set" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/completed-set/${completedSetEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ completedSet }: IRootState) => ({
  completedSetEntity: completedSet.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompletedSetDetail);
