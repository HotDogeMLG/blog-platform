import { TagsAction, TagsActionTypes, TagsState } from '../../types/tags';

const tagsDefaultState: TagsState = {
  ids: [1],
  currentId: 1,
};

export const tagsReducer = (
  state: TagsState = tagsDefaultState,
  action: TagsAction
) => {
  switch (action.type) {
    case TagsActionTypes.ADD_TAG:
      return {
        ids: [...state.ids, state.currentId + 1],
        currentId: state.currentId + 1,
      };
    case TagsActionTypes.DELETE_TAG:
      return {
        ids: state.ids.filter((id) => id !== action.payload),
        currentId: state.currentId,
      };
    case TagsActionTypes.SET_DEFAULT_TAGS:
      return tagsDefaultState;
    default:
      return state;
  }
};
