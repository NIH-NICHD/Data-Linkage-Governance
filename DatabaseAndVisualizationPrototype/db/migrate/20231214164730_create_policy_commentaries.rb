class CreatePolicyCommentaries < ActiveRecord::Migration[7.1]
  def change
    create_table :policy_commentaries do |t|
      t.references :rule
      t.references :data_lifecycle
      t.text :language
      t.text :interpretation
      t.timestamps
    end
  end
end
