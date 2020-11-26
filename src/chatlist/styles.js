const styles = (theme) => ({
  root: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper1: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  menuroot: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  listItem: {
    // marginBottom: theme.spacing(2),
    cursor: "pointer",
    // backgroundColor:'#DADEE5'
  },
  newChatBtn: {
    borderRadius: "0px",
  },
  unreadMessage: {
    color: "green",
    position: "absolute",
    top: "0",
    right: "5px",
  },
  margin: {
    margin: theme.spacing(1),
    // paddingleft:"30px;
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -5,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});

export default styles;
