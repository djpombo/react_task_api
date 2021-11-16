import ReactDOM from "react-dom";
import Order from "./order";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('Teste do Componente de Icones de Ordenacao', () =>{
    it('deve renderizar o componente sem erros', () =>{
        const div = document.createElement('div');
        ReactDOM.render(
            <Order ordenacaoUp={false} ordenacaoDown={false}/>, div
        );
        ReactDOM.unmountComponentAtNode(div)
    });

    it('deve exibir a ordenacao padrao', () =>{
        const { getByTestId } = render(
            <Order ordenacaoUp={false} ordenacaoDown={false} />
        );
        expect(getByTestId('fa-sort')).not.toHaveClass('hidden');
        expect(getByTestId('fa-sortUp')).toHaveClass('hidden');
        expect(getByTestId('sortD')).toHaveClass('hidden');
    });

    it('deve exibir a ordenacao ASC', () =>{
        const { getByTestId } = render(
            <Order ordenacaoUp={true} ordenacaoDown={false} />
        );
        expect(getByTestId('fa-sort')).toHaveClass('hidden');
        expect(getByTestId('fa-sortUp')).not.toHaveClass('hidden');
        expect(getByTestId('sortD')).toHaveClass('hidden');
        
    });
    
    it('deve exibir a ordenacao DESC', () =>{
        const { getByTestId } = render(
            <Order ordenacaoUp={false} ordenacaoDown={true} />
        );
        expect(getByTestId('fa-sort')).toHaveClass('hidden');
        expect(getByTestId('fa-sortUp')).toHaveClass('hidden');
        expect(getByTestId('sortD')).not.toHaveClass('hidden');
    })
    
})