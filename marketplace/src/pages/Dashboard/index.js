import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '../../components/Button';
import { signInRequest } from '../../store/modules/user/actions';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import PurchaseTable from './PurchaseTable';

// import * as CardActions from '../../store/modules/Login/actions';

import { Container, Content, Form, DeleteButton } from './styles';
import history from '../../services/history';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Dashboard(props) {
    const [products, setProducts] = React.useState([]);
    const [id, setId] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [image, setImage] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const user = useSelector(state => state.user);
    if (!user.token) {
        history.push("/login");
    }
    async function getAllProducts() {
        const response = await api.get('products');

        const data = response.data.map(product => ({
            ...product, priceFormatted: formatPrice(product.price)
        }))

        setProducts(data);
    }

    React.useEffect(() => {
        getAllProducts();
    }, []);

    function clearFields() {
        setImage("");
        setAmount("");
        setTitle("");
        setPrice("");
        setId("");
    }

    async function handleAddProduct() {
        try {
            if (!id) {
                const response = await api.post('products', {
                    title, image, price, amount,
                });

                if (response && response.status === 200) {
                    toast.success("Produto cadastrado com sucesso!");
                    clearFields();
                    getAllProducts();
                }
            } else {
                const response = await api.put(`products/${id}`, {
                    title, image, price, amount,
                });

                if (response && response.status === 200) {
                    toast.success("Produto editado com sucesso!");
                    clearFields();
                    getAllProducts();
                }
            }

        } catch (error) {
            if (!id) {
                toast.error("Não foi possivel cadastrar o produto");
            } else {
                toast.error("Não foi possivel editar o produto");
            }
        }
    }

    async function deleteProduct(idProd) {
        try {
            const response = await api.delete(`products/${idProd}`);

            if (response && response.status === 200) {
                toast.success("Produto deletado com sucesso!");
                getAllProducts();
            }

        } catch (error) {
            toast.error("Não foi possivel deletar o produto");
        }
    }

    function editProduct(row) {
        setId(row._id);
        setImage(row.image);
        setTitle(row.title);
        setAmount(row.amount);
        setPrice(row.price);
    }

    return (
        <Container>
            <div style={{ width: "50%", padding: 10 }}>
                <Content>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Titulo</TableCell>
                                <TableCell align="right">Qnt</TableCell>
                                <TableCell align="right">Preço</TableCell>
                                <TableCell align="right">Ação</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {products.map((row) => (
                                <TableRow key={row.title}>
                                    <TableCell component="th" scope="row">
                                        <img src={row.image} alt="" style={{ height: 50, borderRadius: "50%" }} />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                    <TableCell align="right">{row.priceFormatted}</TableCell>
                                    <TableCell align="right">
                                        <DeleteButton onClick={() => deleteProduct(row._id)}>
                                            <MdDelete size={20} color="red" />
                                        </DeleteButton>
                                        <DeleteButton onClick={() => editProduct(row)}>
                                            <MdModeEdit size={20} />
                                        </DeleteButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                </Content>
            </div>
            <div style={{ width: "50%", padding: 10 }}>
                <Content>
                    <Form>
                        {id ? (
                            <>
                                Editar produto
                                <span style={{ marginLeft: 5, backgroundColor: "orange", color: "white", borderRadius: 3, padding: "0 3px" }}>
                                    {id}
                                </span>
                            </>
                        ) : (
                            <>
                                Cadastrar produto
                            </>
                        )}
                        <TextField
                            id="standard-basic"
                            label="Imagem"
                            style={{ width: "100%", marginBottom: 5, }}
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                        <TextField
                            id="standard-basic"
                            label="Titulo"
                            style={{ width: "100%", marginBottom: 5, }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            id="standard-number"
                            type="number"
                            label="Preço"
                            style={{ width: "100%", marginBottom: 5, }}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            id="standard-number"
                            type="number"
                            label="Quantidade"
                            style={{ width: "100%", marginBottom: 15, }}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                            {!!id && (
                                <Button
                                    onClick={() => {
                                        clearFields();
                                    }}
                                    isDelete
                                    style={{ marginRight: 10 }}
                                >
                                    Cancelar
                                </Button>
                            )}
                            <Button onClick={() => handleAddProduct()}>
                                Salvar
                            </Button>

                        </div>
                    </Form>
                </Content>
            </div>
            <div style={{ width: "100%", padding: 10 }}>
                <Content>
                    <PurchaseTable />
                </Content>
            </div>
        </Container>
    );
}

export default Dashboard;
