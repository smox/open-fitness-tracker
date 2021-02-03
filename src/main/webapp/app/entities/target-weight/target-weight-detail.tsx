import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './target-weight.reducer';
import { ITargetWeight } from 'app/shared/model/target-weight.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITargetWeightDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TargetWeightDetail = (props: ITargetWeightDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { targetWeightEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.targetWeight.detail.title">TargetWeight</Translate> [<b>{targetWeightEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="startDate">
              <Translate contentKey="openfitnesstrackerApp.targetWeight.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {targetWeightEntity.startDate ? <TextFormat value={targetWeightEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="openfitnesstrackerApp.targetWeight.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            {targetWeightEntity.endDate ? <TextFormat value={targetWeightEntity.endDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.targetWeight.weight">Weight</Translate>
          </dt>
          <dd>{targetWeightEntity.weight ? targetWeightEntity.weight.id : ''}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.targetWeight.user">User</Translate>
          </dt>
          <dd>{targetWeightEntity.user ? targetWeightEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/target-weight" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/target-weight/${targetWeightEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ targetWeight }: IRootState) => ({
  targetWeightEntity: targetWeight.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TargetWeightDetail);
