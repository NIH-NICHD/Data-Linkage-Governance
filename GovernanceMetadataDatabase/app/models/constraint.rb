class Constraint < ApplicationRecord

  # List of supported operands and operators
  LEFT_OPERANDS = ['recipient', 'virtualLocation', 'product', 'purpose', 'accessPath', 'consentRequirement', 'dataRequester',
                   'deidentificationMethod', 'linkageMethod']

  OPERATORS = ['eq']

  RIGHT_OPERANDS = ['AcademicResearch', 'ApprovedPurpose', 'ControlledAccess', 'DataEnclave', 'LimitedDataset', 'SafeHarborMethod', 'DeidentifiedDataset']

  belongs_to :rule
end
