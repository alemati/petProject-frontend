const reducer = (state = [], action) => {
   
    switch (action.type) {
      case ('SET_NOTIFICATION'):
        return action.data
      case ('CLOSE_NOTIFICATION'):
        return null
      default:
    }
  
    return state
  }
  
  export const setNotification = (type, content) => {
    return async dispatch => {
      const not = {
          'type': type,
          'content': content,
      }
      dispatch({
        type: 'SET_NOTIFICATION',
        data: not,
      })
    }
  }
  
  export const closeNotification = obj => {
    return async dispatch => {
      dispatch({
        type: 'CLOSE_NOTIFICATION',
      })
    }
  }
  
  export default reducer