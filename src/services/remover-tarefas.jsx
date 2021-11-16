import { PropTypes } from "prop-types";
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';



function RemoverTarefas(props) {

    const URL_API_DELETE = 'http://localhost:3001/gerenciador-tarefas/';

    const [showModal, setShowModal] = useState(false);
    const [showModalErr, setShowModalErr] = useState(false);

    async function handleDelete(e) {
        e.preventDefault();

        try {

            await axios.delete(URL_API_DELETE + props.tarefa.id);
            setShowModal(false);
            props.recarregarTarefas(true);//atualiza a lista exibida

        } catch (error) {

            setShowModalErr(true);

        }

    }

    function handleCloseModal() {
        setShowModal(false);
    }

    function handleShowModal(e) {
        e.preventDefault();
        setShowModal(true)
    }

    function handleCloseModalErr() {
        setShowModalErr(false);
    }

    return (
        <><Button className="btn btn-danger btn-sm"
            onClick={handleShowModal} data-testid='btn-delete'>
            <FontAwesomeIcon icon={faTrash} />
        </Button>

            <Modal show={showModal} onHide={handleCloseModal} data-testid="modal-delete">
                <Modal.Header closeButton>
                    <Modal.Title>Excluir Tarefa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Deseja realmente excluir a seguinte tarefa:<br />
                    <strong>{props.tarefa.name}?</strong>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={handleDelete}
                        data-testid='btn-concluir-del'
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
            </Modal>

            <Modal show={showModalErr} onHide={handleCloseModalErr} data-testid="modal-delete-err">
                <Modal.Header closeButton>
                    <Modal.Title>Erro</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Erro ao remover tarefa, tente novamente em instantes!
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="warning"
                        onClick={handleCloseModalErr}>
                        Continuar
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

RemoverTarefas.propTypes = {
    tarefa: PropTypes.any.isRequired,
    recarregarTarefas: PropTypes.func.isRequired
}

export default RemoverTarefas;