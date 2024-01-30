import { TagsAction, TagsActionTypes, TagsState } from '../../types/tags';

const tagsDefaultState: TagsState = {
  ids: [0],
  currentId: 0,
};

export const tagsReducer = (
  state: TagsState = tagsDefaultState,
  action: TagsAction
) => {
  const newIds = [];
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
    case TagsActionTypes.SET_TAG_AMOUNT:
      for (let i = 0; i < action.payload; i++) {
        newIds.push(i);
      }
      return { currentId: action.payload, ids: newIds };
    default:
      return state;
  }
};
