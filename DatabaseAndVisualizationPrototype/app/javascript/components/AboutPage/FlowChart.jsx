import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

const RightAngleArrows = () => (
  <svg width="100" height="360" viewBox="0 0 100 360" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="180" x2="40" y2="180" stroke="black" strokeWidth="2" />
    <line x1="40" y1="180" x2="40" y2="60" stroke="black" strokeWidth="2" />
    <line x1="40" y1="180" x2="40" y2="295" stroke="black" strokeWidth="2" />

    <line x1="40" y1="60" x2="90" y2="60" stroke="black" strokeWidth="2" />
    <polygon points="90,60 80,55 80,65" fill="black" />
    
    <line x1="40" y1="180" x2="90" y2="180" stroke="black" strokeWidth="2" />
    <polygon points="90,180 80,175 80,185" fill="black" />
    
    <line x1="40" y1="295" x2="90" y2="295" stroke="black" strokeWidth="2" />
    <polygon points="90,295 80,290 80,300" fill="black" />
  </svg>
);
const boxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    border: '1px solid black',
    borderRadius: '4px',
    padding: '8px',
    fontSize: '18px',
    textAlign: 'center'
  }
const FlowChart = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Box
            sx={boxStyle}
          >
            <Typography variant="p">Select one or multiple datasets with governance information</Typography>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <RightAngleArrows />
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={boxStyle}
              >
                <Typography variant="p">Compare governance information (policies, rules, and conditions) across datasets </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={boxStyle}
              >
                <Typography variant="p">Assess the feasibility of linking the selected datasets by reviewing permissions, prohibitions, and required conditions for dataset</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={boxStyle}
              >
                <Typography variant="p">View the required actions to link datasets and share and use the linked data</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlowChart;
