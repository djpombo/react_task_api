import ReactDOM from "react-dom";
import Paginacao from "./paginacao";
import Task from '../Models/task.model';
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';


describe('Teste do componente de paginacao', () =>{
    const ITENS_POR_PAG = 3;

    it('deve renderizar o componente sem erros', () =>{
        const div = document.createElement('div');
        ReactDOM.render(
            <Paginacao 
                totalItens={1}
                itensPorPagina={ITENS_POR_PAG}
                paginaAtual={1}
                mudarPagina={()=>false}/>, div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('deve exibir a paginacao contendo 3 paginas', () => {
        const { getByTestId } = render(
            <Paginacao 
                totalItens={15}
                itensPorPagina={5}
                paginaAtual={1}
                mudarPagina={() =>false }/>
        );
        const paginacao = getByTestId('paginacao');
        expect(paginacao).toHaveTextContent('1');
        expect(paginacao).toHaveTextContent('2');
        expect(paginacao).toHaveTextContent('3');
    });
})