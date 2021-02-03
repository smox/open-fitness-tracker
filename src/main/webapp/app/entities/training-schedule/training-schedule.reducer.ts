import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITrainingSchedule, defaultValue } from 'app/shared/model/training-schedule.model';

export const ACTION_TYPES = {
  FETCH_TRAININGSCHEDULE_LIST: 'trainingSchedule/FETCH_TRAININGSCHEDULE_LIST',
  FETCH_TRAININGSCHEDULE: 'trainingSchedule/FETCH_TRAININGSCHEDULE',
  CREATE_TRAININGSCHEDULE: 'trainingSchedule/CREATE_TRAININGSCHEDULE',
  UPDATE_TRAININGSCHEDULE: 'trainingSchedule/UPDATE_TRAININGSCHEDULE',
  DELETE_TRAININGSCHEDULE: 'trainingSchedule/DELETE_TRAININGSCHEDULE',
  RESET: 'trainingSchedule/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITrainingSchedule>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TrainingScheduleState = Readonly<typeof initialState>;

// Reducer

export default (state: TrainingScheduleState = initialState, action): TrainingScheduleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRAININGSCHEDULE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRAININGSCHEDULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TRAININGSCHEDULE):
    case REQUEST(ACTION_TYPES.UPDATE_TRAININGSCHEDULE):
    case REQUEST(ACTION_TYPES.DELETE_TRAININGSCHEDULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TRAININGSCHEDULE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRAININGSCHEDULE):
    case FAILURE(ACTION_TYPES.CREATE_TRAININGSCHEDULE):
    case FAILURE(ACTION_TYPES.UPDATE_TRAININGSCHEDULE):
    case FAILURE(ACTION_TYPES.DELETE_TRAININGSCHEDULE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRAININGSCHEDULE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRAININGSCHEDULE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRAININGSCHEDULE):
    case SUCCESS(ACTION_TYPES.UPDATE_TRAININGSCHEDULE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRAININGSCHEDULE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/training-schedules';

// Actions

export const getEntities: ICrudGetAllAction<ITrainingSchedule> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TRAININGSCHEDULE_LIST,
  payload: axios.get<ITrainingSchedule>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITrainingSchedule> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRAININGSCHEDULE,
    payload: axios.get<ITrainingSchedule>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITrainingSchedule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRAININGSCHEDULE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITrainingSchedule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRAININGSCHEDULE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITrainingSchedule> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRAININGSCHEDULE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
