import ReactDOM from 'react-dom';
import AtualizarTarefas from './index';
import Task from '../../Models/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


const tarefaId = 1;
const tarefa = new Task(tarefaId, 'nova tarefa', false);

beforeEach(() =>{
    localStorage['tarefas'] = JSON.stringify([tarefa]);
})

describe('deve renderizar o update das tarefas sem erros', ()=>{
    it('deve renderizar o componente sem erros', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<AtualizarTarefas id={tarefaId}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('deve exibir a modal de sucesso ao atualizar uma tarefa', () =>{
        const { getByTestId } = render(
            <AtualizarTarefas id={tarefaId} />
        );
        fireEvent.click(getByTestId('btn-atualizar'));
        expect(getByTestId('modal')).toHaveTextContent('Sucesso');
    });

    it('deve atualizar uma tarefa', () =>{
        const nomeTarefaAtualizada = 'tarefa atualizada';
        const { getByTestId } = render(
            <AtualizarTarefas id={tarefaId} />
        );
        fireEvent.change(getByTestId('txt-tarefa'), {target: { value: nomeTarefaAtualizada}});
        fireEvent.click(getByTestId('btn-atualizar'));
        const tarefasDb = JSON.parse(localStorage['tarefas']);
        expect(tarefasDb[0].name).toBe(nomeTarefaAtualizada);

    })
    

})