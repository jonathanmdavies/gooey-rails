class HelloWorldController < ApplicationController
  before_action :authenticate_account!

  def index
    render inertia: 'HelloWorld/Read', props: { hello: 'world' }
  end
end
