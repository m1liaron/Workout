import styled from '@emotion/styled';
import { Link } from "react-router-dom";

export const NavLink = styled(Link)`
  color: #ffff;
  textDecoration: none;
  fontSize: 2rem;
  padding: 2rem;
  background: #554BC5;
  borderRadius: 2rem;

  &:hover {
    color: #fff;
    background: #383091;
  }
`;