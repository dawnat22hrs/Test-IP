'use client';

import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import styled, { css } from 'styled-components';

const variants = {
  h1: css`
    font-size: 32px;
    font-weight: 700;
    line-height: 1.3;
  `,

  h2: css`
    font-size: 24px;
    font-weight: 600;
  `,

  h3: css`
    font-size: 18px;
    font-weight: 600;
  `,

  body: css`
    font-size: 16px;
    font-weight: 400;
  `,

  label: css`
    font-size: 14px;
    font-weight: 500;
  `,

  caption: css`
    font-size: 12px;
    color: var(--text-secondary);
  `,
};

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'caption';

const StyledTypography = styled.span<{ $variant: TypographyVariant }>`
  color: var(--text-secondary);

  ${({ $variant }) => variants[$variant]}
`;

type TypographyProps<T extends ElementType> = {
  as?: T;
  variant?: TypographyVariant;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export const Typography = <T extends ElementType = 'span'>({
  as,
  variant = 'body',
  children,
  ...rest
}: TypographyProps<T>) => {
  const Component = as || 'span';

  return (
    <StyledTypography as={Component} $variant={variant} {...rest}>
      {children}
    </StyledTypography>
  );
};
