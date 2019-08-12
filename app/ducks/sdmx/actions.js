import { LOAD_STRUCTURE, LOAD_STRUCTURE_SUCCESS, LOAD_STRUCTURE_ERROR } from './constants';

export const loadStructure = dataflow => ({
  type: LOAD_STRUCTURE,
  dataflow,
});

export const loadStructureSuccess = structure => ({
  type: LOAD_STRUCTURE_SUCCESS,
  structure,
});

export const loadStructureError = error => ({
  type: LOAD_STRUCTURE_ERROR,
  error,
});
