# frozen_string_literal: true

# a Ability model
class Ability
  include CanCan::Ability

  # в initialize:
  # subject и params используется в таблице resolutions.condition ! НЕ УДАЛЯТЬ
  def initialize(user, params)
    user ||= User.new
    can :manage, :all if user.roles.any? { |h| h[:name] == Role::ROLE_ADMIN }

    can do |action, subject_class, subject|

      user.roles.any? do |role|
        resolution = Resolution.where(
            c_class: subject_class.to_s,
            c_action: action,
            enabled: true
        ).where(
            "json_data->'roles'= '[]'::jsonb OR json_data->'roles' @> '[\"#{role.name}\"]'::jsonb"
        ).first
        if resolution.present? && role.resolutions.map(&:id).include?(resolution.id)
          if resolution.condition.present?
            eval(resolution.condition)
          else
            true
          end
        else
          false
        end
      end
    end
  end
end