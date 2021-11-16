import React from "react";
import ReactDOM from "react-dom";
import ItensListaTarefas from "./itens-lista-tarefas";
import Task from "../../Models/task.model";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente que exibe a lista de tarefas', () => {

    const nomeTarefa = 'Tarefa';
    const tarefa = new Task(1, nomeTarefa, false);
    const tarefaConcluida = new Task(2, nomeTarefa, true);

    it('deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ItensListaTarefas tarefas={[]} recarregarTarefas={() => false} />, div);
        ReactDOM.unmountComponentAtNode(div);

    });

    it('deve exibir a tarefa', ()=>{
        const { getByTestId } = render(
            <table>
                <tbody>
                    <ItensListaTarefas
                        tarefas={[tarefa]}
                        recarregarTarefas={()=> false}
                        />
                </tbody>
            </table>
        );
        expect(getByTestId('tarefa')).toHaveTextContent(nomeTarefa);
    });

    it('deve exibior uma tarefa concluida', ()=>{
        const { getByTestId } = render(
            <table>
                <tbody>
                    <ItensListaTarefas
                        tarefas={[tarefaConcluida]}
                        recarregarTarefas={()=> false}
                        />
                </tbody>
            </table>
            
        );
        //fireEvent.click(getByTestId('btn-concluir'));
        expect(getByTestId('nome-tarefa')).toHaveStyle('textDecoration: line-through');
    })

    
    

})

