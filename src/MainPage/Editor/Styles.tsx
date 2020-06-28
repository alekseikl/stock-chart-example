import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  border-right: solid 1px #DEDEDE;
  border-bottom: solid 1px #DEDEDE;
  font-size: 10px;
`;

export const ValuesRow = styled.div`
  display: flex;
  height: 24px;
`;

const CommonCell = css`
  border-left: solid 1px #DEDEDE;
  border-top: solid 1px #DEDEDE;
`;

export const NameCell = styled.div`
  ${CommonCell};
  display: flex;
  align-items: center;
  padding: 0 2px;
  width: 60px;
  font-size: 11px;
  font-weight: bold;
`;

export const Cell = styled.div`
  ${CommonCell};
  display: flex;
  flex: 1;
`;

export const ValueInput = styled.input.attrs({
  type: 'text'
})`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  text-align: right;
  padding: 0 4px 0 0;
  z-index: 1;

  :focus {
    box-shadow: 0px 0px 0px 2px rgba(23,98,64,1);
  }
`;

