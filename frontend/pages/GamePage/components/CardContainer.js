import styled from 'styled-components';

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-auto-rows: 1fr;
    grid-column-gap: 6px;
    grid-row-gap: 6px;
    justify-items: center;
    align-items: flex-start;
    width: 100%;
    height: calc(100vh - 170px);
`;

export default CardContainer;