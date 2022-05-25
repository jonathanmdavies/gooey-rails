import React, { useState } from "react";
import Input from "@/frontend/components/Base/Input";

export default {
  title: "Text Input",
  component: Input,
};

const Template = (args) => {
  const [input, setInput] = useState(args.value);
  return (
    <Input {...args} value={input} onChange={(e) => setInput(e.target.value)} />
  );
};
export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  label: "Email",
  type: "email",
  name: "email",
  id: "email",
  value: "",
};

export const Errors = Template.bind({});
Errors.args = {
  variant: "errors",
  title: "With Errors",
  label: "Email",
  type: "email",
  name: "email",
  id: "email",
  value: "not an email",
  errors: ["Not a valid email address"],
};
