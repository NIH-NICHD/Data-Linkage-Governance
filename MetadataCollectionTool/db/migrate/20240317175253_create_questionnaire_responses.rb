class CreateQuestionnaireResponses < ActiveRecord::Migration[7.1]
  def change
    create_table :questionnaire_responses do |t|
      t.string :dataset_name
      t.jsonb :resource
      t.boolean :deleted, default: false
      t.string :user_email
      t.timestamps
    end
  end
end
