import {styled} from '@mui/system';
import { Grid, Stack, Button, Typography } from '@mui/material';

export const AboutArea = styled(Grid)(({theme}) => ({
    padding: '40px 40px 40px 40px',
}))

export const AboutBox = styled(Grid)(({theme}) => ({
    backgroundColor: theme.palette.primary.white,
    boxShadow: 'rgba(0,0,0,0.2) 0px 0px 24px 4px',
    width: '100%',
    padding: '20px',
    borderRadius: '16px'
}))