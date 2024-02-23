# Data Linkage Governance Metadata Project

## Introduction

The National Institutes of Health (NIH), a part of the U.S. Department of Health and Human Services (HHS), is the nation’s primary medical research agency, making important discoveries that improve health and saves lives. The NIH is now one of the world’s foremost biomedical research agencies and serves as the focal point for biomedical research within the Federal Government. NIH began in 1887, and today, is comprised of 27 separate Institutes and Centers (ICs), most of which are located in Bethesda, Maryland. The NIH works toward their mission to seek fundamental knowledge about the nature and behavior of living systems and the application of that knowledge to enhance health, lengthen life, and reduce illness and disability by 1) conducting research in its own laboratories; 2) supporting non-Federal scientists at universities, teaching hospitals, and other academic institutions around the world; 3) sponsoring training programs for research investigators; and 4) fostering the communication of research-based health information.

The Eunice Kennedy Shriver National Institute of Child Health and Human Development (NICHD) Office of Data Science and Sharing (ODSS) is leading an effort to assess the usage of privacy preserving record linkage (PPRL) for pediatric patient-centered outcomes research, with a focus on pediatric Coronavirus disease 2019 (COVID-19) research with support from NIH ODSS and HHS Patient-Centered Outcomes Research Trust Fund (PCORTF). PPRL holds significant promise for enhancing the value of de novo clinical research data collection, through linkages across different studies and linkages with HHS administrative and survey datasets.

Individual-level dataset linkages could enable researchers to deduplicate subjects across studies, introduce new variables into analysis plans, and reduce costly redundancies in the generation of genomic sequencing data. In order for individual-level datasets to be linked using PPRL or any other linkage method, however, researchers and data stewards must ensure that the linkages are appropriate, based on factors such as if or how the data were consented for use by the research participant, whether the scope of linkage encompasses other data sources, and if there are regulatory and/or legal frameworks that apply to the use of the data. It is important to understand how the resulting linked dataset inherits rules and controls that are associated with the original datasets that contribute to the linkage and if new limitations arise, for example to address increased identifiability of linked datasets.

NICHD ODSS is developing a robust metadata schema for data governance information relevant to linking individual-level participant data and sharing and using linked datasets. This effort aligns with NICHD ODSS’s larger goal of developing a governance and technology strategy for implementing individual-level record linkage for pediatric research, driven by pediatric COVID-19 research use cases. The NICHD ODSS-developed data governance metadata schema will contribute to NIH-wide strategic goals and activities on Controlled Data Access Coordination (CDAC). To serve NIH-wide priorities, NICHD ODSS will develop a prototype data governance metadata search and visualization tool and underlying database that will inform researchers how datasets of interest can be linked and used. The overall goal is to provide researchers and other stakeholders with high-quality information they can use to determine whether certain datasets can be linked, and if they can be, what rules and controls apply to the linked dataset.

In order to develop a robust data governance metadata infrastructure, unstructured text, often stored in a narrative format within policy documents, data use agreements, and consent forms must be annotated with structured data through the application of a governance metadata schema. Standards, including ontologies, terminologies, vocabularies, schemas, and common data models, are the tools and methods to organize, codify, value, and annotate unstructured governance information into structured governance data that may be extensible and machine-readable. Future efforts may enrich the governance metadata schema with a rules engine and automation tools that calls upon the structured values within the metadata schema.

## Project Materials

This project is developing materials exploring approaches to help researchers and data stewards ensure that dataset linkages are appropriate:

* A [metadata schema](MetadataSchema) for data governance information relevant to linking individual-level participant data and sharing and using linked datasets.

* A [landscape analysis](LandscapeAnalysis.md) that identifies existing governance-relevant standards that could be used in a data governance metadata schema.

* A prototype data governance metadata collection tool to enable researchers to enter, store, and communicate consent, policy, regulatory, and other governance information as participant-level and dataset-level metadata through the life of a research project in a standard format.

* A governance database for multiple NIH and HHS clinical and administrative datasets, providing structure and provenance for all dataset governance information regarding linkage and use of those data.

* A prototype data governance metadata search and visualization tool and underlying database that will inform researchers how datasets of interest can be linked and used.

## License

Copyright 2023, 2024 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Contact Information

For questions or comments about this project, please send email to

    <email-address>
