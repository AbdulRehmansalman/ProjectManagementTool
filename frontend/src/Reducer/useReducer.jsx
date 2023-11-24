export const initialState = null;

const localStorageType = 'userType';
export const reducer = (state, action) => {
  if (action.type === 'Manager') {
    localStorage.setItem('userType', 'Manager');
    return action.payload;
  }
  if (action.type === 'Developer') {
    localStorage.setItem('userType', 'Developer');
    return action.payload;
  }
  setTimeout(() => {
    localStorage.removeItem(localStorageType);
  }, 60 * 60 * 1000);
  return state;
};
