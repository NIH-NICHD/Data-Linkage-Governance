import React, { useContext, useState } from 'react';
import { Stack, Typography, List, styled, ListItem, Link, FormControl, InputLabel, Select, MenuItem, TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { VizContext } from '../../reducer/VizContextProvider';
import { getActionStepsLookup, actionPartyTypes, actionDict, humanizeDuty } from '../../util/util';
import SelectedDatasetDisplay from '../Common/SelectedDatasetDisplay';
import { DatasetChipSmall } from './styles';
import RuleModal from '../RuleModal/RuleModal';
const CustomListItem = styled(ListItem)(({ theme }) => ({
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
}));

// Our sorting algorithm for displaying constraints
const itemSort = (a, b) => {
    if ((actionDict[a.duty.action]?.verb || a.duty.action) < (actionDict[b.duty.action]?.verb || b.duty.action)) {
        return -1;
    } else if ((actionDict[a.duty.action]?.verb || a.duty.action) > (actionDict[b.duty.action]?.verb || b.duty.action)) {
        return 1;
    } else {
        return a.policy.name < b.policy.name ? -1 : 1;
    }
}
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const BulletedList = ({ items, pillType, setModalContent }) => {
    return (
        <List sx={{ listStyleType: 'disc', pl: 2, fontStyle: 'italic', marginLeft: '30px', paddingTop: '10px', paddingBottom: 0, fontSize: '1rem' }}>
            {items.sort(itemSort).map((item, index) => {
                if (pillType === 'required') {
                    return (
                        <CustomListItem key={index} disableGutters sx={{ display: 'list-item', pl: 0 }}>
                            <Link sx={{ cursor: 'pointer' }} onClick={() => setModalContent(item)}>
                                {capitalizeFirstLetter(humanizeDuty(item))}
                            </Link>
                        </ CustomListItem>
                    )
                } else {
                    let language;
                    if (actionDict[item.rule.action]) {
                        language = actionDict[item.rule.action].verb;
                        if (pillType === 'prohibited') {
                            language = actionDict[item.rule.action].noun;
                        }
                    } else {
                        language = item.rule.action;
                    }

                    return <CustomListItem key={index} disableGutters sx={{ display: 'list-item', pl: 0 }}>{capitalizeFirstLetter(language)}</ CustomListItem>
                }
            })}
        </List>
    );
};

const LinkageSteps = (props) => {
    const [state, dispatch] = useContext(VizContext);
    const [selectedParty, setSelectedParty] = useState(actionPartyTypes.find((e) => e.name === 'DataRequester'));
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const selectedDatasets = state.datasets.filter(d => state.selectedDatasets.includes(d.name));
    const ruleDict = getActionStepsLookup(selectedDatasets);

    const handleChange = (event) => {
        setSelectedParty(event.target.value);
    };

    const renderPill = (pillType, isEveryone, inParty) => {
        if (inParty) {
            let selection = inParty;
            let verb = 'is';
            let preposition = 'to';
            if (isEveryone) {
                selection = { name: 'everyone', label: 'All parties' };
                verb = 'are';
            }
            if (pillType === 'prohibited') {
                preposition = 'from';
            }

            const required = [];
            let hasSomething = false;
            for (const dataset of selectedDatasets) {
                const linkageByParty = ruleDict[dataset.name][selection.name];
                if (linkageByParty[pillType].length > 0) {
                    const element = <><Stack><DatasetChipSmall>{dataset.name}</DatasetChipSmall><BulletedList items={linkageByParty[pillType]} pillType={pillType} setModalContent={setModalContent} /></Stack></>
                    required.push(element);
                    hasSomething = true;
                } else {
                    const element = <><Stack><DatasetChipSmall>{dataset.name}</DatasetChipSmall><Typography style={{ marginLeft: '30px', paddingTop: '10px', paddingBottom: '10px' }}><em>No actions</em></Typography></Stack></>;
                    required.push(element);
                }
            }

            const returnValue = (<React.Fragment key={`${selection.label}_${verb}_${pillType}_${preposition}`}>
                <Stack>
                    {
                        required.length > 0 ?
                            <React.Fragment>
                                <Typography>
                                    <span style={{ fontWeight: 'bold' }}>{selection.label} {verb} {pillType} {preposition}:</span>
                                </Typography>
                                {required}
                            </React.Fragment> :
                            <>
                                <Typography>
                                    <em>{selection.label} has no {pillType} actions</em>
                                </Typography>
                            </>
                    }

                </Stack>
            </React.Fragment>);
            if (isEveryone) {
                const otherParties = actionPartyTypes.filter((party) => {
                    return party.name !== selectedParty.name;
                });
                const allValues = otherParties.map((party) => {
                    return renderPill(pillType, false, party); // recursion of a sort
                });
                const concat = [returnValue, ...allValues]; // concat the original allParties value with the rest of the parties values.
                return (
                <TableCell component="td" scope="row" sx={{borderBottom: 0, padding: 0}}>
                    <Stack spacing={"10px"} sx={{height: '100%'}}>

                        {concat.map((pill) => {
                            if(pill) {
                                return <Stack sx={{ border: '1px solid black', padding: '16px', borderRadius: '16px', verticalAlign: 'top', flexGrow: 1 }}>
                                {pill}
                                </Stack>
                            }
                        })}
                    </Stack>
                </TableCell>)
            }
            if (!hasSomething && !isEveryone && selectedParty.name !== inParty) {
                // if this is not our selected party, not the all parties, and there are no actions, don't display anything
                return ''
            } else {
                return returnValue;
            }
        }
    }
    const renderBody = () => {
        return (
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table sx={{ borderCollapse: 'separate', borderSpacing: '10px', height: 'fit-content' }}>
                    <TableBody>
                        {selectedParty ? <TableRow>
                            <TableCell component = "th"><Typography sx={{fontSize: '24px'}}><b>Action Steps for {selectedParty.label}</b></Typography></TableCell>
                            <TableCell component = "th"><Typography sx={{fontSize: '24px'}}><b>Action Steps for All Other Parties</b></Typography></TableCell>
                        </TableRow> : ''}
                        {/* required */}
                        <TableRow>
                            <TableCell component="td" scope="row" sx={{ border: '1px solid black', padding: '16px', borderRadius: '16px', verticalAlign: 'top' }}>

                                {renderPill('required', false, selectedParty)}
                            </TableCell>

                            {renderPill('required', true, selectedParty)}


                        </TableRow>
                        { /* TODO: Show permitted and prohibited once humanization is complete
                        <TableRow>
                            {renderPill('permitted', false)}
                            {renderPill('permitted', true)}
                        </TableRow>
                        <TableRow>
                            {renderPill('prohibited', false)}
                            {renderPill('prohibited', true)}
                        </TableRow>
                        */ }

                        {selectedParty ?
                            <TableRow>
                                { /* TODO: Show rules for other parties once complete
                            <TableCell colSpan={2} component="td" scope="row" sx={{ border: '1px solid black', padding: '16px', borderRadius: '16px' }} onClick={() => setOpen(!open)}>
                                <Stack direction={'row'} alignItems={'center'}>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                    >
                                        {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                                    </IconButton>
                                    <Typography><span style={{ fontWeight: 'bold' }}>Rules for all other parties</span></Typography>
                                </Stack>
                            </TableCell>
                          */ }
                            </TableRow>
                            :
                            <TableRow>
                                <TableCell><Typography><b>Select a party to get started</b></Typography></TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    return <>
        <RuleModal content={modalContent} onClose={() => setModalContent(null)} />
        <Stack sx={{ mt: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                View Action Steps
            </Typography>
            <Typography gutterBottom variant="subtitle1" sx={{mb: 4, fontSize: '18px'}}>
                Select a party (individual or organization) from the drop-down menu to see the actions required to link datasets for research. Parties are named using general terms for entities that are involved in data linkage for research. Parties are defined in the glossary.
                The left column presents required actions for the selected party. The right column presents required actions for all other parties. Click on any of the actions to see the policy origin and raw language.
            </Typography>
            <SelectedDatasetDisplay />

            <Stack direction={'row'} alignItems={'center'} justifyItems={'center'}>
                <Typography variant={'h6'}>See action steps assigned to:</Typography>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 240, height: '60px' }}>
                    <InputLabel>Role</InputLabel>
                    <Select
                        labelId="role-label"
                        value={selectedParty}
                        onChange={handleChange}
                        label="Party"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            actionPartyTypes.map((party) => {
                                if (party.selectable) {
                                    return (<MenuItem key={party.name} value={party}>
                                        {party.label}
                                    </MenuItem>)
                                }
                            })
                        }
                    </Select>
                </FormControl>
            </Stack>
            {renderBody()}
        </Stack>
    </>
}

export default LinkageSteps;