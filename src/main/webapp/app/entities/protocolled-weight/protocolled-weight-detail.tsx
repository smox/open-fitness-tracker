import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './protocolled-weight.reducer';
import { IProtocolledWeight } from 'app/shared/model/protocolled-weight.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProtocolledWeightDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProtocolledWeightDetail = (props: IProtocolledWeightDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { protocolledWeightEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.protocolledWeight.detail.title">ProtocolledWeight</Translate> [
          <b>{protocolledWeightEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="time">
              <Translate contentKey="openfitnesstrackerApp.protocolledWeight.time">Time</Translate>
            </span>
          </dt>
          <dd>
            {protocolledWeightEntity.time ? <TextFormat value={protocolledWeightEntity.time} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.protocolledWeight.weight">Weight</Translate>
          </dt>
          <dd>{protocolledWeightEntity.weight ? protocolledWeightEntity.weight.id : ''}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.protocolledWeight.user">User</Translate>
          </dt>
          <dd>{protocolledWeightEntity.user ? protocolledWeightEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/protocolled-weight" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/protocolled-weight/${protocolledWeightEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ protocolledWeight }: IRootState) => ({
  protocolledWeightEntity: protocolledWeight.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProtocolledWeightDetail);
