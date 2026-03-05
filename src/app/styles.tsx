import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  min-height: 100vh;
  padding: 80px 20px;

  background: ${({ theme }) => theme.colors.bgPage};
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;

  width: 100%;
  max-width: 420px;

  padding: 32px;

  background: ${({ theme }) => theme.colors.bgCard};
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;
