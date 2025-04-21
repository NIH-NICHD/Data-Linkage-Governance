import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { VizContext } from '../../reducer/VizContextProvider';
import { getActionIcon, getDatasetPolicyTypeLookup, getDatasetPolicyTypes, humanizeConstraint, humanizeRule, palette } from '../../util/util';
import { Grid, Stack, Link, Tooltip, styled } from '@mui/material';
import { DatasetMarker, InfoIcon, MiniMarker, PolicyTile, ThickBorderTableCell } from './styles';
import ExpandButton from '../Buttons/ExpandButton';
import RuleModal from '../RuleModal/RuleModal';
import SelectedDatasetDisplay from '../Common/SelectedDatasetDisplay';
import { BulletedList } from '../Common/BulletedList';
import { actionTypes } from '../../reducer/reducer';

const firstColumnStyle = { width: '15px', paddingRight: '0px' };
const secondColumnStyle = { width: '150px', whiteSpace: 'nowrap', paddingLeft: '8px' }; // for policy
const tableOddNumberColor = "#f2f2f2";
// using box shadow as a border since the actual border interacts poorly with the 'sticky' property
const stickyStyle = {
  '@media screen': {
    position: 'sticky', 
    zIndex: 2, 
    boxShadow: 'inset 0 1px 0 rgb(224,224,224,1), inset 0 0 0 rgb(224,224,224,1)'
  },
  '@media print': {
    boxShadow: 'inset 0 1px 0 rgb(224,224,224,1), inset 0 0 0 rgb(224,224,224,1)'
  }
}
const CustomTableCell = styled(TableCell)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  borderBottom: '1px solid rgba(150, 150, 150, 1)'

}));

