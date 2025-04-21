import {styled} from '@mui/system';
import { Card, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';


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

export const HeaderCard = styled(Card)(({theme}) => ({
    padding: '20px',
    textAlign: 'left',
    justifyContent: 'left',
    alignItems: 'left',
    marginTop: '10px',
    width: '90%'

}))

export const HeaderTableRow = styled(TableRow)(({theme, backgroundcolor}) => ({
    borderTop: `1px solid ${backgroundcolor}`,
    borderBottom: `1px solid ${backgroundcolor}`,
    backgroundColor: alpha(backgroundcolor, 0.15),
    marginTop: '15px',

}))

export const CustomTableCell = styled(TableCell)(({theme}) => ({
    borderBottom: '0px',
    fontSize: '1em',
    padding: '12px'
}))

export const AdjustableTypography = styled(Typography)(({theme}) => ({
    fontSize: '1em'
}))