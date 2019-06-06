import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	background-color: ${({ theme }) => theme.style.backgroundColor};
    ${({ theme }) => theme.images.backgroundImage && `background-image: url('${theme.images.backgroundImage}'); background-size: cover;`}
	padding: 12px 24px;
`;

const Inner = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Container = ({ children }) => (
    <Wrapper>
        <Inner>{children}</Inner>
    </Wrapper>
);

export default Container;