import React from "react";
import NewChatComponent from "../NewChat/newChat";
import ChatListComponent from "../chatlist/chatList";
import ChatViewComponent from "../ChatView/chatView";
import ChatTextBoxComponent from "../ChatTextBox/chatTextBox";
import styles from "./style";
import { withStyles } from "@material-ui/core";
import ReactLoading from "react-loading";
// import CircularProgress from "@material-ui/core/CircularProgress";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import "./desktopdashboard.css";
import Tooltip from "@material-ui/core/Tooltip";
// import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";

// import MenuIcon from '@material-ui/icons/Menu';
const firebase = require("firebase");

// I need to investigate why sometimes
// two messages will send instead of just
// one. I dont know if there are two instances
// of the chat box component or what...

// I will be using both .then and async/await
// in this tutorial to give a feel of both.

class DesktopdashboardComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            friends: [],
            chats: [],
            showHideFriList: true,
        };
        this.hideComponent = this.hideComponent.bind(this);
    }
    hideComponent(name) {
        console.log(name);
        switch (name) {
            case "showHideFriList":
                this.setState({ showHideFriList: !this.state.showHideFriList });
                break;

            default:
        }
    }
    render() {
        const { classes } = this.props;
        const { showHideFriList } = this.state;
        if (this.state.email) {
            return (
                <div>
                    <AppBar position="fixed" color="primary" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                button
                                onClick={() => this.hideComponent("showHideFriList")}
                            >
                                <Tooltip title="Show Friend List">
                                    <AccountCircleIcon />
                                </Tooltip>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                <Tooltip title="Add Friend">
                                    <Fab
                                        size="medium"
                                        color="secondary"
                                        aria-label="add"
                                        onClick={this.newChatBtnClicked}
                                    >
                                        <AddIcon />
                                    </Fab>
                                </Tooltip>
                            </Typography>

                            <Button color="inherit" onClick={this.signOut}>
                                LogOut
              </Button>
                        </Toolbar>
                    </AppBar>

                    {showHideFriList && (
                        <ChatListComponent
                            history={this.props.history}
                            userEmail={this.state.email}
                            selectChatFn={this.selectChat}
                            chats={this.state.chats}
                            selectedChatIndex={this.state.selectedChat}
                            newChatBtnFn={this.newChatBtnClicked}
                        ></ChatListComponent>
                    )}

                    {this.state.showHideFriList ||
                        this.state.newChatFormVisible ? null : (
                            <ChatViewComponent
                                user={this.state.email}
                                chat={this.state.chats[this.state.selectedChat]}
                            ></ChatViewComponent>
                        )}
                    {this.state.selectedChat !== null &&
                        !this.state.newChatFormVisible &&
                        !this.state.showHideFriList ? (
                            <ChatTextBoxComponent
                                userClickedInputFn={this.messageRead}
                                submitMessageFn={this.submitMessage}
                            ></ChatTextBoxComponent>
                        ) : null}
                    {!this.state.showHideFriList && this.state.newChatFormVisible ? (
                        <NewChatComponent
                            goToChatFn={this.goToChat}
                            newChatSubmitFn={this.newChatSubmit}
                        ></NewChatComponent>
                    ) : null}

                    {/* <Button onClick={this.signOut} className={classes.signOutBtn}>LogOut</Button> */}
                </div>
            );
        } else {
            return (
                <div className="viewLoading">
                    <ReactLoading
                        type={"bars"}
                        color={"#1e40e8"}
                        height={"20%"}
                        width={"30%"}
                    />
                </div>
            );
        }
    }

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
                    // type: type,
                    timestamp: Date.now(),
                }),
                receiverHasRead: false,
            });
    };

    // Always in alphabetical order:
    // 'user1:user2'
    buildDocKey = (friend) => [this.state.email, friend].sort().join(":");

    newChatBtnClicked = () =>
        this.setState({
            newChatFormVisible: true,
            selectedChat: null,
            showHideFriList: false,
        });

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

    selectChat = async (chatIndex) => {
        await this.setState({
            selectedChat: chatIndex,
            newChatFormVisible: false,
            showHideFriList: false,
        });
        this.messageRead();
    };

    goToChat = async (docKey, msg) => {
        const usersInChat = docKey.split(":");
        const chat = this.state.chats.find((_chat) =>
            usersInChat.every((_user) => _chat.users.includes(_user))
        );
        this.setState({ newChatFormVisible: false });
        await this.selectChat(this.state.chats.indexOf(chat));
        this.submitMessage(msg);
    };

    // Chat index could be different than the one we are currently on in the case
    // that we are calling this function from within a loop such as the chatList.
    // So we will set a default value and can overwrite it when necessary.
    messageRead = () => {
        const chatIndex = this.state.selectedChat;
        const docKey = this.buildDocKey(
            this.state.chats[chatIndex].users.filter(
                (_usr) => _usr !== this.state.email
            )[0]
        );
        if (this.clickedMessageWhereNotSender(chatIndex)) {
            firebase
                .firestore()
                .collection("chats")
                .doc(docKey)
                .update({ receiverHasRead: true });
        } else {
            console.log("Clicked message where the user was the sender");
        }
    };

    clickedMessageWhereNotSender = (chatIndex) =>
        this.state.chats[chatIndex].messages[
            this.state.chats[chatIndex].messages.length - 1
        ].sender !== this.state.email;

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(async (_usr) => {
            if (!_usr) this.props.history.push("/login");
            else {
                await firebase
                    .firestore()
                    .collection("chats")
                    .where("users", "array-contains", _usr.email)
                    .onSnapshot(async (res) => {
                        const chats = res.docs.map((_doc) => _doc.data());
                        await this.setState({
                            email: _usr.email,
                            chats: chats,
                            friends: [],
                        });
                    });
            }
        });
    };
}

export default withStyles(styles)(DesktopdashboardComponent);
