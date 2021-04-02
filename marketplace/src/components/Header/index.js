import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdShoppingBasket, MdPerson, MdDirectionsRun } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/modules/user/actions';

import { Container, Cart, Btn } from './styles';
import logo from '../../assets/images/logo.png';

function Header({cartSize, token}) {
    const dispatch = useDispatch();

    return (
        <Container>
            <Link to="/">
                <img src={logo} alt="Mercado"/>
            </Link>

            {token ? (
                <Btn style={{ marginRight: 10 }} onClick={() => dispatch(signOut())}>
                    <MdDirectionsRun size={36} color="#fff" />
                </Btn>
            ) : (
                <div style={{ display: "flex" }}>
                    <Cart to="/login" style={{ marginRight: 10 }}>
                        <MdPerson size={36} color="#fff" />
                    </Cart>
                    <Cart to="/cart">
                        <div>
                            <strong>Meu Carrinho</strong>
                            <span>{cartSize} itens</span>
                        </div>
                        <MdShoppingBasket size={36} color="#fff" />
                    </Cart>
                </div>
            )}
        </Container>
    );
}
export default connect(state => ({
    cartSize: state.cart.length,
    token: state.user.token
}))(Header);
