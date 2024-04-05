class Party < ApplicationRecord

  # List of supported parties
  TYPES = ['IRB', 'CertificationOrganization', 'DataAccessCommittee', 'DataCoordinatingCenter', 'DataEnclave', 'DataProvider', 'DataRepository',
           'DataRequester', 'DisclosureReviewBody', 'GovernmentOrganization', 'Guardian', 'LinkageHonestBroker', 'MinorParticipant',
           'Participant', 'PrincipalInvestigator', 'PrivacyBoard', 'ReviewCommittee', 'TechnologyVendor']

  has_many :functions
  has_many :rules, through: :functions
end
