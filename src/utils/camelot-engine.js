import {Iterable, fromJS} from 'immutable';
// This is a bit hacky but w/e.
import pairwise from 'camelot-engine/lib/util/pairwise';
import camelotEngine from 'camelot-engine';
const query = camelotEngine().query();

const ensureJS = val => Iterable.isIterable(val) ? val.toJS() : val;

// TODO clean this up by always using rest params
const proxyWithJsArgs = fn => (...args) => fn(...args.map(ensureJS));

export const isValidMove = (gameState, chosenMoveSteps, movingPlayerName) => {
  if (!movingPlayerName) {
    throw new Error('ArgumentError: movingPlayerName is required to be the name of the player making the move');
  }
  return query.isValidMove(ensureJS(gameState), ensureJS(chosenMoveSteps), movingPlayerName);
};

export const getBoardSpace = (...args) =>
  query.getBoardSpace(...args.map(ensureJS));

export const applyMoves = (gameState, chosenMoves) => 
  fromJS(camelotEngine().update().applyMoves(
    gameState.toJS(), 
    chosenMoves.toJS()
  ));

export const isGoal = (gameState, ...rest) =>
  query.isGoal(ensureJS(gameState), ...rest);

export const getPairs = proxyWithJsArgs(pairwise);
export const getCoordsBetween = proxyWithJsArgs(query.getCoordsBetween);
