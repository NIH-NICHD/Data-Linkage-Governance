import React, { useContext, useEffect, useState } from 'react';
import { Stack, Typography, List, styled, ListItem, Box, Link, Tooltip, Popper, Popover, FormControl, InputLabel, Select, MenuItem, TableContainer, Table, TableBody, TableRow, TableCell, Paper, IconButton, TableHead } from '@mui/material';
import { VizContext } from '../../reducer/VizContextProvider';
import { KeyboardArrowDown, KeyboardArrowRight, KeyboardArrowUp } from '@mui/icons-material';
import { DatasetChip, CloseIcon } from './styles';
import { actionTypes } from '../../reducer/reducer';


const SelectedDatasetDisplay = (props) => {
    const [state, dispatch] = useContext(VizContext);
    const [selectedDatasets, setSelectedDatasets] = useState(state.datasets.filter(d => state.selectedDatasets.includes(d.name)));

    useEffect(() => {
        setSelectedDatasets(state.datasets.filter(d => state.selectedDatasets.includes(d.name)));
    }, [state]);

    const removeDataset = (dat) => {
        dispatch({
            type: actionTypes.removeSelection,
            value: dat.name
        })
    }
    return <>
        <Stack direction={'row'} alignItems={'center'} sx={{marginBottom: '10px'}}>
            <Typography sx={{fontSize: '18px'}}>Selected Datasets:</Typography>
            {selectedDatasets.map((d) => {
                return <DatasetChip key = {d.name}>
                           <Stack direction="row" alignItems="center">
                               <CloseIcon onClick = {() => {removeDataset(d)}} fontSize='small' />
                               <Typography>{d.name}</Typography>
                           </Stack>
                       </DatasetChip>
            })}
        </Stack>
    </>
}

export default SelectedDatasetDisplay;