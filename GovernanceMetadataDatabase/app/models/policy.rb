class Policy < ApplicationRecord

  # List lof supported Policies
  TYPES = ['Agreement', 'Certification', 'Consent', 'Contract', 'DataUseAgreement', 'Determination', 'IRBDocumentation',
           'Law', 'Policy', 'PrivacyBoardDocumentation', 'Process', 'Request']


  self.inheritance_column = nil # Allows us to use 'type' as a column
  belongs_to :dataset
  has_many :rules
  has_many :policy_commentaries, through: :rules
  has_many :sources, through: :policy_commentaries
  has_many :parties, through: :rules

  # A policy can require many policies and be required by many policies, so we use a join table
  has_many :requiring_requirements, class_name: 'Requirement', foreign_key: :required_policy_id
  has_many :requiring_policies, through: :requiring_requirements, source: :requiring_policy
  has_many :required_requirements, class_name: 'Requirement', foreign_key: :requiring_policy_id
  has_many :required_policies, through: :required_requirements, source: :required_policy

  # Represent a policy in the same way we display examples in the metadata schema
  def to_example_yaml
    # We filter in code rather than DB so we can display un-saved policies
    permissions = self.rules.select { |r| r.type == 'Permission' }.map do |permission|
      constraints = permission.constraints.map do |constraint|
        {
          leftOperand: constraint.left_operand,
          operator: constraint.operator,
          rightOperand: constraint.right_operand
        }
      end
      # Duties under permissions are just duties
      duties = permission.duties.map do |duty|
        result = {
          action: duty.action
        }
        Function::TYPES.map { |t| t.camelize.downcase_first }.each do |function|
          result[function] = duty.get_parties(function).map(&:name) if duty.get_parties(function).present?
        end
        result
      end
      result = {
        action: permission.action,
      }
      result[:constraint] = constraints if constraints.size > 0
      result[:duty] = duties if duties.size > 0
      Function::TYPES.map { |t| t.camelize.downcase_first }.each do |function|
        result[function] = permission.get_parties(function).map(&:name) if permission.get_parties(function).present?
      end
      result
    end
    prohibitions = self.rules.select { |r| r.type == 'Prohibition' }.map do |prohibition|
      result = {
        action: prohibition.action,
      }
      Function::TYPES.map { |t| t.camelize.downcase_first }.each do |function|
        result[function] = prohibition.get_parties(function).map(&:name) if prohibition.get_parties(function).present?
      end
      result
    end
    # Top level duties are obligations
    obligations = self.rules.select { |r| r.type == 'Duty' }.map do |obligation|
      result = {
        action: obligation.action,
      }
      Function::TYPES.map { |t| t.camelize.downcase_first }.each do |function|
        result[function] = obligation.get_parties(function).map(&:name) if obligation.get_parties(function).present?
      end
      result
    end
    result = {
      policy: [
        {
          type: self.type,
          title: self.name,
          uid: self.name.gsub(/\W+/, '_').camelize,
          profile: "https://www.nichd.nih.gov/data_governance_odrl",
          target: self.dataset.name.gsub(/\W+/, '_').camelize
        }
      ]
    }
    result[:policy].first[:requires] = self.required_policies.map { |p| p.name.gsub(/\W+/, '_').camelize } if self.required_policies.length > 0
    result[:policy].first[:permission] = permissions if permissions.length > 0
    result[:policy].first[:prohibition] = prohibitions if prohibitions.length > 0
    result[:policy].first[:obligation] = obligations if obligations.length > 0

    return result.deep_stringify_keys.to_yaml
  end

  # Build and return new policy just containting rules from a specific lifecycle, intended for use in display and not for saving
  def narrow(lifecycle: nil, rule: nil)
    narrowed_policy = Policy.new(self.attributes.except('id'))
    relevant_rules = self.rules.to_a
    relevant_rules.select! { |r| r.policy_commentaries.where(data_lifecycle: lifecycle).count > 0 } if lifecycle
    relevant_rules.select! { |r| r == rule } if rule
    relevant_rules.each do |relevant_rule|
      narrowed_rule = narrowed_policy.rules.new(relevant_rule.attributes.except('id'))
      relevant_rule.constraints.each { |c| narrowed_rule.constraints.new(c.attributes.except('id')) }
      relevant_rule.duties.each { |d| narrowed_rule.duties.new(d.attributes.except('id')) }
      relevant_rule.functions.each { |f| narrowed_rule.functions.new(f.attributes.except('id')) }
    end
    return narrowed_policy
  end
end
