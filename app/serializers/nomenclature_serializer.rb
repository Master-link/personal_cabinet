# frozen_string_literal: true

# == Schema Information
#
# Table name: nomenclatures
#
#  id         :bigint           not null, primary key
#  code       :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_nomenclatures_on_code  (code) UNIQUE
#
# serializer
class NomenclatureSerializer < ActiveModel::Serializer
  attributes :id, :code, :name
end
