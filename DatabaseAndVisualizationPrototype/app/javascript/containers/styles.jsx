import {styled} from '@mui/system';
import { AppBar, Stack } from '@mui/material'

export const StyledAppBar = styled(AppBar)(({ theme, isscrolled }) => ({
    width: '90%',
    margin: '15px auto',
    backgroundColor: isscrolled ? theme.palette.grayscale.offWhite : theme.palette.background.default,
    opacity: isscrolled ? 0.99 : 1,
    color: theme.palette.grayscale.black,
    boxShadow: isscrolled ? 'rgba(0,0,0,0.2)' : 'none',
    borderRadius: '8px',
    border: isscrolled ?  '1px solid #c1c1c1' : 'none',
    left: 0,
  }));

export const StyledStack = styled(Stack)(({ theme, selected, disabled, isscrolled, highlight }) => ({
    position: 'relative', 
    // width: '200px',
    margin: '0 5px',
    padding: '8px 20px 8px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: disabled ? 'default' : 'pointer',
    color: disabled ? theme.palette.grayscale.grayLight : theme.palette.grayscale.black,
    backgroundColor: highlight ? theme.palette.primary.main : (selected && !isscrolled) ? theme.palette.grayscale.offWhite : 'inherit',
    transition: `border 0.5s ease`,
    border: '1px solid transparent',
    borderBottomColor: (selected && isscrolled) ? theme.palette.primary.main : 'transparent',
    boxShadow: (selected && !isscrolled) ? 'rgba(0,0,0,0.2) 8px -2px 12px 2px' : 'none',
    '&:hover': {
        border: disabled ? '' : `1px solid ${theme.palette.grayscale.gray}`
    }
}));

export const BrandStack = styled(StyledStack)(({ theme, isscrolled }) => ({
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    width: 'auto',
    padding: '8px 20px',
    textWrap: 'nowrap',

    '&:hover': {
        border: `1px solid transparent`,
    },
}));

export const GlossaryDiv = styled('div')(({ theme, isscrolled }) => ({
    backgroundColor: 'white',
    zIndex: 1200,
    padding: '30px',
}));

export const StyledAppBarAlt = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, isscrolled, drawerwidth }) => ({
    marginTop: '15px',
    marginBottom: '15px',
    marginLeft: '2%',
    marginRight: '2%',
    width: '96%',
    left: 0,
    backgroundColor: isscrolled ? theme.palette.grayscale.offWhite : theme.palette.background.default,
    opacity: isscrolled ? 0.99 : 1,
    color: theme.palette.grayscale.black,
    boxShadow: isscrolled ? 'rgba(0,0,0,0.2)' : 'none',
    borderRadius: '8px',
    border: isscrolled ?  '1px solid #c1c1c1' : 'none',
    ...(open && {
        marginRight: `calc(2% + ${drawerwidth})`,
        width: `calc(96% - ${drawerwidth}px)`,

    }),
}));