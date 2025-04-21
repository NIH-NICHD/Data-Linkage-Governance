import React, { useContext, useEffect, useState } from 'react';
import { Stack, Typography, Table, TableBody, TableContainer } from '@mui/material';
import { SubdirectoryArrowRight } from '@mui/icons-material';
import { VizContext } from '../../reducer/VizContextProvider';
import { datasetActionTypes, getDatasetPolicyActionLookup } from '../../util/util';
import SelectedDatasetDisplay from '../Common/SelectedDatasetDisplay';
import HeaderRow from './HeaderRow';
import RowBody from './RowBody';
import RuleModal from '../RuleModal/RuleModal';


const DatasetLinkage = (props) => {
    const [state, dispatch] = useContext(VizContext);
    const [selectedDatasets, setSelectedDatasets] = useState(state.datasets.filter(d => state.selectedDatasets.includes(d.name)));
    const [ruleDict, setRuleDict] = useState({});
    const [modalContent, setModalContent] = useState(null);

    // this update should occur automatically without the hook
    // TODO - sync the state by having the components that use selectedDatasets just read it out of the state directly
    useEffect(() => {
        setSelectedDatasets(state.datasets.filter(d => state.selectedDatasets.includes(d.name)));
    }, [state]);

    useEffect(() => {
        setRuleDict(getDatasetPolicyActionLookup(selectedDatasets));
    }, [selectedDatasets]);
    return <>
    <RuleModal content={modalContent} onClose={() => setModalContent(null)} />
    <Stack alignItems={'flex-start'} padding="20px">
        <Typography variant="h3" gutterBottom sx={{fontWeight: 'bold', fontSize: '2rem'}}>
            Assess Linkage Feasibility
        </Typography>
        <Typography gutterBottom variant="subtitle1" sx={{mb: 4, fontSize: '18px', marginBottom: '8px'}}>
            To determine if selected datasets can be linked, review permissions and prohibitions for  dataset linkage, sharing, access, and use.
            This prototype does not provide a determination of linkage. Rather, the left-hand column presents the permissions, prohibitions, and required conditions <SubdirectoryArrowRight fontSize="small" sx={{ color: 'gray' }}/> that must be met for each action (linkage, sharing, access, and use).
        
            The center matrix displays the policies that provide those permissions or prohibitions.
            There may be zero, one, or multiple policies that address each action.
            A blank means that no policies were identified with permissions and prohibitions for that action.
            Click on policies to display raw policy language that was extracted from a governance information source.
        </Typography>
        <SelectedDatasetDisplay />
    
        <TableContainer sx={{ boxShadow: 'none', marginTop: '1em' }}>
            <Table sx={{ borderCollapse: 'collapse', borderSpacing: '10px', fontSize: '20px' }}>
                <TableBody>
                    {datasetActionTypes.map((aType) => {
                        return (
                        <>
                            <HeaderRow key={`${aType.label}_header`} selectedDatasets={selectedDatasets} action={aType} />
                            <RowBody key={`${aType.label}_label`}
                                     selectedDatasets={selectedDatasets}
                                     action={aType}
                                     ruleDict={ruleDict}
                                     setModalContent={setModalContent} />
                        </>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </Stack>

    </>
}

export default DatasetLinkage;