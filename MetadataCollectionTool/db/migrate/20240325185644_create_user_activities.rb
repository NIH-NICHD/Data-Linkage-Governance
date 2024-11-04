class CreateUserActivities < ActiveRecord::Migration[7.1]
  def change
    create_table :user_activities do |t|
      t.string :user_email
      t.string :activity
      t.references :questionnaire_response
      t.timestamps
    end
  end
end
