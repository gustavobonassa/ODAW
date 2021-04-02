import React from 'react';
import Button from '../../../components/Button';


import { FloatingCart, Cart } from './styles';

const SmallCart = () => {
  return (
    <FloatingCart>
        <Cart>
            <Button style={{ width: "100%" }}>
                Finalizar compra
            </Button>
        </Cart>
    </FloatingCart>
  );
}

export default SmallCart;
