import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  position: relative;
  > p {
    color: red;
  }
`

export const InputStyleContainer = styled.input`
  width: 372px;
  height: 48px;
  border-radius: 12px;
  background: #F0F0F0;
  overflow: hidden;
  border: none;

  color: #A2A2A2;
  font-size: 1rem;
  padding: 0 0.75rem 0 44px;
  
  &::placeholder {
    color: #757575;
  }
`