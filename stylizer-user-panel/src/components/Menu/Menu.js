import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <a href="/">
        <span role="img" aria-label="Profile">&#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;</span>
        Profile
      </a>
      <a href="/">
        <span role="img" aria-label="Pictures">&#x1F4F8;</span>
        Pictures
        </a>
      <a href="/">
        <span role="img" aria-label="Measurements">&#x1F4CF;</span>
        Measurements
        </a>
      <a href="/">
        <span role="img" aria-label="Purchases">&#x1f4b8;</span>
        Purchases
        </a>

    </StyledMenu>
  )
}
Menu.propTypes = {
  open: bool.isRequired,
}
export default Menu;