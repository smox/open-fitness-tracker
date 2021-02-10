import { IProtocolledWeight } from 'app/shared/model/protocolled-weight.model';
import { LineMarkSeriesPoint, RVNearestXData } from 'react-vis';

export const ACTION_TYPES = {
  CHANGE_CHART_DIMENSION: 'WeightAdd/CHANGE_CHART_DIMENSION',
  OPEN_DELETE_DIALOG: 'WeightAdd/OPEN_DELETE_DIALOG',
  CLOSE_DELETE_DIALOG: 'WeightAdd/CLOSE_DELETE_DIALOG',
  SET_CROSSHAIR: 'WeightAdd/SET_CROSSHAIR',
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
