# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  deleted_at             :datetime
#  email                  :string
#  login                  :string
#  name                   :string
#  password_digest        :string
#  phone_number           :string
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_login         (login) UNIQUE
#  index_users_on_phone_number  (phone_number) UNIQUE
#
class User < ApplicationRecord
  rolify
  has_secure_password
  acts_as_paranoid

  has_many :tmstats, dependent: :nullify
  has_many :users_signins, dependent: :destroy
  has_many :questions, class_name: 'Qa::Question', dependent: :nullify
  has_many :answers, class_name: 'Qa::Answer', dependent: :nullify

  has_and_belongs_to_many :crms
  has_and_belongs_to_many :employees

  # поиск юзера по: name, email, login, phone_number
  scope :search_user, lambda { |search|
    if search.present?
      where(
        'LOWER(users.name) like LOWER(?) or LOWER(users.email) like LOWER(?) or LOWER(users.login) like LOWER(?) or users.phone_number like ?',
        "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%"
      )
    end
  }

  # поиск юзера связанных с CRM
  scope :search_crm, lambda { |search|
    where('crms.crm like ?', "%#{search}%") if search.present?
  }

  scope :search_strict_crm, lambda { |search|
    where('crms.crm like ?', search) if search.present?
  }

  # фильтрация юзеров по роли
  scope :filter_role, lambda { |role|
    with_role role.to_sym if role.present?
  }

  # Validations
  validates_presence_of :login, :email, :password_digest

  validates :phone_number, uniqueness: true, allow_blank: true
  validates :login, uniqueness: true
  validates :email, uniqueness: true, format: {
    with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create
  }

  validates_inclusion_of :role,
                         in: Role::ALL_ROLES,
                         on: :create

  # virtual field
  attr_accessor :role
  attr_accessor :user_role

  def admin?
    has_role?(:admin)
  end

  def director?
    has_role?(:director)
  end

  def manager?
    has_role?(:manager)
  end

  def primary_roles?
    admin? || observer? || manager?
  end

  def observer?
    has_role?(:observer)
  end

  def employee?
    has_role?(:employee)
  end

  def client?
    has_role?(:client)
  end

  def q_and_a_forbidden?
    has_role?(:q_and_a_forbidden)
  end

  def q_and_a_read_only?
    has_role?(:q_and_a_read_only)
  end

  def user_role
    roles.map(&:name).uniq.join(',')
  end

  def generate_password_token!
    self.reset_password_token = generate_token
    self.reset_password_sent_at = Time.now.utc
    save!
  end

  def password_token_valid?
    (reset_password_sent_at + 4.hours) > Time.now.utc
  end

  def reset_password!(password)
    self.reset_password_token = nil
    self.password = password
    save!
  end

  def clear_tokens!
    users_signins.update_all(token: nil)
  end

  def generate_new_token!
    self.password = generate_token
    self.reset_password_token = generate_token
    self.reset_password_sent_at = Time.now.utc
    save!
  end

  def jsonapi_serializer_class_name
    Old::UserSerializer
  end

  private

  def generate_token
    SecureRandom.hex(10)
  end
end
