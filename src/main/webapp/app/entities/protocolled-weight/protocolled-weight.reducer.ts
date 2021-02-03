import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProtocolledWeight, defaultValue } from 'app/shared/model/protocolled-weight.model';

export const ACTION_TYPES = {
  FETCH_PROTOCOLLEDWEIGHT_LIST: 'protocolledWeight/FETCH_PROTOCOLLEDWEIGHT_LIST',
  FETCH_PROTOCOLLEDWEIGHT: 'protocolledWeight/FETCH_PROTOCOLLEDWEIGHT',
  CREATE_PROTOCOLLEDWEIGHT: 'protocolledWeight/CREATE_PROTOCOLLEDWEIGHT',
  UPDATE_PROTOCOLLEDWEIGHT: 'protocolledWeight/UPDATE_PROTOCOLLEDWEIGHT',
  DELETE_PROTOCOLLEDWEIGHT: 'protocolledWeight/DELETE_PROTOCOLLEDWEIGHT',
  RESET: 'protocolledWeight/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProtocolledWeight>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProtocolledWeightState = Readonly<typeof initialState>;

// Reducer

export default (state: ProtocolledWeightState = initialState, action): ProtocolledWeightState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROTOCOLLEDWEIGHT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROTOCOLLEDWEIGHT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROTOCOLLEDWEIGHT):
    case REQUEST(ACTION_TYPES.UPDATE_PROTOCOLLEDWEIGHT):
    case REQUEST(ACTION_TYPES.DELETE_PROTOCOLLEDWEIGHT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PROTOCOLLEDWEIGHT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROTOCOLLEDWEIGHT):
    case FAILURE(ACTION_TYPES.CREATE_PROTOCOLLEDWEIGHT):
    case FAILURE(ACTION_TYPES.UPDATE_PROTOCOLLEDWEIGHT):
    case FAILURE(ACTION_TYPES.DELETE_PROTOCOLLEDWEIGHT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROTOCOLLEDWEIGHT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROTOCOLLEDWEIGHT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROTOCOLLEDWEIGHT):
    case SUCCESS(ACTION_TYPES.UPDATE_PROTOCOLLEDWEIGHT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROTOCOLLEDWEIGHT):
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

const apiUrl = 'api/protocolled-weights';

// Actions

export const getEntities: ICrudGetAllAction<IProtocolledWeight> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROTOCOLLEDWEIGHT_LIST,
  payload: axios.get<IProtocolledWeight>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IProtocolledWeight> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROTOCOLLEDWEIGHT,
    payload: axios.get<IProtocolledWeight>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProtocolledWeight> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROTOCOLLEDWEIGHT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProtocolledWeight> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROTOCOLLEDWEIGHT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProtocolledWeight> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROTOCOLLEDWEIGHT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
