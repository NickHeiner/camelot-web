import _ from 'lodash';

export const getCurrentGame = (fullState, gameId) => _.get(fullState.firebase, ['data', 'games', gameId]);

export const getCurrentUserPlayerName = (fullState, gameId) => {
  const currentUserUid = _.get(fullState.firebase, ['profile', 'uid']);
  const currentGame = getCurrentGame(fullState, gameId);
  const currentHostUid = _.get(fullState.firebase, ['data', 'users', currentGame.host, 'uid']);
  const currentOpponentUid = _.get(fullState.firebase, ['data', 'users', currentGame.opponent, 'uid']);

  if (currentUserUid === currentHostUid) {
    return 'playerA';
  }
  if (currentUserUid === currentOpponentUid) {
    return 'playerB';
  }
  return null;
};
