import React, { useState } from 'react';
import { Modal, Box, Tabs, Tab } from '@mui/material';
import { humanizeConstraint, humanizeRule, humanizeFunctions, displaySource } from '../../util/util';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import CloseIcon from '@mui/icons-material/Close';

// Turn linefeeds from source material into paragraphs when displayed as HTML
const multiline = (text) => {
    return text.split("\n").map(t => <p>{t}</p>)
}

// Tabs for selecting which rule to display
const RuleSelector = ({ content, selectedRule, setSelectedRule }) => {
    const handleChange = (event, newValue) => {
        setSelectedRule(newValue);
    };
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={selectedRule} onChange={handleChange} aria-label='Policy selector'
                  // We allow tab wrapping so need a different method for underlining selected tab
                  TabIndicatorProps={{ sx: { display: 'none' } }}
                  sx={{
                      '& .MuiTabs-flexContainer': { flexWrap: 'wrap' },
                      '& .Mui-selected': { borderBottom: '2px solid #2e7992' }
                  }}>
                {content.map(({ policy, rule }) => <Tab key={policy.name} label={policy.name} />)}
            </Tabs>
        </Box>
    );
}

const RuleModal = ({ content, onClose }) => {

    // Current rule to display
    const [selectedRule, setSelectedRule] = useState(0);

    // When we close we want to set the selected rule back to 0
    const handleClose = () => {
        setSelectedRule(0);
        onClose();
    };

    if (content) {

        // Content can be a single policy/rule combo or more than one; if the latter we add tabs for navigation
        const { policy, rule, duty } = Array.isArray(content) ? content[selectedRule] : content;

        return (
            <Modal open={content !== null} onClose={handleClose} aria-labelledby={humanizeRule(rule)} aria-describedby={`The ${policy.name} provides ${humanizeRule(rule)}`}>
                <Box sx={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', paddingTop: '40px', bgcolor: 'grayscale.lightGray', border: '2px solid #000', boxShadow: 24 }}>
                    <CloseIcon fontSize='small' sx={{ position: 'absolute', top: '0px', margin: '10px', cursor: 'pointer' }} onClick={handleClose} />
                    {Array.isArray(content) && content.length > 1  &&
                     <RuleSelector content={content} selectedRule={selectedRule} setSelectedRule={setSelectedRule} />
                    }
                    <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', overflow: 'scroll', p: 4}}>
                        <h3>Policy: {policy.name}</h3>
                        <h4>This policy provides <b>{humanizeRule(rule).toLowerCase()}</b></h4>
                        <p>
                            {rule.constraints.map((constraint) => {
                                return (
                                    <div>
                                        <SubdirectoryArrowRightIcon fontSize='small' sx={{ color: 'gray' }} />
                                        {humanizeConstraint(constraint)}
                                    </div>
                                );
                            })}
                        </p>

                        {rule.functions.length > 0 &&
                         <>
                             <p>
                                 {rule.functions.length > 0 && humanizeFunctions(rule)}
                             </p>
                         </>
                        }

                        {rule.duties.length > 0 &&
                         <>
                             <h5>Duties</h5>
                             <ul>
                                 {rule.duties.map((list_duty) => {
                                     if (list_duty === duty) {
                                         return <li><mark><b>{humanizeRule(list_duty)}:</b> {humanizeFunctions(list_duty)}</mark></li>
                                     } else {
                                         return <li><b>{humanizeRule(list_duty)}:</b> {humanizeFunctions(list_duty)}</li>
                                     }
                                 })}
                             </ul>
                         </>
                        }

                        {rule.policy_commentaries.map((commentary) => {
                            return (
                                <>
                                    <h5>Policy Language</h5>
                                    {multiline(commentary.language)}
                                    <h5>Policy Interpretation</h5>
                                    {multiline(commentary.interpretation)}
                                    {commentary.sources.map((source) => {
                                        return <p><b>Source:</b> {displaySource(source)}</p>
                                    })}
                                </>
                            )
                        })}
                    </Box>
                </Box>
            </Modal>
        );
    }
}

export default RuleModal;
