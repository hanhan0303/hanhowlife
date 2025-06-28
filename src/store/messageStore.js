import { createContext } from 'react';

export const MessageContext = createContext({});

export const initState = {
  type: '',
  title: '',
  text: '',
  isShow: false,
};

export const messageReducer = (state, action) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      const { type, title, text } = action.payload;
      return {
        type,
        title,
        text,
        isShow: true,
      };
    case 'CLEAR_MESSAGE':
      return {
        ...initState,
      };
    default:
      return state;
  }
};

export function handleSuccessMessage(dispatch, res) {
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'success',
      title: '成功',
      text: res.data.message,
    },
  });
  setTimeout(() => {
    dispatch({ type: 'CLEAR_MESSAGE' });
  }, 3000);
}

export function handleErrorMessage(dispatch, err) {
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'danger',
      title: '失敗',
      text: Array.isArray(err?.response?.data?.message)
        ? err?.response?.data?.message.join('、')
        : err?.response?.data?.message,
    },
  });
  setTimeout(() => {
    dispatch({ type: 'CLEAR_MESSAGE' });
  }, 3000);
}
