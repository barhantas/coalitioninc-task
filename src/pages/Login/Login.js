import React from "react";
import { Redirect, Link } from "react-router-dom";
import store from "store";
import { Form, Icon, Input, Button, Layout, Row } from "antd";
import "../../assets/scss/login.scss";

import { useFetch } from "../../hooks";
import { setAuthorizationToken } from "../../utils/API";
import { URLS } from "../../constants";

function Login({
  form,
  location: { state: { registeredUserEmail } = {} } = {},
  location,
  ...rest
}) {
  console.log(location)
  console.log(rest)

  const { getFieldDecorator, validateFields } = form;
  const authToken = !!store.get("authenticationToken");
  const {
    data: { token },
    doFetch,
  } = useFetch();

  if (token) {
    store.set("authenticationToken", token);
    setAuthorizationToken(token);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    doFetch({
      url: URLS.login,
      params: await validateFields(),
    });
  };

  console.log("registeredUserEmail",registeredUserEmail);

  return token || authToken ? (
    <Redirect to="/" />
  ) : (
    <Layout className="login-layout">
      <img
        style={{ height: 60, width: 60 }}
        src={require("../../assets/img/favicon.png")}
        alt=""
      />
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please enter your email!" }],
            initialValue: registeredUserEmail,
          })(
            <Input
              prefix={<Icon type="user" className="input-icon" />}
              placeholder="Email"
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please enter your Password!" }],
          })(
            <Input
              prefix={<Icon type="lock" className="input-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
            Log in
          </Button>
          <Row>
            <Link to="/sign-up">Sign Up</Link>
          </Row>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default Form.create({ name: "loginForm" })(Login);
