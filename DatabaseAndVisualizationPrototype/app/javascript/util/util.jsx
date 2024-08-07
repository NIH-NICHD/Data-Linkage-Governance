import React from 'react';

import LinkIcon from '@mui/icons-material/Link';
import LoginIcon from '@mui/icons-material/Login';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import ScienceIcon from '@mui/icons-material/Science';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { Beenhere, MarkChatRead, Policy, ReduceCapacity, Sell, SocialDistance } from '@mui/icons-material';
import CustomLinkIcon from '../theme/icons/CustomLinkIcon';


export const palette = {
    consent: "#4f926b",
    determination: "#2b8c7c",
    irbdocumentation: "#2e7992",
    law: "#4167b3",
    agreement: "#6262bd",
    request: "#924d80",
    process: "#a15467",
    certification: "#a14a2c",
    datauseagreement: "#9e6a20",
    contract: "#727a26",
    policy: "#1c6b3e"
};

export const datasetActionTypes = [
    {
        name: 'link',
        label: 'Dataset Linkage',
        question: 'Policies about dataset linkage',
        icon: CustomLinkIcon,
        color: '#4f926b'
    }, 
    {
        name: 'share',
        label: 'Dataset Sharing',
        question: 'Policies about dataset sharing', 
        icon: PeopleIcon,
        color: '#2e7992'
    }, 
    {
        name: 'access',
        label: 'Secondary Dataset Access',
        question: 'Policies about secondary dataset access',
        icon: LoginIcon,
        color: '#4167b3'
    }, 
    {
        name: 'researchUse',
        label: 'Secondary Dataset Use',
        question: 'Policies about secondary dataset use',
        icon: ScienceIcon,
        color: '#924d80'
    },
    {
        name: 'other',
        label: 'Other Actions',
        question: 'Policies about other actions',
        noGap: true, // indicates that this action should not show an "Authorization Gap",
        icon: MiscellaneousServicesRoundedIcon,
        color: '#9e6a20'
    }, 
];

export const assignedParties = ['assignee', 'approvedParty', 'contractedParty', 'consentedParty'];
export const actionPartyTypes = [
    {
        name: 'MinorParticipant',
        label: 'Minor Participant',
    },
    {
        name: 'Guardian',
        label: 'Guardian'
    },
    {
        name: 'DataAccessCommittee',
        label: 'Data Access Committee',
        selectable: true
    },
    {
        name: 'DataCoordinatingCenter',
        label: 'Data Coordinating Center',
        selectable: true
    },
    {
        name: 'DataProvider',
        label: 'Data Provider',
        selectable: true
    },
    {
        name: 'DataRepository',
        label: 'Data Repository',
        selectable: true
    },
    {
        name: 'DataRequester',
        label: 'Data Requester',
        selectable: true
    },
    {
        name: 'IRB',
        label: 'IRB',
        selectable: true
    },
    {
        name: 'PrincipalInvestigator',
        label: 'Principal Investigator',
        selectable: true
    },
    {
        name: 'DisclosureReviewBody',
        label: 'Disclosure Review Body',
    },
    {
        name: 'ReviewCommittee',
        label: 'Review Committee'
    },
    {
        name: 'GovernmentOrganization',
        label: 'Government Organization',
    },
    {
        name: 'Participant',
        label: 'Participant'
    },
    {
        name: 'TechnologyVendor',
        label: 'Technology Vendor',
    },
    {
        name: 'PrivacyBoard',
        label: 'Privacy Board'
    },
    {
        name: 'LinkageHonestBroker',
        label: 'Linkage Honest Broker',
    },
    {
        name: 'DataEnclave',
        label: 'Data Enclave'
    },
    {
        name: 'CertificationOrganization',
        label: 'Certification Organization'
    },
    {
        name: 'ReceivingOrganization',
        label: 'Receiving Organization'
    }
];
export function getDatasetCount(dataset){
    const dictionary = {};
    if (dataset) {
        dataset.policies.forEach((pol) => {
            const polType = pol.type;
            if (dictionary[polType]) {
                dictionary[polType]++;
            } else {
                dictionary[polType] = 1;
            }
        })
    }
    const data = [];
    Object.keys(dictionary).forEach((key, i) => {
        data.push({ id: i, value: dictionary[key], label: key, color: palette[key.toLowerCase()] })
    })
    return data.toSorted((a, b) => a.label < b.label ? -1 : 1);
}
const order = ["consent", "determination", "datauseagreement", "contract", "certification", "agreement", "process", "request", "policy", "law"];
export const policyTypeDict = [
    {
        name: "consent",
        label: "Consent",
    },
    {
        name: "determination",
        label: "Determination"
    },
    {
        name: "datauseagreement",
        label: "Data Use Agreement"
    },
    {
        name: "contract",
        label: "Contract"
    },
    {
        name: "certification",
        label: "Certification"
    },
    {
        name: "agreement",
        label: "Agreement"
    },
    {
        name: "process",
        label: "Process"
    },
    {
        name: "request",
        label: "Request",
    },
    {
        name: "irbdocumentation",
        label: "IRB Documentation"
    },
    {
        name: "policy",
        label: "Policy"
    },
    {
        name: "law",
        label: "Law",
    }
]
export const getPolicyLabel = (policyName) => {
    for(const entry of policyTypeDict) {
        if(entry.name === policyName.toLowerCase()){
            return entry.label
        };
    }
    return policyName;
}
const sortByPolicyType = (a, b) => {
    if(order.indexOf(a.toLowerCase()) < order.indexOf(b.toLowerCase())){
        return -1;
    }
    return 1;
}
export const getDatasetPolicyTypes = (datasets) => {
    let policyTypes = {};
    for (const dataset of datasets) {
        for (const policy of dataset.policies) {
            policyTypes[policy.type.toLowerCase()] = true;
        }
    }
    const relevantPolicies = policyTypeDict.filter((e) => {
        return policyTypes[e.name];
    });
    return relevantPolicies;
}

