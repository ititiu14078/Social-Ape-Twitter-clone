import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PropTypes from "prop-types";
import Scream from "../components/Scream/Scream";
import Profile from "../components/Profile/Profile";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

class Home extends Component {
  componentDidMount() {
    const { getScreams } = this.props;
    getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;

    let recentScreamMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getScreams })(Home);
