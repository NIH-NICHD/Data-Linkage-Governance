class Party < ApplicationRecord

  # List of supported parties
  TYPES = ['IRB', 'CertificationOrganization', 'DataAccessCommittee', 'DataCoordinatingCenter', 'DataProvider', 'DataRepository',
           'DataRequester', 'DisclosureReviewBody', 'GovernmentOrganization', 'Guardian', 'MinorParticipant', 'Participant',
           'PrincipalInvestigator', 'PrivacyBoard', 'ReviewCommittee']

  has_many :functions
  has_many :rules, through: :functions
end
