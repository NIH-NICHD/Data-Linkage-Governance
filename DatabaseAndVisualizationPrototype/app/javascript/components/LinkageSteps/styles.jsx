import {styled} from '@mui/system';
import { Card } from '@mui/material';

export const ActionPill = styled(Card)(({theme}) => ({
    padding: theme.padding.tight,
    minHeight: '200px',
    width: '20%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    margin: '10px',
}))

export const DatasetChipSmall = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.lighter,
    padding: '6px 12px',
    borderRadius: '12px',
    minWidth: '200px',
    margin: '5px',
    display: 'inline-block',
    width: 'fit-content',
}));
