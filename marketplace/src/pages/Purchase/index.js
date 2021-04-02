import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-credit-cards/es/styles-compiled.css';
import TextField from '@material-ui/core/TextField';

import * as CardActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';
import { Container, Total } from './styles';
import Grid from '@material-ui/core/Grid';
import history from '../../services/history';
import Cards from 'react-credit-cards';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

function Purchase({ cart, total, removeFromCart, updateAmountRequest }) {
    const [cvc, setCvc] = React.useState("");
    const [name, setName] = React.useState("");
    const [expiry, setExpiry] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [focus, setFocus] = React.useState("");

    const handleInputFocus = (e) => {
        setFocus(e.target.name);
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        Informações pessoais
                        <TextField
                            id="standard-basic"
                            label="Nome completo"
                            style={{ width: "100%", marginBottom: 5, }}
                        />
                        <TextField
                            id="standard-basic"
                            label="E-mail"
                            style={{ width: "100%", marginBottom: 5, }}
                        />
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    id="standard-basic"
                                    label="Rua"
                                    style={{ width: "100%", marginBottom: 5, }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="standard-number"
                                    label="Número"
                                    style={{ width: "100%", marginBottom: 5, }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="standard-basic"
                                    label="Bairro"
                                    style={{ width: "100%", marginBottom: 5, }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="standard-number"
                                    label="CEP"
                                    style={{ width: "100%", marginBottom: 5, }}
                                />
                            </Grid>
                        </Grid>

                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card
                        style={{
                            padding: 15
                        }}
                    >
                        <Typography color="textSecondary" gutterBottom>
                            Pagamento
                        </Typography>
                            <div style={{ transform: "scale(0.7)", height: 148 }}>
                                <Cards
                                    cvc={cvc}
                                    expiry={expiry}
                                    focused={focus}
                                    name={name}
                                    number={number}
                                    placeholders={{
                                        name: "SEU NOME AQUI",
                                    }}
                                    locale={{ valid: 'válido até' }}
                                />
                            </div>
                            <TextField
                                id="standard-basic"
                                label="Número do cartão"
                                style={{ width: "100%", marginBottom: 5, marginTop: 10 }}
                                value={number}
                                name="number"
                                onChange={(e) => setNumber(e.target.value)}
                                onFocus={handleInputFocus}
                            />
                            <TextField
                                id="standard-basic"
                                label="Nome completo"
                                style={{ width: "100%", marginBottom: 5, }}
                                value={name}
                                name="name"
                                onFocus={handleInputFocus}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="standard-basic"
                                        label="Validade"
                                        style={{ width: "100%", marginBottom: 5, }}
                                        value={expiry}
                                        name="expiry"
                                        onFocus={handleInputFocus}
                                        onChange={(e) => setExpiry(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="standard-number"
                                        label="CVC"
                                        style={{ width: "100%", marginBottom: 5, }}
                                        value={cvc}
                                        name="cvc"
                                        onFocus={handleInputFocus}
                                        onChange={(e) => setCvc(e.target.value)}
                                    />
                                </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>

            <footer>
                <button type="button">Realizar pagamento</button>

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

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
