'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from './Typography';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
`;

export const ModalContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 420px;

  background: ${({ theme }) => theme.colors.bgCard};
  border-radius: 12px;
  padding: 32px;
  margin: 15px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;

  border: none;
  background: transparent;

  font-size: 18px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};

  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, title, onClose, children }) => {
  // флаг, чтобы рендерить только на клиенте
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <Overlay
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ModalContainer
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <CloseButton onClick={onClose}>✕</CloseButton>

            {title && (
              <Typography as="h2" variant="h2">
                {title}
              </Typography>
            )}

            {children}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body,
  );
};
