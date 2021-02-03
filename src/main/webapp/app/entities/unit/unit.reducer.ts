import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUnit, defaultValue } from 'app/shared/model/unit.model';

export const ACTION_TYPES = {
  FETCH_UNIT_LIST: 'unit/FETCH_UNIT_LIST',
  FETCH_UNIT: 'unit/FETCH_UNIT',
  CREATE_UNIT: 'unit/CREATE_UNIT',
  UPDATE_UNIT: 'unit/UPDATE_UNIT',
  DELETE_UNIT: 'unit/DELETE_UNIT',
  RESET: 'unit/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUnit>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UnitState = Readonly<typeof initialState>;

// Reducer

export default (state: UnitState = initialState, action): UnitState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_UNIT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_UNIT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_UNIT):
    case REQUEST(ACTION_TYPES.UPDATE_UNIT):
    case REQUEST(ACTION_TYPES.DELETE_UNIT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_UNIT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_UNIT):
    case FAILURE(ACTION_TYPES.CREATE_UNIT):
    case FAILURE(ACTION_TYPES.UPDATE_UNIT):
    case FAILURE(ACTION_TYPES.DELETE_UNIT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNIT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNIT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_UNIT):
    case SUCCESS(ACTION_TYPES.UPDATE_UNIT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_UNIT):
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

const apiUrl = 'api/units';

// Actions

export const getEntities: ICrudGetAllAction<IUnit> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_UNIT_LIST,
  payload: axios.get<IUnit>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUnit> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_UNIT,
    payload: axios.get<IUnit>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUnit> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_UNIT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUnit> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_UNIT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUnit> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_UNIT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
