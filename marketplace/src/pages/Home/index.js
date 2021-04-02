import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MdAddShoppingCart, MdRemoveShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CardActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';
import Filter from './Filter';

class Home extends Component {
    state = {
        products: [],
        filterName: "",
        filterPrice: [0, 200],
    };
    async componentDidMount() {
        const response = await api.get('products');

        const data = response.data.map(product => ({
            ...product, priceFormatted: formatPrice(product.price)
        }))

        this.setState({ products: data });
    }
    handleAddProduct = id => {
        const { addToCartRequest } = this.props;

        addToCartRequest(id);
    }
    update = (product, qtd) => {
        const { updateAmountRequest } = this.props;
        updateAmountRequest(product._id, qtd);
    }
    filteredPrice = () => {
        const { products, filterName, filterPrice } = this.state;
        const newProducts = products.filter((e) => {
            const title = String(e.title).toLowerCase();
            const name = filterName.toLowerCase();
            const price = String(e.price).toLowerCase();
            const hasName = title.includes(name);
            const hasValue = filterPrice[0] <= price
                && filterPrice[1] >= price
            return hasName && hasValue;
        });
        return newProducts;
    }
    render() {
        const { filterName, filterPrice } = this.state;
        const { amount } = this.props;
        const products = this.filteredPrice();
        return (
            <>
                <Filter
                    filterPrice={filterPrice}
                    filterName={filterName}
                    onChangeFilterName={(e) => this.setState({ filterName: e })}
                    onChangeFilterPrice={(e) => this.setState({ filterPrice: e })}
                />
                <ProductList>
                    {/* <SmallCart /> */}
                    {products.map(product => (
                        <li
                            key={product._id}
                            style={{
                                opacity: product.amount === 0 ? "0.7" : "1",
                                pointerEvents: product.amount === 0 ? "none" : "all",
                            }}
                        >
                            <img src={product.image} alt={product.title} />
                            <strong>{product.title}</strong>
                            <span>{product.priceFormatted}</span>
                            <div style={{ display: "flex", marginTop: "auto" }}>
                                <button type="button" className="add" onClick={() => this.handleAddProduct(product._id)}>
                                    <div>
                                        <MdAddShoppingCart size={16} color="#fff" />{' '}
                                        {amount[product._id] || 0}
                                    </div>
                                    <span>ADICIONAR AO CARRINHO</span>
                                </button>
                                {amount[product._id] > 0 && (
                                    <button type="button" className="small-btn" onClick={() => this.props.removeFromCart(product._id)}>
                                        <MdRemoveShoppingCart size={16} color="#fff" />
                                    </button>
                                )}
                            </div>
                        </li>
                    )
                    )}
                </ProductList>
            </>
        )
    }
}
const mapStateToProps = state => ({
    amount: state.cart.reduce((amount, product) => {
        amount[product._id] = product.amount;

        return amount;
    }, {})
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(CardActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
