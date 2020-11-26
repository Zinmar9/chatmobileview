const styles = (theme) => ({
  sendBtn: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      color: "gray",
    },

    marginRight: "10px",



  },



  chatTextBoxContainer: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  chatTextBox: {
    // width: "200px",
    flex: "1",
    border: "none",
    fontSize: "14px",
    height: "30px",
    background: "none",
  },




});

export default styles;
