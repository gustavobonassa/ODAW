import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

export const Content = styled.div`
    background: #fff;
    border-radius: 4px;
    width: 100%;
    max-height: 310px;
    overflow-y: auto;
`;

export const Form = styled.div`
    padding: 15px;
`;

export const DeleteButton = styled.div`
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`;
