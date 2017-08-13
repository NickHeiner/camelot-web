
export const getCurrentGame = (fullState, gameId) => fullState.getIn(['firebase', 'data', 'games', gameId]);

export const getCurrentUserPlayerName = (fullState, gameId) => {
  const currentUserUid = fullState.getIn(['firebase', 'profile', 'uid']);
  const currentGame = getCurrentGame(fullState, gameId);
  const currentHostUid = fullState.getIn(['firebase', 'data', 'users', currentGame.get('host'), 'uid']);
  const currentOpponentUid = fullState.getIn(['firebase', 'data', 'users', currentGame.get('opponent'), 'uid']);

  if (currentUserUid === currentHostUid) {
    return 'playerA';
  }
  if (currentUserUid === currentOpponentUid) {
    return 'playerB';
  }
  return null;
};
