class Rule < ApplicationRecord

  # List of supported actions
  ACTIONS = ['access', 'anonymize', 'approve', 'classify', 'collect', 'completeTraining', 'deidentify', 'execute',
             'link', 'makeDetermination', 'obtainApproval','obtainConsent', 'reidentify', 'researchUse', 'reviewPolicy',
             'secondaryLink', 'secondaryUse', 'sell', 'share', 'sign', 'submit', 'transfer']

  self.inheritance_column = nil # Allows us to use 'type' as a column
  # Can either belong to a policy or a rule (if it's a duty)
  # TODO: Consider making this a polymorphic relationship and/or adding some validation
  belongs_to :policy, optional: true
  belongs_to :rule, optional: true
  has_many :constraints
  has_many :functions
  has_many :parties, through: :functions
  has_many :policy_commentaries
  has_many :duties, class_name: 'Rule'
  # Note: Rules have a target, but at the moment we leave it implicit as being the dataset
  has_one :data_lifecycle, through: :policy_commentary
  has_one :dataset, through: :policy

  # Utility method for adding a party relationship with a particular function type
  def add_party(function_type, party_name)
    party = Party.find_or_create_by(name: party_name)
    self.functions.find_or_create_by(type: function_type, party: party)
  end

  # Utility method for getting a party relationship for a particular function type
  def get_parties(function_type)
    # We do this in code rather than in the DB so that this works with un-saved rules
    self.functions.select { |f| f.type == function_type }.map(&:party)
  end
end
