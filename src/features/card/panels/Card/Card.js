import React, { Fragment, useEffect, useState, useCallback, memo } from 'react';
import {PanelHeaderBack, PanelHeaderSimple, PanelSpinner} from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from 'react-router5';
import { fetchCard } from "../../actions";
import { getName } from "../../selectors";
import { goBack } from "../../../../app/actions";
import CardContent from "../../components/CardContent/CardContent";

const Card = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoader] = useState(true);
  const { route: { params: { cardId } } } = useRoute();
  const cardName = useSelector(getName);
  const goToColumns = useCallback(() => dispatch(goBack()), [dispatch]);

  useEffect(() => {
    if (cardId) {
      setLoader(true);
      dispatch(fetchCard(cardId)).finally(() => setLoader(false));
    }
  }, [dispatch, cardId]);

  return (
    <Fragment>
      <PanelHeaderSimple left={<PanelHeaderBack onClick={goToColumns} />}>Card {cardName ? cardName : ''}</PanelHeaderSimple>

      {isLoading ? <PanelSpinner /> : <CardContent />}
    </Fragment>
  );
}

export default memo(Card);
