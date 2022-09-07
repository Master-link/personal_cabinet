# frozen_string_literal: true

env :PATH, ENV['PATH']
set :bundle_command, '/home/appuser/.rbenv/versions/3.0.1/bin/bundle exec'
set :environment, "production"
set :output, {:error => "log/cron_error_log.log", :standard => "log/cron_log.log"}
set :job_template, nil
set :whenever_identifier, ->{ "#{fetch(:application)}_#{fetch(:stage)}" }

job_type :command, ':task :output'
job_type :rake,    'cd :path && :environment_variable=:environment bundle exec rake :task --silent :output'
job_type :runner,  "cd :path && bin/rails runner -e :environment ':task' :output"
job_type :script,  'cd :path && :environment_variable=:environment bundle exec script/:task :output'
job_type :thor,    'cd :path && RUBYOPT=W0 :environment_variable=:environment bundle exec thor :task :output'
