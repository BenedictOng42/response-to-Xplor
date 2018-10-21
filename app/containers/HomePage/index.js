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
import { moveRobot, isValidMove, degreeToDirection } from './movements';
/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      listOfValidCommands: [],
      listOfFailedCommands: [],
      ableToAcceptCommands: false,
      currPos: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onAddCommand = this.onAddCommand.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.reportRobotLocation = this.reportRobotLocation.bind(this);
  }

  onChange(event) {
    const command = event.target.value;
    this.setState({ command });
  }

  async onAddCommand() {
    const { ableToAcceptCommands, command } = this.state;
    const commandBreakdown = command.split([' ']);
    if (!isValidMove(commandBreakdown)) {
      await this.setState(prevState => ({
        listOfFailedCommands: prevState.listOfFailedCommands.concat(command),
      }));
    } else {
      if (!ableToAcceptCommands) {
        if (commandBreakdown[0].toLowerCase() === 'place') {
          const positions = commandBreakdown[1].split(',');
          const newPos = moveRobot(
            {
              x: parseInt(positions[0], 10),
              y: parseInt(positions[1], 10),
              facing: positions[2],
            },
            'NONE',
          );
          await this.setState(prevState => ({
            ableToAcceptCommands: true,
            listOfValidCommands: prevState.listOfValidCommands.concat(command),
            currPos: newPos,
          }));
        } else {
          await this.setState(prevState => ({
            listOfFailedCommands: prevState.listOfFailedCommands.concat(
              command,
            ),
          }));
        }
      }
      if (ableToAcceptCommands) {
        if (commandBreakdown[0].toLowerCase() === 'report') {
          await this.setState(prevState => ({
            ableToAcceptCommands: false,
            listOfValidCommands: prevState.listOfValidCommands.concat(command),
          }));
        } else {
          let newPos;
          if (commandBreakdown[0].toLowerCase() === 'place') {
            const positions = commandBreakdown[1].split(',');
            newPos = moveRobot(
              {
                x: parseInt(positions[0], 10),
                y: parseInt(positions[1], 10),
                facing: positions[2],
              },
              'NONE',
            );
          } else {
            newPos = moveRobot(this.state.currPos, commandBreakdown[0]);
          }
          if (newPos.valid) {
            await this.setState(prevState => ({
              listOfValidCommands: prevState.listOfValidCommands.concat(
                command,
              ),
              currPos: newPos,
            }));
          } else {
            await this.setState(prevState => ({
              listOfFailedCommands: prevState.listOfFailedCommands.concat(
                command,
              ),
            }));
          }
        }
      }
    }
    this.setState({
      command: '',
    });
  }

  onInputKeyDown(keyCode) {
    if (keyCode === 13) {
      this.onAddCommand();
    }
  }

  reportRobotLocation() {
    console.log('hello');
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
            onKeyDown={e => this.onInputKeyDown(e.keyCode)}
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
          <Button
            color="primary"
            variant="contained"
            onClick={this.reportRobotLocation}
          >
            Report
          </Button>
          <TextField
            id="outlined-name"
            // label="Output"
            // className={classes.textField}
            // value={this.state.name}
            // onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
            value={
              this.state.currPos
                ? `${this.state.currPos.x} +
                  ${this.state.currPos.y} +
                  ${degreeToDirection(this.state.currPos.facing)}`
                : null
            }
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
