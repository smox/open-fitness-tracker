import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITrainingUnit, defaultValue } from 'app/shared/model/training-unit.model';

export const ACTION_TYPES = {
  FETCH_TRAININGUNIT_LIST: 'trainingUnit/FETCH_TRAININGUNIT_LIST',
  FETCH_TRAININGUNIT: 'trainingUnit/FETCH_TRAININGUNIT',
  CREATE_TRAININGUNIT: 'trainingUnit/CREATE_TRAININGUNIT',
  UPDATE_TRAININGUNIT: 'trainingUnit/UPDATE_TRAININGUNIT',
  DELETE_TRAININGUNIT: 'trainingUnit/DELETE_TRAININGUNIT',
  RESET: 'trainingUnit/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITrainingUnit>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TrainingUnitState = Readonly<typeof initialState>;

// Reducer

export default (state: TrainingUnitState = initialState, action): TrainingUnitState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRAININGUNIT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRAININGUNIT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TRAININGUNIT):
    case REQUEST(ACTION_TYPES.UPDATE_TRAININGUNIT):
    case REQUEST(ACTION_TYPES.DELETE_TRAININGUNIT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TRAININGUNIT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRAININGUNIT):
    case FAILURE(ACTION_TYPES.CREATE_TRAININGUNIT):
    case FAILURE(ACTION_TYPES.UPDATE_TRAININGUNIT):
    case FAILURE(ACTION_TYPES.DELETE_TRAININGUNIT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRAININGUNIT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRAININGUNIT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRAININGUNIT):
    case SUCCESS(ACTION_TYPES.UPDATE_TRAININGUNIT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRAININGUNIT):
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

const apiUrl = 'api/training-units';

// Actions

export const getEntities: ICrudGetAllAction<ITrainingUnit> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TRAININGUNIT_LIST,
  payload: axios.get<ITrainingUnit>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITrainingUnit> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRAININGUNIT,
    payload: axios.get<ITrainingUnit>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITrainingUnit> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRAININGUNIT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITrainingUnit> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRAININGUNIT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITrainingUnit> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRAININGUNIT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
