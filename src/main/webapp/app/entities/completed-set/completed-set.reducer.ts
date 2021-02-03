import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICompletedSet, defaultValue } from 'app/shared/model/completed-set.model';

export const ACTION_TYPES = {
  FETCH_COMPLETEDSET_LIST: 'completedSet/FETCH_COMPLETEDSET_LIST',
  FETCH_COMPLETEDSET: 'completedSet/FETCH_COMPLETEDSET',
  CREATE_COMPLETEDSET: 'completedSet/CREATE_COMPLETEDSET',
  UPDATE_COMPLETEDSET: 'completedSet/UPDATE_COMPLETEDSET',
  DELETE_COMPLETEDSET: 'completedSet/DELETE_COMPLETEDSET',
  RESET: 'completedSet/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICompletedSet>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CompletedSetState = Readonly<typeof initialState>;

// Reducer

export default (state: CompletedSetState = initialState, action): CompletedSetState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPLETEDSET_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPLETEDSET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPLETEDSET):
    case REQUEST(ACTION_TYPES.UPDATE_COMPLETEDSET):
    case REQUEST(ACTION_TYPES.DELETE_COMPLETEDSET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPLETEDSET_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPLETEDSET):
    case FAILURE(ACTION_TYPES.CREATE_COMPLETEDSET):
    case FAILURE(ACTION_TYPES.UPDATE_COMPLETEDSET):
    case FAILURE(ACTION_TYPES.DELETE_COMPLETEDSET):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPLETEDSET_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPLETEDSET):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPLETEDSET):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPLETEDSET):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPLETEDSET):
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

const apiUrl = 'api/completed-sets';

// Actions

export const getEntities: ICrudGetAllAction<ICompletedSet> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPLETEDSET_LIST,
  payload: axios.get<ICompletedSet>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICompletedSet> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPLETEDSET,
    payload: axios.get<ICompletedSet>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICompletedSet> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPLETEDSET,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICompletedSet> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPLETEDSET,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICompletedSet> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPLETEDSET,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
