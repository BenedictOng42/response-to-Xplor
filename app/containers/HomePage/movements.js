const DIRECTIONS = {
  NORTH: 90,
  SOUTH: 270,
  EAST: 0,
  WEST: 180,
};

const DEGREE_TO_DIR = {
  90: 'NORTH',
  270: 'SOUTH',
  0: 'EAST',
  180: 'WEST',
};

const MOVEMENTS = ['MOVE', 'LEFT', 'RIGHT'];

const SIZE = {
  x: 5,
  y: 5,
};

function degreeToDirection(degree) {
  let reducedDegree = degree;
  if (reducedDegree > 0) {
    while (reducedDegree - 360 >= 0) {
      reducedDegree -= 360;
    }
  } else {
    while (reducedDegree + 360 <= 0) {
      reducedDegree += 360;
    }
  }
  return DEGREE_TO_DIR[reducedDegree];
}

function isValidMove(move) {
  if (move[0].toLowerCase() === 'place' && move.length === 2) {
    const positions = move[1].split(',');
    if (positions.length !== 3) {
      return false;
    }
    if (
      !Number.isNaN(move[0]) &&
      !Number.isNaN(move[1]) &&
      positions[0] <= SIZE.x &&
      positions[1] <= SIZE.y &&
      positions[0] >= 0 &&
      positions[1] >= 0 &&
      Object.keys(DIRECTIONS).includes(positions[2].toUpperCase())
    ) {
      return true;
    }
  } else if (move.length === 1 && MOVEMENTS.includes(move[0].toUpperCase())) {
    return true;
  } else if (move.length === 1 && move[0].toLowerCase() === 'report') {
    return true;
  }
  return false;
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function moveRobot(currPos, move) {
  const newPos = { ...currPos };
  if (move === 'NONE') {
    newPos.facing = DIRECTIONS[currPos.facing.toUpperCase()];
  }
  // MOVE
  if (move.toUpperCase() === MOVEMENTS[0]) {
    newPos.x = currPos.x + Math.round(Math.cos(toRadians(currPos.facing)));
    newPos.y = currPos.y + Math.round(Math.sin(toRadians(currPos.facing)));
  }
  // LEFT
  else if (move.toUpperCase() === MOVEMENTS[1]) {
    newPos.facing = currPos.facing + 90;
  }
  // RIGHT
  else if (move.toUpperCase() === MOVEMENTS[2]) {
    newPos.facing = currPos.facing - 90;
  }
  if (newPos.x < 0 || newPos.y < 0 || newPos.x > 5 || newPos.y > 5) {
    newPos.valid = false;
  } else {
    newPos.valid = true;
  }
  return newPos;
}

export { DIRECTIONS, moveRobot, isValidMove, degreeToDirection };
