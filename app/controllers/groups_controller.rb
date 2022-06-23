class GroupsController < ApplicationController
  before_action :authenticate_account!

  def create
    group = current_account.groups.build(group_params)

    if group.save
      redirect_back fallback_location: root_path
    else
      redirect_back fallback_location: root_path, inertia: { errors: group.errors.messages }
    end
  end

  private

  def group_params
    params.require(:group).permit(:name)
  end
end
