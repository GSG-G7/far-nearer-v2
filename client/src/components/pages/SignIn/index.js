import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';

import styles from './signIn.module.css';

class SignInForm extends Component {
  handleSubmit = e => {
    const {
      form: { validateFields },
    } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={`${styles.signin} signIn-controller `}>
        <h1 className={styles.heading}>Welcome Back !!</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <div className={styles.signin__button}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              <a href="../">register now!</a>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}

SignInForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
};

const SignIn = Form.create({ name: 'validate_other' })(SignInForm);

export default SignIn;
