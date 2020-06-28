import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  color: #5e5e5e;
  font-size: 12px;
  font-weight: 600;
  font-family: sans-serif;

  margin: 24px;
  border: solid 1px #DEDEDE;
`;

export const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 16px 16px 16px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  
  :not(:last-child) {
    margin-right: 12px;
  }
`;

export const LegendLine = styled.div`
  width: 30px;
  height: 3px;
  border-radius: 1.5px;
  margin-right: 2px;
`;