import styled from 'styled-components';
import Koji from 'koji-tools';

const Title = styled.h1`
	font-size: 32px;
	text-align: left;
    color: ${Koji.config.style.textColor};
	font-weight: bold;
	font-style: italic;
    line-height: 1;
    margin-bottom: 22px;
`;

export default Title;