export const getDatasetPolicyTypePolicies = (datasets, datasetName, policyType) => {
    const dataset = datasets.find(d => d.name === datasetName);
    return dataset?.policies.filter(p => p.type === policyType) || [];
}

export const getDatasetPolicyTypeCount = (datasets, datasetName, policyType) => {
    return getDatasetPolicyTypePolicies(datasets, datasetName, policyType).length;
}
// returns a lookup table with key lookup[datasetName][policyType]
// and a value of a list of 
export const getDatasetPolicyTypeLookup = (datasets) => {
  const policyTypes = getDatasetPolicyTypes(datasets);
  let lookup = {};
  for (const dataset of datasets) {
    for (const policyType of policyTypes) {
      lookup[dataset.name] ||= {};
      lookup[dataset.name][policyType.name] ||= [];
    }
    for (const policy of dataset.policies) {
      lookup[dataset.name][policy.type.toLowerCase()].push(massagePolicy(policy));
    }
  }
  return lookup;
}

export const getDatasetPolicyActionLookup = (datasets) => {
    let lookup = {};
    for (const dataset of datasets) {
      for (const actionType of datasetActionTypes) {
        lookup[dataset.name] ||= {};
        lookup[dataset.name][actionType.name] ||= [];
      }
      for (const policy of dataset.policies) {
        for (const rule of policy.rules) {
            if(lookup[dataset.name][rule.action]) {
                // rule action in lookup table, append rule
                lookup[dataset.name][rule.action].push(massageRule(rule, policy));
            } else {
                lookup[dataset.name]['other'].push(massageRule(rule, policy));
            }
        }
      }
    }
    return lookup;
  }

