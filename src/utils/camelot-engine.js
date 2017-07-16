import {Iterable} from 'immutable';
import camelotEngine from 'camelot-engine';
const query = camelotEngine().query();

const ensureJS = val => Iterable.isIterable(val) ? val.toJS() : val;

// TODO clean this up by always using rest params

export const isValidMove = (gameState, possibleMoveSteps, movingPlayerName) =>
  query.isValidMove(ensureJS(gameState), ensureJS(possibleMoveSteps), movingPlayerName);

export const getBoardSpace = (...args) =>
  query.getBoardSpace(...args.map(ensureJS))

export const isGoal = (gameState, ...rest) =>
  query.isGoal(ensureJS(gameState), ...rest)
