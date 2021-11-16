import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types";

function Paginacao(props) {

    function gerarPrimeiroItem() {
        return (
            <Pagination.First
                key="pagFirst"
                onClick={() => props.mudarPagina(1)}
                disabled={props.paginaAtual && props.paginaAtual === 1}
            />
        )
    }

    function gerarItemAnterior() {
        return (
            <Pagination.Prev
                key="pagPrev"
                onClick={() => props.mudarPagina(props.paginaAtual - 1)}
                disabled={props.paginaAtual && props.paginaAtual === 1}
            />
        );
    }

    function gerarItemNumerico(pagina) {

        
        return (

            <Pagination.Item
                key={pagina}
                active={pagina === props.paginaAtual}//vai mostar se for a pagina atual
                onClick={() => props.mudarPagina(pagina)}
            >
                {pagina}
            </Pagination.Item>

        )
    }

    function gerarItemPosterior(numPaginas){
        return(
            <Pagination.Next
                key="pagNext"
                onClick={() => props.mudarPagina(props.paginaAtual + 1)}
                disable={props.paginaAtual && props.paginaAtual === numPaginas}//quer dizer que estamos na ultima pagina
            >

            </Pagination.Next>
        )
    }

    function gerarUltimoItem(numPaginas){
        return(
            <Pagination.Last
            key="pagLast"
            onClick={()=> props.mudarPagina(numPaginas)}
            disabled={props.paginaAtual && props.paginaAtual === numPaginas}
            />
            
        );
    }


    function obterPaginacao() {
        const numPaginas = Math.ceil(props.totalItens / props.itensPorPagina);//arrendondar pra cima

        let items = [];
        items.push(gerarPrimeiroItem());
        items.push(gerarItemAnterior());
        
        for (let pagina = 1; pagina <= numPaginas; pagina++) {

            items.push(gerarItemNumerico(pagina))
        }

        items.push(gerarItemPosterior(numPaginas));
        items.push(gerarUltimoItem(numPaginas));

        return items;
    }

    return (
        <Pagination data-testid="paginacao">
            {obterPaginacao()}
        </Pagination>
    );
}

Paginacao.propTypes = {
    totalItens: PropTypes.number.isRequired,
    itensPorPagina: PropTypes.number.isRequired,
    paginaAtual: PropTypes.number.isRequired,
    mudarPagina: PropTypes.func.isRequired
}

export default Paginacao;