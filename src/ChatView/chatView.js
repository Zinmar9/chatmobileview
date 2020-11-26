import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import "./ChatView.scss";
import "./chatView.css";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import ReactLoading from "react-loading";
// import Container from '@material-ui/core/Container';
class ChatViewComponent extends React.Component {
  componentDidMount = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };
  componentDidUpdate = () => {
    this.scrollToBottom();
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };
  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({});
    }
  };

  render() {
    const { classes } = this.props;

    if (this.props.chat === undefined) {
      return <main className={classes.content}></main>;
    } else if (this.props.chat !== undefined) {
      return (
        <div>
          <div className={classes.content}>
            {/* <div className="headerChatBoard">
              Your conversation with{" "}
              {
                this.props.chat.users.filter(
                  (_usr) => _usr !== this.props.user
                )[0]
              }
            </div> */}

            <div className="headerChatBoard">
              <Avatar alt="Remy Sharp">
                {
                  this.props.chat.users
                    .filter((_usr) => _usr !== this.props.user)[0]
                    .split("")[0]
                }
              </Avatar>
              <span className="textHeaderChatBoard">
                {
                  this.props.chat.users.filter(
                    (_usr) => _usr !== this.props.user
                  )[0]
                }
              </span>
              {/* <img
                className="viewAvatarItem"
                // src={this.currentPeerUser.photoUrl}
                alt="icon avatar"
              />
              <span className="textHeaderChatBoard">
                {
                  this.props.chat.users.filter(
                    (_usr) => _usr !== this.props.user
                  )[0]
                }
              </span> */}
            </div>

            <div className="viewListContentChat">
              {this.props.chat.messages.map((_msg, _index) => {
                return (
                  <div className={
                    _msg.sender === this.props.user
                      ? classes.userSide
                      : classes.friendSide}>
                    <div
                      key={_index}
                      className={
                        _msg.sender === this.props.user
                          ? classes.userSent
                          : classes.friendSent
                      }
                    >
                      <div >{_msg.message}</div>

                      <span className="textTimeLeft">
                        {moment(Number(_msg.timestamp)).format("lll")}
                      </span>
                      {/* <div className={classes.Conversationtime}></div> */}
                      {/* <div
                        style={{ float: "left", clear: "both" }}
                        ref={(el) => {
                          this.messagesEnd = el;
                        }}
                      /> */}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      );
    } else {
      return (
        <div className="viewLoading">
          <ReactLoading
            type={"bars"}
            color={"#203152"}
            height={"30%"}
            width={"30%"}
          />
        </div>
      );
    }
  }
}

export default withStyles(styles)(ChatViewComponent);
