import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '../../components/Button';
import { signInRequest } from '../../store/modules/user/actions';
import { useDispatch } from 'react-redux';

// import * as CardActions from '../../store/modules/Login/actions';

import { Container, Content, } from './styles';

function Login(props) {
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (login && password) {
            dispatch(signInRequest(login, password));
        }
    }

    return (
        <Container>
            <Content>
                <TextField
                    id="standard-basic"
                    label="Usuário"
                    style={{ width: "100%", marginBottom: 10, }}
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                />
                <TextField
                    id="standard-basic"
                    label="Senha"
                    type="password"
                    style={{ width: "100%", marginBottom: 25, }}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <Button style={{ width: "100%" }} onClick={() => handleSubmit()}>
                    Entrar
                </Button>
            </Content>
        </Container>
    );
}

export default Login;
