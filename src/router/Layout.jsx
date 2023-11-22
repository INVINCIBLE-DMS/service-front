import { Outlet } from "react-router";
import { Nav } from "../components/Nav";
import { styled } from "styled-components";

export const Layout = () => {
  return <Wrapper>
    <Nav />
    <Outlet />
  </Wrapper>
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`