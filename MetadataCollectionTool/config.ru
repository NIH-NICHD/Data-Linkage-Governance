# This file is used by Rack-based servers to start the application.

require_relative "config/environment"

# If we have a relative root for a deployment behind a reverse proxy
map Rails.application.config.relative_url_root || '/' do
  run Rails.application
  Rails.application.load_server
end
