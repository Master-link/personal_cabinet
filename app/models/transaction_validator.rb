# frozen_string_literal: true

Detail = Dry::Schema.Params do
  optional(:detail).hash do
    optional(:comment).filled(:string)
  end
end

class TransactionValidator < Dry::Validation::Contract
  params(Detail) do
    required(:client_id).filled(:integer)
    optional(:subscription_id).filled(:integer)
    required(:service_id).filled(:integer)
    optional(:user_id).filled(:integer)
    optional(:source).filled(:string)
    required(:money).filled(:float)
  end
end
