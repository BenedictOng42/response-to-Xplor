import { moveRobot, isValidMove, degreeToDirection } from '../movements';

describe('#moveRobot', () => {
  describe('valid movements', () => {
    it('should move the robot to a new position with a valid LEFT move', () => {
      const currPos = {
        x: 1,
        y: 1,
        facing: 90,
      };
      const move = 'LEFT';
      const expectedOutput = {
        x: 1,
        y: 1,
        facing: 180,
        valid: true,
      };
      expect(moveRobot(currPos, move)).toEqual(expectedOutput);
    });
    it('should move the robot to a new position with a valid RIGHT move', () => {
      const currPos = {
        x: 1,
        y: 1,
        facing: 90,
      };
      const move = 'RIGHT';
      const expectedOutput = {
        x: 1,
        y: 1,
        facing: 0,
        valid: true,
      };
      expect(moveRobot(currPos, move)).toEqual(expectedOutput);
    });
    it('should move the robot to a new position with a valid MOVE move', () => {
      const currPos = {
        x: 1,
        y: 1,
        facing: 90,
      };
      const move = 'MOVE';
      const expectedOutput = {
        x: 1,
        y: 2,
        facing: 90,
        valid: true,
      };
      expect(moveRobot(currPos, move)).toEqual(expectedOutput);
    });
    it('should move the robot to a new position with a valid NONE move', () => {
      const currPos = {
        x: 1,
        y: 1,
        facing: 'NORTH',
      };
      const move = 'NONE';
      const expectedOutput = {
        x: 1,
        y: 1,
        facing: 90,
        valid: true,
      };
      expect(moveRobot(currPos, move)).toEqual(expectedOutput);
    });
  });
  describe('invalid moves', () => {
    it('should not move the robot with an invalid MOVE move', () => {
      const currPos = {
        x: 1,
        y: 5,
        facing: 90,
      };
      const move = 'MOVE';
      const expectedOutput = {
        x: 1,
        y: 6,
        facing: 90,
        valid: false,
      };
      expect(moveRobot(currPos, move)).toEqual(expectedOutput);
    });
    it('should not move the robot with an invalid "ANYTHING" move', () => {
      const currPos = {
        x: 1,
        y: 5,
        facing: 90,
      };
      const move = 'ANYTHING';
      const expectedOutput = {
        x: 1,
        y: 5,
        facing: 90,
        valid: false,
      };
      expect(moveRobot(currPos, move)).toEqual(expectedOutput);
    });
  });
});

describe('#isValidMove', () => {
  describe('valid moves', () => {
    it('can move LEFT', () => {
      expect(isValidMove(['LEFT'])).toEqual(true);
    });
    it('can move RIGHT', () => {
      expect(isValidMove(['RIGHT'])).toEqual(true);
    });
    it('can move MOVE', () => {
      expect(isValidMove(['MOVE'])).toEqual(true);
    });
    it('can move "moVe", so it is not case-sensitive', () => {
      expect(isValidMove(['MOVE'])).toEqual(true);
    });
  });
  describe('invalid moves', () => {
    it('can move BLAH', () => {
      expect(isValidMove(['BLAH'])).toEqual(false);
    });
  });
});

describe('#degreeToDirection', () => {
  it('should return the correct DIRECTION if it is below 0', () => {
    const degree = -90;
    const expectedOutput = 'SOUTH';
    expect(degreeToDirection(degree)).toEqual(expectedOutput);
  });
  it('should return the correct DIRECTION if it is above 0', () => {
    const degree = 90;
    const expectedOutput = 'NORTH';
    expect(degreeToDirection(degree)).toEqual(expectedOutput);
  });
  it('should return no DIRECTION if it is not multiples of 90', () => {
    const degree = 5;
    const expectedOutput = undefined;
    expect(degreeToDirection(degree)).toEqual(expectedOutput);
  });
});
