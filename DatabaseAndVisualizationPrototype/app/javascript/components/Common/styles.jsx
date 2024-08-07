import {styled} from '@mui/system';
import { Grid, Stack, TableRow } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Close } from '@mui/icons-material';


export const DatasetChip = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.lighter,
    padding: '6px 12px 6px 12px',
    borderRadius: '12px',
    margin: '5px',
    textAlign: 'center',
}));

export const CloseIcon = styled(Close)(({ theme }) => ({
    cursor: 'pointer',
    marginRight: '6px',
}));
