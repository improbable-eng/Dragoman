import * as actionHelpers from './actions';
const TOGGLE_SETTINGS_OPEN = 'TOGGLE_SETTINGS_OPEN';

export const toggleSettingsOpen = actionHelpers.emptyActionCreator(TOGGLE_SETTINGS_OPEN);
// export function toggleSettingsOpen() {
//   return (dispatch: Dispatch<RootState>) => {
//     dispatch();
//   };
// }
