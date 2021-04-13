import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-credit-cards/es/styles-compiled.css';
import TextField from '@material-ui/core/TextField';

import * as CardActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';
import { Container, Total, Success } from './styles';
import Grid from '@material-ui/core/Grid';
import history from '../../services/history';
import Cards from 'react-credit-cards';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

function Purchase({ cart, total, removeFromCart, updateAmountRequest }) {
    const [cvc, setCvc] = React.useState("");
    const [cardName, setCardName] = React.useState("");
    const [expiry, setExpiry] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [focus, setFocus] = React.useState("");

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [street, setStreet] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [neighborhood, setNeighborhood] = React.useState("");
    const [zipCode, setZipCode] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [done, setDone] = React.useState(false);

    const dispatch = useDispatch();

    const handleInputFocus = (e) => {
        setFocus(e.target.name);
    }

    async function purchaseRequest() {
        const products = cart.map(e => {
            return {
                amount: e.amount,
                id: e._id,
            }
        })
        if (name && email && street && number && neighborhood && zipCode) {
            setLoading(true);
            const req = {
                name,
                email,
                street,
                number,
                neighborhood,
                zip_code: zipCode,
                products,
            }

            try {
                const response = await api.post('purchases', req);

                if (response && response.status === 200) {
                    toast.success("Pedido realizado com sucesso!");
                    dispatch(CardActions.clearCart());
                    setDone(true);
                }
                setLoading(false);
            } catch (error) {
                toast.error("Erro ao realizar o pedido");
                setLoading(false);
            }
        } else {
            toast.error("Os campos não estão completos");
        }
    }

    if (done) {
        return (
            <Container>
                <Success>
                    <Typography variant="h5" gutterBottom>
                        Pedido realizado com sucesso!
                    </Typography>
                    {/* <HiOutlineEmojiSad size={80} color="#3c3c3c" style={{ marginBottom: "10px" }} /> */}
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            history.push("/");
                        }}
                    >
                        Fazer outro pedido
                    </Button>
                </Success>
            </Container>
        )
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            id="standard-basic"
                            label="E-mail"
                            style={{ width: "100%", marginBottom: 5, }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    id="standard-basic"
                                    label="Rua"
                                    style={{ width: "100%", marginBottom: 5, }}
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="standard-number"
                                    label="Número"
                                    style={{ width: "100%", marginBottom: 5, }}
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="standard-basic"
                                    label="Bairro"
                                    style={{ width: "100%", marginBottom: 5, }}
                                    value={neighborhood}
                                    onChange={(e) => setNeighborhood(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="standard-number"
                                    label="CEP"
                                    style={{ width: "100%", marginBottom: 5, }}
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
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
                                    name={cardName}
                                    number={cardNumber}
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
                                value={cardNumber}
                                name="number"
                                onChange={(e) => setCardNumber(e.target.value)}
                                onFocus={handleInputFocus}
                            />
                            <TextField
                                id="standard-basic"
                                label="Nome completo"
                                style={{ width: "100%", marginBottom: 5, }}
                                value={cardName}
                                name="name"
                                onFocus={handleInputFocus}
                                onChange={(e) => setCardName(e.target.value)}
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
                <button type="button" onClick={() => purchaseRequest()}>Realizar pagamento</button>

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
