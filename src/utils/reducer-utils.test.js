import * as ReducerUtils from './reducer-utils';

describe('ReducerUtils', () => {
  describe('getCurrentGame', () => {
    it('gets the current game', () => {
      const state = {
        firebase: {
          // eslint-disable-next-line id-blacklist
          data: {
            games: {
              gameId: 'correct game',
              otherGameId: 'wrong game'
            }
          }
        }
      };

      expect(ReducerUtils.getCurrentGame(state, 'gameId')).toEqual('correct game');
    });
  });

  describe('getCurrentUserPlayerName', () => {
    it('handles the current user not being in the game', () => {
      const state = {
        firebase: {
          profile: {
            uid: 'currentPlayerUid'
          },
          // eslint-disable-next-line id-blacklist
          data: {
            games: {
              gameId: {
                host: 'hostId',
                opponent: 'opponentId'
              },
              otherGameId: 'wrong game'
            },
            users: {
              hostId: {
                uid: 'somePlayerUid'
              },
              opponentId: {
                uid: 'someOtherPlayerUid'
              }
            }
          }
        }
      };

      expect(ReducerUtils.getCurrentUserPlayerName(state, 'gameId')).toBeNull();
    });

    it('handles the current user being the host', () => {
      const state = {
        firebase: {
          profile: {
            uid: 'currentPlayerUid'
          },
          // eslint-disable-next-line id-blacklist
          data: {
            games: {
              gameId: {
                host: 'hostId',
                opponent: 'opponentId'
              },
              otherGameId: 'wrong game'
            },
            users: {
              hostId: {
                uid: 'currentPlayerUid'
              },
              opponentId: {
                uid: 'someOtherPlayerUid'
              }
            }
          }
        }
      };

      expect(ReducerUtils.getCurrentUserPlayerName(state, 'gameId')).toEqual('playerA');
    });

    it('handles the current user being the opponent', () => {
      const state = {
        firebase: {
          profile: {
            uid: 'currentPlayerUid'
          },
          // eslint-disable-next-line id-blacklist
          data: {
            games: {
              gameId: {
                host: 'hostId',
                opponent: 'opponentId'
              },
              otherGameId: 'wrong game'
            },
            users: {
              hostId: {
                uid: 'someOtherPlayerUid'
              },
              opponentId: {
                uid: 'currentPlayerUid'
              }
            }
          }
        }
      };

      expect(ReducerUtils.getCurrentUserPlayerName(state, 'gameId')).toEqual('playerB');
    });
  });
});
