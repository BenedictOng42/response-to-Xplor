/**
 *
 * HomePage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import v4 from 'uuid/v4';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      listOfValidCommands: [],
      listOfFailedCommands: [],
      ableToAcceptCommands: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onAddCommand = this.onAddCommand.bind(this);
  }

  onChange(event) {
    const command = event.target.value;
    this.setState({ command });
  }

  async onAddCommand() {
    const { ableToAcceptCommands, command } = this.state;
    // console.log(command);
    if (!ableToAcceptCommands) {
      if (command.toLowerCase() === 'place') {
        await this.setState(prevState => ({
          ableToAcceptCommands: true,
          listOfValidCommands: prevState.listOfValidCommands.concat(command),
        }));
      } else {
        await this.setState(prevState => ({
          listOfFailedCommands: prevState.listOfFailedCommands.concat(command),
        }));
      }
    }
    if (ableToAcceptCommands) {
      if (command.toLowerCase() === 'report') {
        await this.setState(prevState => ({
          ableToAcceptCommands: false,
          listOfValidCommands: prevState.listOfValidCommands.concat(command),
        }));
      } else {
        await this.setState(prevState => ({
          listOfValidCommands: prevState.listOfValidCommands.concat(command),
        }));
      }
    }
    this.setState({
      command: '',
    });
  }
  render() {
    const { command, listOfValidCommands, listOfFailedCommands } = this.state;
    return (
      <div>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <Input
            placeholder="Input Command"
            inputProps={{
              'aria-label': 'Description',
            }}
            value={command}
            onChange={this.onChange}
          />
          <span style={{ marginLeft: '2rem' }}>
            <Button
              color="primary"
              variant="contained"
              onClick={this.onAddCommand}
            >
              Add Command
            </Button>
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            marginBottom: '3rem',
          }}
        >
          <div style={{ marginBottom: '3rem' }}>
            <Grid
              container
              spacing={16}
              justify="space-evenly"
              alignItems="stretch"
            >
              <Card style={{ width: '20rem' }}>
                <CardContent>
                  <Typography
                    // className={classes.ti/tle}
                    color="textPrimary"
                    gutterBottom
                  >
                    Valid Commands
                  </Typography>
                  {listOfValidCommands.map(value => (
                    <Typography gutterBottom key={v4()}>
                      {value}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
              <Card style={{ width: '20rem' }}>
                <CardContent>
                  <Typography
                    // className={classes.ti/tle}
                    color="textPrimary"
                    gutterBottom
                  >
                    Failed Commands
                  </Typography>
                  {listOfFailedCommands.map(value => (
                    <Typography gutterBottom key={v4()}>
                      {value}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </div>
          <Button color="primary" variant="contained">
            Report
          </Button>
          <TextField
            id="outlined-name"
            label="Output"
            // className={classes.textField}
            // value={this.state.name}
            // onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
            disabled
          />
          <TextField
            id="outlined-textarea"
            label="Output History"
            placeholder="Placeholder"
            multiline
            // className={classes.textField}
            margin="normal"
            variant="outlined"
            // value={this.state.coorindates}
            disabled
          />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage(),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
