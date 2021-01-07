import * as actionType from './types';
import { api } from "../../api";

const setCard = ({ id, name, text }) => ({
  type: actionType.SET_CARD,
  payload: { id, name, text },
});

export const fetchCard = (cardId) => (dispatch) => (
  api.getCard(cardId)
    .then((card) => {
      dispatch({ type: actionType.FETCH_CARD_SUCCESS});
      dispatch(setCard(card));
    })
    .catch(() => dispatch({ type: actionType.FETCH_CARD_FAIL}))
)