export const getActionStepsLookup = (datasets) => {
    let lookup = {};
    for (const dataset of datasets) {
        lookup[dataset.name] = {};
        for (const partyType of actionPartyTypes) {
            lookup[dataset.name][partyType.name] ||= { required: [], permitted: [], prohibited: [] };
        }
        lookup[dataset.name]['everyone'] = { required: [], permitted: [], prohibited: [] };
        for(const policy of dataset.policies) {
            for(const rule of policy.rules) {
                if(rule.duties.length > 0 || rule.type.toLowerCase() === 'duty') {
                    // has requirements
                    const duties = [...rule.duties];
                    if(rule.type.toLowerCase() === 'duty') {
                        duties.push(rule);
                    }
                    for(const duty of duties) {
                        if(duty.functions.length > 0) {
                            // has an assigned party
                            const assigned = duty.functions.filter((f) => {
                                if(assignedParties.indexOf(f.type) >= 0 ) {
                                    return true;
                                }
                            });
                            const assignedParty = assigned[0]?.party?.name;
                            lookup[dataset.name][assignedParty ? assignedParty : 'everyone'] ||= { required: [], permitted: [], prohibited: [] };
                            lookup[dataset.name][assignedParty ? assignedParty : 'everyone'].required.push( {
                                rule: rule, // ref to parent rule
                                policy: policy, // ref to parent policy
                                duty: duty, // the duty
                            }); // TODO should put this in a function somewhere 
                        } else {
                            // assign to everybody
                            lookup[dataset.name]['everyone'] ||= { required: [], permitted: [], prohibited: [] };
                            lookup[dataset.name]['everyone'].required.push({
                                rule: rule,
                                policy: policy,
                                duty: duty,
                            });
                        }
                    }
                } else {
                    // there are no duties, so we either are permitted or prohibited from doing the thing
                    const assigned = rule.functions.filter((f) => {
                        if(assignedParties.indexOf(f.type) >= 0 ) {
                            return true;
                        }
                    });
                    const assignedP = assigned.map((a) => {
                        return a.party.name;
                    });
                    if(assignedP.length === 0) {
                        assignedP.push('everyone'); // nobody is assigned, assign everyone
                    }
                    for(const party of assignedP) {
                        if(rule.type.toLowerCase() === 'prohibition') {
                            lookup[dataset.name][party] ||= { required: [], permitted: [], prohibited: [] };
                            lookup[dataset.name][party].prohibited.push({
                                rule: rule,
                                policy: policy,
                                duty: null
                            });
                        } else {
                            lookup[dataset.name][party] ||= { required: [], permitted: [], prohibited: [] };
                            lookup[dataset.name][party].permitted.push( {
                                rule: rule,
                                policy: policy, 
                                duty: null
                            });
                        }
                    }
                }
            }
        }
    }
    return lookup;
}
const massageRule = (rule, policy) => {
    rule.type.toLowerCase() === 'prohibition';

    const ruleObject = {
        rule: rule,
        parent: policy,
        hasConstraints: rule.constraints.length,
        isProhibition: rule.type.toLowerCase() === 'prohibition'
    };
    return ruleObject;
}
// returns a policy object with information about the rules
// pulled out and made top-level
const massagePolicy = (policy) => {
    const policyObject = {
        policy: policy,
        hasPermissionContraint: false,
        prohibitions: [],
        permissions: [],
        duties: [],
    };
    policy.rules.forEach((rule) => {
        if(rule.type.toLowerCase() === 'permission') {
            policyObject.permissions.push(rule);
            if(rule.constraints.length > 0) {
                policyObject.hasPermissionContraint = true;
            }
        } else if(rule.type.toLowerCase() === 'prohibition') {
            policyObject.prohibitions.push(rule);
        } else if(rule.type.toLowerCase() === 'duty') {
            policyObject.duties.push(rule);
        } else {
            console.log("Found unrecognized rule");
            console.log(rule);
        }
    });
    return policyObject;
}
export const actionDict = {
    'reidentify': {
        noun: 'reidentification of participants',
        verb: 'reidentify participants'
    },
    'submit': {
        noun: 'submission',
        verb: 'submit'
    },
    'obtainApproval': {
        noun: 'obtaining approval',
        verb: 'obtain approval',
    },
    'sell': {
        noun: 'sale',
        verb: 'sell data'
    },
    'reviewDisclosure': {
        noun: 'reviewing disclosure',
        verb: 'review disclosure'
    },
    'obtainConsent': {
        noun: 'obtaining consent',
        verb: 'obtain consent',
    },
    'share': {
        noun: 'sharing',
        verb: 'share',
    },
    'link': {
        noun: 'linking',
        verb: 'link',
    },
    'access': {
        noun: 'secondary dataset access',
        verb: 'secondary dataset access'
    },
    'researchUse': {
        noun: 'secondary dataset use',
        verb: 'secondary dataset use'
    },
    'secondaryUse': {
        noun: 'secondary dataset use',
        verb: 'secondary dataset use'
    },
    'secondaryLink': {
        noun: 'secondary dataset linkage',
        verb: 'secondary dataset link'
    },
    'deidentify': {
        noun: 'deidentification',
        verb: 'deidentify'
    },
    'approve': {
        noun: 'approval',
        verb: 'approve'
    },
    'requestAccess': {
        noun: 'requesting access',
        verb: 'request access'
    },
    'completeTraining': {
        noun: 'completing training',
        verb: 'complete training'
    },
    'obtainTraining': {
        noun: 'completing training',
        verb: 'complete training'
    },
    'classify': {
        noun: 'following external classification rules',
        verb: 'follow external classification rules'
    },
    'sign': {
        noun: 'signing',
        verb: 'sign'
    },
    'reviewPolicy': {
        noun: 'reviewing',
        verb: 'review'
    },
    'anonymize': {
        noun: 'anonymization',
        verb: 'anonymize'
    },
    'collect': {
        noun: 'dataset collection',
        verb: 'collect'
    },
    // TODO: This is a bad annotation which we will fix
    'transfer': {
        noun: 'transferring',
        verb: 'sign'
    }
}
export const getActionIcon = (action, fontSize='24px') => {
    // should be tied to the dictionary of action label/names
    if(action === 'link') {
        return <LinkIcon sx={{fontSize}}/>
    } else if(action === 'share') {
        return <PeopleIcon sx={{fontSize}} />
    } else if(action === 'access') {
        return <LoginIcon sx={{fontSize}}/>
    } else if(action === 'collect') {
        return <PlaylistAddCircleIcon sx={{fontSize}}/>
    } else if(action === 'researchUse'){
        return <ScienceIcon sx={{fontSize}} />
    } else if(action === 'reidentify'){
        return <PersonPinCircleIcon sx={{fontSize}} />
    } else if(action === 'sell'){
        return <Sell sx={{fontSize}} />
    } else if(action === 'obtainApproval'){
        return <MarkChatRead sx={{fontSize}} />
    } else if(action === 'transfer'){
        return <SocialDistance sx={{fontSize}} />
    } else if(action === 'completeTraining'){
        return <Beenhere sx={{fontSize}} />
    } else if(action === 'anonymize'){
        return <ReduceCapacity sx={{fontSize}} />
    } else if(action === 'reviewPolicy'){
        return <Policy sx={{fontSize}} />
    } else if(action === 'execute'){
        return <BuildIcon sx={{fontSize}} /> // needs icon
    } else if(action === 'other'){
        return <MiscellaneousServicesRoundedIcon sx={{fontSize}} />
    } else {
        return <BuildIcon sx={{fontSize}} />
    }
}

