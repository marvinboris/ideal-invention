import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Col, Form, FormGroup, Input } from 'reactstrap';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import AbsoluteButton from '../../components/UI/Button/AbsoluteButton/AbsoluteButton';
import Storage from '../../components/Storage';

import Img from '../../assets/images/tennis-svgrepo-com.svg';

class Teams extends Component {
    state = {
        first: '',
        second: '',
    }

    componentDidMount() {
        const type = Storage.get('type');
        const teams = Storage.get('teams');
        if (!type) return this.props.history.push('/type');
        if (teams || type !== 2) return this.props.history.push('/players');
    }

    submitHandler = e => {
        e.preventDefault();
        const { first, second } = this.state;
        Storage.set('teams', {
            first: { name: first },
            second: { name: second },
        });
        this.props.history.push('/players');
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    backHandler = () => {
        Storage.set('type', undefined);
        this.props.history.push('/type');
    }

    render() {
        const { first, second } = this.state;

        return <div className="flex-fill row align-items-center justify-content-between">
            <Col lg={5} className="text-center text-secondary pb-5">
                <Form onSubmit={this.submitHandler}>
                    <FormGroup>
                        <Input type="text" name="first" onChange={this.inputChangeHandler} placeholder="Première équipe" bsSize="lg" className="rounded-pill" value={first} />
                    </FormGroup>

                    <FormGroup>
                        <Input type="text" name="second" onChange={this.inputChangeHandler} placeholder="Deuxième équipe" bsSize="lg" className="rounded-pill" value={second} />
                    </FormGroup>

                    <FormGroup className="pt-5 text-center">
                        <AbsoluteButton type="button" onClick={this.backHandler} color="darkgreen" icon={faAngleLeft} className="rounded-pill text-x-large py-3 px-4 mr-2" before>Retour</AbsoluteButton>
                        <AbsoluteButton color="green" icon={faAngleRight} className="rounded-pill text-x-large py-3 px-4">Continuez</AbsoluteButton>
                    </FormGroup>
                </Form>
            </Col>

            <Col lg={5}>
                <img src={Img} alt="Tennis player" className="img-fluid fill-green" />
            </Col>
        </div>;
    }
}

export default withRouter(Teams);