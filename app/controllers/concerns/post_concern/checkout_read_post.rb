# frozen_string_literal: true

module PostConcern
  module CheckoutReadPost
    def checkout_post(client, post)
      prepare_post(post)
      @post.clients_read.clients["read"] << client.id
      @post.clients_read.clients["read"].uniq!
      @post.clients_read.save
    end

    def get_read_posts(post)
      clients_read = post.clients_read.clients["read"]
      clients = Client.includes(:crm).where(id: clients_read)
      clients.map { |client| {crm: client.crm.crm} }
    end

    private

    def prepare_post(post)
      @post = post
      return if @post.clients_read

      @post.clients_read = ClientsRead.create!
      @post.clients_read.clients["read"] = []
      @post.clients_read.save
    end
  end
end
