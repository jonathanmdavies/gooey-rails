class HelloWorldController < ApplicationController

  def index
    render inertia: 'HelloWorld/Index', props: { hello: 'world' }
  end
end
