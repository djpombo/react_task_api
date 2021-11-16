import { useRoutes } from 'hookrouter';
import './gerenciador-tarefas.css';
import AtualizarTarefas from './Components/AtualizarTarefas';
import CadastrarTarefas from './Components/CadastrarTarefas';
import ListarTarefas from './Components/ListarTarefas';


const routes = {
  '/': ()=> <ListarTarefas />,
  '/cadastrar': ()=> <CadastrarTarefas />,
  '/atualizar/:id': ({id})=> <AtualizarTarefas id={id}/>,
}

function GerenciadorTarefas() {
  return useRoutes(routes);
}

export default GerenciadorTarefas;
