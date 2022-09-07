module ClientStuff
  def listemails
    email.map { |i| i }.join(', ')
  end
end
