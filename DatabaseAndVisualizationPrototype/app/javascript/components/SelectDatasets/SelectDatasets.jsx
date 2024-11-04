import React, { useContext,useState, useEffect } from 'react';
import { Stack, Grid, Typography, CardActionArea, CardContent, Avatar, TextField, Chip } from '@mui/material';
import { ActionButton, CenteredStack, ColumnGrid, FloatingButtonBar, DatasetCard, PolicyChip} from './styles';
import { VizContext } from '../../reducer/VizContextProvider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { actionTypes } from '../../reducer/reducer';
import { getDatasetCount } from '../../util/util';
import { useNavigate } from 'react-router-dom';

const SelectDatasets = () => {
    const [state, dispatch] = useContext(VizContext);

    const [buttonBarState, setButtonBarState] = useState('hidden');
    const [searchString, setSearchString] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Set up an event listener to make the button bar scrolling aware
        const updateScrollState = () => {
            var showThreshold = 165;
            var unhoverThreshold = document.body.offsetHeight - window.innerHeight - 10;
            if (window.scrollY < showThreshold) {
                setButtonBarState('hide');
            } else if (window.scrollY >= showThreshold && window.scrollY < unhoverThreshold) {
                setButtonBarState('hover');
            } else {
                setButtonBarState('default');
            }
        };
        document.addEventListener("scroll", updateScrollState);
        updateScrollState();
        // Clean up the event listener as needed
        return () => document.removeEventListener("scroll", updateScrollState);
    }, []);

    const setTileSelection = (dataset) => {
        let type = actionTypes.addSelection;
        if (state.selectedDatasets.indexOf(dataset.name) > -1) {
            type = actionTypes.removeSelection;
        }
        if (state.selectedDatasets.length < 5 || type === actionTypes.removeSelection) {
            dispatch({
                type: type,
                value: dataset.name
            });
        }
    }

    // We want to sanitize the search string so that it can safely be used as a regexp, and then filter the
    // datasets against that regexp
    const sanitizedSearchString = searchString.toLowerCase().replaceAll(/\W/g, '.');
    const displayedDatasets = (state.datasets || []).filter(dataset => {
        return (searchString.length === 0 ||
                dataset.name && dataset.name.toLowerCase().match(sanitizedSearchString) ||
                dataset.dataset_type && dataset.dataset_type.toLowerCase().match(sanitizedSearchString) ||
                dataset.source && dataset.source.toLowerCase().match(sanitizedSearchString) ||
                dataset.description && dataset.description.toLowerCase().match(sanitizedSearchString));
    });

    return (
        <>
            <Grid container sx={{marginBottom: '100px'}}>
                <ColumnGrid item xs={12} id="datasetSection">
                    <CenteredStack spacing={2}>

                        <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold', fontSize: '24px'}}>
                            Select Datasets
                            {(state?.selectedDatasets?.length || 0) > 0 && ` – You have selected ${state?.selectedDatasets?.length} dataset${(state?.selectedDatasets?.length || 0) !== 1 ? 's' : ''}`}
                        </Typography>
                        <Typography variant="p" sx={{fontSize: '18px'}}>
                            Get started by choosing datasets to browse governance information.
                            Datasets with governance information are listed below including the dataset source, a brief description, and
                            <Chip size="small" avatar={<Avatar sx={{ bgcolor: 'white' }}>{'N'}</Avatar>} label={'Policy Type'} sx={{ ml: 1, mr: 1, bgcolor: '#1c6b3e', color: 'white' }} />
                            showing the counts of relevant governance policies categorized by type.
                            Click on the dataset tiles to select up to 5 datasets to compare governance information, assess feasibility of dataset linkage, and review action steps required for linkage and use of linked datasets.
                            A search box is also available to filter datasets based on key words.
                        </Typography>

                        <TextField label='Type to Filter Datasets' value={searchString} onChange={(event) => setSearchString(event.target.value)} focused={true} sx={{ backgroundColor: 'white' }} />

                        <Stack sx={{ ml: -2 }}>
                        <Grid container spacing={2}>
                            {displayedDatasets.map((dataset) => {
                                const selected = state?.selectedDatasets?.indexOf(dataset.name) >= 0;
                                return (
                                    <Grid item md={6} sm={12} key={dataset.name}>

                                        <DatasetCard selected={selected}>
                                            <CardActionArea sx={{ height: '100%' }} onClick={ () => setTileSelection(dataset) }>
                                                <CardContent sx={{ height: '100%' }}>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {dataset.name}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h8" component="div">
                                                        {dataset.source}&nbsp;–&nbsp;{dataset.dataset_type}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden',
                                                                                                             textOverflow: 'ellipsis',
                                                                                                             display: '-webkit-box',
                                                                                                             WebkitLineClamp: '3',
                                                                                                             WebkitBoxOrient: 'vertical' }}>
                                                        {dataset.description}
                                                    </Typography>
                                                    {getDatasetCount(dataset).map(({ id, value, label, color }) => {
                                                        return <PolicyChip key={id} size="small" avatar={<Avatar sx={{ bgcolor: 'white'}}>{value}</Avatar>} label={label} bgcolor={color} sx={{ mr: 1, mt: 1 }} />
                                                    })}
                                                </CardContent>
                                            </CardActionArea>
                                        </DatasetCard>

                                    </Grid>
                                )
                            })}
                        </Grid>
                        </Stack>
                    </CenteredStack>
                </ColumnGrid>

            </Grid>

            <FloatingButtonBar isscrolled={buttonBarState === 'hover' ? 'true' : undefined} ishidden={buttonBarState === 'hide' ? 'true' : undefined}>
                <CenteredStack direction="row" spacing={2} sx={{justifyContent: 'flex-start'}}>
                    <ActionButton
                        variant="contained"
                        direction="row"
                        active={state.selectedDatasets.length > 0 ? "true" : undefined}
                        disabled={state.selectedDatasets.length === 0}
                        onClick={() => navigate('/compare', { relative:'path' })}>
                        Compare Governance Information
                        <ArrowForwardIcon sx={{ marginLeft: '10px'}}/>
                    </ActionButton>
                    <ActionButton
                        variant="contained"
                        direction="row"
                        active={state.selectedDatasets.length > 1 ? "true" : undefined}
                        disabled={state.selectedDatasets.length < 2}
                        onClick={() => navigate('/assess', { relative:'path' })}>
                        Assess Linkage
                        <ArrowForwardIcon sx={{ marginLeft: '10px'}}/>
                    </ActionButton>
                    <ActionButton
                        variant="contained"
                        direction="row"
                        active={state.selectedDatasets.length > 1 ? "true" : undefined}
                        disabled={state.selectedDatasets.length < 2}
                        onClick={() => navigate('/linkage', { relative:'path' })}>
                        View Action Steps
                        <ArrowForwardIcon sx={{ marginLeft: '10px'}}/>
                    </ActionButton>
                </CenteredStack>
            </FloatingButtonBar>

        </>
    )
}

export default SelectDatasets;