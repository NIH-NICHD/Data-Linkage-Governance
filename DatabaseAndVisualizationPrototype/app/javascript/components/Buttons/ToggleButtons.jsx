import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useContext, useEffect, useState } from 'react';

export default function ToggleButtons(props) {

  const handleAlignment = (event, newAlignment) => {
    if(newAlignment !== null) {
        props.callback(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      value={props.alignment}
      exclusive
      onChange={handleAlignment}
    >
        {props.options.map((e) => {
            return (
                <ToggleButton value={e} aria-label="left aligned">
                   {e}
                </ToggleButton>
            )
        })}
    </ToggleButtonGroup>
  );
}