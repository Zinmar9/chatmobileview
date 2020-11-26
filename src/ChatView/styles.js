// import { auth } from "firebase";

const styles = (theme) => ({
  content: {
    height: "calc(100vh - 70px)",
    overflow: "auto",
    // padding: "20px",
    // marginLeft: "100px",
    // marginRight: "10px",
    // boxSizing: "border-box",
    // overflowY: 'scroll',
    // marginTop: "-100px",
    // width: "calc(100% - 300px)",
    position: "flex",

  },

  userSent: {
    float: "right",
    clear: "both",
    padding: "5px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    // marginTop: "5px",
    backgroundColor: "#5399F3",
    color: "white",
    width: "auto",
    height: "auto",
    // marginLeft: "50px",
    borderRadius: "10px",
    // paddingLeft: "20px",
  },

  friendSent: {
    float: "left",
    clear: "both",
    padding: "5px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    // marginTop: "5px",
    backgroundColor: "#dcdee6",
    color: "black",
    height: "auto",
    // width: "250px",
    width: "auto",
    borderRadius: "10px",
  },

  userSide: {
    display: "block",
    clear: "both",
    float: "right",
    width: "60%",
    height: "auto",
    padding: "0px",
    margin: "0px",



    // border-radius: 10px;   

  },

  friendSide: {
    display: "block",
    clear: "both",
    float: "left",
    width: "60%",
    height: "auto",
    padding: "0px",
    margin: "0px",

  },
});

export default styles;
