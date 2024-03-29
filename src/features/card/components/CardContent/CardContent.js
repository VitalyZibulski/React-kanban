import React, { Fragment, memo, useState, useCallback} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FixedLayout, Button, Div, Textarea } from "@vkontakte/vkui";
import { getId, getText } from "../../selectors";
import TextContent from "../TextContent/TextContent";
import { editCard, deleteCard } from "../../actions";

import './style.css';
import {goBack} from "../../../../app/actions";

const CardContent = () => {
  const dispatch = useDispatch();
  const text = useSelector(getText);
  const id = useSelector(getId);
  const [isEditableMode, setEditableMode] = useState(!text);
  const [value, setValue] = useState(text || '');
  const changeMode = useCallback(() => {
    if (isEditableMode && value.trim().length) {
      dispatch(editCard(id, { text: value }))
        .finally(() => setEditableMode(!isEditableMode));
    } else {
      setEditableMode(!isEditableMode)
    }
  }, [isEditableMode, value, dispatch, id]);
  const changeValue = useCallback(({ target: {value} }) => setValue(value), []);
  const deleteItem = useCallback(() => {
    dispatch(deleteCard(id)).finally(() => dispatch(goBack()));
  }, [dispatch, id]);

  return (
      <Fragment>
        {isEditableMode ? (
          <Div>
            <Textarea value={value} onChange={changeValue} />
          </Div>
        ) : <TextContent />}

        <FixedLayout vertical="bottom">
          <Div className="CardContent_buttons">
            <Button mode="commerce" size="l" onClick={changeMode}>{isEditableMode ? 'Save' : 'Change'}</Button>
            <Button mode="destructive" size="l" onClick={deleteItem}>Delete</Button>
          </Div>
        </FixedLayout>
      </Fragment>
  )
};

export default memo(CardContent);
