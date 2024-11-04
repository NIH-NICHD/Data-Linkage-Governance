# Metadata Collection Tool

A prototype data governance metadata collection tool to enable researchers or other stakeholders to
enter, store, and communicate dataset-level consent, policy, regulatory, and other governance
information as metadata in a standard format to inform decisions about data linkages.

## Questionnaire

The JSON version of the questionnaire is embedded in the application and available at
[app/frontend/components/Questionnaire/Research-data-metadata.R4.json](./app/frontend/components/Questionnaire/Research-data-metadata.R4.json).

A PDF version of all the questions and response options is available at [QuestionsAndResponseOptions.pdf](./QuestionsAndResponseOptions.pdf).

## User Guide

The [User Guide](./UserGuide.md) provides information on entering information into the Metadata
Collection Tool.

# Developer Notes

The data governance metadata collection tool is implemented using the following technologies:

* A JavaScript front-end built using the [LHC-Forms](https://lhncbc.github.io/lforms/) widget from the Lister Hill National Center for Biomedical Communications that uses FHIR Structured Data Capture to present a FHIR Questionnaire to the user.
* A Ruby on Rails backend for storing completed questionnaire responses along with user information.

## User Authentication

The application is designed to be run behind a separate service that authenticates users and
provides the email of the authenticated user in a `warp-user` HTTP header. When running in
development the application looks for a `USER_EMAIL` environment variable for specifying a user for
use in testing and development activities.

Use of this application in an environment that does not provide a similar authentication service
will require authentication to be added to the application.

##  Dependencies

These capabilities depend on

* rails
* react
* postgreSQL

## Setup for Development

With a local copy of this repository you can set up the initial blank database using the following steps:

```
bundle install
rails db:create
rails db:migrate
```

## Running the Application

Once the database is set up the application can be started in a development environment by running

```
bundle exec foreman start -f Procfile.dev
```

The application will be available at http://127.0.0.1:5100/

## Updating the Questionnaire

To update the contents of the FHIR questionnaire:

1. Replace the contents of app/frontend/components/Questionnaire/{Research-data-metadata.R4.json with the new questionnaire
2. Add or update a "version" field in the questionnaire
3. Add or update a "date" field in the questionnaire
4. Commit the changes
5. Add a tag that matches the questionnaire version
6. Push the tagged version to source control

## Utility Scripts

The tool contains a number of utility scripts that can be useful for reporting on usage or managing
questionnaires or questionnaire responses.

### Report on all editing sessions

To generate a simple report that shows information on user editing sessions, run the following rake
task:

```
bundle exec rails report:sessions
```

### Display every question along with the answer options if there are any

To list all questions with their answer options, run the following rake task:

```
bundle exec rails utilities:list_questions
```

### Display help text from the questionnaire

To display all the help text from the current questionnaire, run the following rake task:

```
bundle exec rails utilities:help_text
```

### Validate conditional questionnaire sections

To validate the existing questionnaire, run the following rake task:

```
bundle exec rails utilities:validate_questionnaire
```

### Export a questionnaire response given the ID

To export a questionnaire response in JSON format, given the database ID of the response, run the
following rake task:

```
ID=<questionnaire-database-id> bundle exec rails utilities:export
```

### Fix incompatibilities in a questionnaire response given the ID

If a questionnaire is updated, and older responses are not compatible, it may be possible to update
an older response to at least retain some information; to do so, given the ID of the response, run
the following rake task:

```
ID=<questionnaire-database-id> bundle exec rails utilities:fix_incompatible
```

### Re-order response sections to share a consistent order of options

To create a new version of an existing questionnaire with a standardized order of responses, run the
following rake task:

```
bundle exec rails utilities:fix_questionnaire_ordering
```

### List incompatibilities in questionnaire responses

To list incompatibilities between all current questionnaire responses and the current questionnaire,
run the following rake task:

```
bundle exec rails utilities:list_incompatible
```

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
