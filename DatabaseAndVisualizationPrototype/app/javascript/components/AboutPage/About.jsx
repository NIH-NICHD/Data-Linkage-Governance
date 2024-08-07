import React from 'react';
import { Grid, Stack, Button, Typography, Box } from '@mui/material';

import { AboutArea, AboutBox } from './styles';
import FlowChart from './FlowChart';
const About = () => { 
    return (
        <AboutArea container>
            <AboutBox item>
                <Stack>
                    <h1>About the Governance Metadata Visualization Prototype</h1>

                    <Typography variant="p" sx={{color: 'black', fontSize: '18px', mb: 2}}>
                        This visualization prototype presents governance information to streamline decision making regarding whether and how to appropriately pursue dataset linkage for research.
                    </Typography>

                    <Typography variant="p" sx={{color: 'black', fontSize: '18px', mb: 2}}>
                        The prototype allows researchers to:  
                    </Typography>
                    <FlowChart />

                    <Typography variant="p" sx={{color: 'black', fontSize: '18px', mb: 2}}>
                        Real world governance information from 11 datasets is featured in this prototype. The overall goal is to provide researchers and other stakeholders with high-quality information they can use to determine whether certain datasets can be linked, and if they can be, what rules and controls apply to the linked dataset.
                    </Typography>

                    <h2>User Story</h2>

                    <Typography variant="p" sx={{color: 'black', fontSize: '18px'}}>
                        This prototype was guided by several researcher user stories such as:
                    </Typography>
                    <Box sx={{ border: '1px solid black', padding: 2, margin: 2 }}>
                        <Typography variant="p" component="p" sx={{color: 'black', fontSize: '18px', mb: 2}}>
                            As a researcher, I want to access, link, share, and use data from multiple research and administrative data sources like NHANES, NSDUH, MTF, and AFCARS to study the effects of COVID-19 on mental health and determine whether related outcomes are more severe for children in foster care.
                        </Typography>
                        <Typography variant="p" component="p" sx={{color: 'black', fontSize: '18px', mb: 2}}>
                            Each dataset is subject to different rules often stored as unstructured narrative text within policy documents, data use agreements, consent forms, laws, and other sources of governance information. It is difficult to extract this information and understand how these rules intersect.
                        </Typography>
                        <Typography variant="p" component="p" sx={{color: 'black', fontSize: '18px' }}>
                            My goal is to understand whether certain datasets can be linked, and if so, what rules and controls apply to the resulting linked dataset so I can appropriately share and use the linked data to study pediatric COVID.
                        </Typography>
                    </Box>

                    <h2>Background and Related Work</h2>

                    <Typography variant="p" sx={{color: 'black', fontSize: '18px', mb: 2}}>
                        The Office of Data Science and Sharing (ODSS), Eunice Kennedy Shriver National Institute of Child Health and Human Development (NICHD), National Institutes of Health is leading an effort to support responsible linkage in research, specifically the use of privacy preserving record linkage (PPRL) for pediatric patient-centered outcomes research. PPRL holds significant promise for enhancing the value of health research through linkages across different studies and linkages with HHS administrative and survey datasets. Individual-level dataset linkages could enable researchers to deduplicate subjects across studies, introduce new variables into analysis plans, and reduce costly redundancies in the generation of genomic sequencing data.
                    </Typography>
                    <Typography variant="p" sx={{color: 'black', fontSize: '18px', mb: 2}}>
                        In order for individual-level datasets to be linked, however, researchers and data stewards must ensure that the linkages are appropriate, based on factors such as if or how the data were consented for use by the research participant, whether the scope of linkage encompasses other data sources, and if there are regulatory and/or legal frameworks that apply to the use of the data. It is important to understand how the resulting linked dataset inherits rules and controls that are associated with the original datasets that contribute to the linkage and if new limitations arise; for example, to address increased identifiability of linked data.
                    </Typography>
                    <Typography variant="p" sx={{color: 'black', fontSize: '18px', mb: 2}}>
                        NICHD ODSS identified a need for a generalizable, scalable, and machine-readable data governance metadata schema to facilitate decision-making for patient-centered outcomes research dataset linkages and the subsequent research use of linked datasets. A metadata schema is a structured set of metadata elements and attributes, together with their associated semantics, that are designed to support a specific set of user tasks and types of resources in a particular domain. A metadata schema formally defines the structure of a database at the conceptual, logical, and physical levels.
                    </Typography>
                    <Typography variant="p" sx={{color: 'black', fontSize: '18px', mb: 2}}>
                        To provide a foundation for the creation of such a schema, NICHD ODSS assessed data governance information for 11 HHS and other federally funded datasets identified for three theoretical pediatric COVID-19 research use cases. Findings from that effort are described in the <a href="https://www.nichd.nih.gov/sites/default/files/inline-files/PCORTF_Pediatric_Record_Linkage_Governance_Assessment_Formatted120423.pdf" target="_blank">2023 Governance Assessment Report</a> and the governance information collected is the source of governance information displayed in this prototype.
                    </Typography>
                    <Typography variant="p" sx={{color: 'black', fontSize: '18px', mb: 2}}>
                        NICHD ODSS then launched a project to develop a robust metadata schema for data governance information relevant to linking, accessing, sharing, and using a linked dataset. The resulting metadata schema aims to enable the development of tools to collect, standardize, and exchange information about data governance, including consent, policies, laws, and other rules. The <a href="https://github.com/NIH-NICHD/Data-Linkage-Governance/" target="_blank">governance metadata schema</a> was published in the Spring of 2024 and is intended for widespread adoption.
                    </Typography>
                    <h2>Contact Us</h2>

                    <Typography variant="p" sx={{color: 'black', fontSize: '18px', mb: 2}}>
                        For more information about this prototype please contact us at NICHDecosystem@nih.gov
                    </Typography>

                </Stack>
            </AboutBox>
        </AboutArea>

    )
}

export default About;