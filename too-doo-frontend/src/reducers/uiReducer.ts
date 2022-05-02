import { AppState } from ".";
import { START_ACTION, STOP_ACTION } from "../actions/uiActions";
import { CustomAction } from "../models/common";


export interface UiState {
  loadingActions: CustomAction[];
  sidebarShown: boolean | '' | 'responsive';
}

const initialState: UiState = {
  loadingActions: [],
  sidebarShown: 'responsive',
};

const uiReducer = (
  state: UiState = initialState,
  { type, payload }: CustomAction
) => {
  const { loadingActions } = state;
  switch (type) {
    case START_ACTION:
      return {
        ...state,
        loadingActions: [...loadingActions, payload.action],
      };
    case STOP_ACTION:
      return {
        ...state,
        loadingActions: loadingActions.filter(
          (action: CustomAction) => action.name !== payload.name
        ),
      };
    default:
      return state;
  }
};

export const checkIfLoading = (store: AppState, ...actionsToCheck: string[]) =>
  store.ui.loadingActions.some((action: CustomAction) =>
    actionsToCheck.includes(action.name)
  );

export default uiReducer;