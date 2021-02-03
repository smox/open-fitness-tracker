import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITargetWeight, defaultValue } from 'app/shared/model/target-weight.model';

export const ACTION_TYPES = {
  FETCH_TARGETWEIGHT_LIST: 'targetWeight/FETCH_TARGETWEIGHT_LIST',
  FETCH_TARGETWEIGHT: 'targetWeight/FETCH_TARGETWEIGHT',
  CREATE_TARGETWEIGHT: 'targetWeight/CREATE_TARGETWEIGHT',
  UPDATE_TARGETWEIGHT: 'targetWeight/UPDATE_TARGETWEIGHT',
  DELETE_TARGETWEIGHT: 'targetWeight/DELETE_TARGETWEIGHT',
  RESET: 'targetWeight/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITargetWeight>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TargetWeightState = Readonly<typeof initialState>;

// Reducer

export default (state: TargetWeightState = initialState, action): TargetWeightState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TARGETWEIGHT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TARGETWEIGHT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TARGETWEIGHT):
    case REQUEST(ACTION_TYPES.UPDATE_TARGETWEIGHT):
    case REQUEST(ACTION_TYPES.DELETE_TARGETWEIGHT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TARGETWEIGHT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TARGETWEIGHT):
    case FAILURE(ACTION_TYPES.CREATE_TARGETWEIGHT):
    case FAILURE(ACTION_TYPES.UPDATE_TARGETWEIGHT):
    case FAILURE(ACTION_TYPES.DELETE_TARGETWEIGHT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TARGETWEIGHT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TARGETWEIGHT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TARGETWEIGHT):
    case SUCCESS(ACTION_TYPES.UPDATE_TARGETWEIGHT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TARGETWEIGHT):
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

const apiUrl = 'api/target-weights';

// Actions

export const getEntities: ICrudGetAllAction<ITargetWeight> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TARGETWEIGHT_LIST,
  payload: axios.get<ITargetWeight>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITargetWeight> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TARGETWEIGHT,
    payload: axios.get<ITargetWeight>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITargetWeight> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TARGETWEIGHT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITargetWeight> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TARGETWEIGHT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITargetWeight> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TARGETWEIGHT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
