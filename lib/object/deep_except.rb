# frozen_string_literal: true

class Hash
  def deep_except(*keys)
    result = {}
    self.except(*keys).each { |k, v| result[k] = v.deep_except(*keys) }
    result
  end
end

class Array
  def deep_except(*keys)
    self.map { |v| v.deep_except(*keys) }
  end
end

class Object
  def deep_except(*_keys)
    self
  end
end
