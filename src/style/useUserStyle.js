import { makeStyles } from "@material-ui/core/styles";

const useUserStyles = makeStyles((theme) => ({
  wrapper: {
    background: "#fff",
    borderRadius: 10,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: "#3f51b5 !important",
  },
}));

export default useUserStyles;
