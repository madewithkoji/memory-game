import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    widtH: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    top: 0;
    left: 0;
    display: flex;
`;

const ModalInner = styled.div`
    width: 300px;
    margin: auto;
    background-color: #fff;
    box-shadow: 0 1px 20px 7px rgba(0,0,0,0.3);
`;

export const Modal = ({ onClose, children }) => (
    <Overlay onClick={() => onClose()}>
        <ModalInner>
            {children}
        </ModalInner>
    </Overlay>
);

export const Row = styled.div`
    padding: 16px;
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,0.1);
`;
