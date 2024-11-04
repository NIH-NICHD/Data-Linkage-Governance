# Governance Metadata Database, Query Tool, and Visualization Prototype

This repository includes an indexed governance relational database that encodes governance metadata
from 11 HHS clinical and administrative datasets collected from the
[NICHD ODSS Pediatric COVID PPRL Assessment](https://www.nichd.nih.gov/sites/default/files/inline-files/NICHD_ODSS_PPRL_for_Pediatric_COVID-19_Studies_Public_Final_Report_508.pdf)
and
[PCORTF Pediatric Record Linkage Governance Assessment](https://www.nichd.nih.gov/sites/default/files/inline-files/PCORTF_Pediatric_Record_Linkage_Governance_Assessment_Formatted120423.pdf)
reports. The database provides a demonstration of how governance information may be annotated as
metadata and supports prototype tools for querying and visualizing data governance metadata,
intended to inform researchers how datasets of interest can be linked and used. This portion of the
repository includes the following:

* **Data Model and Data Dictionary** – A [data model and data dictionary](data_dictionary.md) with a mermaid diagram showing the data model of the database along with a description of each field.
* **Database** – An instantiation of the data model as a relational database schema that can be loaded with governance metadata from 11 HHS clinical and administrative datasets.
* **Query Tool** – A demonstration of simple database querying capabilities allowing governance metadata for the 11 datasets to be viewed.
* **Visualization Prototype** – More advanced visualization capabilities intended to support linkage determination for the 11 datasets.

# Developer Notes

The database and query tool are built as a Ruby on Rails application. The database is defined using
standard Rails DB migrations and ActiveRecord relational models. Rake tasks support loading
annotated dataset governance information into the database.

The visualization prototype is built as a React application that is served by the Rails application
and is integrated with the Rails backend via a simple JSON API.

##  Dependencies

These capabilities require:

* Ruby 3.2.2
* PostgreSQL 15.6
* Rails 7.1.4

## Setup for development

After installing Ruby and PostgreSQL, and with a local copy of this repository, set up the
initial blank database using the following steps:

```
bundle install
rails db:create
rails db:migrate
```

The governance metadata for 11 datasets can be loaded by running the following rake tasks, first
clearing any existing data then loading new data:

```
bundle exec rails data:clear_all data:load
```

This rake task loads the governance metadata based on the annotated XLSX file in the datafiles
directory.

### Annotations

The annotated XLSX file in the datafiles directory contains annotations describing governance
metadata in column F of each dataset tab. Each annotation for a policy can contain the following
concepts:

* **policy:** The name of the policy being annotated, e.g., `NHANES Consent`
* **policy_type:** The type of the policy being annotated, e.g., `Determination`
* **action:** The action that this policy permits, e.g., `researchUse`; defaults to the data lifecycle for that section
* **prohibition:** The action that this policy prohibits, e.g., `reidentify`
* **obligation:** The action that this policy requires, e.g., `deidentify`
* **requires:** A list of one or more other policies that a policy requires, listed by name and separated by commas, e.g., `N3C Data Use Agreement`
* **assigner:** The party assigning the permission, e.g., `IRB`
* **assignee:** The party to whom the permission is assigned, e.g., `DataRequester`
* **contracting_party:** The contracting party, e.g., `GovernmentOrganization`
* **contracted_party:** The contracted party, e.g., `DataProvider`
* **approving_party:** The approving party, e.g., `DisclosureReviewBody`
* **approved_party:** The approved party, e.g., `DataProvider`
* **consenting_party:** The consenting party, e.g., `ReviewCommittee`
* **consented_party:** The party being consented, e.g., `DataRequester`
* **constraint_left:** The left operand to a constraint, e.g., `virtualLocation`
* **constraint_operator:** The operator of a constraint, e.g., `eq`
* **constraint_right:** The right operand to a constraint, e.g., `DataEnclave`
* **duty:** A duty associated with the permission for this policy, e.g., `obtainApproval`
* **duty_assigner:** The party assigning the duty, e.g., `IRB`
* **duty_assignee:** The party to whom the duty is assigned, e.g., `DataRequester`
* **duty_contracting_party:** The contracting party of the duty, e.g., `GovernmentOrganization`
* **duty_contracted_party:** The contracted party of the duty, e.g., `DataProvider`
* **duty_approving_party:** The approving party of the duty, e.g., `DisclosureReviewBody`
* **duty_approved_party:** The approved party of the duty, e.g., `DataProvider`
* **duty_consenting_party:** The consenting party of the duty, e.g., `ReviewCommittee`
* **duty_consented_party:** The party being consented of the duty, e.g., `DataRequester`

Multiple policies or actions within a single cell can be separated using `#####`.

## Running the Application

Once data is loaded the Rails application (for the back end) and an included vite application (for
the front end) can be started in a development environment by running

```
bundle exec foreman start -f Procfile.dev
```

Once running the query tool portion of the application will be available at

    http://localhost:5100/

and the visualization prototype portion of the application will be available at

    http://localhost:5100/vis/#/

### Caching the Dataset JSON

The JSON API can take a few seconds to respond with the complete set of dataset governance
information, making it awkward to develop and debug the visualization tool. The JSON is cached in
production to improve performance, and caching can be turned on to similarly improve performance in
development by running

```
rails dev:cache
```

in your development environment.

## Validation and Provenance

Data that has been loaded can be run through basic data consistency checks using the following rake task:

```
bundle exec rails data:check
```

Examining the annotation changes may be informative; the annotations of the datasets that support
loading into the database can be exported in markdown using the following rake task:

```
bundle exec rails data:compare
```

## Coordination with Metadata Collection Tool

The Governance Metadata Database and Visualization Prototype portion of the repository is a part of
a larger project that also includes a Metadata Schema and Metadata Collection Tool. A partial
importer was created to evaluate alignment between the database, metadata schema, and data
collection tool by importing output from the data collection tool into the database. The importer
converts data about the dataset along with data about consents and data use agreements.  The
importer can be run using the following rake task:

```
bundle exec rails questionnaire_response:import FILE=<questionnaire response JSON file>
```

## Dumping and restoring the database

To backup the database into the backups directory, if needed, run

```
bundle exec rails db:dump
```

The contents can later be restored using

```
bundle exec rails db:restore DATETIME=<YY_MM_DD__HH_MM_SS>
```

## Creating mermaid data model diagram

The [mermaid](https://mermaid.js.org/) diagram documenting the data model, included with the
[data dictionary](data_dictionary.md),
can be updated to reflect data model changes if needed using the following rails task:

```
bundle exec rails mermaid_erd
```

NOTE: The rails gem used to generate the mermaid diagram does not support use of
`has_many :through`, so those lines of code need to be temporarily commented out in the model source
files in `app/models/` when generating the mermaid diagram.

# Containerization

A [Dockerfile](./Dockerfile) is included that will build a Docker image that can be used for
deploying this tool.

# License

Copyright 2024 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in
compliance with the License. You may obtain a copy of the License at

```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software distributed under the License is
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing permissions and limitations under the
License.

## Contact Information

For questions or comments about this project, please send email to

    NICHDecosystem@nih.gov
