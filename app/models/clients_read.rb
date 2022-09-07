# == Schema Information
#
# Table name: clients_reads
#
#  id      :bigint           not null, primary key
#  clients :jsonb
#
class ClientsRead < ApplicationRecord
  has_one :post
end
