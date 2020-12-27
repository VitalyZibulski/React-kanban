import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import DeskItem from "../DeskItem/DeskItem";
import { CardGrid } from "@vkontakte/vkui";
import { fetchDesks } from "../../actions/actions";

const DeskList = () => {
  const dispatch = useDispatch();
  const desks = useSelector((state) => state.desks);

  useEffect(() => {
      dispatch(fetchDesks());
  }, [dispatch]);


  if (!desks.length) {
    return null;
  }

  return (
      <CardGrid>
        {desks.map(({id, name}) => <DeskItem key={id} id={id}>{name}</DeskItem>)}
      </CardGrid>
  );
}

export default DeskList;
