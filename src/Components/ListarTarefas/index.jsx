import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
//import { Button } from 'react-bootstrap';
import './listar-tarefas.css';
import ItensListaTarefas from './itens-lista-tarefas';
import Paginacao from '../../services/paginacao';
import Order from '../../services/order';
import axios from 'axios';

function ListarTarefas() {

    const ITENS_POR_PAG = 3;
    const API_URL_LISTAR_TAREFAS = 'http://localhost:3001/gerenciador-tarefas';

    const [filtroTarefa, setFiltroTarefa] = useState('');
    const [list, setList] = useState(['']);
    const [loadTask, setLoadTask] = useState(true);
    const [totalItens, setTotalItens] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [orderAsc, setOrderAsc] = useState(false);
    const [orderDesc, setOrderDesc] = useState(false);
    
    useEffect(() => {

        async function handleList() {

            //ordenar
            let ordem = '';
            if(orderAsc){
                ordem = 'ASC';
            }
            else if(orderDesc){
                ordem = 'DESC';
            }

            try {

                const params = `?pag=${paginaAtual}&ordem=${ordem}&filtro-tarefa=${filtroTarefa}`;

                let { data } = await axios.get(API_URL_LISTAR_TAREFAS + params);
                setTotalItens(data.totalItens);
                setList(data.tarefas);
                setPaginaAtual(data.pagina);

            } catch(err){

                setList([]);
                console.log(err);

            }
        }    
            
        if (loadTask) {
            handleList();
            setLoadTask(false);
        }
    

    }, [loadTask, paginaAtual, orderAsc, orderDesc, filtroTarefa]);

    function handleMudarPagina(pagina) {

        setPaginaAtual(pagina);
        setLoadTask(true);
    }

    function handleOrder(e) {

        e.preventDefault();

        if (!orderAsc && !orderDesc) {
            setOrderAsc(true);
            setOrderDesc(false);
        } else if (orderAsc) {
            setOrderAsc(false);
            setOrderDesc(true);
        } else {
            setOrderAsc(false);
            setOrderDesc(false);
        }
        setLoadTask(true);

    }

    function handlerFilter(e){
        setFiltroTarefa(e.target.value);
        setLoadTask(true);
    }


    return (
        <div className="text-center">
            <h3>React-Task</h3>
            <Table striped bordered hover responsive data-testid='table'>
                <thead>
                    <tr key='be12'>
                        <th>
                            <a href="/" onClick={handleOrder}>
                                Tarefa
                                &nbsp;
                                <Order ordenacaoUp={orderAsc} ordenacaoDown={orderDesc} />
                            </a>

                        </th>
                        <th>
                            <A href='/cadastrar'
                                className='btn btn-success btn-sm'
                                data-textid='btnNewTask'
                            >
                                <FontAwesomeIcon icon={faPlus} className='btnIcon' />
                                
                                Nova Tarefa
                            </A>
                        </th>
                    </tr>
                    <tr key='be13'>
                        <th className="formFiltro">
                        
                            <Form.Control
                                type="text"
                                value={filtroTarefa}
                                onChange={handlerFilter}
                                className="formControl"
                                data-testid="filtro"
                            >
                                
                            </Form.Control>
                            
                        </th>
                        <th>
                            <></>
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <ItensListaTarefas
                        tarefas={list}
                        recarregarTarefas={setLoadTask} />


                </tbody>
            </Table>
            <div className="paginacao">
                <Paginacao
                    totalItens={totalItens}
                    itensPorPagina={ITENS_POR_PAG}
                    paginaAtual={paginaAtual}
                    mudarPagina={handleMudarPagina} />
            </div>
        </div>
    )
}
export default ListarTarefas;