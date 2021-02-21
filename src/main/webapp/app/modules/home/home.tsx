import './home.scss';

import React, { useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEntities as getUnits } from 'app/entities/unit/unit.reducer';
import { FloatingAddButton } from './floatingAddButton/floatingAddButton'; 
import { 
  createEntityWithWeightByUser as createProtocolledWeightWithWeightByUser,
  getEntities as getProtocolledWeights
} from 'app/entities/protocolled-weight/protocolled-weight.reducer';
import { 
  createEntityWithWeightByUser as createTargetWeightWithWeightByUser,
  getEntities as getTargetWeights
} from 'app/entities/target-weight/target-weight.reducer';

import { IRootState } from 'app/shared/reducers';
import { IUnit } from 'app/shared/model/unit.model';
import { IProtocolledWeight } from 'app/shared/model/protocolled-weight.model';
import { ITrainingSchedule } from 'app/shared/model/training-schedule.model';
import { IWeight } from 'app/shared/model/weight.model';
import { ITargetWeight } from 'app/shared/model/target-weight.model';

export interface IHomeProp extends StateProps, DispatchProps {}

export const Home = (props: IHomeProp) => {

  const { account, isAuthenticated, availableUnits, currentUserId, isNewUser, noTrainingScheduleForUser } = props;
  const username = account && account.firstName ? account.firstName : account.login

  if(isAuthenticated) {
    useEffect(() => {
      props.getTargetWeights();
      props.getProtocolledWeights();
      props.getUnits();
    }, []);
  }
  
  const valLastWeightDate = (selectedDate) => {
    return Date.parse(new Date().toDateString()) >= (Date.parse(`${selectedDate}`) - (1000*60*60));  
  };

  const valTargetWeightDate = (selectedDate) => {
    return (Date.parse(`${selectedDate}`) - (1000*60*60)) >= (Date.parse(new Date().toDateString()) + (1000*60*60*24));  
  };
  
  const saveEntity = (event, values) => {

      const pWeight: IWeight = {
        amount: +values["application-home-init-currentWeight-field"],
        units: availableUnits.find((cu: IUnit) => cu.id === +values["application-home-init-currentWeightUnit-field"])
      }

      const protocolledWeight: IProtocolledWeight = {
        user: {
          id: currentUserId
        },
        time: `${values["application-home-init-lastWeighed-date-field"]}T${values["application-home-init-lastWeighed-time-field"]}:00.000Z`,
        weight: pWeight
      }

      const tWeight: IWeight = {
        amount: +values["application-home-init-targetWeight-field"],
        units: availableUnits.find((tu: IUnit) => tu.id === +values["application-home-init-targetWeightUnit-field"])
      }

      const targetWeight: ITargetWeight = {
        user: {
          id: currentUserId
        },
        startDate: new Date().toISOString(),
        endDate: `${values["application-home-init-targetWeight-date-field"]}T${values["application-home-init-targetWeight-time-field"]}:00.000Z`,
        weight: tWeight
      }

      props.createProtocolledWeightWithWeightByUser(protocolledWeight);
      props.createTargetWeightWithWeightByUser(targetWeight);
  }

  return (
    <div className="fill">
      { account && account.login ? (
        <div>
          <Row>
            <Col md="12">
              <h2>
                <Translate contentKey="home.title" interpolate={{ username }}>Hello, { username }!</Translate>
              </h2>
            </Col>
          </Row>
          &nbsp;
          { isNewUser ? (
          <div>
            <Row className="justify-content-center">
              <Col md="12">
                <h3 id="openfitnesstrackerApp.home.initialData.title">
                  <Translate contentKey="home.tellUs">New here? Tell us a little bit about you ...</Translate>
                </h3>
              </Col>
            </Row>
            <Row className="justify-content">
              <Col xs="12" md="12" lg="10" xl="7">
                <AvForm onValidSubmit={ saveEntity }>
                  <AvGroup id="application-home-init-currentWeight">
                    <Row>
                      <Col xs="12" sm="5" md="6" lg="7">
                        <Label id="application-home-init-currentWeight-label" for="application-home-init-currentWeight-field">
                          <Translate contentKey="home.question.weight"></Translate>
                        </Label>
                      </Col>
                      <Col sm="7" md="6" lg="5">
                        <Row>
                          <Col xs="6">
                            <AvField id="application-home-init-currentWeight-field" 
                              name="application-home-init-currentWeight-field" 
                              type="number" min="1" max="999" required errorMessage={translate("home.validation.required")}/>
                          </Col>
                          <Col xs="6">
                            <AvField type="select" name="application-home-init-currentWeightUnit-field">
                              { availableUnits.map((unit: IUnit) => <option key={ unit.id } value={ unit.id }>{ unit.shortName }</option>) }
                            </AvField>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </AvGroup>
                  <AvGroup id="application-home-init-lastWeighed">
                    <Row>
                      <Col xs="12" sm="5" md="6" lg="7">
                        <Label id="application-home-init-lastWeighed-label" for="application-home-init-lastWeighed-label">
                          <Translate contentKey="home.question.lastWeighed">When was the last time you weighed yourself</Translate>
                        </Label>
                        </Col>
                        <Col sm="7" md="6" lg="5">
                          <Row>
                            <Col xs="6">
                              <AvField id="application-home-init-lastWeighed-date-field" type="date" 
                                name="application-home-init-lastWeighed-date-field" required 
                                validate={{async: valLastWeightDate}} errorMessage={translate("home.validation.lastWeightDate")}/>
                            </Col>
                            <Col xs="6">
                              <AvField id="application-home-init-lastWeighed-time-field" type="time" 
                                name="application-home-init-lastWeighed-time-field" required errorMessage={translate("home.validation.required")}/>
                            </Col>
                          </Row>
                        </Col>
                    </Row>
                  </AvGroup>
                  <AvGroup id="application-home-init-targetWeight">
                    <Row>
                      <Col xs="12" sm="5" md="6" lg="7">
                        <Label id="application-home-init-targetWeight-label" for="application-home-init-targetWeight-field">
                          <Translate contentKey="home.question.weightTarget.weight">How much do you want to weigh?</Translate>
                        </Label>
                      </Col>
                      <Col sm="7" md="6" lg="5">
                        <Row>
                          <Col xs="6">
                            <AvField id="application-home-init-targetWeight-field" 
                              name="application-home-init-targetWeight-field" 
                              type="number" min="1" max="999" required errorMessage={translate("home.validation.required")}/>
                          </Col>
                          <Col xs="6">
                            <AvField type="select" name="application-home-init-targetWeightUnit-field">
                              { availableUnits.map((unit: IUnit) => <option key={ unit.id } value={ unit.id }>{ unit.shortName }</option>) }
                            </AvField>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </AvGroup>
                  <AvGroup>
                    <Row>
                      <Col xs="12" sm="5" md="6" lg="7">
                        <Label id="defaultThemeLabel" for="application-settings-defaultTheme">
                          <Translate contentKey="home.question.weightTarget.date">When do you want to have reached your goal </Translate>
                        </Label>
                      </Col>
                      <Col sm="7" md="6" lg="5">
                          <Row>
                            <Col xs="6">
                              <AvField id="application-home-init-targetWeight-date-field" type="date" 
                                name="application-home-init-targetWeight-date-field" required 
                                validate={{async: valTargetWeightDate}} errorMessage={translate("home.validation.targetWeightDate")} />
                            </Col>
                            <Col xs="6">
                              <AvField id="application-home-init-targetWeight-time-field" type="time" 
                                name="application-home-init-targetWeight-time-field" required errorMessage={translate("home.validation.required")}/>
                            </Col>
                          </Row>
                        </Col>
                    </Row>
                  </AvGroup>
                  <Button color="primary" id="save-entity" type="submit" disabled={false}>
                    <FontAwesomeIcon icon="save" />
                    &nbsp;
                    <Translate contentKey="entity.action.save">Save</Translate>
                  </Button>
                </AvForm>
              </Col>
            </Row>
          </div> ) : (
          <>
            <Alert color="success">
              {
                noTrainingScheduleForUser ? (
                  <>
                    <Translate contentKey="home.greeting.createTrainingSchedule">Got it! Next step it to create a training plan!</Translate>
                  </>
                ) : (
                  <Translate contentKey="home.greeting.trainingsplanExists">Welcome back! Enjoy your workout!</Translate>
                )
              }
            </Alert>
            <FloatingAddButton />
          </>
          )
          }
        </div>
      ) : (
        <>
          <div>
            <Alert color="warning">
              <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
              <Link to="/account/register" className="alert-link">
                <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
              </Link>
            </Alert>
          </div>
          <p>
            <Translate contentKey="home.question.writeUs">If you have any question on Open Fitness Tracker, please write us an </Translate>
            <a href="mailto:open-fitness-tracker@sm0x.org" target="_blank" rel="noopener noreferrer">
                <Translate contentKey="home.link.e-mail">e-Mail</Translate>
            </a>
          </p>
          <p>
            <Translate contentKey="home.feedback">For feedback or if you encounter bugs, please open a issue on </Translate>
            <a href="https://github.com/smox/open-fitness-tracker/issues" target="_blank" rel="noopener noreferrer">
                Github
            </a>
          </p>
          <p>
            <Translate contentKey="home.like">If you like Open Fitness Tracker, do not forget to give us a star on</Translate>{' '}
            <a href="https://github.com/smox/open-fitness-tracker" target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </p>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  availableUnits: storeState.unit.entities,
  isNewUser: storeState.protocolledWeight.entities
    .filter((entity: IProtocolledWeight) => entity.user && storeState.authentication.isAuthenticated && 
      entity.user.id === storeState.authentication.account.id).length === 0,
  noTrainingScheduleForUser: storeState.trainingSchedule.entities
    .filter((entity: ITrainingSchedule) => entity.user && storeState.authentication.isAuthenticated && 
      entity.user.id === storeState.authentication.account.id).length === 0,
  currentUserId: storeState.authentication.account.id
});

const mapDispatchToProps = {
  getUnits,
  createProtocolledWeightWithWeightByUser,
  createTargetWeightWithWeightByUser,
  getProtocolledWeights,
  getTargetWeights
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
