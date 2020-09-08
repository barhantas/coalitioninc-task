import React from "react";
import { Redirect } from "react-router-dom";
import store from "store";
import { Form, Icon, Input, Button, Layout, Typography } from "antd";
import "../../assets/scss/signUp.scss";

import { useFetch } from "../../hooks";
import { setAuthorizationToken } from "../../utils/API";
import { URLS } from "../../constants";

const { Title } = Typography;
const { TextArea } = Input;

function SignUp({ form, history }) {
  const { getFieldDecorator, validateFields, getFieldValue } = form;
  const authToken = !!store.get("authenticationToken");
  const {
    data: { email: registeredUserEmail } = {},
    doFetch: doRegisterFetch,
  } = useFetch();

  const token = undefined;

  if (token) {
    store.set("authenticationToken", token);
    setAuthorizationToken(token);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      address,
      password,
    } = await validateFields();

    doRegisterFetch({
      url: URLS.register,
      method: "POST",
      params: {
        email: email,
        firstname: firstName,
        lastname: lastName,
        address: address,
        password: password,
      },
      onSuccess: () => {
        history.push({
          pathname: "/login",
          state: { registeredUserEmail },
        });
      },
      showSuccessNotification: true,
      successMessage: `You have successfully registered!`,
    });
  };

  return token || authToken ? (
    <Redirect to="/" />
  ) : (
    <Layout className="sign-up-layout">
      <img
        style={{ height: 60, width: 60 }}
        src={require("../../assets/img/favicon.png")}
        alt=""
      />
      <Form onSubmit={handleSubmit} className="sign-up-form">
        <Title level={2} className="text-center">
          Sign Up
        </Title>
        <Form.Item label="First Name">
          {getFieldDecorator("firstName", {
            rules: [
              { required: true, message: "Please enter your first Name!" },
            ],
          })(
            <Input
              prefix={<Icon type="user" className="input-icon" />}
              placeholder="First Name"
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item label="Last Name">
          {getFieldDecorator("lastName", {
            rules: [
              { required: true, message: "Please enter your last Name!" },
            ],
          })(
            <Input
              prefix={<Icon type="user" className="input-icon" />}
              placeholder="Last Name"
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item label="Email Address">
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please enter your email!" }],
          })(
            <Input
              prefix={<Icon type="user" className="input-icon" />}
              placeholder="Email"
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item label="Address">
          {getFieldDecorator("address", {
            rules: [{ required: true, message: "Please enter your address!" }],
          })(
            <TextArea
              rows={4}
              prefix={<Icon type="pushpin" className="input-icon" />}
              placeholder="Address"
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please enter your Password!" }],
          })(
            <Input.Password
              prefix={<Icon type="lock" className="input-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item label="Confirm Password">
          {getFieldDecorator("repeatedPassword", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!",
                validator: (rule, value) => {
                  if (!!value && getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              },
            ],
          })(
            <Input.Password
              prefix={<Icon type="lock" className="input-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Sign Up
        </Button>
      </Form>
    </Layout>
  );
}

export default Form.create({ name: "signUpForm" })(SignUp);
