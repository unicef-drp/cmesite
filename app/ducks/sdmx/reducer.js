import produce from 'immer';
import { LOAD_STRUCTURE, LOAD_STRUCTURE_SUCCESS, LOAD_STRUCTURE_ERROR } from './constants';
import structureParser from './structureUtils';

export const initialState = {
  structure: {
    loading: false,
    error: false,
    dimensions: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const sdmxReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_STRUCTURE:
        draft.structure.loading = true;
        draft.structure.error = false;
        draft.structure.dimensions = [];
        break;

      case LOAD_STRUCTURE_SUCCESS:
        draft.structure.loading = false;
        draft.structure.error = false;
        draft.structure.dimensions = structureParser(action.structure);
        break;

      case LOAD_STRUCTURE_ERROR:
        draft.structure.loading = false;
        draft.structure.error = action.error;
        break;
    }
  });

export default sdmxReducer;
