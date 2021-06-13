// it changes the state of the notificatons redux-state

export default function getNotifications(state = { data: {} }, action = "") {
  switch (action.type) {
    case "GET_USER_NOTIFICATIONS": {
      //waiting for the users notification
      return { ...state, loading: true };
    }

    case "USER_NOTIFICATIONS_RECEIVED": {
      return { ...state, data: action.userNotifications, loading: false };
    }
    default:
      return state;
  }
}
