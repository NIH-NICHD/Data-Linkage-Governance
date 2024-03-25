# Governance Metadata Database, Query Tool, and Search and Visualization Tool

This repository includes an indexed governance relational database that encodes governance metadata from 11
HHS clinical and administrative datasets collected from the NICHD ODSS Pediatric COVID PPRL
Assessment and PCORTF Pediatric Record Linkage Governance Assessment reports. The database provides
a demonstration of how governance information may be annotated as metadata and supports prototype
tools for querying, searching, and visualizing data governance metadata, intended to inform
researchers how datasets of interest can be linked and used. This portion of the repository includes
the following:

* **Data Model and Data Dictionary** – A [data model and data dictionary](data_dictionary.md) with a mermaid diagram showing the data model of the database along with a description of each field.
* **Database** – An instantiation of the data model as a relational database schema that can be loaded with governance metadata from 11 HHS clinical and administrative datasets.
* **Query Tool** – A demonstration of simple database querying capabilities allowing governance metadata for the 11 datasets to be viewed.
* **Search and Visualization Tool (coming soon)** – More advanced search and visualization capabilities intended to support linkage determination for the 11 datasets.

# Developer Notes

The database management and search and visualization tools are built as a Ruby on Rails application.
The database is defined using standard Rails DB migrations and ActiveRecord relational models. Rake
tasks support loading annotated dataset governance information into the database.

##  Dependencies

These capabilities depend on

* rails
* postgreSQL

## Setup

With a local copy of this repository you can set up the initial blank database using the following steps:

```
bundle install
rails db:create
rails db:migrate
```

The governance metadata for 11 datasets can be loaded by running the following rake task:

```
rails data:load
```

## Running

Once data is loaded the rails application can be started in a development environment by running

```
rails server
```

The application will be available at http://127.0.0.1:3000/

## Validation and Provenance

Loaded data can be run through some basic data consistency checks using the following rake task:

```
rails data:check
```

The annotations of the datasets that support loading into the database can be exported in markdown
using the following rake task:

```
rails data:compare
```

## Creating mermaid data model diagram

The mermaid diagram can be updated using the following rails task:

```
rails mermaid_erd
```

NOTE: The rails gem used to generate the mermaid diagram does not support use of
`has_many :through`, so those lines of code need to be temporarily commented out in the model source
files when generating the mermaid diagram.

## Running Tests

Tests can be run using

```
rails test
```
