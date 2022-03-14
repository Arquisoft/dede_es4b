import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    main: {
        padding: '10% 15%',
    },
    titulo: {
        display: "flex",
        padding: '0% 0% 10%',
        fontSize: "x-large",
        justifyContent: "center",

    },
    filtro: {
        display: "flex",
        justifyContent: "right",
    },
    paginacion:  {
        padding: "10% 0",
        display: "flex",
        justifyContent: "right",
    }
}));