# Data Linkage Governance Metadata Project

## Introduction

The National Institutes of Health (NIH), a part of the U.S. Department of Health and Human Services (HHS), is the nation’s primary medical research agency, making important discoveries that improve health and saves lives. To learn more about the NIH and its mission visit: https://www.nih.gov/about-nih/what-we-do/mission-goals. 

The _Eunice Kennedy Shriver_ National Institute of Child Health and Human Development (NICHD) is one of NIH’s 27 Institutes and Centers that leads research and training to understand human development, improve reproductive health, enhance the lives of children and adolescents, and optimize abilities for all.

The [NICHD Office of Data Science and Sharing (ODSS)](https://www.nichd.nih.gov/about/org/od/odss) is leading an effort to develop frameworks and tools to support responsible use of privacy preserving record linkage (PPRL) for patient-centered outcomes research with NICHD populations. This effort is supported by NIH ODSS and the HHS Office of the Secretary’s Patient-Centered Outcome Research Trust Fund (OS-PCORTF).

PPRL holds significant promise for enhancing the value of health research, by enabling individual-level linkages across different studies and linkages with HHS administrative and survey datasets. These dataset linkages could enable researchers to deduplicate participants across studies, introduce new variables to enrich analyses, and reduce costly redundancies in the generation of genomic sequencing data. However, for individual-level datasets to be linked using PPRL or any other linkage method, researchers and data stewards must ensure that the linkages are appropriate, based on factors such as if or how the data were consented for use by the research participant, whether the scope of linkage encompasses other data sources, and if there are regulatory and/or legal frameworks that apply to the use of the data. It is important to understand how the resulting linked dataset inherits rules and controls that are associated with the original datasets that contribute to the linkage and if new limitations arise, for example to address increased identifiability of linked datasets. One challenge is that these rules are often stored as unstructured text, for example in narrative format within policy documents, data use agreements, and consent forms; and therefore, would benefit from annotations of structured data through the application of a governance metadata schema.  

NICHD ODSS is developing and testing a robust metadata schema for data governance information relevant to linking individual-level participant data and sharing and using linked datasets. The metadata schema will enable the development of tools to collect, standardize, exchange, and visualize information about data governance, including consent and other rules. When governance metadata travels alongside the actual data collected from and about research participants, researchers and other stakeholders are more likely to adhere to these rules. The overall goal is to provide researchers and other stakeholders with high-quality information they can use to determine whether certain datasets can be linked, and if they can be, what rules and controls apply to the linked dataset. This effort aligns with NICHD ODSS’s larger goal of developing a governance and technology strategy for implementing individual-level record linkage for NICHD relevant research, the NIH Strategic Plan for Data Science as well as associated NIH-wide strategic goals and activities on Controlled Data Access Coordination (CDAC), and the HHS OS-PCORTF Strategic Plan.

While the schema and associated materials are ready for adoption, they are expected to evolve based on feedback from real-world implementation. Future efforts may expand upon this work by developing a rules engine and/or automation tools that call upon the structured values within the metadata schema.

This repository contains the key project resources created to develop and test the data governance metadata schema.

## Project Materials

These project materials and resources will help researchers and data stewards ensure that dataset linkages are appropriate:

* A metadata schema to annotate data governance information relevant to accessing, sharing, linking, and using individual-level participant data. For documentation, visit the [Data Governance Metadata Schema User Guide](MetadataSchema).

* A report of considerations for linking datasets in a federated data ecosystem based on findings from existing record linkage implementations. For the full report, visit [Privacy Preserving Record Linkage (PPRL) for Pediatric COVID-19 Studies](https://www.nichd.nih.gov/sites/default/files/inline-files/NICHD_ODSS_PPRL_for_Pediatric_COVID-19_Studies_Public_Final_Report_508.pdf).

* A landscape analysis that identifies existing governance-relevant standards that could be used in a data governance metadata schema. For the full report, visit the [Governance Metadata Standards: Landscape and Gap Analysis](https://www.nichd.nih.gov/sites/default/files/inline-files/Governance_Metadata_Standards_FINAL_revb.pdf).
  
* A governance assessment report that documents an analysis of data governance requirements for linking 11 high-priority HHS and other federally funded datasets, based on three theoretical pediatric COVID-19 research use cases. For the full report, visit [PCORTF Pediatric Record Linkage Governance Assessment Report](https://www.nichd.nih.gov/sites/default/files/inline-files/PCORTF_Pediatric_Record_Linkage_Governance_Assessment_Formatted120423.pdf).

* A governance data collection tool to enable researchers or other stakeholders to enter, store, and communicate dataset-level consent, policy, regulatory, and other governance information as metadata in a standard format to inform decisions about data linkages. For a report on tool development, visit [Development of a Governance Metadata Collection Tool](https://github.com/NIH-NICHD/Data-Linkage-Governance/tree/main/MetadataCollectionTool).

* A relational database and query tool that encodes and makes available governance metadata from the 11 high-priority HHS and other federally funded clinical and administrative datasets, providing a demonstration of how governance information may be annotated as metadata.

* A data governance visualization prototype that displays governance information at the dataset level to support decision making about linking datasets for research. For a report on prototype development, visit [Development of a Governance Metadata Visualization Prototype](https://www.nichd.nih.gov/sites/default/files/inline-files/NICHD_ODSS_Metadata_Viz_Prototype_Implementation_Report.pdf).


## Contact Information

Questions or comments about this project? Email them to:

    NICHDecosystem@nih.gov

## License

Copyright 2024 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

----

MITRE: Approved for Public Release / Case #24-0075

The contents of this repository were prepared by the MITRE Corporation under Contract No. 75N94023F00171 from the Office of Data Science and Sharing (ODSS), _Eunice Kennedy Shriver_ National Institute of Child Health and Human Development (NICHD), National Institutes of Health. The authors are solely responsible for the document’s contents, findings, and conclusions, which do not necessarily represent the views of NICHD ODSS. Readers should not interpret any statement in this product as an official position of NICHD ODSS or HHS.

Notice:

This technical data project was produced for the U. S. Government under Contract Number 75FCMC18D0047, and is subject to Federal Acquisition Regulation Clause 52.227-17, Rights in Data-General.

No other use other than that granted to the U. S. Government, or to those acting on behalf of the U. S. Government under that Clause is authorized without the express written permission of The MITRE Corporation.

For further information, please contact The MITRE Corporation, Contracts Management Office, 7515 Colshire Drive, McLean, VA  22102-7539, (703) 983-6000.

Copyright 2024 The MITRE Corporation.
