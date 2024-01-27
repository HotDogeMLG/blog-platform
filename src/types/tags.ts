export enum TagsActionTypes {
  ADD_TAG = 'ADD_TAG',
  DELETE_TAG = 'DELETE_TAG',
  SET_DEFAULT_TAGS = 'SET_DEFAULT_TAGS',
}
interface AddTagAction {
  type: TagsActionTypes.ADD_TAG;
}

interface DeleteTagACtion {
  type: TagsActionTypes.DELETE_TAG;
  payload: number;
}

interface SetDefaultTagsAction {
  type: TagsActionTypes.SET_DEFAULT_TAGS;
}

export type TagsAction = AddTagAction | DeleteTagACtion | SetDefaultTagsAction;

export interface TagsState {
  ids: number[];
  currentId: number;
}
