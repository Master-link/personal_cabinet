include Swagger::Docs::ImpotentMethods

class Swagger::Docs::Config
  def self.transform_path(path, api_version)
    # Make a distinction between the APIs and API documentation paths.
    "apidocs/dist/#{path}"
  end

  def self.base_api_controller
    ActionController::API 
  end

end

Swagger::Docs::Config.register_apis({
  '1.2' => {
    controller_base_path: '',
    :clean_directory => true,
    api_file_path: 'public/apidocs/dist',
    base_path: 'http://localhost:3088'
  }
})

