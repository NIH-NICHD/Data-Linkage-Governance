import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { styled } from '@mui/system';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  display: 'none',
  color: 'white',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const ExpandButton = (props) => {
  const { expand, callback } = props;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StyledButton
      variant="contained"
      color="primary"
      onClick={callback}
    >
    {expand ? 'Show All Policy Types' : 'Collapse Policy Types'}
    {expand ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowUpIcon />}
    </StyledButton>
  );
};

export default ExpandButton;
