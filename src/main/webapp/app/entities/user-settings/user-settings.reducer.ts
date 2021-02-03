import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserSettings, defaultValue } from 'app/shared/model/user-settings.model';

export const ACTION_TYPES = {
  FETCH_USERSETTINGS_LIST: 'userSettings/FETCH_USERSETTINGS_LIST',
  FETCH_USERSETTINGS: 'userSettings/FETCH_USERSETTINGS',
  CREATE_USERSETTINGS: 'userSettings/CREATE_USERSETTINGS',
  UPDATE_USERSETTINGS: 'userSettings/UPDATE_USERSETTINGS',
  DELETE_USERSETTINGS: 'userSettings/DELETE_USERSETTINGS',
  RESET: 'userSettings/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserSettings>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UserSettingsState = Readonly<typeof initialState>;

// Reducer

export default (state: UserSettingsState = initialState, action): UserSettingsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERSETTINGS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERSETTINGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_USERSETTINGS):
    case REQUEST(ACTION_TYPES.UPDATE_USERSETTINGS):
    case REQUEST(ACTION_TYPES.DELETE_USERSETTINGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USERSETTINGS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERSETTINGS):
    case FAILURE(ACTION_TYPES.CREATE_USERSETTINGS):
    case FAILURE(ACTION_TYPES.UPDATE_USERSETTINGS):
    case FAILURE(ACTION_TYPES.DELETE_USERSETTINGS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERSETTINGS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERSETTINGS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERSETTINGS):
    case SUCCESS(ACTION_TYPES.UPDATE_USERSETTINGS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERSETTINGS):
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

const apiUrl = 'api/user-settings';

// Actions

export const getEntities: ICrudGetAllAction<IUserSettings> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERSETTINGS_LIST,
  payload: axios.get<IUserSettings>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUserSettings> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERSETTINGS,
    payload: axios.get<IUserSettings>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUserSettings> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERSETTINGS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserSettings> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERSETTINGS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserSettings> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERSETTINGS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
