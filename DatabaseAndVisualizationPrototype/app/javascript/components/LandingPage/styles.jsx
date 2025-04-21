import {styled} from '@mui/system';
import { Grid, Stack, Button, Typography, Card, Chip } from '@mui/material';
import { FactCheck, TravelExplore, DatasetLinked, Snowshoeing } from '@mui/icons-material';

export const BasicGrid = styled(Grid)(({theme, selected}) => ({
    borderRadius: '8px',
    padding: '20px 40px',
    alignItems: 'center',
  }));

export const WelcomeBox = styled(Stack)(({ theme }) => ({
    borderRadius: '8px',
    transition: `height 0.5s ease, transform 0.3s ease`,
    backgroundColor: theme.palette.primary.white,
    boxShadow: 'rgba(0,0,0,0.2) 0px 0px 24px 4px',
    padding: '20px 40px',
}));

export const CenterBox = styled(Stack)(({ theme }) => ({
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    marginTop: '20px',
    marginBottom: '20px',
}));

const landingPageIcon = (({ theme }) => ({
    fontSize: '100px',
    color: 'white'
}));

export const FactCheckIcon = styled(FactCheck)(landingPageIcon);
export const TravelExploreIcon = styled(TravelExplore)(landingPageIcon);
export const DatasetLinkedIcon = styled(DatasetLinked)(landingPageIcon);
export const SnowshoeingIcon = styled(Snowshoeing)(landingPageIcon);

export const AppTitleTypography = styled(Typography)(({ theme }) => ({
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'white'
}))

export const CenteredStack = styled(Stack)(({ theme }) => ({
    alignContent: 'center',
    justifyContent: 'flex-end',
}));

export const MainStack = styled(CenteredStack)(({ theme }) => ({
    // height: '45vh',
    justifyContent: 'center',
    marginTop: '20px',
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
