import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Input, Tooltip, Icon, Button, notification } from 'antd';

import logo from 'assets/FNLogodarkV2.png';
import styles from './signUp.module.css';

class SignUp extends Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      history: { push },
    } = this.props;

    validateFieldsAndScroll(async (err, values) => {
      const openNotificationWithIcon = (type, message) => {
        notification[type]({
          message,
          duration: 2,
        });
      };
      if (!err) {
        try {
          const { data } = await axios.post('/api/v1/sign-up', values);
          if (data.statusCode === 201) {
            push('/view-buildings');
          } else if (data.statusCode === 409) {
            openNotificationWithIcon('info', 'Email already exists');
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

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;

    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={`${styles.signUpPage} signUp-controller`}>
        <div className={styles.signUp}>
          <div className={styles.logoSection} />
          <div className={styles.formSection}>
            <div className={styles.logo__layout}>
              <img src={logo} alt="logo" className={styles.logo} />
              <Link to="/sign-in">
                <Button className="form__button">Sign in</Button>
              </Link>
            </div>
            <h1 className={styles.heading}>Create Your Account</h1>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirmPassword', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Username&nbsp;
                    <Tooltip title="What do you want others to call you?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your nickname!',
                      whitespace: true,
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Sign Up
                </Button>
                <div className={styles.hasAccount}>
                  <span>
                    Already a member?
                    <Link to="/sign-in">
                      <h4 className={styles.signin}>Sign in</h4>
                    </Link>
                  </span>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const WrappedSignUp = Form.create({ name: 'SignUp' })(SignUp);
export default WrappedSignUp;
