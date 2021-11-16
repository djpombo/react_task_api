import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import axios from 'axios';
import Task from '../../Models/task.model';
import '../CadastrarTarefas/styles.css';

function AtualizarTarefas(props) {

    const URL_API_ATUALIZAR_TAREFA = `http://localhost:3001/gerenciador-tarefas/`;

    const [showModal, setShowModal] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [tarefa, setTarefa] = useState('');
    const [carregarTarefa, setCarregarTarefa] = useState(true);
    const [showModalErr, setShowModalErr] = useState(false);

    useEffect(() => {

        async function obterTarefa() {
            try {

                let { data } = await axios.get(URL_API_ATUALIZAR_TAREFA + props.id);
                setTarefa(data.name);

            } catch (error) {

                navigate('/');

            }

        }

        if (carregarTarefa) {

            obterTarefa();
            setCarregarTarefa(false);

        }

    }, [carregarTarefa, props.id, URL_API_ATUALIZAR_TAREFA]);



    function voltar(e) {
        e.preventDefault();
        navigate('/');
    }

    function closeModal() {
        setShowModal(false);
        navigate('/');
    }

    function closeModalErr() {
        setShowModalErr(false);
    }

    async function atualizar(e) {
        e.preventDefault();
        setFormValidado(true);
        if (e.currentTarget.checkValidity() === true) {

            try {

                const atualizaData = new Task(null, tarefa, false);
                await axios.put(URL_API_ATUALIZAR_TAREFA + props.id, atualizaData);
                setShowModal(true);

            } catch (error) {

                setShowModalErr(true);

            }
        }
    }

    function handleTxtTarefa(e) {
        setTarefa(e.target.value);
    }

    return (
        <div className="container">
            <h3 className="text-center">Atualizar</h3>
            <div className="Jumbo">
                <Form onSubmit={atualizar} noValidate validated={formValidado}>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="digite a tarefa"
                            minLength="5"
                            maxLength="100"
                            required
                            data-testid="txt-tarefa"
                            value={tarefa}
                            onChange={handleTxtTarefa}
                        />
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter no mínimo 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="buttons text-center">
                        <Button variant="success" type="submit" data-testid="btn-atualizar">
                            Atualizar
                        </Button>
                        <A href="/" className="btn btn-light" onClick={voltar}>
                            Voltar
                        </A>
                    </Form.Group>
                </Form>
                <Modal show={showModal} onHide={closeModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tarefa Atualizada com Sucesso!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="success"
                            onClick={closeModal}>
                            Continuar
                        </Button>

                    </Modal.Footer>

                </Modal>

                <Modal show={showModalErr} onHide={closeModalErr} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Erro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tarefa nao atualizada! tente novamente em instantes
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="warning"
                            onClick={closeModalErr}>
                            Continuar
                        </Button>

                    </Modal.Footer>

                </Modal>
            </div>

        </div>
    )
}

AtualizarTarefas.propTypes = {
    id: PropTypes.any.isRequired
}
export default AtualizarTarefas;