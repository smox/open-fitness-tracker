import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICompletedTraining, defaultValue } from 'app/shared/model/completed-training.model';

export const ACTION_TYPES = {
  FETCH_COMPLETEDTRAINING_LIST: 'completedTraining/FETCH_COMPLETEDTRAINING_LIST',
  FETCH_COMPLETEDTRAINING: 'completedTraining/FETCH_COMPLETEDTRAINING',
  CREATE_COMPLETEDTRAINING: 'completedTraining/CREATE_COMPLETEDTRAINING',
  UPDATE_COMPLETEDTRAINING: 'completedTraining/UPDATE_COMPLETEDTRAINING',
  DELETE_COMPLETEDTRAINING: 'completedTraining/DELETE_COMPLETEDTRAINING',
  RESET: 'completedTraining/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICompletedTraining>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CompletedTrainingState = Readonly<typeof initialState>;

// Reducer

export default (state: CompletedTrainingState = initialState, action): CompletedTrainingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPLETEDTRAINING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPLETEDTRAINING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPLETEDTRAINING):
    case REQUEST(ACTION_TYPES.UPDATE_COMPLETEDTRAINING):
    case REQUEST(ACTION_TYPES.DELETE_COMPLETEDTRAINING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPLETEDTRAINING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPLETEDTRAINING):
    case FAILURE(ACTION_TYPES.CREATE_COMPLETEDTRAINING):
    case FAILURE(ACTION_TYPES.UPDATE_COMPLETEDTRAINING):
    case FAILURE(ACTION_TYPES.DELETE_COMPLETEDTRAINING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPLETEDTRAINING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPLETEDTRAINING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPLETEDTRAINING):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPLETEDTRAINING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPLETEDTRAINING):
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

const apiUrl = 'api/completed-trainings';

// Actions

export const getEntities: ICrudGetAllAction<ICompletedTraining> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPLETEDTRAINING_LIST,
  payload: axios.get<ICompletedTraining>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICompletedTraining> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPLETEDTRAINING,
    payload: axios.get<ICompletedTraining>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICompletedTraining> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPLETEDTRAINING,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICompletedTraining> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPLETEDTRAINING,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICompletedTraining> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPLETEDTRAINING,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
