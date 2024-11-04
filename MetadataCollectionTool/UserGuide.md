# Table of Contents

- [INTRODUCTION](#introduction)
- [OVERALL APPROACH TO QUESTIONNAIRE](#overall-approach-to-questionnaire)
- [COMMON RESEARCHER USER STORY](#common-researcher-user-story)
- [USER ROLES](#user-roles)
- [NAVIGATION FRAMED BY THE DATA LIFECYCLE](#navigation-framed-by-the-data-lifecycle)
- [QUESTION STRUCTURE AND SEQUENCE](#question-structure-and-sequence)
- [GENERAL GUIDANCE ON RESPONSE TYPES](#general-guidance-on-response-types)
- [TERMS AND DEFINITIONS](#terms-and-definitions)
- [GUIDANCE BY SECTION](#guidance-by-section)
  - [SECTION 1 USER INFORMATION](#section-1-user-information)
  - [SECTION 2 DATASET INFORMATION](#section-2-dataset-information)
  - [SECTION 3 HISTORY OF DATASET LINKAGE](#section-3-history-of-dataset-linkage)
  - [SECTIONS 4–8 COLLECTION OF GOVERNANCE INFORMATION BY POLICY TYPES](#sections-48-collection-of-governance-information-by-policy-types)
    - [SECTION 4 INSTITUTIONAL REVIEW BOARD](#section-4-institutional-review-board)
    - [SECTION 5 CONSENT](#section-5-consent)
    - [SECTION 6 PRIVACY BOARD](#section-6-privacy-board)
    - [SECTION 7 DATA USE AGREEMENT](#section-7-data-use-agreement)
    - [SECTION 8 DATA SUBMISSION AGREEMENT OR INSTITUTIONAL CERTIFICATION](#section-8-data-submission-agreement-or-institutional-certification)
  - [SECTION 9 OTHER GOVERNANCE POLICIES AND PROCESSES](#section-9-other-governance-policies-and-processes)
  - [SECTION 10 LAWS](#section-10-laws)
  - [SECTION 11 OTHER GOVERNANCE INFORMATION](#section-11-other-governance-information)
- [RESOURCES AND TECHNICAL ASSISTANCE](#resources-and-technical-assistance)
- [NAVIGATING THE QUESTIONNAIRE](#navigating-the-questionnaire)
- [TRANSFERRING A QUESTIONNAIRE RESPONSE](#transferring-a-questionnaire-response)
- [EXPORTING AND IMPORTING QUESTIONNAIRE RESPONSE DATA](#exporting-and-importing-questionnaire-response-data)
- [NAVIGATING MULTIPLE DATASETS](#navigating-multiple-datasets)

## Acknowledgments

This User Guide was prepared by The MITRE Corporation under Contract No. 75N94023F00171 from the Office of Data Science and Sharing (ODSS), Eunice Kennedy Shriver National Institute of Child Health and Human Development (NICHD), National Institutes of Health. The authors are solely responsible for the document’s contents, findings, and conclusions, which do not necessarily represent the views of NICHD ODSS. Readers should not interpret any statement in this product as an official position of NIH, NICHD, or the Department of Health and Human Services.

# Introduction
The Office of Data Science and Sharing (ODSS), _Eunice Kennedy Shriver_ National Institute of Child Health and Human Development (NICHD), National Institutes of Health has developed a robust metadata schema<sup id="a1">[1](#footnote-1)</sup> for data governance information<sup id="a2">[2](#footnote-2)</sup> relevant to linking individual-level participant data and sharing and using linked datasets. The metadata schema will enable the development of tools to collect, standardize, and exchange information about data governance, including consent, policies, laws, and other rules. Learn more about the data governance metadata schema at [NICHD GitHub Repository Project](https:/github.com/NIH-NICHD/Data-Linkage-Governance).

# Overall Approach to Questionnaire

This User Guide introduces a prototype data collection tool (herein, “the tool”) to collect governance information about a dataset through a questionnaire and then transform questionnaire responses into structured metadata. Governance, or data governance, comprises the policies, limitations, processes, and controls that address ethics, privacy protections, compliance, risk management, or other requirements for a given record linkage implementation across the data lifecycle.

Structured governance metadata can facilitate the determination of whether a dataset can be linked (combined with data from other sources that relate to the same person) and if so, what rules flow down to the linked dataset. The tool, developed as a Fast Healthcare Information Resource (FHIR) Structured Data Capture questionnaire, enables research study teams to convey dataset governance information in a consistent, machine-readable format.

While the primary intended users of the data collection tool are researchers, the goal of implementing the data collection tool is to test the usability of the governance metadata schema, which will streamline data provider, data steward, and researcher decisions regarding whether two or more datasets can be linked and how linked data can be shared and used.

## Common Researcher User Story

The tool supports researchers to enter governance information, and
builds on a common researcher user story:

- As a clinical or public health researcher, I want to share data with
  other researchers, for example by submitting to a data repository. 

- I want to document how the data can be shared, linked, and used based
  on consent and other policies and regulations (and make updates as
  needed) so that potential secondary users have accurate information
  about these rules. 

- Today, there is no structured format for capturing requirements for
  how data can be shared, linked, and used based on consent or other
  requirements.

## User Roles 

The researcher or members of a research team are the primary users for
this tool. The user identifies themself by their role to enter
governance information:

- Associate investigator

- Co-principal investigator

- Principal investigator

- Research study coordinator

- Institutional Review Board (IRB) representative

- Signing official

- Legal representative

## Navigation Framed by the Data Lifecycle

Questionnaire navigation is framed by the five phases of the data
lifecycle: dataset collection, dataset linkage, dataset sharing, and
secondary dataset access and dataset use. For a given dataset, a policy
is the foundation and source of rules (permissions, prohibitions, and
duties) about how a dataset is handled across the data lifecycle. Laws,
data use agreements, and consent forms are examples of policies.

The questionnaire asks the user to identify policies, define rules, and
then select parties to define who each rule applies to or comes from.

- **Dataset collection** means a primary study collects the data and
  initiates sharing.

- **Dataset linkage** means combining information from a variety of data
  sources for the same individual.

- **Dataset sharing** means making data available to the broader data
  user community; for example, by submitting the data to a data
  repository for dissemination. The act of data sharing, which we
  generally define as making data accessible to the broader data use
  community, often encompasses multiple steps and parties.

- **Secondary dataset access** means acquiring data from a data
  repository or other data sharing system for secondary research
  purposes.

- **Secondary dataset use** means working with data for secondary
  research or other analytical purposes.

The tool assumes that the researcher is entering governance information
for a single dataset retrospectively, after the data collection has
occurred. The researcher entering governance information in this tool
needs to consider two perspectives: (1) the primary study where data
collection happened; and (2) the rules for a hypothetical future linkage
implementation that they or another researcher may initiate. In a study where datasets are linked,
dataset access and use are secondary to the primary study that
originated the data (and, for clarity, labeled as such throughout the
tool). A data requester is an individual or organization that may be
interested in requesting access to a dataset for linkage.

A key observation is that dataset linkage permeates the data lifecycle.
The holder of the collected dataset shares it for the purpose of linkage
and then the linked dataset is accessed and used for a secondary
purpose. Sharing requires effort from both the data provider and
repository/system, and linkage requires some effort from the data
provider, repository/system, and secondary user. 

## Question Structure and Sequence 

The tool asks researchers to enter governance information for a single
dataset. Governance policies and rules are different for each dataset,
so information for only one dataset can be entered at a time.

The questionnaire begins by collecting basic user and dataset
information and guides the user through a series of questions to
identify relevant governance policies. The tool then guides the user
through a series of questions to extract governance rules (permissions
and prohibitions) and constraints within those rules.

As the amount of governance information varies by dataset, the effort
and time required to complete the questionnaire will depend on the
dataset. The tool is configured to limit the number of questions based
on earlier responses. As the user enters policies and rules, conditional
logic causes additional related questions to appear based on previous
responses.

The questionnaire is organized by 11 sections.

1.  User Information

2.  Dataset Information

3.  History of Dataset Linkage

4.  Institutional Review Board

5.  Consent

6.  Privacy Board

7.  Data Use Agreement

8.  Data Submission Agreement or Institutional Certification

9.  Other Governance Policies and Processes

10. Laws

11. Other Governance Information

## General Guidance on Response Types 

Data entry response options are flexible.

**Multiple Choice:** The options are populated with the most relevant
responses and the questionnaire provides an option to:

- Select one or type a value

- Select one or more, or type a value

**Type a Value:** The free text option will allow manual data entry for
more specific details or options not listed. The box is easily
recognizable, as it has a yellow highlight color, and will allow entry
of up to 250 characters. When entering custom values, the data entry box
will turn orange – this is **not** an error.

**Consistent Responses**: The tool repeats a common pattern of response
options, with conditional logic triggered for additional
context-sensitive questions based on response.

- Yes

- Yes, with conditions

- No

- I don’t know

- It doesn’t say

Recognizing that users may be aware of only some governance information
and policies for a given dataset, the questionnaire allows users to
record values as unknown or enter custom values throughout. The tool
allows users to note when a policy does not clearly address a topic,
including answering “I don’t know” or “It doesn’t say.” If a question is
not applicable, users can leave it blank.

Governance information can be fragmented across multiple individuals at
a single institution. The tool allows users to “save” data entries for
later completion, and/or transfer a questionnaire to others for review
or completion.

# Terms and Definitions

**Condition**

Condition refers to a constraint that is applicable to a rule. Each rule
can have zero or more constraints.

**Consent**

A consent is an IRB-approved written record that complies with the
Common Rule (45 CFR 46) and, as applicable, Protection of Human Subjects
rules (21 CFR 50) and is used to demonstrate a participant’s or
guardian’s consent to participate in research.

**Data Collection**

Data collection means obtaining data from participants for research,
clinical, or administrative purposes.

**Database/data repository**

A database or data repository is virtual data storage that stores,
organizes, and validates data, and makes the data accessible for use by
others.

**Dataset Access**

Dataset access means acquiring data from a data repository or other data
sharing system for secondary research purposes.

**Dataset Linkage**

Dataset linkage or record linkage means combining information from a
variety of data sources for the same individual.

**Dataset Sharing**

Dataset sharing means making data available to the broader data user
community; for example, by submitting the data to a data repository for
dissemination. The act of data sharing, which we generally define as
making data accessible to the broader data use community, often
encompasses multiple steps and parties.

**Dataset Use**

Dataset use means working with data for secondary research or other
analytical purposes.

**Data Use Agreement (DUA)**

A DUA (DUA) is a document that establishes who is permitted to use and
receive data, and the permitted uses and disclosures of such information
by the recipient.

**De-identification**

De-identified patient data is patient information that has had
personally identifiable information (PII) (e.g., a person’s name, email
address, or social security number), including protected health
information (PHI) (e.g., medical history, test results, and insurance
information), removed. This is normally performed when sharing the data
from a registry or clinical study to prevent a participant from being
directly or indirectly identified.

**Enclave**

A data enclave is a secure network through which confidential data, such
as identifiable information from census data, can be stored and
disseminated. In a virtual data enclave, a researcher can access the
data from their own computer but can download or remove it from the
remote server. Higher security data can be accessed through a physical
data enclave where a researcher is required to access the data from a
monitored room where the data is stored on non-network computers.

**Entity resolution**

Entity resolution is the process of joining or matching records from one
data source with another that describes the same entity. In privacy
preserving record linkage (PPRL), hash codes/tokens are used to match
individual records without using PII/PHI.

**Governance or Data Governance**

Governance or data governance comprises the policies, limitations,
processes, and controls that address ethics, privacy protections,
compliance, risk management, or other requirements for a given record
linkage implementation across the data lifecycle.

**Honest broker**

An honest broker is a party that holds de-identified tokens (“hashes”)
and operates a service that matches tokens generated across disparate
datasets to formulate a single Match ID for a specific use case.

**Institutional Review Board (IRB)**

An Institutional Review Board (IRB) is the institutional entity charged
with providing ethical and regulatory oversight of research involving
human subjects, typically at the site of the research study.

**Laws**

Local, state, or federal laws that apply to a dataset. Specific laws
that apply to the dataset in this tool include:

- **Confidential Information Protection and Statistical Efficiency Act
  (CIPSEA) rules**

> More information about CIPSEA
> <https://www.cio.gov/handbook/it-laws/cipsea/>

- **Family Educational Rights and Privacy Act (FERPA) rules**

> More information about FERPA
> <https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html>

- **Health Insurance Portability and Accountability Act (HIPAA) rules**

> More information about HIPAA <https://www.hhs.gov/hipaa/index.html>

- **The Common Rule**

> More information about the Common Rule
> <https://www.hhs.gov/ohrp/regulations-and-policy/regulations/common-rule/index.html#:~:text=For%20all%20participating%20departments%20and,regulations%20of%20that%20department%2Fagency>

- **The Privacy Act of 1974**

> More information about the privacy act
> <https://www.justice.gov/opcl/privacy-act-1974>

**Letter of Determination**

A letter of determination documents an IRB decision on the status of
research.

**Metadata Schema**

Metadata schema, as defined in this Guide, is a structured set of
metadata elements and attributes, together with their associated
semantics, that are designed to support a specific set of user tasks and
types of resources in a particular domain. A metadata schema formally
defines the structure of a database at the conceptual, logical, and
physical levels.

**Personally Identifiable Information (PII)**

Personally Identifiable Information (PII) is any information that can be
used to distinguish or trace an individual’s identity, either alone or
when combined with other information that is linked or linkable to a
specific individual.

**Policies**

Policies are the foundation of governance information and the source of
rules (permissions and prohibitions) about how a dataset is handled
across the data lifecycle. Laws, data use agreements, and consent forms
are examples of policies.

**Privacy Board**

A privacy board is a group of individuals who review and approve
research uses and disclosures of data to ensure that the privacy rights
of research participants are protected.

**Privacy Preserving Record Linkage (PPRL)**

Privacy Preserving Record Linkage (PPRL) is a technique identifying and
linking records that correspond to the same entity across several data
sources held by different parties without revealing any sensitive
information about these entities.

**Protected Health Information (PHI)**

Protected Health Information (PHI) is individually identifiable health
information that is transmitted or maintained in any form or medium
(electronic, oral, or paper) by a covered entity or its business
associates, excluding certain educational and employment records.

**Rules**

Rules represent a permission, prohibition, or duty associated with a
policy. For each type of rule, the tool collects information about
permissions and prohibition for dataset sharing, dataset linkage, and
secondary dataset access and use.

# Guidance by Section

Each section of the questionnaire is described and is accompanied by a
table that lists the questions and response values. Text in grey in
these tables represents the conditional logic built inside the tool,
with a notation of ‘”If Yes,” “If Yes with Conditions,” “For,” or “If
No” for questions activated by previous responses.

## Section 1 User Information 

Section 1 collects information about the individual entering governance
information, including the user’s first and last name, user’s
organization, and role related to the dataset.

<table>
<colgroup>
<col style="width: 39%" />
<col style="width: 60%" />
</colgroup>
<thead>
<tr>
<th colspan="2">Section 1: User Information</th>
</tr>
</thead>
<tbody>
<tr>
<td>Enter your last name</td>
<td>[type a value]</td>
</tr>
<tr>
<td>Enter your first name</td>
<td>[type a value]</td>
</tr>
<tr>
<td>Enter the organization(s) that you represent</td>
<td>[type a value]</td>
</tr>
<tr>
<td>Select or enter the value that best represents your role related to
this dataset [select one]</td>
<td><blockquote>
<p>Associate investigator</p>
<p>Co-principal investigator</p>
<p>Principal investigator</p>
<p>Research study coordinator</p>
<p>IRB representative</p>
<p>Signing official</p>
<p>Legal representative</p>
<p>[type a value]</p>
</blockquote></td>
</tr>
</tbody>
</table>

## Section 2 Dataset Information

Section 2 collects the name of the dataset, the study that generated the
dataset, the type of data in the dataset, the name of the organization
that collected/funded the dataset, and the availability of identifiers
needed for dataset linkage.

<table>
<colgroup>
<col style="width: 39%" />
<col style="width: 60%" />
</colgroup>
<thead>
<tr>
<th colspan="2"><blockquote>
<p>Section 2: Dataset Information</p>
</blockquote></th>
</tr>
</thead>
<tbody>
<tr>
<td>Enter the name of the dataset</td>
<td>[type a value]</td>
</tr>
<tr>
<td>Enter the name of the study that generated this dataset</td>
<td>[type a value]</td>
</tr>
<tr>
<td>Select or enter the type of data in the dataset [select one or
more]</td>
<td><p>Administrative</p>
<p>Claims</p>
<p>Clinical</p>
<p>EHR</p>
<p>Environmental</p>
<p>Data generated from biospecimens</p>
<p>Genomic data</p>
<p>Survey</p>
<p>Patient generated health data (e.g., PROs, RPM, wearables, devices,
sensors)</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td>Enter the name of the organization that collected the dataset</td>
<td>[type a value]</td>
</tr>
<tr>
<td>Enter the name of the organization(s) that funded the collection of
this dataset</td>
<td>[type a value]</td>
</tr>
<tr>
<td>Enter the grant number for the collection of this dataset</td>
<td>[type a value]</td>
</tr>
<tr>
<td>Does this dataset contain Personally Identifiable Information (PII)
for use in individual-level dataset linkage? [select one]</td>
<td><p>Yes</p>
<p>No</p>
<p>I don’t know</p></td>
</tr>
<tr>
<td><p>If Yes</p>
<p>Select which PII elements the dataset contains [select one or
more]</p></td>
<td><p>Name</p>
<p>Geographic subdivision smaller than state (e.g., address or zip
code)</p>
<p>Phone number</p>
<p>Elements of dates (except for year) related to birth, death, or
medical encounters</p>
<p>Telephone number</p>
<p>Fax number</p>
<p>Email address</p>
<p>Social security number</p>
<p>Medical record number</p>
<p>Health plan beneficiary number</p>
<p>Account number</p>
<p>Certificate or license number</p>
<p>Vehicle identifier and serial numbers, including license plate
numbers</p>
<p>Device identifier</p>
<p>Web URL</p>
<p>Internet protocol address</p>
<p>Biometric identifiers (e.g., fingerprints or voice)</p>
<p>Photographic image</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>If Yes</p>
<p>Enter the organization that holds these PII elements</p></td>
<td>[type a value]</td>
</tr>
<tr>
<td><p>If No</p>
<p>Select or enter the method used to de-identify the dataset [select
one]</p></td>
<td><p>HIPAA – Safe Harbor</p>
<p>HIPAA – Expert Determination</p>
<p>Dataset contains no individual-level data</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>If No</p>
<p>Are identifiers accessible outside of the dataset to generate a
pseudo-identifier (e.g., hash or token)? [select one]</p></td>
<td><p>Yes</p>
<p>No</p>
<p>I don’t know</p></td>
</tr>
</tbody>
</table>

## Section 3 History of Dataset Linkage

Section 3 collects information about the history of dataset linkage,
including if the dataset has been previously linked, and the linkage
method. Historical linkage projects can offer insights on the governance
rules that may apply to future linkage projects with that dataset.

Generally, record linkage is performed using privacy preserving record
linkage (PPRL) or clear-text methods. PPRL is a technique identifying
and linking records that correspond to the same entity across several
data sources held by different parties without revealing any sensitive
information about these entities. Clear text refers to a message or data
that has not been subject to encryption.

<table>
<colgroup>
<col style="width: 39%" />
<col style="width: 60%" />
</colgroup>
<thead>
<tr>
<th>Section 3: History of Dataset Linkage</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>Has this dataset previously been linked? [select one]</td>
<td><p>Yes</p>
<p>No</p>
<p>Information not available/found</p>
<p>I don’t know</p></td>
</tr>
<tr>
<td><p>If Yes</p>
<p>Select or enter the linkage method [select one or more]</p></td>
<td><p>Privacy preserving record linkage (PPRL)</p>
<p>Clear text</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>If Yes</p>
<p>Enter the name of the project</p></td>
<td>[type a value]</td>
</tr>
<tr>
<td><p>If Yes</p>
<p>Enter the number of datasets involved in the linkage within the
project</p></td>
<td>[type a value]</td>
</tr>
<tr>
<td><p>If Yes</p>
<p>Enter the name of the dataset or describe the group of
datasets</p></td>
<td>[type a value]</td>
</tr>
<tr>
<td><p>If Yes</p>
<p>Enter who collected the dataset or group of datasets</p></td>
<td>[type a value]</td>
</tr>
</tbody>
</table>

## Sections 4–8 Collection of Governance Information by Policy Types

Sections 4–8 collect structured governance information to enable
meaningful sharing of governance metadata alongside datasets to promote
appropriate linkage, sharing, and reuse. This tool captures governance
information by source (e.g., rules from the IRB and privacy board,
consent form, and data use agreements), rules from those sources (e.g.,
permissions to link dataset, prohibition of re-identification),
constraints that apply those rules (e.g., dataset accessible only in a
specified data enclave), and the parties that those policies apply to.

The questionnaire allows users to enter multiple policies of the same
kind, recognizing that datasets will have multiple relevant policies
(e.g., multiple laws or multiple processes), through a looping function
that is presented in the tool as “+ add another \[policy type\].”

The questionnaire structure cannot prevent users from entering
conflicting responses, which may be difficult to interpret. For example,
a user could enter a permission to link and a prohibition against
linkage. Users are encouraged to attend carefully when entering
permissions and prohibitions to prevent conflicting responses.

Questions and response options in these sections follow a similar
pattern and are grouped together in this table for insertion of parties
and policy types for each question.

<table>
<colgroup>
<col style="width: 47%" />
<col style="width: 52%" />
</colgroup>
<thead>
<tr>
<th>Section 4–8 Question Sequence</th>
<th>Example Response Options</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2">Sources of Governance Information include these
<em>parties</em> and <em>policy types</em>: Institutional Review Board,
Consent, Privacy Board, Data Use Agreement, Data Submission Agreement,
Institutional Certification</td>
</tr>
<tr>
<td>Is this dataset governed by a <em>[party or policy type]</em>
[select one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p></td>
</tr>
<tr>
<td>Does the <em>[policy type]</em> permit dataset linkage? [select
one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p>
<p>I don’t know</p>
<p>It doesn’t say</p></td>
</tr>
<tr>
<td><p>If Yes, with conditions</p>
<p>Select or enter the dataset linkage conditions that the <em>[policy
type]</em> applies [select one or more]</p></td>
<td><p>The dataset may only be linked with the approval of the IRB of
record</p>
<p>The dataset may only be linked with the approval of data contributing
sites</p>
<p>The dataset may only be linked using a specific linkage method</p>
<p>The dataset may only be linked for specific types of research or
use</p></td>
</tr>
<tr>
<td><p>For “The dataset may only be linked using a specific linkage
method”</p>
<p>Select or enter the linkage method [select one]</p></td>
<td><p>PPRL</p>
<p>Clear text</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For “The dataset may only be linked for specific types of
research or use”</p>
<p>Enter the specific types of research [type a value]</p></td>
<td>[type a value]</td>
</tr>
<tr>
<td>Does the <em>[policy type]</em> permit dataset sharing? [select
one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p>
<p>I don’t know</p>
<p>It doesn’t say</p></td>
</tr>
<tr>
<td><p>If Yes, with conditions</p>
<p>Select or enter the dataset sharing conditions that the <em>[policy
type]</em> applies [select one or more]</p></td>
<td><p>The dataset may only be shared as a de-identified dataset</p>
<p>The dataset may only be shared following the Safe Harbor
de-identification method</p>
<p>The dataset may only be shared if approved by a review body</p>
<p>The dataset may only be shared as a limited dataset</p>
<p>The dataset may only be shared within a defined data release
process</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For “The dataset may only be shared if approved by a review
body”</p>
<p>Enter the review body needed for approval for sharing</p></td>
<td>[type a value]</td>
</tr>
<tr>
<td><p>For “The dataset may only be shared within a defined data release
process”</p>
<p>Describe the data release process</p></td>
<td>[type a value]</td>
</tr>
<tr>
<td>Does the <em>[policy type]</em> permit secondary dataset access?
[select one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p>
<p>I don’t know</p>
<p>It doesn’t say</p></td>
</tr>
<tr>
<td><p>If Yes, with conditions</p>
<p>Select or enter the secondary dataset access conditions that the IRB
applies [select one or more]</p></td>
<td><p>The dataset may only be accessed in a data enclave</p>
<p>The dataset may only be accessed in a controlled environment</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td>Does the <em>[policy type]</em> permit secondary dataset use?
[select one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p>
<p>I don’t know</p>
<p>It doesn’t say</p></td>
</tr>
<tr>
<td><p>If Yes, with conditions</p>
<p>Select or enter the secondary dataset use conditions that the
<em>[policy type]</em> applies [select one or more]</p></td>
<td><p>This dataset may only be used for an approved purpose</p>
<p>This dataset may only be used for research on a specific topic</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For “This dataset may only be used for an approved purpose”</p>
<p>Enter the approved purpose</p></td>
<td>[type a value]</td>
</tr>
<tr>
<td>Select or enter the prohibitions [select one or more]</td>
<td><p>Individuals in the dataset may not be re-identified</p>
<p>The dataset may not be linked</p>
<p>The dataset may not be shared</p>
<p>The dataset may not be accessed</p>
<p>The dataset may not be used for secondary purposes</p>
<p>The dataset may not be used for commercial purposes</p>
<p>The dataset may not be used for any purposes beyond explicit
permissions</p>
<p>The dataset may not be sold</p>
<p>[type a value]</p></td>
</tr>
</tbody>
</table>

## Section 4 Institutional Review Board 

An Institutional Review Board (IRB) is the institutional entity charged
with providing ethical and regulatory oversight of research involving
human subjects, typically at the site of the research study. The IRB is
conceptualized as a party. Section 4 collects information about the
rules that the IRB sets for a dataset. IRB rules may originate from an
IRB protocol, IRB determination document or letter, or standard IRB
policies defined for all research occurring under that IRB.

In addition to the sequence described above, this section includes the
question, “For a future linkage implementation, would a requester of this dataset
need to receive study-specific approval from an IRB?”

## Section 5 Consent

Section 5 collects information about the rules that a study’s consent or
assent form defines. An assent is a type of consent form is used to
express willingness to participate in research by persons who are by
definition, too young to give informed consent but are old enough to
understand the proposed research in general, its expected risks and
possible benefits, and the activities expected of them as subjects.

In addition to the sequence described above, this section includes the
question, “Will minor participants be re-consented when they become
adults?”

Consent forms will almost always address dataset collection but may or
may not offer rules about dataset linkage, sharing, and secondary access
and use. Studies may have more than one consent form, and when that is
the case, consent forms for the same study generally have the same
rules. However, if the consent forms for a single dataset offer
different rules or potentially conflicting rules, users are encouraged
to enter the rules from each consent form in separate policy entries.

In this section, the user does not select parties because the parties
are hard coded into the questionnaire response.

## Section 6 Privacy Board

Section 6 collects information about the rules that a Privacy Board sets
for a dataset. Some studies and organizations holding datasets have a
privacy board, and others may not. Privacy Boards are generally focused
on dataset access, sharing, and release processes, and they provide
rules and review of these activities. For some datasets, this section
will not be relevant and may be skipped.

In this section, the user does not select parties because the parties
are hard coded into the questionnaire response.

## Section 7 Data Use Agreement 

Section 7 collects information about the rules formalized in a data use
agreement (DUA). Datasets may have one or multiple DUAs that govern
different aspects of dataset sharing and use, such that users may have
multiple DUA entries. A DUA has an explicit definition in HIPAA;
however, DUAs are used more broadly. For example, HIPAA stipulates that
a DUA be used for sharing a limited dataset, but some organizations use
DUAs to govern sharing of de-identified datasets.

Agreements that accomplish the goals of a DUA may have other names, such
as data sharing agreement, data sharing and use agreement, or data
transfer agreement, among others. Users are encouraged to enter
agreements that have the properties of a DUA in this section. When users
are uncertain if an agreement is a DUA, they may choose to enter that
policy in Section 9 as an agreement – a more general policy type.

In addition to the sequence described above, this section includes two
questions about the DUA parties: “Select or enter the organization
providing the dataset” and “Select or enter the data receiving
organization.”

## Section 8 Data Submission Agreement or Institutional Certification

Section 8 collects information about the Data Submission Agreement and
Institutional Certification. Data Submission Agreements and
Institutional Certification are policies associated with submission of a
dataset to a repository. For some datasets, this section will not be
relevant and may be skipped.

In addition to the sequence described above, Section 8 includes
questions about the NIH Institutional Certification, a specific type of
certification required under the Genomic Data Sharing Policy (which
applies to certain genomic data). For NIH Institutional Certification,
this section includes two questions: “Select research data use
limitations” and “Select any modifiers”. More information is available:
<https://sharing.nih.gov/genomic-data-sharing-policy/institutional-certifications/completing-an-institutional-certification-form#step-1>.

This section includes clarifying questions about the type of policy and
parties. For policy type, after entering the name of the data submission
agreement or institutional certification, this section includes an
additional question “Select the most accurate description of this
policy” with three response options; and for selections of “Other” the
section clarifies “Is this an agreement or certification?” For parties,
the section includes: “Who is the assigning party” and “Who is the
assigned party.”

## Section 9 Other Governance Policies and Processes

Section 9 collects information about any other governance policies and
processes. Users are encouraged to enter any policy that sets any rules
for any phase of the data lifecycle that could be applicable to a future
linkage implementation. User can create multiple policy entries in this section.

The user selects other policy types to create a record for that policy
and then enters the rules for that policy record. Policy type options
are Agreement, Certification, Contract, Determination, Policy, and
Process. When uncertain about policy type, users may default to
selecting a policy type of “Policy.”

Based on the policy type selected, the user is prompted to select the
parties that give and receive rules from that policy.

<table>
<colgroup>
<col style="width: 39%" />
<col style="width: 60%" />
</colgroup>
<thead>
<tr>
<th colspan="2">Section 9: Other Governance Policies and Processes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Are there other agreements, certifications, contracts,
determinations, or processes that have rules about dataset linkage,
sharing, or secondary access and use? [select one]</td>
<td><p>Yes</p>
<p>No</p>
<p>I don’t know</p></td>
</tr>
<tr>
<td><p>If Yes</p>
<p>Select or enter the type of document or source for governance
information [select one]</p></td>
<td><p>Agreement</p>
<p>Certification</p>
<p>Contract</p>
<p>Determination</p>
<p>Policy</p>
<p>Process</p></td>
</tr>
<tr>
<td><p>If Yes</p>
<p>Enter the name of the policy</p></td>
<td>[type a value]</td>
</tr>
<tr>
<td><p>For Agreement</p>
<p>Select or enter the assignee party [select one]</p></td>
<td><p>Data coordinating center</p>
<p>Data provider</p>
<p>Data requester</p>
<p>Principal investigator</p>
<p>Data repository</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For Agreement</p>
<p>Select or enter the assigning party [select one]</p></td>
<td><p>Data coordinating center</p>
<p>Data provider</p>
<p>Government organization</p>
<p>Principal investigator</p>
<p>Data repository</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For Certification</p>
<p>If applicable, select or enter the assignee [select one]</p></td>
<td><p>Principal investigator</p>
<p>Government organization</p>
<p>Data repository</p>
<p>Data provider</p>
<p>Data coordinating center</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For Certification</p>
<p>Select or enter the assigner</p></td>
<td><p>Certification organization</p>
<p>Government organization</p>
<p>Data provider</p>
<p>Data coordinating center</p>
<p>Principal investigator</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For Contract</p>
<p>Select or enter the contracted party [select one]</p></td>
<td><p>Data coordinating center</p>
<p>Data provider</p>
<p>Government organization</p>
<p>Principal investigator</p>
<p>Data repository</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For Contract</p>
<p>Select or enter the contracting party [select one]</p></td>
<td><p>Data coordinating center</p>
<p>Data provider</p>
<p>Government organization</p>
<p>Principal investigator</p>
<p>Data repository</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For Determination</p>
<p>Select or enter the party that is receiving this determination
[select one]</p></td>
<td><p>Data coordinating center</p>
<p>Data provider</p>
<p>Data requester</p>
<p>Principal investigator</p>
<p>Data repository</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For Determination</p>
<p>Select or enter the party that is issuing this determination [select
one]</p></td>
<td><p>Data provider</p>
<p>Government organization</p>
<p>IRB</p>
<p>Privacy board</p>
<p>Data repository</p>
<p>Review committee</p>
<p>Data coordinating center</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For Policy</p>
<p>If applicable, select or enter the party that is subject to this
policy [select one]</p></td>
<td><p>Data coordinating center</p>
<p>Data provider</p>
<p>Data requester</p>
<p>Government organization</p>
<p>Principal investigator</p>
<p>Data repository</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For Policy</p>
<p>If applicable, select or enter the party that is defining or
enforcing the policy [select one]</p></td>
<td><p>Data coordinating center</p>
<p>Data provider</p>
<p>Government organization</p>
<p>Data repository</p>
<p>Review committee</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For Process</p>
<p>Select or enter the party that assigns this process</p></td>
<td><p>Data coordinating center</p>
<p>Data provider</p>
<p>Government organization</p>
<p>Principal investigator</p>
<p>Data repository</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For Process</p>
<p>Select or enter the party that carries out this process</p></td>
<td><p>Data coordinating center</p>
<p>Data provider</p>
<p>Data requester</p>
<p>Principal investigator</p>
<p>Data repository</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td>Does this policy permit dataset linkage? [select one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p>
<p>It doesn’t say</p>
<p>I don’t know</p></td>
</tr>
<tr>
<td><p>If Yes, with conditions</p>
<p>Select the data linkage conditions that this policy applies [select
one or more]</p></td>
<td><p>The dataset may only be linked with the approval of the IRB of
record</p>
<p>The dataset may only be linked with the approval of data contributing
sites</p>
<p>The dataset may only be linked using a specific linkage method</p>
<p>The dataset may only be linked for specific types of research or
use</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td>Does this policy permit dataset sharing? [select one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p>
<p>It doesn’t say</p>
<p>I don’t know</p></td>
</tr>
<tr>
<td><p>If Yes, with conditions</p>
<p>Select the dataset sharing conditions that this policy applies
[select one or more]</p></td>
<td><p>The dataset may only be shared as a de-identified dataset</p>
<p>The dataset may only be shared following the Safe Harbor
de-identification method</p>
<p>The dataset may only be shared if approved by a review body</p>
<p>The dataset may only be shared as a limited dataset</p>
<p>The dataset may only be shared within a defined data release
process</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td>Does this policy permit secondary dataset access? [select one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p>
<p>It doesn’t say</p>
<p>I don’t know</p></td>
</tr>
<tr>
<td><p>If Yes, with conditions</p>
<p>Select the secondary dataset access conditions that this policy
applies [select one or more]</p></td>
<td><p>The dataset may only be accessed in a data enclave</p>
<p>The dataset may only be accessed in a controlled environment</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td>Does this policy permit secondary dataset use? [select one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p>
<p>It doesn’t say</p>
<p>I don’t know</p></td>
</tr>
<tr>
<td><p>If Yes, with conditions</p>
<p>Select the secondary dataset use conditions that this policy applies
[select one or more]</p></td>
<td><p>This dataset may only be used for the approved purpose</p>
<p>This dataset may only be used for research on a specific topic</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td>Select or enter the prohibitions [select one or more]</td>
<td><p>Individuals in the dataset may not be re-identified</p>
<p>The dataset may not be linked</p>
<p>The dataset may not be shared</p>
<p>The dataset may not be accessed</p>
<p>The dataset may not be used for secondary purposes</p>
<p>The dataset may not be used for commercial purposes</p>
<p>The dataset may not be used for any purposes beyond explicit
permissions</p>
<p>The dataset may not be sold</p>
<p>[type a value]</p></td>
</tr>
</tbody>
</table>

## Section 10 Laws

Section 10 collects information about local, state, tribal, or federal
laws that apply to a dataset’s linkage, sharing, and secondary access
and use. Depending on the dataset, one or many laws at each level may
apply.

Recognizing that a few federal laws apply to many research datasets,
this section first presents the rules in the federal laws that could be
applicable and prompts the user to select the federal laws that apply.
It is likely that if a law applies, all its associated rules apply, so
the user may select from a pre-defined list of rules, which saves the
user from having to identify rules from these common laws themselves.

The user can enter additional laws using the same pattern that is used
for other policy types. The user may enter multiple laws using the
looping function in the questionnaire.

<table>
<colgroup>
<col style="width: 40%" />
<col style="width: 59%" />
</colgroup>
<thead>
<tr>
<th>Section 10: Laws</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>Do local, state, or federal laws apply to this dataset? [select
one]</td>
<td><p>Yes</p>
<p>No</p>
<p>I don’t know</p></td>
</tr>
<tr>
<td><p>If Yes</p>
<p>Select the applicable federal laws [select one]</p></td>
<td><p>CIPSEA: Confidential Information Protection and Statistical
Efficiency</p>
<p>FERPA: Family Educational Rights and Privacy Act</p>
<p>HIPAA Privacy Rule</p>
<p>The Common Rule: 45 CFR 46 Part A</p>
<p>The Federal Privacy Act (of 1974)</p>
<p>The Public Health Services Act</p></td>
</tr>
<tr>
<td><p>For HIPAA Privacy Rule</p>
<p>Select the HIPAA designated type of dataset [select one]</p></td>
<td><p>De-identified dataset</p>
<p>Limited dataset</p>
<p>Fully identified dataset</p>
<p>I don’t know</p></td>
</tr>
<tr>
<td><p>For CIPSEA</p>
<p>Select or enter the applicable CIPSEA rules that apply to the dataset
[select one or more]</p></td>
<td><p>Prohibits participant re-identification</p>
<p>Permits data sharing with approved researchers who are designated
agents</p>
<p>Guarantees confidentiality of participants and contributing
organizations</p>
<p>Permits secondary data use for research</p>
<p>Penalizes confidentiality violations</p>
<p>Supersedes the Freedom of Information Act (FOIA) such that data
collected under CIPSEA are not subject to FOIA</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For FERPA</p>
<p>Select or enter the applicable FERPA rules that apply to the dataset
[select one or more]</p></td>
<td><p>Permits sharing identified data for approved purposes (excludes
research)</p>
<p>Permits sharing of de-identified data</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For the Common Rule</p>
<p>Select or enter the applicable Common Rule rules that apply to the
dataset [select one or more]</p></td>
<td><p>Permits sharing of de-identified data</p>
<p>Permits human subjects research use of data with PII with either 1)
participant consent, or 2) IRB or a Privacy Board approval of consent
waiver</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For The Federal Privacy Act</p>
<p>Select or enter the Privacy Act of 1974 rules that apply to the
dataset [select one or more]</p></td>
<td><p>Permits collection of data that includes PII by federal agencies
that have published a system of records notice (or “SORN”) in the
Federal Register</p>
<p>Permits sharing of data with PII if federal agencies take the data
into their SORN</p>
<p>Permits federal agency use of the data with PII if the federal
agencies take the data into their SORN</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For The Public Health Services Act</p>
<p>Select or enter the Public Health Services Act rules that apply to
the dataset [select one or more]</p></td>
<td><p>Permits data collection</p>
<p>Permits data sharing with approved researchers who are designated
agents</p>
<p>Permits data use for purposes described in participant consent</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td>Do other laws apply to this dataset? [select one]</td>
<td><p>Yes</p>
<p>No</p>
<p>I don’t know</p></td>
</tr>
<tr>
<td>Does this law permit dataset linkage? [select one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p>
<p>I don’t know</p>
<p>It doesn’t say</p></td>
</tr>
<tr>
<td><p>If Yes, with conditions</p>
<p>Select the dataset linkage conditions that this law applies [select
one or more]</p></td>
<td><p>The dataset may only be linked with the approval of the IRB of
record</p>
<p>The dataset may only be linked with the approval of data contributing
sites</p>
<p>The dataset may only be linked using a specific linkage method</p>
<p>The dataset may only be linked for specific types of research or
use</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For “The dataset may only be linked for specific types of
research or use”</p>
<p>Describe the research or use</p></td>
<td>[type a value]</td>
</tr>
<tr>
<td><p>For “The dataset may only be linked using a specific linkage
method”</p>
<p>Select or enter the linkage method [select one]</p></td>
<td><p>PPRL</p>
<p>Clear text</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td>Does this law permit dataset sharing? [select one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p>
<p>I don’t know</p>
<p>It doesn’t say</p></td>
</tr>
<tr>
<td><p>If Yes, with conditions</p>
<p>Select the dataset sharing conditions that this law applies [select
one or more]</p></td>
<td><p>The dataset may only be shared as a de-identified dataset</p>
<p>The dataset may only be shared following the Safe Harbor
de-identification method</p>
<p>The dataset may only be shared if approved by a review body</p>
<p>The dataset may only be shared as a limited dataset</p>
<p>The dataset may only be shared by a defined data release process</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For “The dataset may only be shared by a defined data release
process”</p>
<p>Describe the data release process</p></td>
<td>[type a value]</td>
</tr>
<tr>
<td>Does this law permit secondary dataset access? [select one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p>
<p>I don’t know</p>
<p>It doesn’t say</p></td>
</tr>
<tr>
<td><p>If Yes, with conditions</p>
<p>Select the secondary dataset access conditions that this law applies
[select one or more]</p></td>
<td><p>The dataset may only be accessed in a data enclave</p>
<p>The dataset may only be accessed in a controlled environment</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td>Does this law permit dataset use? [select one]</td>
<td><p>Yes</p>
<p>Yes, with conditions</p>
<p>No</p>
<p>I don’t know</p>
<p>It doesn’t say</p></td>
</tr>
<tr>
<td><p>If Yes, with conditions</p>
<p>Select the secondary dataset use conditions that this law applies
[select one or more]</p></td>
<td><p>This dataset may only be used for the approved purpose</p>
<p>This dataset may only be used for research on a specific topic</p>
<p>[type a value]</p></td>
</tr>
<tr>
<td><p>For “This dataset may only be used for the approved purpose”</p>
<p>Describe the purpose</p></td>
<td>[type a value]</td>
</tr>
<tr>
<td>Select or enter the prohibitions [select one or more]</td>
<td><p>Individuals in the dataset may not be re-identified</p>
<p>The dataset may not be linked</p>
<p>The dataset may not be shared</p>
<p>The dataset may not be accessed</p>
<p>The dataset may not be used for secondary purposes</p>
<p>The dataset may not be used for commercial purposes</p>
<p>The dataset may not be used for any purposes beyond explicit
permissions</p>
<p>The dataset may not be sold</p>
<p>[type a value]</p></td>
</tr>
</tbody>
</table>

## Section 11 Other Governance Information

Section 11 collects other governance information that could not be
described in sections 4–10.

<table>
<colgroup>
<col style="width: 40%" />
<col style="width: 59%" />
</colgroup>
<thead>
<tr>
<th colspan="2">Section 11: Other Governance Information</th>
</tr>
</thead>
<tbody>
<tr>
<td>Is there any other governance information that applies to this
dataset and could not be entered above? [select one]</td>
<td><p>Yes</p>
<p>No</p></td>
</tr>
<tr>
<td>Enter the governance information related to dataset linkage,
sharing, and secondary access and use</td>
<td>[type a value]</td>
</tr>
</tbody>
</table>

# Resources and Technical Assistance

## Navigating the Questionnaire

The user can move through the questionnaire in any order of preference,
and response options can be changed. The user may move around in the
tool, navigating data entry between sections. There is no requirement
that the user start at the top and go section by section.

To save the information in the form, the user can click SAVE. Changes
made since selecting SAVE will be carried forward when the user logs
back in to resume data entry. The user can save a questionnaire for
continued response later, with no time limit on the number of edits.

## Transferring a Questionnaire Response

The user can transfer their response to the questionnaire to another
user for additional data collection, for example, for institutional
review and approval. There are two steps to transferring a questionnaire
response:

1)  On the main page of the collection tool, identify the questionnaire
    response to be transferred based on the dataset name and click on
    the “Transfer” button.

2)  On the following page, confirm the name of the dataset, displayed in
    text as “You are transferring the questionnaire response for the
    \[named dataset\],” select the email address of the user to whom you
    would like to transfer the response, and click the “Transfer”
    button.

Once the questionnaire response is transferred, the user will lose
access to add or edit additional responses unless it is transferred back
to them.

## Exporting and Importing Questionnaire Response Data 

The questionnaire is implemented using FHIR Structured Data Capture. The
results of filling out the questionnaire can be downloaded as a FHIR
QuestionnaireResponse JSON document by clicking the “Download as FHIR”
button at the bottom of the questionnaire.

A questionnaire that has been downloaded as a FHIR QuestionnaireResponse
JSON document can later be uploaded using the “Upload FHIR” button. Note
that any responses that have been filled out in the open questionnaire
will be overwritten with the contents of the FHIR QuestionnaireResponse
being uploaded.

## Navigating Multiple Datasets

The tool asks researchers to enter governance information for one
dataset at a time. Governance policies and rules are different for each
dataset.



----------


#### Footnote 1
 A metadata schema, as defined in this Guide, is a structured set of metadata elements and attributes, together with their associated semantics, that are designed to support a specific set of user tasks and types of resources in a particular domain. A metadata schema formally defines the structure of a database at the conceptual, logical, and physical levels. [↩](#introduction)

#### Footnote 2
Governance or data governance, as defined in this Guide, comprises the policies, limitations, processes, and controls that address ethics, privacy protections, compliance, risk management, or other requirements for a given record linkage implementation across the data lifecycle. [↩](#introduction)