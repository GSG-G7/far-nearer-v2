import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Icon } from 'antd';
import { HashLink as Link } from 'react-router-hash-link';

import styles from './header.module.css';

const Header = ({ onCityChange }) => {
  const menu = (
    <Menu onClick={onCityChange}>
      <Menu.Item key="1">
        <Link smooth to="/#sharingBuildings">
          Morecambe
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link smooth to="/#sharingBuildings">
          Hastings
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>who owns your neighbourhood</h1>
      <p className={styles.description}>
        Report, view, and investigate empty and at risk buildings
        <Dropdown overlay={menu}>
          <Button className={styles['share-btn']}>
            Choose location <Icon type="down" />
          </Button>
        </Dropdown>
      </p>
    </header>
  );
};

Header.propTypes = {
  onCityChange: PropTypes.func.isRequired,
};

export default Header;
