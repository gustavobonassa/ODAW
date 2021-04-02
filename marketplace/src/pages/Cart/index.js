import React from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import * as CardActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total, EmptyCart } from './styles';
import history from '../../services/history';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
    function increment(product) {
        updateAmountRequest(product._id, product.amount + 1);
    }
    function decrement(product) {
        updateAmountRequest(product._id, product.amount - 1);
    }

    if (!cart.length) {
        return (
            <Container>
                <EmptyCart>
                    <Typography variant="h5" gutterBottom>
                        Seu carrinho está vazio.
                    </Typography>
                    <HiOutlineEmojiSad size={80} color="#3c3c3c" style={{ marginBottom: "10px" }} />
                    <Button variant="outlined" color="primary" onClick={() => history.push("/")}>
                        Começe a comprar
                    </Button>
                </EmptyCart>
            </Container>
        )
    }

    return (
        <Container>
            <ProductTable>
                <thead>
                    <tr>
                        <th />
                        <th>PRODUTO</th>
                        <th>QTD</th>
                        <th>SUBTOTAL</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {cart.map(product => (
                        <tr key={product._id}>
                            <td>
                                <img src={product.image} alt={product.title} />
                            </td>
                            <td>
                                <strong>{product.title}</strong>
                                <span>{product.priceFormatted}</span>
                            </td>
                            <td>
                                <div>
                                    <button type="button" onClick={() => decrement(product)}>
                                        <MdRemoveCircleOutline size={20} color="orange" />
                                    </button>
                                    <input type="number" readOnly value={product.amount} />
                                    <button type="button" onClick={() => increment(product)}>
                                        <MdAddCircleOutline size={20} color="orange" />
                                    </button>

                                </div>
                            </td>
                            <td>
                                <strong>{product.subtotal}</strong>
                            </td>
                            <td>
                                <button type="button" onClick={() => removeFromCart(product._id)}>
                                    <MdDelete size={20} color="red" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </ProductTable>

            <footer>
                <button type="button" onClick={() => history.push("/purchase")}>Finalizar pedido</button>

                <Total>
                    <span>TOTAL</span>
                    <strong>{total}</strong>
                </Total>
            </footer>
        </Container>
    );
}

const mapStateToProps = state => ({
    cart: state.cart.map(product => ({
        ...product,
        subtotal: formatPrice(product.price * product.amount)
    })),
    total: formatPrice(state.cart.reduce((total, product) => {
        return total + product.price * product.amount
    }, 0))
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(CardActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
