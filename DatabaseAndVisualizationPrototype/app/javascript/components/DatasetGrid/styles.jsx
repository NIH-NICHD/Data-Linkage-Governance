import {styled} from '@mui/system';
import { Grid, Stack, TableCell, TableRow } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';


export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "white",
    },
    '&:nth-of-type(even)': {
      backgroundColor: "grey",
    },
  }));

  export const ThickBorderTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: '1px solid rgba(150, 150, 150, 1)'
  }));
export const DatasetTableTile = styled(Stack)(({theme}) => ({
    padding: theme.padding.tight,
    minHeight: '40px',
    height: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '3px solid black',

}))

export const DatasetMarker = styled('div')(({theme, visible, hasProhibition, hasPermissionContraint, fillcolor}) => {
    let backgroundColor = visible ? theme.palette.primary.main : 'transparent';
    if(visible){
        backgroundColor = fillcolor ? fillcolor : backgroundColor;
    }
    return {
        transition: 'all 0.3s ease',
        padding: theme.padding.tight,
        borderRadius: '32px',
        border: '1px',
        borderStyle: 'solid',
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        height: '40px',
        width: '30px',
        marginLeft: '5px',
        marginBottom: '5px',
        '&:hover': {
            backgroundColor: visible ? theme.palette.primary.white : 'transparent',
            height: '40px', 
        }
    }
})

export const MiniMarker = styled('div')(({ theme }) => ({
    borderRadius: '32px',
    border: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    height: '20px',
    width: '15px',
    display: 'inline-block',
}));

export const DatasetTableRow = styled(Grid)(({theme, selected, index}) => {
    let height = '90px';
    let hoverStyle = {
        backgroundColor: 'azure',
        height: '120px', 
    };
    if(selected === 999){
        selected = index;
    }
    if(selected === index) {
        height = '80vh';
        hoverStyle = {};
    } else if(selected >= 0) {
        height = '0px';
        hoverStyle = {};
    }
    return {
        transition: 'height 0.2s ease',
        borderBottom: '1px solid black',
        borderLeft: '1px solid black',
        // borderBottomRightRadius: '16px',
        // borderTopRightRadius: '16px',
        height: height,
        textAlign: 'center',
        backgroundColor: 'white',
        overflow: 'auto',
        // boxShadow: 'rgba(0,0,0,0.2) 0px 0px 24px 4px',
        '&:hover': hoverStyle
    }
})
// add colors for permissions with constraints
// color for prohibition

export const PolicyTile = styled('div')(({theme,  hasProhibition, hasPermissionContraint, borderc}) => {
    let width = '100%';
    let borderColor = borderc ? borderc : theme.palette.primary.main;
    // if(hasProhibition) {
    //     borderColor = theme.palette.primary.lavender;
    // } else if(hasPermissionContraint) {
    //     borderColor = theme.palette.primary.darkLavender;
    // }
    return {
        // borderBottomRightRadius: '16px',
        // borderTopRightRadius: '16px',
        width: width,
        padding: '16px',
        borderRadius: '12px',
        border: '3px solid',
        borderColor: borderColor
    }
});

export const InfoIcon = styled(InfoOutlined)(({theme}) => ({
    cursor: 'pointer', 
    '&:hover': {
        color: theme.palette.primary.main
    }
}))