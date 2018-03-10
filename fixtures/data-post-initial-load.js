import _ from 'lodash';
import {fromJS} from 'immutable';

const initialData = `{
  "firebase": {
    "authError": null,
    "auth": {
      "uid": "current-user-uid",
      "displayName": "Current User Display Name",
      "photoURL": "current user photo url"
    },
    "profile": {
      "uid": "current-user-uid",
      "displayName": "Current User Display Name",
      "photoURL": "current user photo url"
    },
    "data": {
      "games": {
        "-KnrZP2chDv_4frmGLqQ": {
          "gameState": {
            "boardSpaces": [
              {
                "col": 5,
                "row": 0
              },
              {
                "col": 6,
                "row": 0
              },
              {
                "col": 2,
                "row": 1
              },
              {
                "col": 3,
                "row": 1
              },
              {
                "col": 4,
                "row": 1
              },
              {
                "col": 5,
                "row": 1
              },
              {
                "col": 6,
                "row": 1
              },
              {
                "col": 7,
                "row": 1
              },
              {
                "col": 8,
                "row": 1
              },
              {
                "col": 9,
                "row": 1
              },
              {
                "col": 1,
                "row": 2
              },
              {
                "col": 2,
                "row": 2
              },
              {
                "col": 3,
                "row": 2
              },
              {
                "col": 4,
                "row": 2
              },
              {
                "col": 5,
                "row": 2
              },
              {
                "col": 6,
                "row": 2
              },
              {
                "col": 7,
                "row": 2
              },
              {
                "col": 8,
                "row": 2
              },
              {
                "col": 9,
                "row": 2
              },
              {
                "col": 10,
                "row": 2
              },
              {
                "col": 0,
                "row": 3
              },
              {
                "col": 1,
                "row": 3
              },
              {
                "col": 2,
                "row": 3
              },
              {
                "col": 3,
                "row": 3
              },
              {
                "col": 4,
                "row": 3
              },
              {
                "col": 5,
                "row": 3
              },
              {
                "col": 6,
                "row": 3
              },
              {
                "col": 7,
                "row": 3
              },
              {
                "col": 8,
                "row": 3
              },
              {
                "col": 9,
                "row": 3
              },
              {
                "col": 10,
                "row": 3
              },
              {
                "col": 11,
                "row": 3
              },
              {
                "col": 0,
                "row": 4
              },
              {
                "col": 1,
                "row": 4
              },
              {
                "col": 2,
                "row": 4
              },
              {
                "col": 3,
                "row": 4
              },
              {
                "col": 4,
                "row": 4
              },
              {
                "col": 5,
                "row": 4
              },
              {
                "col": 6,
                "row": 4
              },
              {
                "col": 7,
                "row": 4
              },
              {
                "col": 8,
                "row": 4
              },
              {
                "col": 9,
                "row": 4
              },
              {
                "col": 10,
                "row": 4
              },
              {
                "col": 11,
                "row": 4
              },
              {
                "col": 0,
                "row": 5
              },
              {
                "col": 1,
                "row": 5
              },
              {
                "col": 2,
                "piece": {
                  "player": "playerA",
                  "type": "knight"
                },
                "row": 5
              },
              {
                "col": 3,
                "piece": {
                  "player": "playerA",
                  "type": "pawn"
                },
                "row": 5
              },
              {
                "col": 4,
                "piece": {
                  "player": "playerA",
                  "type": "pawn"
                },
                "row": 5
              },
              {
                "col": 5,
                "piece": {
                  "player": "playerA",
                  "type": "pawn"
                },
                "row": 5
              },
              {
                "col": 6,
                "piece": {
                  "player": "playerA",
                  "type": "pawn"
                },
                "row": 5
              },
              {
                "col": 7,
                "piece": {
                  "player": "playerA",
                  "type": "pawn"
                },
                "row": 5
              },
              {
                "col": 8,
                "piece": {
                  "player": "playerA",
                  "type": "pawn"
                },
                "row": 5
              },
              {
                "col": 9,
                "piece": {
                  "player": "playerA",
                  "type": "knight"
                },
                "row": 5
              },
              {
                "col": 10,
                "row": 5
              },
              {
                "col": 11,
                "row": 5
              },
              {
                "col": 0,
                "row": 6
              },
              {
                "col": 1,
                "row": 6
              },
              {
                "col": 2,
                "row": 6
              },
              {
                "col": 3,
                "piece": {
                  "player": "playerA",
                  "type": "knight"
                },
                "row": 6
              },
              {
                "col": 4,
                "piece": {
                  "player": "playerA",
                  "type": "pawn"
                },
                "row": 6
              },
              {
                "col": 5,
                "piece": {
                  "player": "playerA",
                  "type": "pawn"
                },
                "row": 6
              },
              {
                "col": 6,
                "piece": {
                  "player": "playerA",
                  "type": "pawn"
                },
                "row": 6
              },
              {
                "col": 7,
                "piece": {
                  "player": "playerA",
                  "type": "pawn"
                },
                "row": 6
              },
              {
                "col": 8,
                "piece": {
                  "player": "playerA",
                  "type": "knight"
                },
                "row": 6
              },
              {
                "col": 9,
                "row": 6
              },
              {
                "col": 10,
                "row": 6
              },
              {
                "col": 11,
                "row": 6
              },
              {
                "col": 0,
                "row": 7
              },
              {
                "col": 1,
                "row": 7
              },
              {
                "col": 2,
                "row": 7
              },
              {
                "col": 3,
                "row": 7
              },
              {
                "col": 4,
                "row": 7
              },
              {
                "col": 5,
                "row": 7
              },
              {
                "col": 6,
                "row": 7
              },
              {
                "col": 7,
                "row": 7
              },
              {
                "col": 8,
                "row": 7
              },
              {
                "col": 9,
                "row": 7
              },
              {
                "col": 10,
                "row": 7
              },
              {
                "col": 11,
                "row": 7
              },
              {
                "col": 0,
                "row": 8
              },
              {
                "col": 1,
                "row": 8
              },
              {
                "col": 2,
                "row": 8
              },
              {
                "col": 3,
                "row": 8
              },
              {
                "col": 4,
                "row": 8
              },
              {
                "col": 5,
                "row": 8
              },
              {
                "col": 6,
                "row": 8
              },
              {
                "col": 7,
                "row": 8
              },
              {
                "col": 8,
                "row": 8
              },
              {
                "col": 9,
                "row": 8
              },
              {
                "col": 10,
                "row": 8
              },
              {
                "col": 11,
                "row": 8
              },
              {
                "col": 0,
                "row": 9
              },
              {
                "col": 1,
                "row": 9
              },
              {
                "col": 2,
                "row": 9
              },
              {
                "col": 3,
                "piece": {
                  "player": "playerB",
                  "type": "knight"
                },
                "row": 9
              },
              {
                "col": 4,
                "piece": {
                  "player": "playerB",
                  "type": "pawn"
                },
                "row": 9
              },
              {
                "col": 5,
                "piece": {
                  "player": "playerB",
                  "type": "pawn"
                },
                "row": 9
              },
              {
                "col": 6,
                "piece": {
                  "player": "playerB",
                  "type": "pawn"
                },
                "row": 9
              },
              {
                "col": 7,
                "piece": {
                  "player": "playerB",
                  "type": "pawn"
                },
                "row": 9
              },
              {
                "col": 8,
                "piece": {
                  "player": "playerB",
                  "type": "knight"
                },
                "row": 9
              },
              {
                "col": 9,
                "row": 9
              },
              {
                "col": 10,
                "row": 9
              },
              {
                "col": 11,
                "row": 9
              },
              {
                "col": 0,
                "row": 10
              },
              {
                "col": 1,
                "row": 10
              },
              {
                "col": 2,
                "piece": {
                  "player": "playerB",
                  "type": "knight"
                },
                "row": 10
              },
              {
                "col": 3,
                "piece": {
                  "player": "playerB",
                  "type": "pawn"
                },
                "row": 10
              },
              {
                "col": 4,
                "piece": {
                  "player": "playerB",
                  "type": "pawn"
                },
                "row": 10
              },
              {
                "col": 5,
                "piece": {
                  "player": "playerB",
                  "type": "pawn"
                },
                "row": 10
              },
              {
                "col": 6,
                "piece": {
                  "player": "playerB",
                  "type": "pawn"
                },
                "row": 10
              },
              {
                "col": 7,
                "piece": {
                  "player": "playerB",
                  "type": "pawn"
                },
                "row": 10
              },
              {
                "col": 8,
                "piece": {
                  "player": "playerB",
                  "type": "pawn"
                },
                "row": 10
              },
              {
                "col": 9,
                "piece": {
                  "player": "playerB",
                  "type": "knight"
                },
                "row": 10
              },
              {
                "col": 10,
                "row": 10
              },
              {
                "col": 11,
                "row": 10
              },
              {
                "col": 0,
                "row": 11
              },
              {
                "col": 1,
                "row": 11
              },
              {
                "col": 2,
                "row": 11
              },
              {
                "col": 3,
                "row": 11
              },
              {
                "col": 4,
                "row": 11
              },
              {
                "col": 5,
                "row": 11
              },
              {
                "col": 6,
                "row": 11
              },
              {
                "col": 7,
                "row": 11
              },
              {
                "col": 8,
                "row": 11
              },
              {
                "col": 9,
                "row": 11
              },
              {
                "col": 10,
                "row": 11
              },
              {
                "col": 11,
                "row": 11
              },
              {
                "col": 0,
                "row": 12
              },
              {
                "col": 1,
                "row": 12
              },
              {
                "col": 2,
                "row": 12
              },
              {
                "col": 3,
                "row": 12
              },
              {
                "col": 4,
                "row": 12
              },
              {
                "col": 5,
                "row": 12
              },
              {
                "col": 6,
                "row": 12
              },
              {
                "col": 7,
                "row": 12
              },
              {
                "col": 8,
                "row": 12
              },
              {
                "col": 9,
                "row": 12
              },
              {
                "col": 10,
                "row": 12
              },
              {
                "col": 11,
                "row": 12
              },
              {
                "col": 0,
                "row": 13
              },
              {
                "col": 1,
                "row": 13
              },
              {
                "col": 2,
                "row": 13
              },
              {
                "col": 3,
                "row": 13
              },
              {
                "col": 4,
                "row": 13
              },
              {
                "col": 5,
                "row": 13
              },
              {
                "col": 6,
                "row": 13
              },
              {
                "col": 7,
                "row": 13
              },
              {
                "col": 8,
                "row": 13
              },
              {
                "col": 9,
                "row": 13
              },
              {
                "col": 10,
                "row": 13
              },
              {
                "col": 11,
                "row": 13
              },
              {
                "col": 1,
                "row": 14
              },
              {
                "col": 2,
                "row": 14
              },
              {
                "col": 3,
                "row": 14
              },
              {
                "col": 4,
                "row": 14
              },
              {
                "col": 5,
                "row": 14
              },
              {
                "col": 6,
                "row": 14
              },
              {
                "col": 7,
                "row": 14
              },
              {
                "col": 8,
                "row": 14
              },
              {
                "col": 9,
                "row": 14
              },
              {
                "col": 10,
                "row": 14
              },
              {
                "col": 2,
                "row": 15
              },
              {
                "col": 3,
                "row": 15
              },
              {
                "col": 4,
                "row": 15
              },
              {
                "col": 5,
                "row": 15
              },
              {
                "col": 6,
                "row": 15
              },
              {
                "col": 7,
                "row": 15
              },
              {
                "col": 8,
                "row": 15
              },
              {
                "col": 9,
                "row": 15
              },
              {
                "col": 5,
                "row": 16
              },
              {
                "col": 6,
                "row": 16
              }
            ],
            "capturedPieces": {
              "playerA": {
                "knight": 0,
                "pawn": 0
              },
              "playerB": {
                "knight": 0,
                "pawn": 0
              }
            },
            "turnCount": 0
          },
          "host": "current-user-uid",
          "opponent": "some-user-uid"
        }
      },
      "users": {
        "current-user-uid": {
          "avatarUrl": "current user photo url",
          "displayName": "Current User Display Name",
          "email": "current.user@gmail.com",
          "photoURL": "current user photo url",
          "uid": "current-user-uid"
        },
        "some-user-uid": {
          "avatarUrl": "other user photo url",
          "displayName": "ann perkins",
          "email": "other.user@gmail.com",
          "photoURL": "other user photo url",
          "uid": "some-user-uid"
        }
      }
    },
    "requested": {
      "games": true,
      "users": true
    },
    "requesting": {
      "games": false,
      "users": false
    },
    "timestamp": {
      "games": 1500823289327,
      "users": 1500823290264
    },
    "isInitializing": false
  },
  "routing": {
    "locationBeforeTransitions": {
      "pathname": "/play/-KnrZP2chDv_4frmGLqQ",
      "search": "",
      "hash": "",
      "action": "POP",
      "key": "r457nc",
      "query": {}
    }
  },
  "ui": {
    "chosenMoveSteps": []
  }
}`;

const parsedData = JSON.parse(initialData);

export default {
  ..._.pick(parsedData, 'routing'),
  firebase: fromJS(parsedData.firebase),
  ui: fromJS(parsedData.ui)
};

