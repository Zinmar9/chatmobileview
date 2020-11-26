import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Divider from "@material-ui/core/Divider";
// import MenuIcon from '@material-ui/icons/Menu';

const firebase = require("firebase");
class ChatListComponent extends React.Component {
  render() {
    const { classes } = this.props;

    if (this.props.chats.length > 0) {
      return (
        <main className={classes.main} maxWidth="sm">
          <CssBaseline />
          <Paper className={classes.paper1}>
            {/* <Typography component="h1" variant="h5">
              Inbox
            </Typography> */}
            <Divider />
            <List className={classes.list}>
              {this.props.chats.map((_chat, _index) => {
                return (
                  <div key={_index}>
                    <ListItem
                      button
                      onClick={() => this.selectChat(_index)}
                      className={classes.listItem}
                      selected={this.props.selectedChatIndex === _index}
                      alignItems="flex-start"
                    >
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp">
                          {
                            _chat.users
                              .filter(
                                (_user) => _user !== this.props.userEmail
                              )[0]
                              .split("")[0]
                          }
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          _chat.users.filter(
                            (_user) => _user !== this.props.userEmail
                          )[0]
                        }
                        secondary={
                          <React.Fragment>
                            <Typography component="span" color="textPrimary">
                              {_chat.messages[
                                _chat.messages.length - 1
                              ].message.substring(0, 30) + " ..."}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      {_chat.receiverHasRead === false &&
                      !this.userIsSender(_chat) ? (
                        <ListItemIcon>
                          <NotificationImportant
                            className={classes.unreadMessage}
                          ></NotificationImportant>
                        </ListItemIcon>
                      ) : null}
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>
          </Paper>
          {/* <div className={classes.root}> */}
        </main>
      );
    } else {
      return (
        <div className={classes.root}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={this.newChat}
            className={classes.newChatBtn}
          >
            New Message
          </Button>
          <List></List>
        </div>
      );
    }
  }
  userIsSender = (chat) =>
    chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
  newChat = () => this.props.newChatBtnFn();
  selectChat = (index) => this.props.selectChatFn(index);
  signOut = () => firebase.auth().signOut();

  submitMessage = (msg) => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        (_usr) => _usr !== this.state.email
      )[0]
    );
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message: msg,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      });
  };

  // Always in alphabetical order:
  // 'user1:user2'
  buildDocKey = (friend) => [this.state.email, friend].sort().join(":");

  newChatBtnClicked = () =>
    this.setState({ newChatFormVisible: true, selectedChat: null });

  newChatSubmit = async (chatObj) => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        messages: [
          {
            message: chatObj.message,
            sender: this.state.email,
          },
        ],
        users: [this.state.email, chatObj.sendTo],
        receiverHasRead: false,
      });
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  };
}

export default withStyles(styles)(ChatListComponent);
