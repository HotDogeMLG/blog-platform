import { useDispatch } from 'react-redux';
import actions from '../store/actionCreators';
import { bindActionCreators } from 'redux';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
