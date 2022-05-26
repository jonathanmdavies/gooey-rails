import React from "react";
import Button from "@/frontend/components/Base/Button";

export default {
  title: "Button",
  component: Button,
};

const Template = (args) => {
  return <Button {...args}>Here we go</Button>;
};

export const Primary = Template.bind({});

Primary.args = {
  size: "sm",
  color: "darkSlate",
};

export const ButtonWithIcon = Template.bind({});

ButtonWithIcon.args = {
  size: "sm",
  color: "darkSlate",
  icon: "TrashIcon",
};
