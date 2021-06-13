import React from "react";
import toaster from "toasted-notes";
import { connect } from "react-redux";
import { messaging } from "./../../config/fbConfig";
import firebase from "./../../config/fbConfig";
import "./NotificationBox.css";

export class NotificationBox extends React.Component {
  state = {
    subscription: true
  };

  test = () => {
    messaging.getToken().then(token => {
      firebase
        .firestore()
        .collection("notifications")
        .add({
          token: token,
          data: "This is a test notificaton"
        })
        .then(() => {
          console.log("notification added to the database");
        });
    });
  };

  componentDidMount() {
    this.mounted = true;
    this.checkSubscription();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  checkSubscription = () => {
    //checks if you are subcribed for the background notification or not
    //if in the users database the token is saved then the user is subcribed or it is not
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        let data = doc.data();
        if (this.mounted) {
          if (!data.token) {
            //  toaster.notify("You are Unsubsribed  to deadline notification!!");
            this.setState({ subscription: false });
          } else {
            //   toaster.notify("you are Subscribed to deadline notification !!");
            this.setState({ subscription: true });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  subcribeToNotification = () => {
    //to subcribe to the background notification
    Notification.requestPermission() //notification dialog box pop ups
      .then(permission => {
        if (permission === "granted") { //if the permission is granted then the a random token
          // is assigned to the user and saved in the users database
          messaging
            .getToken() //gets the token
            .then(token => {
              let db = firebase.firestore();
              //saves to the users database
              db.collection("users")
                .doc(firebase.auth().currentUser.uid)
                .update({
                  token: token
                })
                .then(() => {
                  toaster.notify(
                    "You are Subscribed to deadline notification !!"
                  );
                  this.checkSubscription();
                });
            })
            .catch(error => {
              toaster.notify(<div>{error.message}</div>);
            });
        } else {
          toaster.notify("Can not send notification to you");
        }
      })
      .catch(error => {
        toaster.notify(<div>{error.message}</div>);
      });
  };

  unsubscribeToNotification = () => {
    messaging
      .getToken()
      .then(token => {
        messaging.deleteToken(token);
      })
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            token: null
          })
          .then(() => {
            toaster.notify("You are Unsubsribed to deadline notification!!");
            this.checkSubscription();
          })
          .catch(error => {
            toaster.notify(<div>{error.message}</div>);
          });
      })
      .catch(error => {
        toaster.notify(<div>{error.message}</div>);
      });
  };

  render() {
    return (
      <div className="notificationBox">
        {!this.state.subscription ? (
          <div>
            <button
              style={{ background: "Green" }}
              className="subscription"
              onClick={this.subcribeToNotification}
            >
              Subscribe to Notification
            </button>
          </div>
        ) : (
          <div>
            <button
              className="subscription"
              style={{ background: "Red" }}
              onClick={this.unsubscribeToNotification}
            >
              Unsubscribe to Notification
            </button>

            <button onClick={this.test}>test</button>
          </div>
        )}
        <div>
          {Object.keys(this.props.notifications.data).map(id => {
            let notification = this.props.notifications.data[id];
            let timeWent  = (Date.now() - notification.index)/1000; //timewent since the notification made
            let h = Math.floor(timeWent / 3600);
            let m = Math.floor(timeWent% 3600 / 60);
            let s = Math.floor(timeWent % 3600 % 60);

            return (
              <div className="notificationbar" key={id}>
                <span style={{ color: "Black",fontWeight: "bold" }}>{notification.title} </span>
                <br />
                <span style={{ color: "Black"}}>{notification.body}</span>
                <br />
                <span style={{ color: "Grey"}}>{h} hrs {m} mins {s} secs ago</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications  // gets the notifications
  }
};

export default connect(
  mapStateToProps,
  null
)(NotificationBox);
