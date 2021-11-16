import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function ConcluirTarefa(props){

    const URL_API_CONCLUIR_TAREFA = 'http://localhost:3001/gerenciador-tarefas/:id/concluir';

    const [showModal, setShowModal] = useState(false);
    const [showModalErr, setShowModalErr] = useState(false);

    function handleShowModal(e){
        e.preventDefault();
        setShowModal(true);

    }

    function handleCloseModal(){
        setShowModal(false);
    }

    function handleCloseModalErr(){
        setShowModalErr(false);
    }

    async function handleConcluirTarefa(e){
        e.preventDefault();
        try {
            let urlAtualizada = URL_API_CONCLUIR_TAREFA.replace(':id', props.tarefa.id);
            await axios.put(urlAtualizada);
            setShowModal(false);
            props.recarregarTarefas(true);//atualiza a lista exibida
        } catch (error) {
            setShowModalErr(true);
        }
       
    }


    return(
        <span className={props.className}>
            <Button className="btn btn-sm" onClick={handleShowModal}
            data-testid='btn-abrir-modal'>
                <FontAwesomeIcon icon={faClipboardCheck} />
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Concluir Tarefa</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Deseja realmente concluir seguinte tarefa:<br /> 
                        <strong>{props.tarefa.name}?</strong>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="primary"
                            onClick={handleConcluirTarefa}
                            data-testid='btn-concluir'
                        >
                            Sim
                        </Button>
                        <Button
                            variant="light"
                            onClick={handleCloseModal}
                            data-testid='btn-fechar-modal'
                        >
                            Não
                        </Button>
                    </Modal.Footer>
                    <Modal show={showModalErr} onHide={handleCloseModalErr} data-testid="modal-delete-err">
                <Modal.Header closeButton>
                    <Modal.Title>Erro</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Erro ao concluir tarefa, tente novamente em instantes!
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="warning"
                        onClick={handleCloseModalErr}>
                        Continuar
                    </Button>

                </Modal.Footer>
            </Modal>
            </Modal>

        </span>
    );
}

ConcluirTarefa.propTypes = {
    tarefa: PropTypes.any,
    recarregarTarefas: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default ConcluirTarefa;