class Constraint < ApplicationRecord

  # List of supported operands and operators
  LEFT_OPERANDS = ['careType', 'recipient', 'virtualLocation', 'product', 'purpose', 'accessPath', 'consentRequirement', 'dataRequester',
                   'deidentificationMethod', 'linkageMethod']

  OPERATORS = ['eq']

  RIGHT_OPERANDS = ['AcademicResearch', 'ApprovedPurpose', 'ApprovedProtocol', 'ControlledAccess', 'DataEnclave', 'DataProvider',
                    'DeidentifiedDataset', 'HIVHealthcare', 'LimitedDataset', 'PrivacyPreservingRecordLinkage', 'ReproductiveHealthcare',
                    'SafeHarborMethod', 'Waived']

  belongs_to :rule
end
