import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './weight.reducer';
import { IWeight } from 'app/shared/model/weight.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWeightDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WeightDetail = (props: IWeightDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { weightEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.weight.detail.title">Weight</Translate> [<b>{weightEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="amount">
              <Translate contentKey="openfitnesstrackerApp.weight.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{weightEntity.amount}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.weight.units">Units</Translate>
          </dt>
          <dd>{weightEntity.units ? weightEntity.units.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/weight" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/weight/${weightEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ weight }: IRootState) => ({
  weightEntity: weight.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WeightDetail);
