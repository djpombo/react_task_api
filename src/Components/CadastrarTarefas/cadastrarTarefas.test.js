import React from "react";
import  ReactDOM  from "react-dom";
import CadastrarTarefas from "./index";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('teste do componente de Cadastrar as tarefas', ()=>{

    it('deve renderizar o componente sem erros', ()=>{
        const div = document.createElement('div');//cria a div
        ReactDOM.render(<CadastrarTarefas />, div);//tenta renderizar o componente nesta div
        ReactDOM.unmountComponentAtNode(div);
    });

    it('deve cadastrar uma nova tarefa', ()=>{
        const { getByTestId } = render(<CadastrarTarefas />);
        fireEvent.change(getByTestId('txt-tarefa'), { target: { value: 'testar componente' } });//simula uma entrada no input
        fireEvent.click(getByTestId('btn-tarefa'));//simula o click do botao cadastrar
        expect(getByTestId('modal')).toHaveTextContent('Continuar');//que o modal seja exibido contendo a palavra 'sucesso'
        expect(getByTestId('modal')).toHaveTextContent('Tarefa adicionada com Sucesso!');//toda a mensagem
    })

})