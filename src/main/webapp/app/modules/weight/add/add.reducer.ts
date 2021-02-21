import { IProtocolledWeight } from 'app/shared/model/protocolled-weight.model';
import { LineMarkSeriesPoint, RVNearestXData } from 'react-vis';

export const ACTION_TYPES = {
  CHANGE_CHART_DIMENSION: 'WeightAdd/CHANGE_CHART_DIMENSION',
  OPEN_DELETE_DIALOG: 'WeightAdd/OPEN_DELETE_DIALOG',
  CLOSE_DELETE_DIALOG: 'WeightAdd/CLOSE_DELETE_DIALOG',
  SET_CROSSHAIR: 'WeightAdd/SET_CROSSHAIR',
  SET_DEFAULT_UNIT: 'WeightAdd/SET_DEFAULT_UNIT',
};

const initialState = {
  loading: false,
  chartDimension: {
    height: 650,
    width: 800,
  },
  isDeleteDialogOpen: false,
  protocolledWeight: undefined,
  crosshair: [],
  defaultValues: {
    'application-home-init-currentWeight-field': 65,
    'application-home-init-currentWeightUnit-field': 0,
    'application-home-init-lastWeighed-date-field': new Date().toISOString().substr(0, 10),
    'application-home-init-lastWeighed-time-field': '06:30',
  },
};

export type WeightAddState = Readonly<typeof initialState>;

// Reducer
export default (state: WeightAddState = initialState, action): WeightAddState => {
  switch (action.type) {
    case ACTION_TYPES.SET_CROSSHAIR:
      return {
        ...state,
        crosshair: [action.dataPoint],
      };
    case ACTION_TYPES.CHANGE_CHART_DIMENSION:
      return {
        ...state,
        chartDimension: {
          ...state.chartDimension,
          height: action.height,
          width: action.width,
        },
      };
    case ACTION_TYPES.OPEN_DELETE_DIALOG:
      return {
        ...state,
        isDeleteDialogOpen: true,
        protocolledWeight: action.payload,
      };
    case ACTION_TYPES.CLOSE_DELETE_DIALOG:
      return {
        ...state,
        isDeleteDialogOpen: false,
        protocolledWeight: undefined,
      };
    case ACTION_TYPES.SET_DEFAULT_UNIT:
      return {
        ...state,
        defaultValues: {
          ...state.defaultValues,
          'application-home-init-currentWeightUnit-field': action.id,
        },
      };
    default:
      return state;
  }
};

export const setChartDimensions = (height: number, width: number) => ({
  type: ACTION_TYPES.CHANGE_CHART_DIMENSION,
  height,
  width,
});

export const openDeleteDialog = (protocolledWeight: IProtocolledWeight) => ({
  type: ACTION_TYPES.OPEN_DELETE_DIALOG,
  payload: protocolledWeight,
});

export const closeDeleteDialog = () => ({
  type: ACTION_TYPES.CLOSE_DELETE_DIALOG,
});

export const setCrosshair = (dataPoint: LineMarkSeriesPoint) => ({
  type: ACTION_TYPES.SET_CROSSHAIR,
  dataPoint,
});

export const setDefaultUnit = (id: number) => ({
  type: ACTION_TYPES.SET_DEFAULT_UNIT,
  id,
});
