class HelloWorldController < ApplicationController

  def index
    render inertia: 'HelloWorld/Read', props: { hello: 'world' }
  end
end
