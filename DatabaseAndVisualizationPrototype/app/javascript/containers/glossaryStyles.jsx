import {styled} from '@mui/system';
import { AppBar, Stack } from '@mui/material'

export const StyledStack = styled(Stack)(({ theme, selected, isscrolled, highlight }) => ({
    position: 'relative', 
    // width: '200px',
    margin: '0 5px',
    padding: '8px 40px 8px 40px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: highlight ? theme.palette.primary.main : (selected && !isscrolled) ? theme.palette.grayscale.offWhite : 'inherit',
    transition: `border 0.5s ease`,
    border: '1px solid transparent',
    borderBottomColor: (selected && isscrolled) ? theme.palette.primary.main : 'transparent',
    boxShadow: (selected && !isscrolled) ? 'rgba(0,0,0,0.2) 8px -2px 12px 2px' : 'none',
    '&:hover': {
        border: `1px solid ${theme.palette.grayscale.gray}`
    }
}));