import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import axios from "axios";
import { Link } from "react-router-dom";
//Mui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto 20px auto",
    width: "100px",
    height: "100px",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  signupMessage: {
    margin: "10px 0px 0px 0px"
  },
  progess: {
    position: 'absolute'
  }
};

class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/login", userData)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="app icon" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              helperText={errors.email}
              error={errors.email ? true : false}
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              helperText={errors.password}
              error={errors.password ? true : false}
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} color="secondary" className={classes.progess} />
              )}
            </Button>
            <br></br>
            <small className={classes.signupMessage}>
              Don't have an account? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);