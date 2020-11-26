import React from "react";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import "./chatTextBox.css";
import images from "../Themes/Images";
// import { makeStyles } from '@material-ui/core/styles';
import useStyles from "./useStyles";

// import { TextareaAutosize } from "@material-ui/core";


class ChatTextBoxComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      chatText: "",
      isShowSticker: false,
    };

  }

  openListSticker = () => {
    this.setState({ isShowSticker: !this.state.isShowSticker });
  };




  // handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  renderStickers = () => {

    return (
      <div className="viewStickers">
        <img
          className="imgSticker"
          src={images.mimi1}
          alt="sticker"
          onClick={this.submitMessage(2)}
        />
        <img
          className="imgSticker"
          src={images.mimi2}
          alt="sticker"
          onClick={() => this.submitMessage(2)}
        />
        <img
          className="imgSticker"
          src={images.mimi3}
          alt="sticker"
          onClick={() => this.submitMessage(2)}
        />
        <img
          className="imgSticker"
          src={images.mimi4}
          alt="sticker"
          onClick={() => this.submitMessage(2)}
        />
        <img
          className="imgSticker"
          src={images.mimi5}
          alt="sticker"
          onClick={() => this.submitMessage(2)}
        />
        <img
          className="imgSticker"
          src={images.mimi6}
          alt="sticker"
          onClick={() => this.submitMessage(2)}
        />
        <img
          className="imgSticker"
          src={images.mimi7}
          alt="sticker"
          onClick={() => this.submitMessage(2)}
        />
        <img
          className="imgSticker"
          src={images.mimi8}
          alt="sticker"
          onClick={() => this.submitMessage(2)}
        />
        <img
          className="imgSticker"
          src={images.mimi9}
          alt="sticker"
          onClick={() => this.submitMessage(2)}
        />
      </div>
    );
  };
  render() {
    const { classes } = this.props;



    return (
      <div className="compose">
        {this.state.isShowSticker ? this.renderStickers() : null}
        <img
          className="icOpenGallery"
          src={images.ic_photo}
          alt="icon open gallery"
        // onClick={() => this.refInput.click()}
        />
        <input
          ref={(el) => {
            this.refInput = el;
          }}
          accept="image/*"
          className="viewInputGallery"
          type="file"
          onChange={this.onChoosePhoto}
        />
        <img
          className="icOpenSticker"
          src={images.ic_sticker}
          alt="icon open sticker"
          onClick={this.openListSticker}
        />

        {/* <TextField
          placeholder="Type your message.."
          onKeyUp={(e) => this.userTyping(e)}
          id="chattextbox"
          className="compose-input"
          onFocus={this.userClickedInput}
        >      
        </TextField>
        <Send onClick={this.submitMessage} className={classes.sendBtn}></Send>

 */}

        <TextField
          placeholder="Type your message..."
          onKeyUp={(e) => this.userTyping(e)}
          id="chattextbox"
          className="compose-input"
          multiline
          variant="outlined"
          onFocus={this.userClickedInput}

          rowsMax={4}
        >
        </TextField>



        <Send onClick={this.submitMessage} className={classes.sendBtn}></Send>



      </div>
    );
  }
  userTyping = (e) =>
    e.keyCode === 13
      ? this.submitMessage()
      : this.setState({ chatText: e.target.value });
  messageValid = (txt) => txt && txt.replace(/\s/g, "").length;
  userClickedInput = () => this.props.userClickedInputFn();
  submitMessage = () => {
    if (this.messageValid(this.state.chatText)) {
      this.props.submitMessageFn(this.state.chatText);

      document.getElementById("chattextbox").value = "";
    }
  };
}

export default withStyles(styles, useStyles)(ChatTextBoxComponent);
