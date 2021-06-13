import { put, takeLatest, all, call } from "redux-saga/effects";
import firebase from "./../config/fbConfig";

function getAllUsers() {
  let db = firebase.firestore();
  return new Promise((resolve, reject) => {
    db.collection("users")
      .get()
      .then(querySnapshot => {
        let allUsers = {};
        querySnapshot.docs.forEach(doc => {
          allUsers[doc.id] = doc.data().username;
        });
        resolve(allUsers);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function* fetchAllUsers() {
  let allUsers = yield call(getAllUsers);
  yield put({ type: "ALL_USERS_RECEIVED", allUsers: allUsers });
}

// it watches over most the namely  actions dispatched
function* actionWatcher() {
  yield takeLatest("GET_ALL_USERS", fetchAllUsers);
}

// the main saga
export default function* rootSaga() {
  yield all([actionWatcher()]);
}
