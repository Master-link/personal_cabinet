# frozen_string_literal: true

# == Schema Information
#
# Table name: clients
#
#  id                 :bigint           not null, primary key
#  deleted_at         :datetime
#  email              :string
#  name               :string
#  organization       :text
#  settings           :json
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  country_id         :bigint
#  crm_id             :integer
#  employee_id        :bigint
#  platform_client_id :integer
#
# Indexes
#
#  index_clients_on_country_id   (country_id)
#  index_clients_on_deleted_at   (deleted_at)
#  index_clients_on_employee_id  (employee_id)
#
# Foreign Keys
#
#  fk_rails_...  (country_id => countries.id)
#  fk_rails_...  (employee_id => employees.id)
#
class Client < ApplicationRecord
  include ClientStuff
  include FilterScope

  acts_as_paranoid

  belongs_to :country
  belongs_to :employee, optional: true
  has_many :users, through: :employee
  belongs_to :crm

  has_many :service_balances
  has_many :subscriptions
  has_many :tariffs, through: :subscriptions
  has_many :services, through: :tariffs
  has_many :taxophones

  scope :by_user_id, lambda { |user_id|
    crm_ids = User.includes(:crms).where(id: user_id).pluck(:crm_id)
    where(crm_id: crm_ids)
  }

  # скопы фильтраций
  scope :search_client, lambda { |search|
    if search.present?
      where(
        "crms.crm::text like ? or LOWER(clients.name) like LOWER(?) or LOWER(clients.email) like LOWER(?) or LOWER(clients.organization) like LOWER(?)",
        "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%"
      )
    end
  }
  scope :search_manager, lambda { |id|
    where(employee_id: id) if id.present? && id != "null"
  }

  scope :search_client_subscriptions, lambda { |state|
    if state == "no_subscribes"
      having("subscriptions.count = 0")
    elsif state.present? && state != "null"
      where("subscriptions.state = :state", state: state)
    end
  }

  scope :search_by_crm, lambda { |crm|
    where("crms.crm like ?", "%#{crm}%") if crm.present?
  }

  has_one :client_requisite, dependent: :destroy

  validates :crm_id, uniqueness: true, allow_nil: true
  validates :platform_client_id, uniqueness: true, allow_nil: true

  def user
    logger.warn "[DEPRECATION] `:user` is deprecated.  Please use `:users` or `:employee` instead. " \
                "Связь клиента с пользователем (менеджером) устарела. " \
                "Сейчас у клиента несколько менеджеров через сотрудников ЦРМ (employees)"
    puts caller.select { |line| line.include?(Rails.root.to_s) }.join("\n")

    users.first
  end

  def user_id
    logger.warn "[DEPRECATION] `:user_id` is deprecated. Please use `:employee_id` instead."
    puts caller.select { |line| line.include?(Rails.root.to_s) }.join("\n")

    user&.id
  end

  def unclosed_service_ids
    tariffs.where.not(subscriptions: {state: Subscription::STATE_CLOSED}).pluck(:service_id).uniq
  end

  def jsonapi_serializer_class_name
    Old::ClientSerializer
  end

  def users_roles
    users = crm.users
    roles = []
    users.each do |user|
      roles << user.roles.map(&:name)
    end
    roles.uniq.flatten
  rescue
    []
  end

  def order_roles
    exists_roles = users_roles & [Role::ROLE_Q_AND_A_FORBIDDEN, Role::ROLE_Q_AND_A_READ_ONLY]
    exists_roles.each do |exists_role|
      Users::ManageQandaRoles.call(client_id: id, role: exists_role)
    end
  end
end
