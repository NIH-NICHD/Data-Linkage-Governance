import {styled} from '@mui/system';
import { Grid, Stack, Button, Typography, Card, Chip } from '@mui/material';

export const CenteredStack = styled(Stack)(({ theme }) => ({
    alignContent: 'center',
    justifyContent: 'flex-end',
}));

export const FloatingButtonBar = styled(Stack)(({ theme, isscrolled, ishidden }) => ({
    padding: '20px',
    position: 'fixed',
    bottom: '20px',
    left: '2%',
    width: '96%',
    borderRadius: '8px',
    backgroundColor: isscrolled ? theme.palette.grayscale.offWhite : theme.palette.background.default,
    boxShadow: isscrolled ? 'rgba(0,0,0,0.2) 0px 0px 24px 4px' : 'none',
    border: isscrolled ?  '1px solid #c1c1c1' : 'none',
    display: ishidden ? 'none' : 'default',
    transition: 'all 0.3s ease',
}));

export const ActionButton = styled(Button)(({ theme, active }) => ({
    cursor: active ? 'pointer' : 'not-allowed',
    fontSize: '1.3rem',
    padding: '15px',
    color: active ? theme.palette.primary.white : theme.palette.primary.gray,
    backgroundColor: active ? theme.palette.primary.main : theme.palette.primary.lightGray,
    '&:hover': {
        backgroundColor: active ? theme.palette.primary.darker : theme.palette.primary.lightGray
    }
}));

export const BasicGrid = styled(Grid)(({theme, selected}) => ({
    borderRadius: '8px',
    padding: '20px 40px',
    alignItems: 'center',
}));

export const ColumnGrid = styled(BasicGrid)(({ theme }) => ({
    paddingTop: '0px',
}));

export const DatasetCard = styled(Card)(({ theme, selected }) => ({
    height: '100%',
    border: selected ? `5px solid ${theme.palette.primary.main}` : '',
    '&:hover': {
        boxShadow: 10
    }
}));

export const PolicyChip = styled(Chip)(({ theme, bgcolor }) => ({
    backgroundColor: bgcolor,
    color: 'white',
    width: '150px',
    justifyContent: 'left'
}));
