class Function < ApplicationRecord

  # List of the supported functions
  TYPES = ['assigner', 'assignee', 'contracting_party', 'contracted_party', 'approving_party', 'approved_party', 'consenting_party', 'consented_party']

  self.inheritance_column = nil # Allows us to use 'type' as a column
  belongs_to :rule
  belongs_to :party
end
