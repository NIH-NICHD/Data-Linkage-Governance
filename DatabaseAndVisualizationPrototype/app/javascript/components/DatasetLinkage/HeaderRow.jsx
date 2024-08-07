import React, {  } from 'react';
import { Stack, TableHead } from '@mui/material';
import { CustomTableCell, HeaderTableRow, AdjustableTypography } from './styles';

// stateless rendering component for the header of each action row 
// accepts two props, the selected datasets to display and the action
// the action takes the form of an object with the following fields:
//   name: the name of the action
//   label: a human readable version of the action name
//   icon: a representative icon component for the action
const HeaderRow = ({selectedDatasets, action}) => {

    return <React.Fragment key = {`${action.label}_headerRow`}>
            <HeaderTableRow backgroundcolor = {action.color}>
                <CustomTableCell component = "th" colSpan={1} sx={{width: '45px'}}>
                        <action.icon sx={{width: '40px', height: '40px'}}/>
                </CustomTableCell>
                <CustomTableCell component = "th" colSpan={2} sx={{paddingLeft: '0px', fontSize: '1.5rem'}}>
                        <AdjustableTypography sx={{fontWeight: '900'}}>{action.question}</AdjustableTypography>
                </CustomTableCell>
                {selectedDatasets.map((dat) => {
                    return (<CustomTableCell component = "th" key = {`${dat.name}_headerCell`}>
                        <Stack justifyContent={'left'} textAlign={'left'}>
                            <AdjustableTypography sx={{fontWeight: '800'}}>{dat.name}</AdjustableTypography>
                        </Stack>
                    </CustomTableCell>);
                })}
            </HeaderTableRow>
    </React.Fragment>
}

export default HeaderRow;