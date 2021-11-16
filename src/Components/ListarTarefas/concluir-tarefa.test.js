import ReactDOM from "react-dom";
import ConcluirTarefa from "./concluir-tarefa";
import Task from '../../Models/task.model';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('teste do componente de conclusao de tarefa', ()=>{

    const nomeTarefa = 'tarefa de teste';
    const tarefa = new Task(1, nomeTarefa, false);

    it('deve renderizar o componente sem erros', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<ConcluirTarefa tarefa={tarefa} recarregarTarefas={()=> false} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('deve exibir a modal', () => {
        const { getByTestId } = render(
          <ConcluirTarefa
            tarefa={tarefa}
            recarregarTarefas={() => false} />
        );
        fireEvent.click(getByTestId('btn-abrir-modal'));
        expect(getByTestId('modal')).toHaveTextContent(nomeTarefa);
      });

    it('deve concluir uma tarefa', ()=>{
        localStorage['tarefas'] = JSON.stringify([tarefa]);
        const { getByTestId } = render(
            <ConcluirTarefa
                tarefa={tarefa}
                recarregarTarefas={()=> false}
            />
        );
        fireEvent.click(getByTestId('btn-abrir-modal'));
        fireEvent.click(getByTestId('btn-concluir'));

        const tarefasDb = JSON.parse(localStorage['tarefas']);
        expect(tarefasDb[0].isConcluded).toBeTruthy();

    });
})