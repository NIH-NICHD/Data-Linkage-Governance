import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { ActionButton, BasicGrid, MainStack, AppTitleTypography, FactCheckIcon, TravelExploreIcon, DatasetLinkedIcon, SnowshoeingIcon, WelcomeBox, CenterBox } from './styles';
import { VizContext } from '../../reducer/VizContextProvider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const [state, dispatch] = useContext(VizContext);

    const navigate = useNavigate();

    return (
        <>
            <Grid container sx={{ marginBottom: '100px' }}>
                <BasicGrid item xs={12}>
                    <WelcomeBox>

                        <CenterBox sx={{ padding: '30px' }}>
                            <AppTitleTypography variant="h3">
                                Governance Metadata Visualization Prototype
                            </AppTitleTypography>
                            <Typography variant="h5" sx={{ color: 'white', fontSize: '18px' }}>
                                A resource to support data linkage decision making
                            </Typography>
                            <MainStack direction="row">
                                <Grid container direction="row" justifyContent="space-evenly" spacing={2} alignItems="center">
                                    <Grid item xs={3}><FactCheckIcon onClick={() => navigate('/select', { relative: 'path' })} sx={{cursor: 'pointer'}}/></Grid>
                                    <Grid item xs={3}><TravelExploreIcon /></Grid>
                                    <Grid item xs={3}><DatasetLinkedIcon /></Grid>
                                    <Grid item xs={3}><SnowshoeingIcon /></Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                                            Select datasets
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                                            Compare governance
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                                            Assess linkage feasibility
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                                            View action steps
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </MainStack>
                        </CenterBox>

                        <Typography variant="h5" sx={{ marginBottom: 1 }}><b>Welcome Researcher!</b></Typography>


                        <div style={{ fontSize: '18px' }}>
                            <p>
                                This visualization prototype displays governance information at the dataset level to support decision making about linking datasets for research. Governance or data governance comprises the policies, limitations, processes, and controls that address ethics, privacy protections, compliance, risk management, or other requirements for a given record linkage implementation across the data lifecycle.
                            </p>
                            <p>
                                Individual-level dataset linkages enable researchers to deduplicate subjects across studies, introduce new variables into analysis plans, and reduce costly redundancies in the generation of genomic sequencing data. By comparing governance information for one or multiple datasets, this prototype can help researchers determine if linking those datasets is possible and if so, what rules and controls apply to a resulting linked dataset. 
                            </p>
                            <p>
                            This prototype features real world governance information from 11 existing datasets, which was collected by the project team as part of a <a href="https://www.nichd.nih.gov/sites/default/files/inline-files/PCORTF_Pediatric_Record_Linkage_Governance_Assessment_Formatted120423.pdf" target="_blank">2023 Governance Assessment Report</a>. Governance information has been encoded using the project's <a href="https://www.github.com/NIH-NICHD/Data-Linkage-Governance/" target="_blank">governance metadata schema</a>.  The governance information is then visually organized by four data lifecycle phases: dataset linkage, sharing, access, and use.
                            </p>
                            <p>This prototype is designed to complement existing dataset search tools and is not a search tool for de novo dataset discovery.</p>
                        </div>


                        <ActionButton variant="contained" direction="row" active={true} disabled={false} onClick={() => navigate('/select', { relative: 'path' })}>
                            Get Started by Selecting Datasets
                            <ArrowForwardIcon sx={{ marginLeft: '10px' }} />
                        </ActionButton>

                    </WelcomeBox>
                </BasicGrid>
            </Grid>
        </>
    )
}

export default LandingPage;