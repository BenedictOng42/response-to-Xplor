/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import v4 from 'uuid/v4';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectOutputHistory } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { addToOutputHistory } from './actions';

import { moveRobot, isValidMove, degreeToDirection } from './movements';

import InputWrapper from './Wrappers/InputWrapper';
import InputButtonWrapper from './Wrappers/InputButtonWrapper';
import CommandWrapper from './Wrappers/CommandWrapper';
import CardWrapper from './Wrappers/CardWrapper';

export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      listOfValidCommands: [],
      listOfFailedCommands: [],
      ableToAcceptCommands: false,
      currPos: null,
      showOutput: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onAddCommand = this.onAddCommand.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.createStyledCommandList = this.createStyledCommandList.bind(this);
    this.createStyledOutputList = this.createStyledOutputList.bind(this);
  }

  onChange(event) {
    this.setState({ showOutput: false });
    const command = event.target.value;
    this.setState({ command });
  }

  async onAddCommand() {
    const { ableToAcceptCommands, command, currPos } = this.state;
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
          this.props.addToOutputHistory(
            this.state.listOfValidCommands
              .concat(command)
              .concat(
                `${currPos.x},${currPos.y},${degreeToDirection(
                  currPos.facing,
                )}`,
              ),
          );
          await this.setState({
            ableToAcceptCommands: false,
            listOfValidCommands: [],
            listOfFailedCommands: [],
            showOutput: true,
          });
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

  createStyledCommandList(list) {
    const styledList = list.map(value => (
      <Typography gutterBottom key={v4()}>
        {value}
      </Typography>
    ));
    return styledList;
  }

  createStyledOutputList(list) {
    const styledList = list.map(value => (
      <Typography gutterBottom key={v4()}>
        {value.map(item => ` --> ${item.toUpperCase()}`)}
      </Typography>
    ));
    return styledList;
  }

  render() {
    const {
      command,
      listOfValidCommands,
      listOfFailedCommands,
      currPos,
    } = this.state;

    const failedCommands = this.createStyledCommandList(listOfFailedCommands);
    const validCommands = this.createStyledCommandList(listOfValidCommands);
    const outputHistory = this.createStyledOutputList(this.props.outputHistory);
    return (
      <div>
        <InputWrapper>
          <Input
            placeholder="Input Command"
            inputProps={{
              'aria-label': 'Description',
            }}
            value={command}
            onChange={this.onChange}
            onKeyDown={e => this.onInputKeyDown(e.keyCode)}
          />
          <InputButtonWrapper>
            <Button
              color="primary"
              variant="contained"
              onClick={this.onAddCommand}
            >
              Add Command
            </Button>
          </InputButtonWrapper>
        </InputWrapper>
        <CommandWrapper>
          <Grid
            container
            spacing={16}
            justify="space-evenly"
            alignItems="stretch"
          >
            <CardWrapper>
              <CardContent>
                <Typography color="textPrimary" gutterBottom>
                  <b>Valid Commands</b>
                </Typography>
                {validCommands}
              </CardContent>
            </CardWrapper>
            <CardWrapper>
              <CardContent>
                <Typography color="textPrimary" gutterBottom>
                  <b>Failed Commands</b>
                </Typography>
                {failedCommands}
              </CardContent>
            </CardWrapper>
          </Grid>
          <h3>Output Result</h3>
          <TextField
            id="outlined-name"
            margin="normal"
            variant="outlined"
            style={{ color: 'black' }}
            value={
              this.state.currPos && this.state.showOutput
                ? `${currPos.x},${currPos.y},${degreeToDirection(currPos.facing)}` /* eslint-disable-line */
                : 'Must use a valid REPORT command'
            }
            readOnly
          />
          <Card>
            <CardContent>
              <Typography color="textPrimary" gutterBottom>
                <b>Output History</b>
              </Typography>
              {outputHistory}
            </CardContent>
          </Card>
        </CommandWrapper>
      </div>
    );
  }
}

HomePage.propTypes = {
  addToOutputHistory: PropTypes.func.isRequired,
  outputHistory: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  outputHistory: makeSelectOutputHistory(),
});

function mapDispatchToProps(dispatch) {
  return {
    addToOutputHistory: output => dispatch(addToOutputHistory(output)),
  };
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
