import React from 'react';
import { Btn } from './styles';

function Button(props) {
    return (
        <Btn type="button" isDelete={props.isDelete} onClick={(e) => props.onClick(e)} style={props.style}>
            {props.children}
        </Btn>
    )
}

export default Button;
