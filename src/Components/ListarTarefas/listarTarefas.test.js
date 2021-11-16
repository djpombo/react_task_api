import React from "react";
import  ReactDOM  from "react-dom";
import ListarTarefas from "./index";
import Task from '../../Models/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('teste do componente de Listar as tarefas', ()=>{

    const nomePrimeiraTarefa = 'primeira tarefa';
    const nomeSegundaTarefa = 'segunda tarefa';
    const nomeTerceiraTarefa = 'terceira tarefa';

    beforeEach(()=>{
        localStorage['tarefas'] = JSON.stringify([
            new Task(1, nomePrimeiraTarefa, false),
            new Task(2, nomeSegundaTarefa, false),
            new Task(3, nomeTerceiraTarefa, false)
        ]);
    });

    afterEach(() =>{
        delete localStorage['tarefas'];
    });

    it('deve renderizar o componente sem erros', ()=>{
        const div = document.createElement('div');//cria a div
        ReactDOM.render(<ListarTarefas />, div);//tenta renderizar o componente nesta div
        ReactDOM.unmountComponentAtNode(div);
    });

    it('deve exibir uma tabela contendo as 3 tarefas', () =>{
        const { getByTestId } = render(
            <ListarTarefas />
        );
        const tabela = getByTestId('table');
        expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
        expect(tabela).toHaveTextContent(nomeSegundaTarefa);
        expect(tabela).toHaveTextContent(nomeTerceiraTarefa);
    });

    it('deve filtrar os dados da tabela', () =>{
        const { getByTestId } = render(
            <ListarTarefas />
        );
        fireEvent.change(getByTestId('filtro'), {target: {value: nomePrimeiraTarefa}});
        const tabela = getByTestId('table');
        expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
        expect(tabela).not.toHaveTextContent(nomeSegundaTarefa);
        expect(tabela).not.toHaveTextContent(nomeTerceiraTarefa);

    });

    

})