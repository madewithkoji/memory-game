import React from 'react';
import styled from 'styled-components';
import Koji from 'koji-tools';

function isImage(t) {
    // check all acceptable image extensions
    if (t.indexOf('png') !== -1
    || t.indexOf('jpeg') !== -1
    || t.indexOf('jpg') !== -1
    || t.indexOf('gif') !== -1
    || t.indexOf('ico') !== -1) {
        return true;
    }
    return false;
}

const IconWrapper = styled.div`
    visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
`;

const IconImage = styled.img`
    height: ${({ boxSize }) => boxSize}px;
    width: ${({ boxSize }) => boxSize}px;
    object-fit: contain;
    object-position: center;
    padding: 4px;
`;

const HoverOverlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.2);
    opacity: 0;
    transition: 0.2s opacity ease;
`;

const Container = styled.div`
    ${({ canClick }) => canClick && 'cursor: pointer;'}
    user-select: none;

    display: flex;
    align-items: center;
    justify-content: center;

    width: ${({ boxSize }) => boxSize}px;
    height: ${({ boxSize }) => boxSize}px;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 5px;
    font-size: 24px;
    
    box-shadow: 3px 3px 6px 0px rgba(0,0,0,0.1);

    ${({ isFlipped, isFound }) => {
        if (isFound) {
            return `background-color: ${Koji.config.style.matchedColor};`;
        }

        if (isFlipped) {
            return `background-color: ${Koji.config.style.flippedColor};`;
        }

        return `background-color: ${Koji.config.style.hiddenColor};`;
    }}

    &:hover {
        ${HoverOverlay} {
            opacity: 1.0;
        }
    }
`;

const Card = ({ isFlipped, isFound, canClick, onClick, item, boxSize }) => {
    return (
        <Container
            boxSize={boxSize}
            isFlipped={isFlipped}
            isFound={isFound}
            canClick={canClick}
            onClick={() => canClick && onClick()}
        >
            <IconWrapper isVisible={isFlipped || isFound}>
                {isImage(item) ? <IconImage boxSize={boxSize} src={item} /> : item}
            </IconWrapper>
            <HoverOverlay />
        </Container>
    );
};

export default Card;