function Row(props) {
  const { row, policyDict, selectedDatasets, expanded, setModalContent, dispatch } = props;
  const [open, setOpen] = React.useState(false);
  const renderPolicyPill = (listOfPolicies) => {
    return <Stack spacing={(open || expanded) ? 2 : 0} direction={(open || expanded) ? 'column' : 'row'} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'}>
      {listOfPolicies.map((pol) => {
        return (
          <Tooltip key = {pol.policy.name} title={!(open || expanded) ? pol.policy.name : ''}>
            {(open || expanded) ? renderPolicyContent(pol, setModalContent) : <DatasetMarker
              visible
              hasProhibition={pol.prohibitions.length > 0}
              hasPermissionContraint={pol.hasPermissionContraint}
              fillcolor={palette[row.name]}
            >
            </DatasetMarker>}
          </Tooltip>
        )
      })}
    </Stack>
  }
  const renderPolicyContent = (policy, setModalContent) => {
    return <PolicyTile
      hasProhibition={policy.prohibitions.length > 0}
      hasPermissionContraint={policy.hasPermissionContraint}
      borderc={palette[row.name]}>
      <Grid container>
        <Grid item xs={12} sx={{ fontWeight: 'bold' }}>
          {policy.policy.name}
        </Grid>
        {policy.policy.rules.map((rule) => {
          return (
            <Grid item xs={12} sx={{ textAlign: 'left' }}>
              <Link sx={{ cursor: 'pointer' }} onClick={() => setModalContent({ policy: policy.policy, rule: rule })}>
                <Stack justifyContent={'left'} direction={'row'} alignItems={'center'}>
                    <div style={{ marginRight: '10px' }}>{getActionIcon(rule.action)}</div>
                    {humanizeRule(rule)}
                    {rule.type === 'Prohibition' && <DoNotDisturbIcon sx={{color: '#dd1c1c' }} />}
                </Stack>
              </Link>
              <BulletedList items={rule.constraints} itemModifier={humanizeConstraint}></BulletedList>
            </Grid>);
        })}
      </Grid>
    </PolicyTile>
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <ThickBorderTableCell sx={firstColumnStyle} onClick={() => setOpen(!open)}>
          <IconButton
            aria-label="expand row"
            size="small"
          >
            {(open || expanded) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </ThickBorderTableCell>
        <ThickBorderTableCell component="th" scope="row" sx={secondColumnStyle} onClick={() => setOpen(!open)}>
          <Typography fontSize='1.2rem'>
            {row.label} <InfoIcon onClick={(event) => {
              event.stopPropagation();
              dispatch({
                type: actionTypes.updateGlossary,
                value: true,
                searchValue: row.label
              })
            }} />
          </Typography>
        </ThickBorderTableCell>
        {selectedDatasets.map((dataset, i) => {
          const backgroundColor = i % 2 === 0 ? tableOddNumberColor : '';
          return <ThickBorderTableCell key={`${dataset.name}_pill`} sx={{ backgroundColor }}>
            {renderPolicyPill(policyDict[dataset.name][row.name])}
          </ThickBorderTableCell>
        })}
      </TableRow>
    </React.Fragment>
  );
}

export default function DatasetGrid() {
  const [state, dispatch] = useContext(VizContext);
  const [expanded, setExpanded] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const selectedDatasets = state.datasets.filter(d => state.selectedDatasets.includes(d.name));
  const rowHeaders = getDatasetPolicyTypes(selectedDatasets); // a bit hacky, TODO: make the policy types have a name/label
  const policyDict = getDatasetPolicyTypeLookup(selectedDatasets);

  return (
    <>
    <RuleModal content={modalContent} onClose={() => setModalContent(null)} />
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold', fontSize: '24px'}}>
        Compare Governance Information
      </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{mb: 4, fontSize: '18px', marginBottom: '8px'}}>
                For the datasets selected, all governance
                policies <InfoIcon sx={{ ml: '-5px', mr: '5px', mb: '4px' }} onClick={(event) => {
                                       event.stopPropagation();
                                       dispatch({
                                           type: actionTypes.updateGlossary,
                                           value: true,
                                           searchValue: 'Policy'
                                       })
                                   }} />
                are displayed below, organized by policy type.
                Datasets are presented as columns and each <MiniMarker /> pill represents one governance policy for that dataset. View the distribution of <MiniMarker /> pills to visually assess the volume and diversity of policies. Hover over a <MiniMarker /> pill to see the name of the policy. Click on <KeyboardArrowDownIcon /> next to each policy type to expand the row and show the policy names and rules.
                Rules are permissions or prohibitions of a specified action. Policy types range from very defined (e.g., data use agreement) to broad (e.g., policy); broad policy types can include diverse policy content. A blank cell means that no policy content of that policy type was identified from that dataset. Click show all policy types at the bottom of the page to expand all rows and display all policy details.
            </Typography>
      <SelectedDatasetDisplay />

    <TableContainer component={Paper} sx={{overflowX: 'initial'}}>
      <Table aria-label="compare dataset policies" sx={{borderCollapse: 'separate'}}>
        <TableHead sx={{borderCollapse: 'separate'}}>
          <TableRow>
            {/* <TableCell colSpan={1} sx={firstColumnStyle}></TableCell> */}
            <CustomTableCell 
              align='center' 
              colSpan={2}
              sx={{ ...stickyStyle, top: '80px', backgroundColor: 'white'}}
            >
                <Typography variant={'h6'}>Policy Type</Typography></CustomTableCell>
            <ThickBorderTableCell 
              align="center" 
              colSpan={selectedDatasets.length}
              sx={{...stickyStyle, top: '80px', backgroundColor: 'white'}}>
                <Typography variant={'h6'}>Dataset Name</Typography>
              </ThickBorderTableCell>
          </TableRow>
          <TableRow>
            <ThickBorderTableCell colSpan={1} sx={{...firstColumnStyle, ...stickyStyle, top: '140px', backgroundColor: 'white'}} />
            <ThickBorderTableCell colSpan={1} sx={{...stickyStyle, top: '140px', backgroundColor: 'white'}}/>
            {selectedDatasets.map((d, i) => {
              const backgroundColor = i % 2 === 0 ? tableOddNumberColor : 'white';
              return <ThickBorderTableCell key={`${d.name}_header`} align={'center'} sx={{...stickyStyle, width: `${1000 / selectedDatasets.length}px`, backgroundColor: backgroundColor, top: '140px'}}><Typography variant={'h6'} fontSize={'1.2rem'}>{d.name}</Typography></ThickBorderTableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowHeaders.map((row) => (
            <Row 
              key={row.name} 
              row={row} 
              policyDict={policyDict} 
              selectedDatasets={selectedDatasets} 
              expanded={expanded} 
              setModalContent={setModalContent} 
              dispatch = {dispatch}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    <ExpandButton expand={!expanded} callback={() => { setExpanded(!expanded)}} />
    </>
  );
}
