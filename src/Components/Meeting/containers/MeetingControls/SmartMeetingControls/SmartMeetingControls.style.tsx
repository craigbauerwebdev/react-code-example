import styled from "styled-components";

export const StyledControls: any = styled.div`
  opacity: ${(props: any) => (props.active ? "1" : "0")};
  transition: opacity 250ms ease;

  @media screen and (max-width: 768px) {
    opacity: 1;
  }
`;
