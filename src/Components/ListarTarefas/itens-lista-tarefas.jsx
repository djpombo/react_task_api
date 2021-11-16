import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { A } from 'hookrouter';
import ConcluirTarefa from "./concluir-tarefa";
import RemoverTarefas from "../../services/remover-tarefas";
import './itens-lista-tarefas.css';

function ItensListaTarefas(props) {

    function marcarConcluida(item) {
        return item.isConcluded ? 'line-through' : 'none';
    }

    return (
        props.tarefas.map(item => {
           
            return (
                <tr key={item.id} data-testid="tarefa">
                    <td width="75%" data-testid="nome-tarefa"
                        style={{ textDecoration: marcarConcluida(item) }}>
                        {item.name}
                    </td>
                    
                    <td className="text-right toRight">
                        <ConcluirTarefa
                            tarefa={item}
                            recarregarTarefas={props.recarregarTarefas}//recebedio de listarTarefas
                            className={item.isConcluded ? 'hidden' : null}
                        />
                        
                        &nbsp;
                        <A href={"/atualizar/" + item.id}
                            className={item.isConcluded ? 'hidden' : 'btn btn-warning btn-sm'}>
                            {<FontAwesomeIcon icon={faEdit} className='btnEdit' />}
                        </A>
                        &nbsp;
                        <RemoverTarefas
                            tarefa={item}
                            recarregarTarefas={props.recarregarTarefas}
                        />
                    </td>
                </tr>
            )
        })
    );
}
//o PropTypes é uma interface de dados tipados para a props, como no TypeScript
ItensListaTarefas.propTypes = {
    tarefas: PropTypes.array.isRequired,
    recarregarTarefas: PropTypes.func.isRequired
}

export default ItensListaTarefas;