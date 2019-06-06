import styled from 'styled-components';

const Toolbar = styled.div`
    width: 100%;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${({ theme }) => theme.style.textColor};
    opacity: 0.7;
    padding: 0 2px 8px 2px;
    justify-content: space-between;
`;

export const Time = styled.div`
    
`;

export const Moves = styled.div`

`;

export const Score = styled.div`

`;

export default Toolbar;