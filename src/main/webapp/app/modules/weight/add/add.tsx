import './add.scss';
import '../../../../../../../node_modules/react-vis/dist/styles/legends.scss';
import '../../../../../../../node_modules/react-vis/dist/styles/plot.scss';
import React, { useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Button, Label, Table } from 'reactstrap';
import { IUnit } from 'app/shared/model/unit.model';
import { 
    createEntityWithWeightByUser as createProtocolledWeightWithWeightByUser,
    getEntities as getProtocolledWeights,
    deleteEntityWithWeight as deleteProtocolledWeightWithWeight
} from 'app/entities/protocolled-weight/protocolled-weight.reducer';

import { getEntities as getUnits } from 'app/entities/unit/unit.reducer';
import { setChartDimensions, setCrosshair, openDeleteDialog, closeDeleteDialog, setDefaultUnit } from 'app/modules/weight/add/add.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { XYPlot, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, LineMarkSeries, Crosshair } from 'react-vis';
import ConfirmDialog from 'app/shared/component/dialog/confirm/confirm';
import { IWeight } from 'app/shared/model/weight.model';
import { IProtocolledWeight } from 'app/shared/model/protocolled-weight.model';


export interface IWeightAddProps extends StateProps, DispatchProps {}

export const WeightAdd = (props: IWeightAddProps) => {

    const { isAuthenticated, availableUnits, currentUserId, crosshairValues, defaultValues,
        protocolledWeights, chartHeight, chartWidth, isOpen, protocolledWeightToDel } = props;

    /**
     * Workaround until the backend can filter the objects to the last 7 pieces
     */
    const last7ProtocolledWeights = [ ...protocolledWeights ]
    .sort((protocolledWeight1, protocolledWeight2) => protocolledWeight1.time.localeCompare(protocolledWeight2.time))
    .slice(protocolledWeights.length >= 7 ? protocolledWeights.length - 7 : 0);

    const valLastWeightDate = (selectedDate) => {
        return Date.parse(new Date().toDateString()) >= (Date.parse(`${selectedDate}`) - (1000*60*60));  
    };
      
    const saveEntity = (event, values) => {

        const selectedUnitId = +values["application-home-init-currentWeightUnit-field"] !== 0 ? 
            +values["application-home-init-currentWeightUnit-field"] : +defaultValues["application-home-init-currentWeightUnit-field"];

        const pWeight: IWeight = {
            amount: +values["application-home-init-currentWeight-field"],
            units: availableUnits && availableUnits.find((cu: IUnit) => cu.id === selectedUnitId)
        }

        const protocolledWeightToAdd: IProtocolledWeight = {
            user: { id: currentUserId },
            time: `${values["application-home-init-lastWeighed-date-field"]}T${values["application-home-init-lastWeighed-time-field"]}:00.000+01:00`,
            weight: pWeight
        }


        props.createProtocolledWeightWithWeightByUser(protocolledWeightToAdd);
    }

    const buildWeightScale = (data: { x: Date, y: number }[]) => {
        const min = 0;
        const max = Math.max(...(data.map(dp => dp.y))) + 10;
        return [min, max];
    }

    const chartData = last7ProtocolledWeights.map(l7pt => ({ x: new Date(Date.parse(l7pt.time)), y: l7pt.weight.amount }));

    const resizeEvent = () => {
        const offsetWidth = document.getElementById("chartColumn").offsetWidth;
        if(offsetWidth < chartWidth) {
            props.setChartDimensions(offsetWidth-150, offsetWidth);
        } else {
            props.setChartDimensions(chartHeight, chartWidth);
        }
    };

    const Chart = (chartDimensions: { height: number, width: number}) => (
            <XYPlot height={chartDimensions.height} width={chartDimensions.width} xType="time" yDomain={buildWeightScale(chartData)}>
                <XAxis title="Datum" 
                    tickFormat={(date: Date) => ( date.toLocaleDateString())} 
                    tickTotal={last7ProtocolledWeights.length} />
                <YAxis title="Gewicht"/>
                <HorizontalGridLines />
                <VerticalGridLines />
                <LineMarkSeries 
                    data={chartData}
                    onNearestX={(dataPoint, data) => props.setCrosshair(dataPoint)} 
                    
                />
                { crosshairValues && crosshairValues.length > 0 && 
                <Crosshair values={crosshairValues}>
                    <div style={{ background: 'black', width: "170px", borderRadius: "10px" , textAlign: "center", opacity: 0.8 }}>
                        <p style={{ paddingTop: '5px', marginBottom: 0 }}>
                            {`${translate('openfitnesstrackerApp.protocolledWeight.time')}: ${crosshairValues[0].x.toLocaleString()}`}
                        </p>
                        <p style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                            { `${translate('openfitnesstrackerApp.protocolledWeight.weight')}: ${crosshairValues[0].y}`}
                        </p>
                    </div>
                </Crosshair>
                }    
            </XYPlot>
    );
    
    if(isAuthenticated) {
        useEffect(() => {
            props.getProtocolledWeights();
            props.getUnits();
            window.addEventListener('resize', resizeEvent)
        }, []);
    }

    useEffect(() => {
        if(availableUnits && availableUnits.length > 0 && availableUnits[0]) {
            props.setDefaultUnit(availableUnits[0].id);
        }
    }, [availableUnits])

    return ( 
    <div className="container-fluid">
        <Row>
            <Col xs="12" xl="6">
                <Row>
                    <Col xs="12">
                        <AvForm onValidSubmit={ saveEntity } model={defaultValues}>
                            <AvGroup id="application-home-init-currentWeight">
                                <Row>
                                    <Col xs="12" sm="5">
                                    <Label id="application-home-init-currentWeight-label" for="application-home-init-currentWeight-field">
                                        <Translate contentKey="home.question.weight"></Translate>
                                    </Label>
                                    </Col>
                                    <Col xs="12" sm="7">
                                        <Row>
                                            <Col xs="6">
                                                <AvField id="application-home-init-currentWeight-field" 
                                                    name="application-home-init-currentWeight-field" 
                                                    type="number" min="1" max="999" required errorMessage={translate("home.validation.required")}/>
                                            </Col>
                                            <Col xs="6">
                                                <AvField type="select" name="application-home-init-currentWeightUnit-field">
                                                    { availableUnits && availableUnits.map((unit: IUnit) => <option key={ unit.id } value={ unit.id }>{ unit.shortName }</option>) }
                                                </AvField>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </AvGroup>
                            <AvGroup id="application-home-init-lastWeighed">
                                <Row>
                                    <Col xs="12" sm="5">
                                    <Label id="application-home-init-lastWeighed-label" for="application-home-init-lastWeighed-label">
                                        <Translate contentKey="home.question.lastWeighed">When was the last time you weighed yourself</Translate>
                                    </Label>
                                    </Col>
                                    <Col xs="12" sm="7">
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
                            <Button color="primary" id="save-entity" type="submit">
                                <FontAwesomeIcon icon="save" />
                                &nbsp;
                                <Translate contentKey="entity.action.save">Save</Translate>
                            </Button>   
                        </AvForm>
                    </Col>
                    &nbsp;
                    <Col xs="12">
                        <div className="table-responsive">
                            {last7ProtocolledWeights && last7ProtocolledWeights.length > 0 ? (
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>
                                            <Translate contentKey="openfitnesstrackerApp.protocolledWeight.time">Time</Translate>
                                        </th>
                                        <th>
                                            <Translate contentKey="openfitnesstrackerApp.protocolledWeight.weight">Weight</Translate>
                                        </th>
                                        <th>
                                            <Translate contentKey="entity.action.actions">Delete</Translate>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {last7ProtocolledWeights.map((protocolledWeight, i) => (
                                    <tr key={`protocolledWeight-${i}`} onMouseOver={() => props.setCrosshair({ x: new Date(Date.parse(protocolledWeight.time)), y: protocolledWeight.weight.amount })}>
                                        <td>{ new Date(Date.parse(protocolledWeight.time)).toLocaleString() }</td>
                                        <td>{ protocolledWeight.weight.amount.toFixed(1) } {availableUnits && availableUnits.find(pwu => 
                                                protocolledWeight.weight.units && pwu.id === protocolledWeight.weight.units.id)?.shortName }
                                        </td>
                                        <td>
                                            <Button onClick={ () => props.openDeleteDialog(protocolledWeight) } color="danger" size="sm">
                                                <FontAwesomeIcon icon="trash" />{' '}
                                                <span className="d-none d-md-inline">
                                                    <Translate contentKey="entity.action.delete">Delete</Translate>
                                                </span>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            ) : (
                                <div className="alert alert-warning">
                                <Translate contentKey="openfitnesstrackerApp.protocolledWeight.home.notFound">No Application Settings found</Translate>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col id="chartColumn" xs="12" xl="6">
                <Chart height={chartHeight} width={chartWidth} />
            </Col>
        </Row>
        <ConfirmDialog 
            title={ translate("entity.delete.title") } 
            message={ translate("openfitnesstrackerApp.protocolledWeight.delete.question2", 
            { name: protocolledWeightToDel && protocolledWeightToDel.weight ? 
                    `${protocolledWeightToDel.weight.amount} 
                        ${ protocolledWeightToDel.weight.units && protocolledWeightToDel.weight.units.shortName ? 
                            protocolledWeightToDel.weight.units.shortName : ""}` : "" }) }
            isOpen={ isOpen } 
            confirmButtonText={ translate("entity.action.delete") }
            confirmButtonColor={ "danger" }
            handleClose={ props.closeDeleteDialog }
            handleConfirm={ () => { props.deleteProtocolledWeightWithWeight(protocolledWeightToDel); props.closeDeleteDialog() } }
        />
    </div>)
}

const mapStateToProps = (storeState: IRootState) => ({
    isAuthenticated: storeState.authentication.isAuthenticated,
    availableUnits: storeState.unit.entities,
    currentUserId: storeState.authentication.account.id,
    protocolledWeights: storeState.protocolledWeight.entities
        .filter(pw => pw.user && storeState.authentication.isAuthenticated && pw.user.id === storeState.authentication.account.id),
    chartHeight: storeState.weightAdd.chartDimension.height,
    chartWidth: storeState.weightAdd.chartDimension.width,
    isOpen: storeState.weightAdd.isDeleteDialogOpen,
    protocolledWeightToDel: storeState.weightAdd.protocolledWeight,
    crosshairValues: storeState.weightAdd.crosshair,
    defaultValues: storeState.weightAdd.defaultValues
});
  
const mapDispatchToProps = {
    getUnits,
    createProtocolledWeightWithWeightByUser,
    getProtocolledWeights,
    setChartDimensions,
    deleteProtocolledWeightWithWeight,
    openDeleteDialog,
    closeDeleteDialog,
    setCrosshair,
    setDefaultUnit
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WeightAdd);