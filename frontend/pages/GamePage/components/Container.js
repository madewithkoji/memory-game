import React from 'react';
import styled from 'styled-components';
import Koji from 'koji-tools';

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	background-color: ${() => Koji.config.style.backgroundColor};
    ${() => Koji.config.images.backgroundImage && `background-image: url('${Koji.config.images.backgroundImage}'); background-size: cover;`}
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