JsRoutes.setup do |c|
  # Setup your JS module system:
  # ESM, CJS, AMD, UMD or nil
  # c.module_type = "ESM"
  c.file = Rails.root.join('app/frontend/routes.js')
end