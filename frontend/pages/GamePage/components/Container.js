import React from 'react';
import styled from 'styled-components';
import Koji from 'koji-tools';

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	background-color: ${() => Koji.config.style.backgroundColor};
    ${() => Koji.config.images.backgroundImage && `background-image: url('${Koji.config.images.backgroundImage}'); background-size: cover;`}
`;

const Inner = styled.div`
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 48px);
`;

const Container = ({ children }) => (
    <Wrapper>
        <Inner>{children}</Inner>
    </Wrapper>
);

export default Container;