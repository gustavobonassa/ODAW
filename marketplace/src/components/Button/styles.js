import styled from 'styled-components';
import { darken } from 'polished';

export const Btn = styled.button`
    background: ${(props) => props.isDelete ? "red" : "orange"};
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 12px;
    height: 41px;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover {
        background: ${props => darken(0.03, props.isDelete ? "red" : "orange")}
    }
`;
