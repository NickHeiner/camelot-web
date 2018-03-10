
export const getCurrentGame = (fullState, gameId) => fullState.firebase.getIn(['data', 'games', gameId]);

export const getCurrentUserPlayerName = (fullState, gameId) => {
  const currentUserUid = fullState.firebase.getIn(['profile', 'uid']);
  const currentGame = getCurrentGame(fullState, gameId);
  const currentHostUid = fullState.firebase.getIn(['data', 'users', currentGame.get('host'), 'uid']);
  const currentOpponentUid = fullState.firebase.getIn(['data', 'users', currentGame.get('opponent'), 'uid']);

  if (currentUserUid === currentHostUid) {
    return 'playerA';
  }
  if (currentUserUid === currentOpponentUid) {
    return 'playerB';
  }
  return null;
};
