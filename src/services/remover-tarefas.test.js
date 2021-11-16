import ReactDOM from "react-dom";
import RemoverTarefa from './remover-tarefas';
import Task from '../Models/task.model';
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de remoção de tarefas', ()=>{

    const nomeTarefa = 'Tarefa';
    const tarefa = new Task(1, nomeTarefa, false);

    it('it deve renderizar o componente de remover tarefas sem erros', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(
            <RemoverTarefa tarefa={{}} recarregarTarefas={()=> false}/>, div
        )
        ReactDOM.unmountComponentAtNode(div);
           
    });

    it('deve abrir o modal para a confirmação da exclusao da tarefa', ()=>{
        const { getByTestId } = render(
            <RemoverTarefa tarefa={tarefa} recarregarTarefas={()=> false} />
        )
        fireEvent.click(getByTestId('btn-delete'));
        expect(getByTestId('modal-delete')).toHaveTextContent(nomeTarefa);
    })
    
    it('deve excluir a tarefa sem erros', ()=>{
        localStorage['tarefas'] = JSON.stringify([tarefa]);//insere um item no banco
        const { getByTestId } = render(
            <RemoverTarefa tarefa={tarefa} recarregarTarefas={()=> false} />                                                                                                                  
        );
        fireEvent.click(getByTestId('btn-delete'));
        fireEvent.click(getByTestId('btn-concluir-del'));
        const tarefasDb = JSON.parse(localStorage['tarefas']);//recupera o banco
        expect(tarefasDb.length).toBe(0);//verifica se este 1 item adicionado foi excluido, se for 0 deu tudo certo

    })
})