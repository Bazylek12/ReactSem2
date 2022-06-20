import styled from 'styled-components';

export const Span = styled.span`
  background-color: white;
  border: 1px black solid;
  border-radius: 16px;
  padding: 6px;
  color: ${props => props.active ? 'red' : 'black'}
`;