'use client';

import styled from 'styled-components';
import { motion, HTMLMotionProps } from 'framer-motion';

const StyledButton = styled(motion.button)`
  padding: 12px 16px;
  border-radius: 8px;
  border: none;

  font-weight: 600;
  font-size: 14px;

  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textPrimary};

  cursor: pointer;

  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

type ButtonProps = HTMLMotionProps<'button'>;

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <StyledButton
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
