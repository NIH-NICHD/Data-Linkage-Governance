import React, { useState, useEffect, useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Glossary from './Glossary';
import { VizContext } from '../reducer/VizContextProvider';
import HomeIcon from '@mui/icons-material/Home';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InfoIcon from '@mui/icons-material/Info';
import { StyledAppBarAlt, StyledStack } from './styles';
import { actionTypes } from '../reducer/reducer';
import LandingPage from '../components/LandingPage/LandingPage';
import SelectDatasets from '../components/SelectDatasets/SelectDatasets';
import About from '../components/AboutPage/About';
import { TravelExplore, DatasetLinked, Snowshoeing } from '@mui/icons-material';
import DatasetGrid from '../components/DatasetGrid/DatasetGrid';
import LinkageSteps from '../components/LinkageSteps/LinkageSteps';
import DatasetLinkage from '../components/DatasetLinkage/DatasetLinkage';
import { useNavigate, useParams } from 'react-router-dom';

const pages = 240;

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
        position: 'relative',
    }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function App() {

    const [state, dispatch] = useContext(VizContext);
    const [headerStyle, setHeaderStyle] = useState(undefined);
    const { id: tabId } = useParams();
    const navigate = useNavigate();
    const setSelectedTab = (tab) => {
        dispatch({
            type: actionTypes.changeTab,
            value: tab
        });
    }
    const tabs = {
        homeTab: {
            id: 'home',
            label: 'Home',
            datasetsNeeded: 0,
            icon: <HomeIcon />,
            content: <div key={"home"}><LandingPage /></div>
        },
        selectTab: {
            id: 'select',
            label: 'Select Datasets',
            datasetsNeeded: 0,
            icon: <FactCheckIcon />,
            content: <div key={"select"}><SelectDatasets /></div>
        },
        governanceTab: {
            id: 'compare',
            label: 'Compare Governance',
            datasetsNeeded: 1,
            icon: <TravelExplore />,
            content: <div key={"viz"}><DatasetGrid /></div>
        },
        linkageTab: {
            id: 'assess',
            label: 'Assess Linkage Feasibility',
            datasetsNeeded: 2,
            icon: <DatasetLinked />,
            content: <div key={"linkage"}><DatasetLinkage /></div>
        },
        viewStepsTab: {
            id: 'linkage',
            label: 'View Action Steps',
            datasetsNeeded: 2,
            icon: <Snowshoeing />,
            content: <div key={"viewLinkage"}><LinkageSteps /></div>
        },
        aboutTab: {
            id: 'about',
            label: 'About',
            datasetsNeeded: 0,
            icon: <InfoIcon />,
            content: <About />
        }
    };

    useEffect(() => {
        if(!tabId) {
            setSelectedTab(tabs.homeTab.id);
        } else {
            setSelectedTab(tabId);
        }
    }, [tabId])

    useEffect(() => {

        // Set up an event listener to make the header scroll aware
        const updateScrollState = () => {
            var threshold = 10;
            if (window.scrollY > threshold) {
                setHeaderStyle("true");
            } else {
                setHeaderStyle(undefined);
            }
        }
        document.addEventListener("scroll", updateScrollState);

        // fetch datasets; we need to use a relative path for flexible deployment
        fetch(window.location.href.split('/vis')[0] + '/datasets.json').then((result) => {
            return result.json();
        }).then((json) => {
            dispatch({
                type: actionTypes.updateState,
                settingId: 'datasets',
                value: json.toSorted((a, b) => a.name < b.name ? -1 : 1)
            });
        }).catch((e) => {
            console.log(e);
        });

        // For debugging allow some datasets to be preselected; just change the slice arguments
        const preselectedDatasets = [
            'Monitoring the Future',
            'PEDSnet',
            'National Health and Nutrition Examination Survey',
            'National Survey on Drug Use and Health',
            'Adoption and Foster Care Analysis and Reporting System',
            'National Childhood Cancer Registry',
            'COVID-19 Case Surveillance Restricted Access Data',
            'Transformed Medicaid Statistical Information System',
            'National COVID Cohort Collaborative',
            'Rapid Acceleration of Diagnostics (RADx)',
            'Air Quality Data',
        ];
        preselectedDatasets.slice(0, 0).forEach(d => {
            dispatch({
                type: actionTypes.addSelection,
                value: d
            });
        });

        // theoretically we should allow routing to a specific page, but on load we have no dataset context so it would be prohibitted to visit
        // the non-home pages anyway, so we just kick the user back to the home page indiscriminately.
        // have to update the URL as well to avoid funky behavior when reloading the page.
        setSelectedTab(tabs.homeTab.id);
        navigate('/', {relative: "route"});

        // Clean up the event listener as needed
        return () => document.removeEventListener("scroll", updateScrollState);

    }, []);

    const theme = useTheme();

    const handleDrawerOpen = () => {
        dispatch({
            type: actionTypes.updateGlossary,
            value: true
        })
    };

    const handleDrawerClose = () => {
        dispatch({
            type: actionTypes.updateGlossary,
            value: false
        })    
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box position="fixed" sx={{width: '100%', height: '60px', zIndex:2, backgroundColor: '#f2f2f2'}}>

            </Box>
            <StyledAppBarAlt position="fixed" isscrolled={headerStyle} open={state.glossaryOpen} drawerwidth={drawerWidth}>
            <Toolbar>
                {Object.values(tabs).map((tab) => {
                    const disabled = state.selectedDatasets.length < tab.datasetsNeeded;
                    return (<StyledStack onClick={() => !disabled && navigate(`/${tab.id}`, {relative:'path'})}
                                         isscrolled={headerStyle}
                                         direction="row"
                                         alignItems="center"
                                         gap={2}
                                         key={tab.id}
                                         selected={state.selectedTab === tab.id}
                                         disabled={disabled}>
                                {tab.icon}
                                <Typography variant="p" noWrap>
                                    {tab.label}
                                </Typography>
                            </StyledStack>)
                })}
            <StyledStack onClick={handleDrawerOpen} isscrolled={headerStyle} direction="row" alignItems="center" gap={2} sx={{ ...(state.glossaryOpen && { display: 'none' }), marginLeft: 'auto', border: '1px solid black' }}>
            <LibraryBooksIcon />                  
                <Typography variant="p" noWrap>
                    Open Glossary
                </Typography>
                  
            </StyledStack>
            </Toolbar>
            </StyledAppBarAlt>
            <Main open={state.glossaryOpen}>
                <DrawerHeader />
                {Object.values(tabs).map((tab) => {
                    if(tab.id === state.selectedTab){
                        return tab.content;
                    }
                })}
            </Main>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={state.glossaryOpen}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Glossary></Glossary>
            </Drawer>
        </Box>
    );
}