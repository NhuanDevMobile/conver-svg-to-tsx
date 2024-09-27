import React from 'react';
import styled from 'styled-components';

import color from '../styles/color';
import getVariantColor, { VariantType } from '../utils/getVariantColor';

import Text from '../components/Text';
import Link from '../components/Link';
import Grid from '../components/Grid';
import GridCell from '../components/GridCell';

import IconLogo from '../icons/IconLogo';
import IconStar from '../icons/IconStar';
import IconGithub from '../icons/IconGithub';

interface INavBar {
  variant: VariantType;
}

interface IHeader {
  variant: VariantType;
}

const Header = styled.header<IHeader>`
  padding: 25px 40px;
  transition: 300ms linear;
  border-bottom: 2px solid ${color.black};
  background-size: 300% 100%;
  background-color: ${({ variant }) => getVariantColor(variant)};
`;

const TextLogo = styled(Text)`
  margin: 0 0 0 7px;
    font-size: 40px;
`;
const StyledLink = styled.a`
  display: flex;
  align-items: center; // Căn giữa theo chiều dọc
  text-decoration: none; // Bỏ gạch chân
`;


const TextStar = styled(Text)`
  margin: 0 5px 0 7px;
`;

function NavBar({ variant }: INavBar) {
  return (
    <Header variant={variant}>
      <Grid columns="auto auto">
        <GridCell>
        <StyledLink href="https://nhuandev.com" target="_blank" rel="noopener noreferrer">
  <IconLogo />
  <TextLogo fontWeight="bold">NHUAN DEV</TextLogo>
</StyledLink>
        </GridCell>
      
      </Grid>
    </Header>
  );
}

export default NavBar;
