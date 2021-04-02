import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
        borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    let total = 0;
    row.products.map((e) => {
        const price = e.amount * e.price;
        total = total + price;
    })

    return (
        <React.Fragment key={row._id}>
            <TableRow className={classes.root}>
                <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.street}</TableCell>
                <TableCell align="right">{row.number}</TableCell>
                <TableCell align="right">{formatPrice(total)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                        Produtos
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Titulo</TableCell>
                            <TableCell align="right">Quantidade</TableCell>
                            <TableCell align="right">Preço total (R$)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {row.products.map((historyRow) => (
                            <TableRow key={historyRow.id}>
                                <TableCell component="th" scope="row">
                                    <img src={historyRow.image} alt="" style={{ height: 50, borderRadius: "50%" }} />
                                </TableCell>
                                <TableCell>{historyRow.title}</TableCell>
                                <TableCell align="right">{historyRow.amount}</TableCell>
                                <TableCell align="right">
                                    {formatPrice(historyRow.amount * historyRow.price)}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    const [purchases, setPurchases] = React.useState([]);

    async function getPurchases() {
        try {
            const response = await api.get('purchases');
            if (response && response.status === 200) {
                setPurchases(response.data)
            }
        } catch (error) {

        }
    }
    React.useEffect(() => {
        getPurchases();
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">E-mail</TableCell>
                    <TableCell align="right">Rua</TableCell>
                    <TableCell align="right">Número</TableCell>
                    <TableCell align="right">Valor total</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {purchases.map((row) => (
                    <Row key={row._id} row={row} />
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