// Given a rule return human-appropriate language describing the rule
export const humanizeRule = ({ type, action }) => {
    return `${type} to ${action === 'researchUse' ? 'use for research' : action}`;
}

// Given a constraint return human-appropriate language describing the constraint
export const humanizeConstraint = ({ left_operand, operator, right_operand }) => {
    const simpleText = `${left_operand} ${operator} ${right_operand}`;
    const lookup = {
        'accessType eq ControlledAccess': 'if the dataset is accessed in a controlled environment',
        'careType eq HIVHealthcare': 'if the dataset includes HIV-related data',
        'careType eq ReproductiveHealthcare': 'if the dataset includes reproductive health care data',
        'consentRequirement eq Waived': 'if the consent requirement is waived',
        'dataRequester eq DataProvider': 'if the data requester is a data provider',
        'deidentificationMethod eq SafeHarborMethod': 'if the method used to de-identify the dataset is the HIPAA Safe Harbor method',
        'linkageMethod eq ApprovedProtocol': 'if the method used for linkage is approved',
        'linkageMethod eq PrivacyPreservingRecordLinkage': 'if the method used for linkage is Privacy Preserving Record Linkage',
        'output eq DeidentifiedDataset': 'if the product of linkage is a de-identified dataset',
        'output eq LimitedDataset': 'if the product of linkage is a limited dataset',
        'purpose eq AcademicResearch': 'if the purpose of linkage is academic research',
        'purpose eq ApprovedPurpose': 'if the purpose of linkage is approved',
        'virtualLocation eq ControlledAccess': 'if the dataset is accessed in a controlled environment',
        'virtualLocation eq DataEnclave': 'if the dataset is accessed in a data enclave'
    }
    if (!lookup[simpleText]) {
        // If we don't find a defined lookup note that and try our best
        console.log(`TODO: No humanization for constraint "${simpleText}"`);
        return `if ${left_operand.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()} is ${right_operand.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}`;
    }
    return lookup[simpleText];
}

