import styled from "styled-components/macro";

export const LocationPopupContainer = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: rgba(146, 165, 184, 0.5) 0px 26px 49px;
  padding: 20px;
  padding-top: 25px;
  margin-bottom: 20px;
  font-size: 14px;
  max-width: 200px;
  z-index: 9999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: -18px;
    left: 10px;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
  }
`;

export const Close = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #888;
  transition: color 0.2s;

  &:hover {
    color: #ff0000;
  }
`;
