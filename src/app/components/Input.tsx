'use client';

import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';

const InputField = styled.input<{ $hasError?: boolean }>`
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? theme.colors.error : theme.colors.border)};

  background: ${({ theme }) => theme.colors.bgCard};
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 14px;
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = ({ hasError, ...props }: Props) => {
  return <InputField $hasError={hasError} {...props} />;
};
