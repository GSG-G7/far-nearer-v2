import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Icon, Input, Button, notification } from 'antd';

import logo from 'assets/FNLogodarkV2.png';
import styles from './signIn.module.css';

class SignInForm extends Component {
  handleSubmit = e => {
    const {
      form: { validateFields },
      history: { push },
      updateAuth,
    } = this.props;

    e.preventDefault();
    validateFields(async (err, values) => {
      const openNotificationWithIcon = (type, message) => {
        notification[type]({
          message,
          duration: 2,
        });
      };
      if (!err) {
        try {
          const { data } = await axios.post('/api/v1/sign-in', values);
          if (data.statusCode === 200) {
            updateAuth();
            push('/view-buildings');
          } else if (data.statusCode === 401) {
            openNotificationWithIcon(
              'info',
              'Invalid Credintials! Please try again',
            );
          }
        } catch (error) {
          openNotificationWithIcon(
            'error',
            'Something went wrong! Please try again',
          );
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className="signIn-controller">
        <div className={styles.signIn}>
          <div className={styles.logoSection} />
          <div className={styles.formSection}>
            <div className={styles.logo__layout}>
              <Link to="/">
                <img src={logo} alt="logo" className={styles.logo} />
              </Link>
              <Link to="/sign-up">
                <Button className="form__button">Sign up</Button>
              </Link>
            </div>
            <h1 className={styles.heading}>Welcome Back!!</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Please input your email!' },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="example@example.com"
                  />,
                )}
              </Form.Item>
              <Form.Item label="Password">
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your Password!' },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(
                  <Input.Password
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
                    onClick={this.handleSubmit}
                    className="login-form-button"
                    block
                  >
                    Log in
                  </Button>
                  <span className={styles.signup__message}>
                    Don&apos;t have an account?{' '}
                  </span>
                  <Link to="/sign-up">Register now!</Link>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

SignInForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  updateAuth: PropTypes.func.isRequired,
};

const SignIn = Form.create({ name: 'validate_other' })(SignInForm);

export default SignIn;
