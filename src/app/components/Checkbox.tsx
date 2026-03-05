'use client';

import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.accent};
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = ({ label, ...props }: Props) => {
  return (
    <Wrapper>
      <CheckboxInput type="checkbox" {...props} />
      {label}
    </Wrapper>
  );
};
