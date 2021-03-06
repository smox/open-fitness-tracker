import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './nutrition.reducer';
import { INutrition } from 'app/shared/model/nutrition.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INutritionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NutritionDetail = (props: INutritionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { nutritionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openfitnesstrackerApp.nutrition.detail.title">Nutrition</Translate> [<b>{nutritionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="time">
              <Translate contentKey="openfitnesstrackerApp.nutrition.time">Time</Translate>
            </span>
          </dt>
          <dd>{nutritionEntity.time ? <TextFormat value={nutritionEntity.time} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="carbs">
              <Translate contentKey="openfitnesstrackerApp.nutrition.carbs">Carbs</Translate>
            </span>
          </dt>
          <dd>{nutritionEntity.carbs}</dd>
          <dt>
            <span id="fat">
              <Translate contentKey="openfitnesstrackerApp.nutrition.fat">Fat</Translate>
            </span>
          </dt>
          <dd>{nutritionEntity.fat}</dd>
          <dt>
            <span id="protein">
              <Translate contentKey="openfitnesstrackerApp.nutrition.protein">Protein</Translate>
            </span>
          </dt>
          <dd>{nutritionEntity.protein}</dd>
          <dt>
            <span id="fiber">
              <Translate contentKey="openfitnesstrackerApp.nutrition.fiber">Fiber</Translate>
            </span>
          </dt>
          <dd>{nutritionEntity.fiber}</dd>
          <dt>
            <span id="kcal">
              <Translate contentKey="openfitnesstrackerApp.nutrition.kcal">Kcal</Translate>
            </span>
          </dt>
          <dd>{nutritionEntity.kcal}</dd>
          <dt>
            <Translate contentKey="openfitnesstrackerApp.nutrition.user">User</Translate>
          </dt>
          <dd>{nutritionEntity.user ? nutritionEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/nutrition" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/nutrition/${nutritionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ nutrition }: IRootState) => ({
  nutritionEntity: nutrition.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NutritionDetail);