export const humanizeFunctions = ({ functions, type, action }) => {
    type = type.toLowerCase();
    const roles = functions.map(f => f.type).sort();
    const parties = functions.sort((a, b) => a.type < b.type ? -1 : 1).map(f => f.party.name);
    switch(roles.join('|')) {
    case '':
        return `${type} assigned to all parties`;
    case 'assignee':
        return `This ${type} is assigned to ${parties[0]}`;
    case 'assigner':
        return `${parties[0]} assigns this ${type}`;
    case 'assignee|assigner':
        return `${parties[1]} assigns this ${type} to ${parties[0]}`;
    case 'assignee|assigner|assigner':
        return `${parties[1]} and ${parties[2]} assign this ${type} to ${parties[0]}`;
    case 'contractedParty|contractingParty':
        return `${parties[0]} requires agreement with ${parties[1]} for this ${type}`;
    case 'approvingParty':
        return `${parties[0]} has ${type} to approve`;
    case 'approvedParty|approvingParty':
        return `${parties[0]} has ${type} to obtain approval from ${parties[1]}`;
    case 'consentedParty|consentingParty':
        return `${parties[0]} has ${type} to obtain consent from ${parties[1]}`;
    }
    // TODO: Finish human readable functions for entire repository of datasets
    console.log(`TODO: Need human readable for\n  Roles: ${roles.join('|')}\n  Parties: ${parties.join('|')}\n  Rule type: ${type}`);
    return `${parties.join(', ')} ${parties.length === 1 ? 'has this role' : 'have these roles'}: ${roles.join(', ')}`;
}

export const displaySource = ({ name, link }) => {
    if (name && link) {
        return <a href={link}>{name}</a>;
    } else if (link) {
        return <a href={link}>{link}</a>;
    } else {
        return name;
    }
}

export const humanizeDuty = ({ policy, rule, duty }) => {
    const roles = duty.functions.map(f => f.type).sort();
    const parties = duty.functions.sort((a, b) => a.type < b.type ? -1 : 1).map(f => f.party.name);
    const dutyVerb = actionDict[duty.action]?.verb || `[${duty.action}]`;
    const ruleNoun = actionDict[rule.action]?.noun || `[${rule.action}]`;

    // The rule and the duty might be the same or different; if they are different we add some language
    const ruleLanguage = rule === duty && ruleNoun ? '' : ` before ${ruleNoun}`;

    const actionWithPartyTypes = duty.action + '|' + roles.join('|');
    switch(actionWithPartyTypes) {

    case 'reviewDisclosure|assignee|assigner':
    case 'anonymize|assignee|assigner':
    case 'requestAccess|assignee':
    case 'deidentify|':
    case 'requestAccess|':
    case 'anonymize|':
        return `${dutyVerb}${ruleLanguage}`;

    case 'completeTraining|':
    case 'completeTraining|assignee':
    case 'obtainTraining|':
    case 'obtainTraining|assignee':
        return `${dutyVerb} according to the ${policy.name}${ruleLanguage}`;

    case 'sign|assignee':
    case 'sign|assignee|assigner':
    case 'submit|assignee':
    case 'submit|assignee|assigner':
    case 'submit|contractedParty':
    case 'reviewPolicy|':
    case 'reviewPolicy|assignee|assigner':
    case 'transfer|':
        return `${dutyVerb} the ${policy.name}${ruleLanguage}`;

    case 'submit|assigner':
        return `${dutyVerb} the ${policy.name} to the ${parties[0]}${ruleLanguage}`;

    case 'submit|contractedParty|contractingParty':
        return `${dutyVerb} the ${policy.name} to the ${parties[1]}${ruleLanguage}`;

    case 'obtainApproval|approvedParty|approvingParty':
    case 'obtainApproval|contractedParty|contractingParty':
    case 'obtainApproval|consentedParty|consentingParty':
    case 'obtainApproval|assignee|assigner':
    case 'obtainConsent|consentedParty|consentingParty':
    case 'obtainConsent|approvedParty|approvingParty':
    case 'obtainConsent|contractedParty|contractingParty':
    case 'classify|assignee|assigner':
        return `${dutyVerb} from the ${parties[1]}${ruleLanguage}`;

    case 'obtainApproval|approvingParty':
    case 'obtainApproval|assigner':
        return `${dutyVerb} from the ${parties[0]}${ruleLanguage}`;
    }
    console.log(`TODO: Need human readable for ${actionWithPartyTypes} with parties ${parties.join('|')} for ${policy.name}`);
    const partiesWithRoles = parties.map((p, i) => `${p} (${roles[i]})`);
    return `${partiesWithRoles.join(', ')} ${parties.length === 1 ? 'has this duty' : 'have this duty'}: ${dutyVerb}${ruleLanguage} [${policy.name}]`;
}
