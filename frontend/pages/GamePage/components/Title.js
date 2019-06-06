import styled from 'styled-components';

const Title = styled.h1`
	font-size: 32px;
	text-align: left;
    color: ${({ theme }) => theme.style.textColor};
	font-weight: bold;
	font-style: italic;
    line-height: 1;
    margin-bottom: 22px;
`;

export default Title;