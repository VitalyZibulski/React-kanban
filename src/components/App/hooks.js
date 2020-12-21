import { useState, useEffect } from "react";
import { getDesks } from "../../actions";

const useDesksState = () => {
  const [desks, setDesks] = useState([]);
  const addDesk = (desk) => setDesks([...desks, desk]);
  const removeDesk = (removeId) => setDesks(desks.filter(({id}) => id !== removeId));

  useEffect(() => {
    // getDesks().then(desks => onLoadDesks(desks))
    getDesks().then(setDesks)
  }, []);

  return { desks, addDesk, removeDesk, setDesks };
}

const useNavState = () => {
  const [activePanel, setActivePanel] = useState(null);
  const changeRoute = ({ route }) => setActivePanel(route.name);

  return { activePanel, changeRoute }
}

const useCardsState = () => {
  const [cards, setCards] = useState([]);
  const addCard = (card) => setCards([...cards, card]);
  const removeCard = (removeId) => setCards(cards.filter(({id}) => id !== removeId));

  return { cards, setCards, addCard, removeCard }
}

const usePopoutSatate = () => {
  const [popout, setPopout] = useState(null);

  return { popout, setPopout };
}

export const useAppState = () =>  {
  const desksState = useDesksState();
  const columnsState = useColumnsState();
  const navState = useNavState();
  const cardsState = useCardsState();
  const popoutState = usePopoutSatate();

  return {
    ...desksState,
    ...columnsState,
    ...navState,
    ...cardsState,
    ...popoutState,
  }
}