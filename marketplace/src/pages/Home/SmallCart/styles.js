import styled from 'styled-components';
import { darken } from 'polished';

export const FloatingCart = styled.div`
    position: absolute;
    right: 30px;
    top: 100px;
`;


export const Cart = styled.div`
    border-radius: 3px;
    width: 300px;
    height: 400px;
    background-color: white;
    display: flex;
    justify-content: center;
    padding: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
