export const actionTypes = Object.freeze({
  updateState: 'update_state', // {type, settingId, value}
  removeSelection: 'remove_selection', // {type, value}
  addSelection: 'add_selection', // {type, value}
  changeTab: 'change_tab', // {type, value}
  updateGlossary: 'update_glossary',

});
// todo: add an enum that defines possible settings
export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.updateState:
      return {
        ...state,
        [action.settingId]: action.value
      };
    case actionTypes.addSelection:
      const arr = state.selectedDatasets;
      const index = arr.indexOf(action.value);
      if(index < 0) {
        arr.push(action.value);
      }
      return {
        ...state,
        selectedDatasets: arr

      }
    case actionTypes.removeSelection:
      const arr2 = state.selectedDatasets;
      const index2 = arr2.indexOf(action.value);
      if(index2 > -1) {
        arr2.splice(index2, 1);
      }
      return {
        ...state,
        selectedDatasets: arr2
      }
    case actionTypes.changeTab:
      return {
        ...state,
        selectedTab: action.value
      }
    case actionTypes.updateGlossary: 
      return {
        ...state,
        glossaryOpen: action.value === undefined ? state.glossaryOpen : action.value,
        glossarySearch: action.searchValue || ''
      }
    default:
      return state;
  }
};

const initialState = {
    datasets: undefined,
    selectedDatasets: [],
    selectedTab: '',
    glossaryOpen: false,
    glossarySearch: ''
};

export { initialState };
