$redis = Redis::Namespace.new("lk", redis: Redis.new(url: ENV["REDIS_CACHE_URL"]))
