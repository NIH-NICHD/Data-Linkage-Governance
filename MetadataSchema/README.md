# Data Governance Metadata Schema User Guide 

**Table of Contents**

<!-- vscode-markdown-toc -->
  1. [Introduction](#Introduction)
  2. [Metadata Schema Resources](#MetadataSchemaResources)
  3. [Metadata Schema Description](#MetadataSchemaDescription)
  4. [Metadata Schema Diagram](#MetadataSchemaDiagram)
  5. [Schema Relationships](#SchemaRelationships)
  6. [Schema Components](#SchemaComponents)
	 * 6.1. [ODRL Classes](#ODRLClasses)
	 * 6.2. [Data Governance ODRL Profile](#DataGovernanceODRLProfile)
  7. [Schema Requirements](#SchemaRequirements)
	 * 7.1. [Must Support Requirements](#MustSupportRequirements)
	 * 7.2. [May Support Requirements](#MaySupportRequirements)
	 * 7.3. [Enumerations](#Enumerations)
  8. [Metadata Schema Examples](#MetadataSchemaExamples)
	 * 8.1. [Example A: Data requesters must complete a Designated Agent Form and sign a Data Access Agreement to use DATASET_A](#ExampleA:DatarequestersmustcompleteaDesignatedAgentFormandsignaDataAccessAggreementtouseDATASET_A)
	 * 8.2. [Example B: Health Center IRB authorizes data linkage for DATASET_B; data requesters must obtain permission for linkage from Health Center IRB](#ExampleB:HealthCenterIRBauthorizesdatalinkageforDATASET_BdatarequestersmustobtainpermissionforlinkagefromHealthCenterIRB)
	 * 8.3. [Example C: Data Access Agreement authorizes data access and data use for DATASET_C](#ExampleC:DataAccessAgreementauthorizesdataaccessanddatauseforDATASET_C)
	 * 8.4. [Example D: Research network sites authorize linkage for DATASET_D on a study-by-study basis; data requestor must obtain permission to link datasets from each data contributing site.](#ExampleD:ResearchnetworksitesauthorizelinkageforDATASET_Donastudybystudybasisdatarequestormustobtainpermissiontolinkdatasetsfromeachdatacontributingsite.)
	 * 8.5. [Example E: Grant of Confidentiality from the U.S. Department of Justice prohibits re-identification of individuals in DATASET_E](#ExampleE:GrantofConfidentialityfromtheU.S.DepartmentofJusticeprohibitsreidentificationofindividualsinDATASET_E)
	 * 8.6. [Example F: Assent from child authorizes sharing DATASET_F](#ExampleF:AssentfromchildauthorizessharingDATASET_F)
  9. [Management of Implementation Over Time](#ManagementofImplementationOverTime)
	 * 9.1. [Contact information](#Contactinformation)
	 * 9.2. [Contributors and Funding](#ContributorsandFunding)
	 * 9.3. [References and Further Reading](#ReferencesandFurtherReading)
  10. [License](#License)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=false
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name='Introduction'></a>Introduction
This user guide introduces a metadata schema for annotating data governance information to inform decisions about linking individual-level participant data and sharing and using linked datasets. A metadata schema, as defined in this guide, is a structured set of metadata elements and attributes, together with their associated semantics, that are designed to support a specific set of user tasks and types of resources in a particular domain. “Governance” or “data governance” as defined in this guide, comprises the policies, limitations, processes, and controls that address ethics, privacy protections, compliance, risk management, or other requirements for a given data linkage implementation across the data lifecycle.

Structured annotation of governance information enables meaningful sharing of governance metadata alongside datasets to promote appropriate linkage, sharing, and reuse. In this schema, governance information is captured at the dataset level and includes basic dataset information, history of linkage, availability of linkage-required attributes, sources of governance information (e.g., data use agreements, consents, laws, and institutional review board (IRB) determinations), policies and rules within those sources (e.g.,permissions to link dataset, prohibitions on dataset use), constraints that enforce those rules (e.g., dataset accessible only in a protected enclave, specified methods for dataset de-identification), and the parties that those policies, rules, and constraints apply to. It is important to note that de-identification is not synonymous with anonymization; de-identification meaning the removal or hiding of explicit individual identifiers, whereas anonymization connotes that, if attempted, participant data is not able to identify a given individual. 

While the primary intended users of the metadata schema are developers, the ultimate goal of implementing the schema is to streamline data provider, data steward, researcher, and other stakeholder decisions regarding whether two or more datasets can be linked and how linked data can be shared and used. For developers, the metadata schema may be implemented to annotate unstructured governance information with structured metadata, readying that metadata for exchange.  However, data providers, data stewards, and researchers can also use the schema as a framework to standardize and organize governance information. For data providers, the schema can be used to define a minimum or ideal set of governance information that is required to convey whether or not a dataset can be linked. For researchers interested in linking datasets, the schema illustrates what governance information and metadata are needed to determine whether linkage is possible, and if so, what rules are inherited by the linked dataset. 

More information is available on the [project](https://github.com/NIH-NICHD/Data-Linkage-Governance ) that supported schema development and two prototype projects to test the schema. 

##  2. <a name='MetadataSchemaResources'></a>Metadata Schema Resources
These resources have been developed to support metadata schema adoption and use:

- [Metadata Schema Description](#MetadataSchemaDescription): Describes and defines of schema components
- [Metadata Schema Diagram](#MetadataSchemaDiagram): Describes the schema in the Unified Modeling Language (UML)
- [Data Governance Profile](#DataGovernanceProfile): Provides the data dictionary that describes metadata terms specific to data governance
- [A description of schema requirements](#SchemaRequirements)
- [Metadata Schema Examples](#ExampleA:DatarequestersmustcompleteaDesignatedAgentFormandsignaDataAccessAggreementtouseDATASET_A): Six examples of common data governance concepts

##  3. <a name='MetadataSchemaDescription'></a>Metadata Schema Description
The metadata schema is a structured framework that outlines technical rules and conventions to create, provide, maintain, and use data governance metadata. 
This schema was developed based on a comprehensive [landscape analysis](../LandscapeAnalysis.md) of existing governance-relevant standards, including ontologies, terminologies, vocabularies, schemas, and common data models  to help codify, define, and structure governance metadata in an extensible and machine-readable format. This analysis identified [Open Digital Rights Language (ODRL) information model](https://www.w3.org/TR/odrl-model/) as the information model and basis for the schema design.

```mermaid
---
title: Open Digital Rights Language (ODRL) Information Model Overview
---

classDiagram 
    direction RL

    class Policy {
        Rules[]
        ODRLProfile profile
    }

    class Rule {
    }

    class Action {
    }
 
    class Asset {
    }

    class Party {
    }

    class Constraint {
    }

    Rule "1..*" *-- "1" Policy : permission\nprohibition\nobligation
    Action "1" *-- "1" Rule : action
    Party "0..*" *-- "1" Rule : (function)
    Asset "0..1" *-- "1" Rule : output\ntarget
    Constraint "0..*" *-- "1" Action : refinement
    Constraint "0..*" *-- "1" Rule : constraint
    Action "1" --* "0..*" Action : implies

    Policy "1" --> "0..*" Policy :inheritFrom

    Rule "1" *-- "0..*" Rule : (failure)\n\nduty\nremedy
```

The Open Digital Rights Language (ODRL) is a versatile policy articulation language that offers an adaptable and interoperable data model, vocabulary, and encoding systems for expressing statements about the utilization of content and services. The foundational elements for the semantics of the ODRL policies are outlined in the ODRL Information Model, which details the core concepts, entities, and relationships. _Policies_ are made up of _rules_ which are employed to denote permitted (allowed) and prohibited (forbidden) _actions_ on a specific _asset_, as well as the responsibilities that _parties_ (stakeholders) are required to fulfill (i.e., obligations). Furthermore, _rules_ can be subject to _constraints_ (e.g., locations of data access) and duties (such as obtaining approvals) that can be imposed on permissions. This system of policies, rules, parties, and constraints serves as an ideal basis for governance metadata schema development, and a useful representation of data governance requirements relevant to linkage. Additional information is available at [World Wide Web Consortium (W3C) ODRL Information Model 2.2](https://www.w3.org/TR/odrl-model/). 

This user guide focuses on the unique aspects of a data governance-specific vocabulary that the project team has used to extend the ODRL Core Vocabulary with new terms to express policies in the data governance space ([Data Governance Profile](#DataGovernanceProfile)). This schema reflects ODRL structure with selected additions for data governance concepts, derived from auxiliary standards, denoted in a data governance profile. The data governance profile incorporates some concepts from the Data Privacy Vocabulary ([DPV] - https://w3c.github.io/dpv/dpv/), the Dublin Core terms ([DC] - https://www.dublincore.org/specifications/dublin-core/dcmi-terms/), as well as Simple Knowledge Organization System ([SKOS] - https://www.w3.org/TR/skos-reference/).

##  4. <a name='MetadataSchemaDiagram'></a>Metadata Schema Diagram
The schema Unified Modeling Language (UML) diagram provides a visual representation of the schema's structure and relationships.

```mermaid
---
title: Governance Metadata UML
---

classDiagram 
  direction LR

%%namespace Policies {
    class Policy {
        <<abstract>>
        IRI uid
        IRI[] profile
        ConflictTerm conflict
        dc:creator[] creator
        dc:description[] description
        dc:issued issued
        dc:modified modified
        dc:coverage[] coverage
        Policy replaces
        Policy isReplacedBy
        -- profile --
        dc:title title
        skos:note[] note
        Date metadata_creation_date
    }

    class Set {
        <<Policy>>
    }
    class Offer {
        <<Policy>>
    }
    class Agreement {
        <<Policy>>
    }
%%}

%%namespace Assets {
    class Asset {
        IRI uid
    }

    class AssetCollection{
        IRI source
    }
%%}

%%namespace Parties {
    class Party{
        IRI uid
    }

    class PartyCollection{
    }
%%}

%%namespace Rules {
    class Rule {
        <<abstract>>
        -- profile --
        skos:note[] note
    }
    class Permission {
        <<Rule>>
    }
    class Prohibition {
        <<Rule>>
    }
    class Duty {
        <<Rule>>
    }

%%}

class Action {
    <<enumeration>>
    ObtainConsent
    Notice
    Inform
    GrantUse
    Extract
    Distribute
    Derive
    CommercialUse
    Attribute
    Anonymize
    Aggregate
}

%%namespace Constraints {
    class Constraint {
        IRI uid
        DataType dataType
        Unit unit
    }

    class LogicalConstraint {
        IRI uid
    }

    class LeftOperand {
        %% LeftOperand properties
    }

    class Operator {
        %% Operator properties
    }

    class RightOperand {
        %% RightOperand properties
    }
%%}


Policy <|-- Set : rdfs_subClassOf
Policy <|-- Offer : rdfs_subClassOf
Policy <|-- Agreement : rdfs_subClassOf
Policy "1" --* "0..*" Rule : permission\nobligation\nprohibition
Policy "1" .. "0..*" Action : action
Policy "1" .. "0..*" Asset : target\noutput
Rule "1" -- "0..*" Asset : target\noutput
Policy "1" .. "0..*" Party : function
Rule "1" -- "0..*" Party : function
Asset <|-- AssetCollection
AssetCollection "1" *-- "0..*" Asset : partOf
PartyCollection "1" *-- "0..*" Party : partOf
Asset "1" .. "0..*" Policy : hasPolicy
Party <|-- PartyCollection : rdfs_subClassOf
Rule <|-- Permission : rdfs_subClassOf
Rule <|-- Prohibition : rdfs_subClassOf
Rule <|-- Duty : rdfs_subClassOf
Rule "1" --* "0..*" Action : action
Policy "1" <-- "0..*" Policy : inheritFrom
Policy "1" <-- "0..*" Policy : dc_requires
Permission "1" -- "0..*" Duty : duty
Offer "1" -- "1" Party : assigner
Agreement "1" -- "2" Party : assigner\nassignee
Set "1" -- "0..*" Party
Rule "1" --* "0..*" Constraint : constraint
Action "1" --* "0..*" Constraint : refinement
Rule "1" --* "0..*" LogicalConstraint : constraint
Action "1" --* "0..*" LogicalConstraint : refinement
Constraint "1" --* "1" LeftOperand : leftOperand
Constraint "1" --* "1" Operator : operator
Constraint "1" --* "1" RightOperand : rightOperand
LogicalConstraint "1" --* "2..*" Constraint : or\nxone\nand\nandSequence

```

```mermaid
---
title: Governance Metadata Profile UML
---

classDiagram 
  direction TB

%% namespace  Data_Governance_Profile {

    class GovernanceAgreementPolicy{
        <<Enumeration>>
        Certification
        Consent 
        Contract
        Data Use Agreement
        Determination    
    }


    class GovernanceSetPolicy{
        <<Enumeration>>
        Law regulations and statutes
        Process    
    }

    class GovernanceParty{
        <<Enumeration>>
        Certification Organization
        Data Access Committee
        Data Coordinating Center
        Data Provider
        Data Repository
        Data Requester
        Disclosure Review Body
        Government Organization
        Guardian
        Institutional Review Board
        Minor Participant
        Participant
        Principal Investigator
        Privacy Board
        Review Committee
    }

    class Dataset {
        dc:source
        dc:publisher
        dc:type
        dc:creator
        dc:contributor
    }

    class GovernanceAction{
        <<enumaration>>
        Access
        Approve
        Classify
        Collect
        Complete Training
        Deidentify 
        Link
        Make Determination
        Obtain Approval
        Reidentify
        Research Use
        Secondary Link
        Sign
        Submit
    }

    class GovernanceRightOperand{
        <<enumaration>>
        Academic Research
        Approved Purpose
        Controlled Access
        Data Enclave
        Limited Dataset
        Safe Harbor Method
        Deidentified Dataset
        Data Provider
    }

    class GovernanceLeftOperand{
        <<enumaration>>
        Access Type
        Consent Requirement
        Data Requester
        Deidentification Method
        Linkage Method
        Output
    }

    class PIIElement {
        <<enumaration>>
        Names
        GeographicData
        Dates
        PhoneNumbers
        FaxNumbers
        EmailAddresses
        SocialSecurityNumbers
        MedicalRecordNumbers
        HealthPlanBeneficiaryNumbers
        AccountNumbers
        CertificateLicenseNumbers
        VehicleIdentifiersAndSerialNumbers
        DeviceIdentifiersAndSerialNumbers
        URLs
        IPAddresses
        BiometricIdentifiers
        FullFacePhotosAndAnyComparableImages
        AnyOtherUniqueIdentifyingNumberOrCode
    }

    class PriorLinkage {
        dc:title title
        dc:type type
        dc:source source
        string entity_resolver
        string performing_party
        string quality_assessment
        string data_sharing_method
        dc:created created
        dc:modified modified
    }
    
%%}

%% ODRL profile relations
GovernanceAction ..|> Action : rdf_type
GovernanceAgreementPolicy ..|> Agreement : rdf_type
GovernanceSetPolicy ..|> Set : rdf_type
Policy <|-- Set : rdfs_subClassOf
Policy <|-- Agreement : rdfs_subClassOf
GovernanceParty ..|> Party : rdf_type
GovernanceRightOperand ..|> RightOperand : rdf_type
GovernanceLeftOperand ..|> LeftOperand : rdf_type
Dataset ..|> Asset : rdf_type
Dataset "1" --* "0..*" PIIElement : pii_elements
Dataset "1" --* "0..*" PriorLinkage : prior_linkage
PriorLinkage "1" --* "0..*" PIIElement : pii_elements

```

##  5. <a name='SchemaRelationships'></a>Schema Relationships

```mermaid
---
title: Governance Metadata UML
---

classDiagram 
  direction TB

%%namespace Relationship Legend {
    class classA {
    }
    class classB {
    }
    class classB {
    }
    class classC {
    }
    class classD {
    }
    class classE {
    }
    class classF {
    }
    class classG {
    }
    class classH {
    }
    class classI {
    }
    class classJ {
    }
    class classK {
    }
    class classL {
    }
    class classM {
    }
    class classN {
    }
    class classO {
    }
    class classP {
    }
%%}

    classA --|> classB : Inheritance
    classC --* classD : Composition
    classE --o classF : Aggregation
    classG --> classH : Association
    classI -- classJ : Link(Solid)
    classK ..> classL : Dependency
    classM ..|> classN : Realization
    classO .. classP : Link(Dashed)

```

The Schema Relationships UML diagram is used to illustrate the different types of relationships between classes in the UML diagram. Only a subset of these UML relationships is used in the first version of the schema. Please note that these are general UML concepts and their specific interpretation can vary based on the context of a given diagram.

1.	**Inheritance (--|>):** Represents a relationship between two classes where one class (the subclass) inherits from another class (the superclass). In the legend, classA is a subclass of classB.
2.	**Composition (--*):** Represents a type of association that represents a part-whole or part-of relationship. In the legend, classC is composed of classD
3.	**Aggregation (--o):** Represents a variant of the "has a" association relationship; aggregation is more specific. It's a relationship between two classes that is best described as a "has-a" and "whole/part" relationship. In the legend, classE is aggregated with classF.
4.	**Association (-->):** Represents a relationship between two classes that allows one object instance to cause another to perform an action on its behalf. In the legend, classG is associated with classH.
5.	**Link (Solid) (--):** Represents a simple relationship between two classes. In the legend, classI is linked to classJ.
6.	**Dependency (..>):** Represents a relationship in which one class depends on another. If the class being depended on changes, the dependent class may be affected. In the legend, classK is dependent on classL.
7.	**Realization (..|>):** Represents a relationship between two classes, where one class implements the behavior specified by another. In the legend, classM realizes classN.
8. **Link (Dashed) (..):** Represents a weaker form of relationship between two classes. In the legend, classO is weakly linked to classP. 

##  6. <a name='SchemaComponents'></a>Schema Components 
The data governance metadata schema is primarily an ODRL structure, with modest extensions to capture data governance-specific concepts. Section 6.1 provides an overview of how ODRL can be used to annotate governance metadata and section 6.2 defines the Data Governance Profile. 

###  6.1. <a name='ODRLClasses'></a>ODRL Classes

The data governance metadata schema makes use of many existing ODRL classes and applies them to data governance.

[W3C ODRL Documentation](https://www.w3.org/TR/odrl-model/#policy) 
|   | ODRL Class | ODRL Definition and Data Governance Examples|
| -------- | ---------- | ---------- |
| Assets: | Asset | Represents an asset with a unique identifier. Datasets for which governance metadata is recorded are represented as assets.|
|  | AssetCollection | Represents a collection of assets with a source. |
| Policies: | Policy | A group of one or more rules. Represents an abstract policy class with properties like uid, profile, conflict, creator, description, issued, modified, coverage, replaces, and isReplacedBy. Common governance policies include laws and regulations, data use agreements, consents, IRB documents, and standalone policies unaffiliated with formal documentation. Expanded definition for data governance: A formal statement of intent or plan of action that is adopted by an organization such as a research entity and defines specific procedures, rules, or regulations that individuals are expected to adhere to or follow.|
|  | Set | Represents a default policy with any combination of rules. Laws and regulations without an assigned party can be represented as a set.|
|  | Offer | Represents rules offered from assigner parties, typically used to make policies available to an audience, but does not grant any rules.|
|  | Agreement | Represents an agreement policy. As agreements require an assignee and assigner, data use agreements, consents, and IRB determinations are common types of governance-relevant agreements. |
| Parties: | Party | Represents a party with a unique identifier. A party may be an individual such as a study participant or the principal investigator, an organization, or an entity within an organization such as an IRB or a Steering Committee.|
|  | PartyCollection | Represents a collection of parties. |
| Rules: | Rule | Represents an abstract rule class. Rules may be permissions, prohibitions, or obligations. Rules are nested within a policy. A given policy might have none, one, or multiple rules.|
|  | Permission | Represents a permission rule. Relevant governance permissions can be permission to link or permission to use a dataset.|
|  | Prohibition | Represents a prohibition rule. Relevant governance prohibitions can be prohibition to re-identify a dataset. |
|  | Obligation | Represents an obligation rule. Relevant governance obligation can be an obligation to obtain approval to link.|
| Actions: | Action | Represents different types of actions. Actions are tied to rules and constraints. ODRL contains many action terms such as obtainConsent, inform, grantUse, extract, distribute, derive, commercialUse, attribute, anonymize, or aggregate. Governance specific terms such as collect, link, and re-identify were added through the data governance profile. |
| Constraints: | Constraint | Represents a constraint with properties like uid, dataType, and unit. Constraints are limitations or caveats to a rule and are represented with a left and right operand and an operator. For example, a constraint of "virtualLocation eq ControlledAccess" could be a constraint on a permission (rule) to access (action) a dataset (asset) only when the virtual environment (left operand) equals (operator) a secure enclave (right operand).|
|  | LogicalConstraint | Represents a logical constraint, which is used for expressions that compare two or more existing constraints. If the comparison of contraints based on a logical operator like _and_ or _or_ returns a logical match, then the Logical Constraint is satisfied, otherwise it is not satisfied.|
|  | LeftOperand | This class represents the left operand in a constraint. In a constraint expression, the left operand is the value or property that the constraint is applied to. For example, a left operand might refer to a virtualEnvironment or a deidentificationMethod.|
|  | Operator | This class represents the operator in a constraint. The operator determines how the left operand is compared to the right operand. Common operators include equals, less than, greater than, and not equals. |
|  | RightOperand | This class represents the right operand in a constraint. In a constraint expression, the right operand is the value that the left operand is compared to. The right operand can hold a single value or a list. For example, a right operand might refer to a DataEnclave or the SafeHarborMethod for deidentification.|

**Duty**

Duty, as defined in the context of the ODRL Information Model, is the obligation to perform an action. It is a key component of a Rule and is disjoint from Permission and Prohibition. A Duty is associated with a consequence property and is in the range of duty, obligation, consequence, and remedy. 

There are specific types of Duties such as Obligation, which relates an individual Duty to a Policy. Another type is Consequence, which relates a Duty to another Duty, the latter being a consequence of not fulfilling the former. Lastly, Remedy relates an individual remedy Duty to a Prohibition. 

| | Duty | Obligation | Has Duty | Consequence | Remedy |
| --- | --- | --- | --- | --- | --- |
| **Definition** | The obligation to perform an Action. | Relates an individual Duty to a Policy. | Relates an individual Duty to a Permission. | Relates a Duty to another Duty, the latter being a consequence of not fulfilling the former. | Relates an individual remedy Duty to a Prohibition. |
| **Label** | Duty | Obligation | Has Duty | Consequence | Remedy |
| **Identifier** | [http://www.w3.org/ns/odrl/2/Duty](http://www.w3.org/ns/odrl/2/Duty) | [http://www.w3.org/ns/odrl/2/obligation](http://www.w3.org/ns/odrl/2/obligation) | [http://www.w3.org/ns/odrl/2/duty](http://www.w3.org/ns/odrl/2/duty) | [http://www.w3.org/ns/odrl/2/consequence](http://www.w3.org/ns/odrl/2/consequence) | [http://www.w3.org/ns/odrl/2/remedy](http://www.w3.org/ns/odrl/2/remedy) |
| **Note** | - | The Duty is a requirement which must be fulfilled. | A Duty is a pre-condition which must be fulfilled in order to receive the Permission. | The consequence property is utilised to express the repercussions of not fulfilling an agreed Policy obligation or duty for a Permission. If either of these fails to be fulfilled, then this will result in the consequence Duty also becoming a new requirement, meaning that the original obligation or duty, as well as the consequence Duty must all be fulfilled | The remedy property expresses an agreed Duty that must be fulfilled in case that a Prohibition has been violated by being exercised. |
| **Parent property** | - | - | - | failure | failure |
| **Domain** | - | Policy | Permission | Duty | Prohibition |
| **Range** | - | Duty | Duty | Duty | Duty |



###  6.2. <a name='DataGovernanceODRLProfile'></a>Data Governance ODRL Profile
The Data Governance Profile created in this project represents the extension to ODRL required to accurately represent governance metadata. It includes terms that represent different aspects of data governance, such as actions, parties, and different types of constraints. For a comprehensive understanding of these terms, their definitions, and example usages, please refer to the following two files defining the Data Governance Profile:

* [Data Governance ODRL Profile Ontology](data_governance_ODRL_profile.rdf)
* [Data Governance ODRL Profile Data Dictionary](DataDictionary.xlsx)

### 6.3 Profile Terms and Definitions

The profile includes terms that represent different aspects of data governance, such as actions, parties, and different types of constraints (left operand and right operand). Each profile term is defined below organized by ODRL class.

#### 6.3.1 Asset

| Term | Label | Definition | Source |
| ---- | ----- | ---------- | ------ |
| **dataset** | Dataset | A collection of related data records. |  |

#### 6.3.2 Policy Type

| Term | Label | Definition | Source |
| ---- | ----- | ---------- | ------ |
| **certification** | Certification | An attestation that an official status has been earned by satisfying defined requirements, or the act of providing such a status, as proof that something has happened or defined standards have been met or will be upheld in the future.  | https://w3c.github.io/dpv/dpv/#Certification |
| **consent** | Consent  | The IRB-approved written record that is in compliance with the Common Rule (45 CFR 46) and as applicable, Protection of Human Subjects rules (21 CFR 50), and is used to demonstrate the consent by a participant or guardian to participate in research. | https://w3c.github.io/dpv/dpv/#Consent |
| **contract** | Contract | A contract is an agreement between parties, creating mutual obligations that are enforceable by law. (source: https://www.law.cornell.edu/wex/contract)  | https://w3c.github.io/dpv/dpv/#Contract |
| **dataUseAgreement** | Data Use Agreement | A document which establishes who is permitted to use and receive data, and the permitted uses and disclosures of such information by the recipient. (modified from source: https://www.hhs.gov/hipaa/for-professionals/special-topics/emergency-preparedness/data-use-agreement/index.html)  |  |
| **determination** | Determination | Outcome of a ruling or legal decision. |  |
| **law** | Law (regulations and statutes) | A system of rules created and enforced by governmental bodies that regulate the behavior of individuals, organizations, and governmental entities. Inclusive of statutes and regulations. | https://w3c.github.io/dpv/dpv/#Law  |
| **process** | Process  | A procedure that individuals are expected to adhere to or follow. | https://w3c.github.io/dpv/dpv/#Process |

#### 6.3.3 Party

| Term | Label | Definition | Source |
| ---- | ----- | ---------- | ------ |
| **certificationOrganization** | Certification Organization | An organization that grants or approves certifications or certificates. |  |
| **dataAccessCommittee** | Data Access Committee | A group of individuals who review all requests for access to datasets from external requestors and is composed of individuals with expertise in science, policy, or bioinformatics resources. |  |
| **dataCoordinatingCenter** | Data Coordinating Center | Academic and commercial data management and study oversight organizations, including contract research organizations, whose responsibilities include providing some or all the following services: study administration, financial management, protocol administration, data management, stakeholder communication and coordination, quality assurance, site monitoring, safety, regulatory, document management, post-study management, and close-out activities. (source:  https://www.niddk.nih.gov/-/media/Files/Research-Funding/Process/NIDDK-Guidance_DCC-Management-of-CCAs_Final_Version-1,-d-,1_OD-Approved_External-Website.pdf) |  |
| **dataProvider** | Data Provider | Institutions, organizations, and researchers that collect data from research participants or that collect administrative data and may also submit the data to a repository for sharing. |  |
| **dataRepository** | Data Repository | A physical location or virtual system for preserving, maintaining, and providing access to data. (modified from source: https://www.whitehouse.gov/wp-content/uploads/2022/05/05-2022-Desirable-Characteristics-of-Data-Repositories.pdf)  |  |
| **dataRequester** | Data Requester | An individual or organization that requests access to a dataset that is not the participant. |  |
| **disclosureReviewBody** | Disclosure Review Body | A group of individuals that establishes and operates processes and policies to ensure the public release of data products that do not reveal any information about the participants included in those datasets. |  |
| **governmentOrganization** | Government Organization | An international, federal, state, tribal, or local government organization. Inclusive of departments or divisions within a larger government organization.  |  |
| **guardian** | Guardian | An individual who is authorized under applicable State or local law to consent on behalf of a child to general medical care. Inclusive of a child’s biological or adoptive parent. (source: https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-46/subpart-D/section-46.402)  |  |
| **iRB** | Institutional Review Board | An Institutional Review Board (IRB) is the institutional entity charged with providing ethical and regulatory oversight of research involving human subjects, typically at the site of the research study. (source: https://orwh.od.nih.gov/toolkit/human-subjects-protections/institutional-review-board)    |  |
| **minorParticipant** | Minor Participant | Refers to children or participants who have not attained the legal age for consent to treatments or procedures involved in the research, under the applicable law of the jurisdiction in which the research will be conducted. (modified from source: https://www.hhs.gov/ohrp/regulations-and-policy/guidance/faq/children-research/index.html)   |  |
| **participant** | Participant | A healthy human or a patient who is or becomes a participant in research. (modified from source: https://policymanual.nih.gov/3014-001#C)  | https://w3c.github.io/dpv/dpv/#Participant |
| **principalInvestigator** | Principal Investigator | The investigator with the overall responsibility for the designing, conducting, and reporting of the research, and must assure both the protocol and the research team’s actions are compliant with law, regulation, and NIH policy, even when certain aspects of the research are delegated to other investigators. (modified from source: https://ohsrp.nih.gov/confluence/display/ohsrp/Chapter+2+-+Roles+and+Responsibilities+of+the+Principal+Investigator#:~:text=The%20NIH%20Principal%20Investigator%20(PI,research%20to%20appropriately%20qualified%20individuals)  |  https://build.fhir.org/codesystem-research-study-party-role.html#research-study-party-role-primary-investigator |
| **privacyBoard** | Privacy Board | A group of individuals who review and approve research uses and disclosures of data to ensure that the privacy rights of research participants are protected. |  |
| **reviewCommittee** | Review Committee | A group of individuals convened to review materials, provide approvals, and issue determinations on requested actions. |  |

#### 6.3.4 Function

| Term | Label | Definition | Source |
| ---- | ----- | ---------- | ------ |
| **approvedParty** | Approved Party | The party receiving approval. |  |
| **approvingParty** | Approving Party | The party providing approval. |  |

#### 6.3.5 Action

| Term | Label | Definition | Source |
| ---- | ----- | ---------- | ------ |
| **access** | Access | To acquire data from a data repository or other data sharing system.  | https://w3c.github.io/dpv/dpv/#Access  |
| **approve** | Approve | To provide permission to perform the requested action. | https://bioportal.bioontology.org/ontologies/NCIT?p=classes&conceptid=http%3A%2F%2Fncicb.nci.nih.gov%2Fxml%2Fowl%2FEVS%2FThesaurus.owl%23C25425 |
| **classify** | Classify | To organize data by relevant categories so that it may be used and protected more efficiently.  |  |
| **collect** | Collect | The process of gathering and measuring information on variables of interest, in an established systematic fashion that enables one to answer stated research questions, test hypotheses, and evaluate outcomes. | https://w3c.github.io/dpv/dpv/#Collect  |
| **completeTraining** | Complete Training | To complete training. |  |
| **deidentify** | Deidentify  | To remove identifying information. De-identified data is participant information that has had personally identifiable information (PII; e.g. a participant’s name, email address, or social security number), including protected health information (PHI; e.g. medical history, test results, and insurance information) removed. This is normally performed when sharing the data from a registry or clinical study to prevent a participant from being directly or indirectly identified. (modified from source: https://toolkit.ncats.nih.gov/glossary/de-identified-patient-data/)  | https://w3c.github.io/dpv/dpv/#Deidentification |
| **link** | Link | To combine information from a variety of data sources for the same participant. (source: https://hcup-us.ahrq.gov/datainnovations/raceethnicitytoolkit/or19.jsp) Synonymous with record linkage.  |  |
| **makeDetermination** | Make Determination | To reach a decision or draw conclusions.  |  |
| **obtainApproval** | Obtain Approval | To obtain verifiable approval to perform the requested action. | https://www.w3.org/TR/odrl-vocab/#term-obtainConsent |
| **reidentify** | Reidentify | A general term for any process that re-establishes the relationship between identifying data and a participant. (modified from source: https://csrc.nist.gov/glossary/term/re_identification) |  |
| **researchUse** | Research Use | Working with data for scientific research or other analytical purposes. |  |
| **secondaryLink** | Secondary Link | To link a dataset for a secondary purpose distinct from the original or primary intended purpose. |  |
| **share** | Share | The act of making an asset such as a dataset available for use by others. |  |
| **sign** | Sign | Signing a document or agreement. |  |
| **submit** | Submit | To submit a document such as a form, application, or protocol. |  |

#### 6.3.6 LeftOperand

| Term | Label | Definition | Source |
| ---- | ----- | ---------- | ------ |
| **accessType** | Access Type | The approach for making data available for use by others, for example open access or controlled access.  |  |
| **consentRequirement** | Consent Requirement | A requirement to obtain consent from a participant or organization. |  |
| **dataRequester** | Data Requester | An individual or organization that requests access to a dataset that is not the participant. |  |
| **deidentificationMethod** | Deidentification Method | The method to remove the identifiers or any information that could directly identify a participant from a dataset to mitigate privacy risks to that participant. |  |
| **linkageMethod** | Linkage Method | The method used for linkage. Inclusive of PPRL and non-PPRL methods. |  |
| **output** | Output | The result of a process. |  |

#### 6.3.7 RightOperand

| Term | Label | Definition | Source |
| ---- | ----- | ---------- | ------ |
| **academicResearch** | Academic Research | Purposes associated with conducting or assisting with research conducted in an academic context e.g. within universities. |  |
| **approvedPurpose** | Approved Purpose | The allowed activity or purpose for which the operator wishes to use the asset. |  |
| **controlledAccess** | Controlled Access | Established processes for verifying appropriate use of shared data, such as requiring verification of requestor identity, committee approval of proposed research use, and signing a data use agreement to access protected data. (modified from source: https://grants.nih.gov/grants/guide/notice-files/NOT-OD-22-213.html) |  |
| **dataEnclave** | Data Enclave | A secure network through which confidential data, such as identifiable information from census data, can be stored and disseminated. In a virtual data enclave a researcher can access the data from their own computer but cannot download or remove it from the remote server. Higher security data can be accessed through a physical data enclave where a researcher is required to access the data from a monitored room where the data is stored on non-network computers. (source: https://nnlm.gov/guides/data-thesaurus/data-enclave) | https://w3id.org/dpv#TrustedExecutionEnvironments |
| **dataProvider** | Data Provider | Institutions, organizations, and researchers that collect data from research participants or that collect administrative data and may also submit the data to a repository for sharing. |  |
| **deidentifiedDataset** | Deidentified Dataset | A set of information that has had personally identifiable information (PII; e.g. a person’s name, email address, or social security number), including identifying protected health information (PHI; e.g., medical history, test results, and insurance information) removed.  |  |
| **limitedDataset** | Limited Dataset | A set of information about a participant that excludes 16 direct identifiers specified in the HIPAA Privacy Rule and may be used or disclosed, for purposes of research, public health, or health care operations, without obtaining either a participant's Authorization or a waiver or an alteration of authorization for its use and disclosure, with a data use agreement. (modified from source: https://privacyruleandresearch.nih.gov/pr_08.asp)  |  |
| **safeHarborMethod** | Safe Harbor Method | A method for deidentification by removal of 18 HIPAA identifiers. (modified from source: https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html#safeharborguidance) |  |

#### 6.3.8 PII Elements

| Term | Label | Definition | Source |
| ---- | ----- | ---------- | ------ |
| **accountNumbers** | Account Numbers | The presence of the personally identifiable information element of an account number.  |  |
| **anyOtherUniqueIdentifyingNumbersOrCodes** | Any Other Unique Identifying Numbers or Codes | The presence of any other personally identifiable information elements.  |  |
| **biometricIdentifiers** | Biometric Identifiers | The presence of the personally identifiable information element of a biometric identifier.  |  |
| **certificateLicenseNumbers** | Certificate License Numbers | The presence of the personally identifiable information element of a certificate license number.  |  |
| **dates** | Dates | The presence of the personally identifiable information element of dates. Includes birth dates and death dates. |  |
| **deviceIdentifiersAndSerialNumbers** | Device Identifiers and Serial Numbers | The presence of the personally identifiable information element of device identifiers and serial numbers.  |  |
| **emailAddresses** | Email Addresses | The presence of the personally identifiable information element of an email address.  |  |
| **faxNumbers** | Fax Numbers | The presence of the personally identifiable information element of a fax number. |  |
| **fullFacePhotosAndComparableImages** | Full Face Photos and Comporable Images | The presence of the personally identifiable information element of a full face photo or comparable image.  |  |
| **geographicData** | Geographic Data | The presence of the personally identifiable information elements of geographic data. Includes street address, city, state, zip code, or elements of a geocode. |  |
| **healthPlanBeneficiaryNumbers** | Health Plan Beneficiary Numbers | The presence of the personally identifiable information element of a health plan beneficiary or member number.  |  |
| **iPAddresses** | IP Addresses | The presence of the personally identifiable information element of an IP address.  |  |
| **medicalRecordNumbers** | Medical Record Numbers (MRNs) | The presence of the personally identifiable information element of a medical record number.  |  |
| **names** | Names | The presence of the personally identifiable information element of a name. Includes first, middle, and last name.   |  |
| **phoneNumbers** | Phone Numbers | The presence of the personally identifiable information element of a phone number. |  |
| **priorLinkage** | Prior Linkage | A set of information about prior linkages of a dataset.  |  |
| **socialSecurityNumbers** | Social Security Numbers (SSNs) | The presence of the personally identifiable information element of a social security number. |  |
| **uRLs** | URLs | The presence of the personally identifiable information element of a URL.  |  |
| **vehicleIdentifiersAndSerialNumbers** | Vehicle Identifiers and Serial Numbers | The presence of the personally identifiable information element of vehicle identifiers and serial numbers.  |  |

##  7. <a name='SchemaRequirements'></a>Schema Requirements

###  7.1. <a name='MustSupportRequirements'></a>Must Support Requirements
The schema must support the creation and management of the terms defined in the namespaces. This includes creating these terms, setting and retrieving their properties, and managing the relationships between them. For example, the system must support creating a Policy; assigning it a unique identifier (uid); setting its profile, conflict term, creator, description, issued and modified dates, and coverage; and managing its relationships with Rules, Actions, Assets, and Parties.

**Must Have Specific Properties:**
- **Policy:** Must have properties like uid, profile, conflict, creator, description, issued, modified, coverage, replaces, and isReplacedBy.
- **Asset:** Must have a uid property.
- **AssetCollection:** Must have a source property.
- **Party:** Must have a uid property.
- **Constraint:** Must have properties like uid, dataType, and unit.
- **LogicalConstraint:** Must have a uid property.

###  7.2. <a name='MaySupportRequirements'></a>May Support Requirements
The schema may support more advanced features depending on the specific requirements of the system being implemented. For example, it may support advanced querying capabilities to retrieve Policies based on their properties or relationships. It may also support features like versioning (to track changes to a Policy over time), access control (to restrict who can view or modify a Policy), and validation (to ensure that the properties and relationships of a Policy conform to certain rules).

###  7.3. <a name='Enumerations'></a>Enumerations 
Several entities in the UML schema diagram are marked as enumerations, indicated by the _<\<enumeration\>>_ tag. These represent possible lists of terms that a given concept can be associated with. For example, the Action enumeration represents different types of actions that can be associated with a Rule. In the data governance profile, the GovernanceAction enumeration lists all the specific Action terms that are unique to data governance, such as collect, link, and re-identify.

##  8. <a name='MetadataSchemaExamples'></a>Metadata Schema Examples 
Six examples that illustrate how the schema encodes common governance concepts are listed below. 

###   8.1. <a name='ExampleA:DatarequestersmustcompleteaDesignatedAgentFormandsignaDataAccessAggreementtouseDATASET_A'></a>Example A: Data requesters must sign a Designated Agent Form and sign a Data Access Agreement to use DATASET_A
```yaml
policy: 
  - type: Agreement
    title: Data Access Agreement
    uid: DataAccessAgreement
    profile: https://github.com/NIH-NICHD/Data-Linkage-Governance
    target: DATASET_A
    permission:
      - action: access
        assigner: DataRequester
        assignee: PrincipalInvestigator
        duty:
        - action: sign
          contractedParty: DataRequester

  - type: Agreement
    title: DATASET_A Designated Agent Form
    uid: DATASET_ADesignatedAgentForm
    profile: https://github.com/NIH-NICHD/Data-Linkage-Governance
    target: DATASET_A
    obligation:
      - action: submit
        contractedParty: DataRequester
```
###  8.2. <a name='ExampleB:HealthCenterIRBauthorizesdatalinkageforDATASET_BdatarequestersmustobtainpermissionforlinkagefromHealthCenterIRB'></a>Example B: Health Center IRB authorizes data linkage for DATASET_B; data requesters must obtain permission for linkage from Health Center IRB 
```yaml
policy: 
  - type: Agreement - IRB Documentation 
    title: DATASET_B IRB Policy 
    uid: DATASET_BIrbPolicy 
    profile: https://github.com/NIH-NICHD/Data-Linkage-Governance 
    target: DATASET_B 
    permission: 
      - action: link
        assigner: IRB 
        assignee: PrincipalInvestigator
        duty:
         - action: obtainApproval
           approvingParty: IRB 
           approvedParty: DataRequester 
    
```
###  8.3. <a name='ExampleC:DataAccessAgreementauthorizesdataaccessanddatauseforDATASET_C'></a>Example C: Data Access Agreement authorizes data access and data use for DATASET_C
```yaml
policy: 
  - type: Agreement 
    title: Data Access Agreement
    uid: DataAccessAgreement 
    profile: https://github.com/NIH-NICHD/Data-Linkage-Governance 
    target: DATASET_C 
    permission: 
      - action: access
        assigner: PrincipalInvestigator 
        assignee: DataRequester
        duty:
         - action: sign
            assignee: DataRequester

```
###  8.4. <a name='ExampleD:ResearchnetworksitesauthorizelinkageforDATASET_Donastudy-by-studybasisdatarequestormustobtainpermissiontolinkdatasetsfromeachdatacontributingsite.'></a>Example D: Research network sites authorize linkage for DATASET_D on a study-by-study basis; data requestor must obtain permission to link datasets from each data contributing site  
```yaml
policy: 
  - type: Process
    title: DATASET_D Linkage Study Participation Policy
    uid: DATASET_DLinkageStudyParticipationPolicy
    profile: https://github.com/NIH-NICHD/Data-Linkage-Governance
    target: DATASET_D
    permission:
      - action: link
        duty:
         - action: obtainApproval
            approvingParty: DataProvider
            approvedParty: DataRequester
```
###  8.5. <a name='ExampleE:GrantofConfidentialityfromtheU.S.DepartmentofJusticeprohibitsreidentificationofindividualsinDATASET_E'></a>Example E: Grant of Confidentiality from the U.S. Department of Justice prohibits reidentification of individuals in DATASET_E 
```yaml
policy: 
  - type: Certificate 
    title: Grant of Confidentiality from the U.S. Department of Justice 
    uid: GrantOfConfidentialityFromTheUSDepartmentOfJustice 
    profile: https://github.com/NIH-NICHD/Data-Linkage-Governance 
    target: DATASET_E
    prohibition: 
      - action: reidentify
```
###  8.6. <a name='ExampleF:AssentfromchildauthorizessharingDATASET_F'></a>Example F: Assent from child authorizes sharing DATASET_F
```yaml
policy: 
  - type: Agreement
    title: DATASET_F Assent
    uid: DATASET_FAssent
    profile: https://github.com/NIH-NICHD/Data-Linkage-Governance
    target: DATASET_F
    permission:
      - action: share
        assigner: MinorParticipant
        assignee: PrincipalInvestigator
        constraint:
         - leftOperand: product
           operator: eq
           rightOperand: DeidentifiedDataset
```
##  9. <a name='ManagementofImplementationOverTime'></a>Management of Implementation Over Time

###  9.1. <a name='Contactinformation'></a>Contact information
For questions or comments about this project, please send email to nichdecosystem@nih.gov.

Please use this GitHub repository's Issue Tracker to request new terms/classes or report errors or specific concerns related to the schema.

Consider evaluating if a term exists in an external vocabulary, e.g., https://terminology.hl7.org/5.4.0/ValueSet-v3-PurposeOfUse.html and could be reused in the data governance profile.

###  9.2. <a name='ContributorsandFunding'></a>Contributors and Funding
This user guide was prepared for and is maintained by the Eunice Kennedy Shriver National Institute of Child Health and Human Development (NICHD), Office of Data Science and Sharing (ODSS).

Contributors include:
- The MITRE Corporation, McLean, VA
- U.S. Department of Health and Human Services, National Institutes of Health, _Eunice Kennedy
Shriver_ National Institute of Child Health and Human Development (NICHD), Office of Data Science and Sharing (ODSS)

###  9.3. <a name='ReferencesandFurtherReading'></a>References and Further Reading

- Chevrier R, Foufi V, Gaudet-Blavignac C, Robert A, Lovis C. (2019) Use and Understanding of Anonymization and De-Identification in the Biomedical Literature: Scoping Review. J Med Internet Res 21(5): e13484. Available from: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6658290/#:~:text=“Anonymization%20and%20de%2Didentification%20are,anonymous).”%20%5B13%5D
- CMS Alliance to Modernize Healthcare (The Health FFRDC). Data Governance Metadata Standards: Landscape and Gap Analysis. Prepared under Contract No. 75N94023F00171. January 2024.
- _Eunice Kennedy Shriver_ National Institute of Child Health and Human Development Office of Data Science and Sharing with Essex Management and Booz Allen Hamilton. PCORTF Pediatric Record Linkage Governance Assessment. [Internet]. December 2023. Available from: https://www.nichd.nih.gov/about/org/od/odss
- National Institute of Child Health and Human Development Office of Data Science and Sharing with Booz Allen Hamilton. Privacy Preserving Record Linkage (PPRL) for Pediatric COVID-19 Studies. [Internet]. September 2022. Available from: https://www.nichd.nih.gov/sites/default/files/inline-files/NICHD_ODSS_PPRL_for_Pediatric_COVID-19_Studies_Public_Final_Report_508.pdf.
- National Institutes of Health Office of Data Science Strategy. Streamlining Access to Controlled Data at the NIH [Internet]. 2022. Available from: https://datascience.nih.gov/streamlining-access-to-controlled-data
- Office of the Assistant Secretary for Planning and Evaluation, U.S. Department of Health and Human Services. Building Data Capacity for Patient-Centered Outcomes Research. Office of the Secretary Patient Centered Outcomes Research Trust Fund Strategic Plan: 2020-2029. [Internet]. 2022 September. Available from: https://aspe.hhs.gov/sites/default/files/documents/b363671a6256c6b7f26dec4990c2506a/aspe-os-pcortf-2020-2029-strategic-plan.pdf

##  10. <a name='License'></a>License
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

The contents of this repository were prepared by MITRE Corporation under Contract No. 75N94023F00171 from the Office of Data Science and Sharing (ODSS), _Eunice Kennedy Shriver_ National Institute of Child Health and Human Development (NICHD), National Institutes of Health. The authors are solely responsible for the document’s contents, findings, and conclusions, which do not necessarily represent the views of NICHD ODSS. Readers should not interpret any statement in this product as an official position of NICHD ODSS or HHS.

Notice:

This technical data project was produced for the U. S. Government under Contract Number 75FCMC18D0047, and is subject to Federal Acquisition Regulation Clause 52.227-14, Rights in Data-General.

No other use other than that granted to the U. S. Government, or to those acting on behalf of the U. S. Government under that Clause is authorized without the express written permission of The MITRE Corporation.

For further information, please contact The MITRE Corporation, Contracts Management Office, 7515 Colshire Drive, McLean, VA  22102-7539, (703) 983-6000.

Copyright 2024 The MITRE Corporation.
