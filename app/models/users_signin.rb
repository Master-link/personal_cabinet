# == Schema Information
#
# Table name: users_signins
#
#  id         :bigint           not null, primary key
#  token      :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_users_signins_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class UsersSignin < ApplicationRecord
  belongs_to :user
end
