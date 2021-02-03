import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './unit.reducer';
import { IUnit } from 'app/shared/model/unit.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUnitDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UnitDetail = (props: IUnitDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { unitEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.unit.detail.title">Unit</Translate> [<b>{unitEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openfitnesstrackerApp.unit.name">Name</Translate>
            </span>
          </dt>
          <dd>{unitEntity.name}</dd>
          <dt>
            <span id="shortName">
              <Translate contentKey="openfitnesstrackerApp.unit.shortName">Short Name</Translate>
            </span>
          </dt>
          <dd>{unitEntity.shortName}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.unit.language">Language</Translate>
          </dt>
          <dd>{unitEntity.language ? unitEntity.language.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/unit" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/unit/${unitEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ unit }: IRootState) => ({
  unitEntity: unit.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnitDetail);
