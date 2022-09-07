# frozen_string_literal: true

# == Schema Information
#
# Table name: legal_entities
#
#  id                 :bigint           not null, primary key
#  account            :string           default("")
#  accountant         :string           default("")
#  address            :string           default("")
#  bank_account       :string           default("")
#  bank_name          :string           default("")
#  bik                :string           default("")
#  checking_account   :string           default("")
#  director_name      :string           default("")
#  director_name_sign :string           default("")
#  inn                :string           default("")
#  kpp                :string           default("")
#  name               :string           default("")
#  phone              :string           default("")
#  stamp_url          :string           default("")
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# serializer
class LegalEntitySerializer < ActiveModel::Serializer
  attributes :id, :name, :inn, :kpp, :address, :checking_account, :bank_name, :bik, :account,
             :director_name, :director_name_sign, :bank_account, :phone, :accountant, :stamp_url
end
