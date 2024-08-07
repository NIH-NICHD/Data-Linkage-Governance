import React, {  } from 'react';
import { Stack, Link, TableRow } from '@mui/material';
import { humanizeConstraint, getPolicyLabel, actionDict } from '../../util/util';
import { CustomTableCell, AdjustableTypography } from './styles';
import { SubdirectoryArrowRight } from '@mui/icons-material';

import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
// rendering component for the header of each action body 
// accepts two props, the ruleDict which is a data structure 
// containing the datasets and their list of rules, and the action
// the action takes the form of an object with the following fields:
//   name: the name of the action
//   label: a human readable version of the action name
//   icon: a representative icon component for the action

const RowBody = ({ action, selectedDatasets, ruleDict, setModalContent }) => {
    const renderPolicies = () => {
        const renderElements = [];
        const constraintDict = {}; // organizes the constraints to top level, with an object that has the datasets and the policy affecting it
        const prohibitedConstraintDict = {};
        const permissionDict = {};
        const prohibitionHeaderDict = {};
        const otherActionsDictDict = {}; // a dictionary of dictionaries for all the other actions
        const addToDict = (dict, rule, constraint, dataset) => {
            if(!dict[constraint]) {
                dict[constraint] = {}
            }
            if(!dict[constraint][dataset.name]) {
                dict[constraint][dataset.name] = [];
            }
            dict[constraint][dataset.name].push({policy: rule.parent, rule: rule.rule})
        }
        const massageData = (dictionary, rule, dataset) => {
            for (const constraint of rule.rule.constraints) {
                const humanizedConstraint = humanizeConstraint(constraint);
                // progressively build a new entry for the constraint
                addToDict(dictionary, rule, humanizedConstraint, dataset);
            }
        }
        for (const dataset of selectedDatasets) {
            if (ruleDict[dataset.name]) {
                if (ruleDict[dataset.name][action.name].length === 0) {
                    // empty, auth gap
                } else {
                    for (const rule of ruleDict[dataset.name][action.name]) {
                        if(rule.rule.action === 'collect') {
                            continue;
                        }
                        let prohibDict = prohibitedConstraintDict;
                        let conDict = constraintDict;
                        let headerDict = permissionDict;
                        let prohibHeaderDict = prohibitionHeaderDict
                        let actionName = action.label;
                        if(action.name === 'other') {
                            if(!otherActionsDictDict[rule.rule.action]){
                                otherActionsDictDict[rule.rule.action] = {
                                    prohibDict: {},
                                    prohibHeaderDict: {},
                                    constraintDict: {},
                                    headerDict: {},
                                };
                            }
                            // set the dicts to the current "other" actions dictionaries 
                            prohibDict = otherActionsDictDict[rule.rule.action].prohibDict;
                            prohibHeaderDict = otherActionsDictDict[rule.rule.action].prohibHeaderDict;
                            conDict =  otherActionsDictDict[rule.rule.action].constraintDict;
                            headerDict =  otherActionsDictDict[rule.rule.action].headerDict;
                            actionName = actionDict[rule.rule.action]?.noun || rule.rule.action;
                        }
                        if (rule.isProhibition) {
                            actionName = actionDict[rule.rule.action]?.noun || rule.rule.action;
                            massageData(prohibDict, rule, dataset)
                            addToDict(prohibHeaderDict, rule, `Policies prohibiting ${actionName.toLowerCase()}`, dataset);
                        } else if (rule.hasConstraints > 0) {
                            massageData(conDict, rule, dataset);
                            addToDict(headerDict, rule, `Policies permitting ${actionName.toLowerCase()}`, dataset);
                        } else {
                            addToDict(headerDict, rule, `Policies permitting ${actionName.toLowerCase()}`, dataset);
                        }
                    }
                }
            }
        }
        const createPolicyCells = (conDictionary, isHeader, isProhib) => {
            for (const constraint in conDictionary) {
                const constraintInfo = conDictionary[constraint];
                const borderSx = {};
                let labelCell = <></>
                if(isProhib && isHeader) {
                    borderSx.borderTop = '2px dotted #dcdcff'
                }
                if(isHeader) {
                    if(isProhib) {
                        labelCell = <CustomTableCell sx={{paddingLeft: 0, borderTop: '2px dotted #dcdcff'}} colSpan={2}>
                        <Stack alignItems={"center"} direction = 'row'>
                            <AdjustableTypography fontWeight={800} color={'#dd1c1c'} sx={{marginRight: '10px'}}>{constraint}</AdjustableTypography>
                            <DoNotDisturbIcon sx={{color: '#dd1c1c' }} />
                            </Stack>
                        </CustomTableCell>
                    } else {
                        labelCell = <CustomTableCell sx={{paddingLeft: 0}} colSpan={2}>
                        <AdjustableTypography fontWeight={800}>{constraint}</AdjustableTypography>
                    </CustomTableCell>
                    }
                } else {
                    labelCell = <CustomTableCell sx={{paddingLeft: 0}} colSpan={2}>
                    <Stack direction = 'row'>
                        <SubdirectoryArrowRight sx={{color: 'gray'}} />
                        <AdjustableTypography>{constraint}</AdjustableTypography>
                    </Stack>
                </CustomTableCell>
                }
                const constraintRow = 
                <TableRow key = {`${constraint}_${action.label}_body`}>
                    <CustomTableCell sx ={borderSx}>
                        {/* this takes up space so that the text appears below the header */}
                    </CustomTableCell>
                    {labelCell}
                    {selectedDatasets.map((dat) => {
                        // iterate through datasets and create a cell for each. Populate the cell with all rules/policies associated with this constraint
                        const datasetInfo = constraintInfo[dat.name];
                        let cellBody = [];
                        const counts = {};
                        if(datasetInfo) {
                            // not undefined
                            datasetInfo.forEach((rulePolicy) => {
                                if(counts[rulePolicy.policy.type]){
                                    counts[rulePolicy.policy.type].push(rulePolicy);
                                } else {
                                    counts[rulePolicy.policy.type] = [rulePolicy];
                                }
                            });

                            for(const rP in counts) {
                                const comma = rP !== Object.keys(counts).at(-1);
                                cellBody.push(
                                    <AdjustableTypography key ={`${constraint}_${action.label}_${rP}_${dat.name}_cell`}>
                                        <Link sx={{ cursor: 'pointer', marginLeft: '4px' }}
                                              onClick={() => setModalContent(counts[rP])}>
                                            {getPolicyLabel(rP)}{counts[rP].length > 1 ? ` (${counts[rP].length})` : ''}
                                        </Link>
                                        {comma && ','}
                                    </AdjustableTypography>
                                );
                            }
                        }
                        return (
                            <CustomTableCell key = {`${constraint}_${action.label}_${dat.name}_cell`} sx={borderSx}>
                                <Stack direction = {'row'} justifyContent={'flex-start'} flexWrap={'wrap'}>
                                    {cellBody}
                                </Stack>
                            </CustomTableCell>
                        );
                    })}
    
                </TableRow>
                renderElements.push(constraintRow);
            }
        }
        // build body
        // we build the headers the same way we build the constraint rows, despite the difference in the label cell
        // we also build the prohibition header slightly differently
        createPolicyCells(permissionDict, true);
        createPolicyCells(constraintDict);
        createPolicyCells(prohibitionHeaderDict, true, true);
        createPolicyCells(prohibitedConstraintDict, false, true);
        for(const act in otherActionsDictDict) {
            createPolicyCells(otherActionsDictDict[act].headerDict, true);
            createPolicyCells(otherActionsDictDict[act].constraintDict);
            createPolicyCells(otherActionsDictDict[act].prohibHeaderDict, true, true);
            createPolicyCells(otherActionsDictDict[act].prohibDict, false, true);
        }
        if(renderElements.length === 0){
            // row is empty
            const emptyRow = <TableRow key = {`${action.label}_emptyRow`}>
                <CustomTableCell>
                    {/* this takes up space so that the header text appears below the top level header */}
                </CustomTableCell>
                <CustomTableCell>
                    <AdjustableTypography fontStyle={'italic'}>
                        No Available Rules
                    </AdjustableTypography>
                </CustomTableCell>

            </TableRow>
            renderElements.push(emptyRow);
        }
        return renderElements;
    }

    return <>
        {renderPolicies()}
    </>
}

export default RowBody;