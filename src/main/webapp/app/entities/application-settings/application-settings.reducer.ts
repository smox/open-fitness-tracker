import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApplicationSettings, defaultValue } from 'app/shared/model/application-settings.model';

export const ACTION_TYPES = {
  FETCH_APPLICATIONSETTINGS_LIST: 'applicationSettings/FETCH_APPLICATIONSETTINGS_LIST',
  FETCH_APPLICATIONSETTINGS: 'applicationSettings/FETCH_APPLICATIONSETTINGS',
  CREATE_APPLICATIONSETTINGS: 'applicationSettings/CREATE_APPLICATIONSETTINGS',
  UPDATE_APPLICATIONSETTINGS: 'applicationSettings/UPDATE_APPLICATIONSETTINGS',
  DELETE_APPLICATIONSETTINGS: 'applicationSettings/DELETE_APPLICATIONSETTINGS',
  RESET: 'applicationSettings/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApplicationSettings>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ApplicationSettingsState = Readonly<typeof initialState>;

// Reducer

export default (state: ApplicationSettingsState = initialState, action): ApplicationSettingsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APPLICATIONSETTINGS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APPLICATIONSETTINGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_APPLICATIONSETTINGS):
    case REQUEST(ACTION_TYPES.UPDATE_APPLICATIONSETTINGS):
    case REQUEST(ACTION_TYPES.DELETE_APPLICATIONSETTINGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_APPLICATIONSETTINGS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APPLICATIONSETTINGS):
    case FAILURE(ACTION_TYPES.CREATE_APPLICATIONSETTINGS):
    case FAILURE(ACTION_TYPES.UPDATE_APPLICATIONSETTINGS):
    case FAILURE(ACTION_TYPES.DELETE_APPLICATIONSETTINGS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPLICATIONSETTINGS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPLICATIONSETTINGS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_APPLICATIONSETTINGS):
    case SUCCESS(ACTION_TYPES.UPDATE_APPLICATIONSETTINGS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_APPLICATIONSETTINGS):
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

const apiUrl = 'api/application-settings';

// Actions

export const getEntities: ICrudGetAllAction<IApplicationSettings> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_APPLICATIONSETTINGS_LIST,
  payload: axios.get<IApplicationSettings>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IApplicationSettings> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APPLICATIONSETTINGS,
    payload: axios.get<IApplicationSettings>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IApplicationSettings> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APPLICATIONSETTINGS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApplicationSettings> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APPLICATIONSETTINGS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApplicationSettings> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APPLICATIONSETTINGS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
