import styled from 'styled-components';

export const RestartRow = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const RestartButton = styled.div`
    cursor: pointer;
    font-weight: bold;
    color: ${({ theme }) => theme.style.textColor};
    opacity: 0.7;
    padding-top: 12px;

    &:hover {
        opacity: 1.0;
    }
`;