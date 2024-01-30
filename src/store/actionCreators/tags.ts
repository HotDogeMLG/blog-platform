import { TagsActionTypes } from '../../types/tags';

export const addTag = () => {
  return { type: TagsActionTypes.ADD_TAG };
};

export const deleteTag = (id: number) => {
  return { type: TagsActionTypes.DELETE_TAG, payload: id };
};

export const setDefaultTags = () => {
  return { type: TagsActionTypes.SET_DEFAULT_TAGS };
};

export const setTagAmount = (amount: number) => {
  return { type: TagsActionTypes.SET_TAG_AMOUNT, payload: amount };
};
