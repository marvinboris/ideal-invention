import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import AbsoluteButton from '../../components/UI/Button/AbsoluteButton/AbsoluteButton';
import Storage from '../../components/Storage';

import { updateObject } from '../../shared/utility';

import Img from '../../assets/images/tennis-svgrepo-com.svg';

class Players extends Component {
    state = {
        first: '',
        second: '',

        first_first: '',
        first_second: '',
        second_first: '',
        second_second: '',
    }

    componentDidMount() {
        const type = Storage.get('type');
        const teams = Storage.get('teams');
        const players = Storage.get('players');
        if (!type) return this.props.history.push('/type');
        if (type === 1 && players || type === 2 && teams.first.players) return this.props.history.push('/game');
    }

    submitHandler = e => {
        e.preventDefault();
        const { first, second, first_first, first_second, second_first, second_second } = this.state;
        const type = Storage.get('type');
        if (type === 1) {
            Storage.set('players', {
                first: { name: first },
                second: { name: second },
            });
            return this.props.history.push('/game');
        }

        const teams = Storage.get('teams');
        Storage.set('teams', updateObject(teams, {
            first: updateObject(teams.first, {
                players: {
                    first: { name: first_first },
                    second: { name: first_second },
                }
            }),
            second: updateObject(teams.second, {
                players: {
                    first: { name: second_first },
                    second: { name: second_second },
                }
            }),
        }));
        this.props.history.push('/game');
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    backHandler = () => {
        const teams = Storage.get('teams');
        if (teams) {
            Storage.set('teams', undefined);
            return this.props.history.push('/teams');
        }
        Storage.set('type', undefined);
        this.props.history.push('/type');
    }

    render() {
        const { first, second, first_first, first_second, second_first, second_second } = this.state;
        const type = Storage.get('type');
        const teams = Storage.get('teams');

        const form = type === 1 ? <>
            <FormGroup>
                <Input type="text" name="first" onChange={this.inputChangeHandler} placeholder="Premier joueur" bsSize="lg" className="rounded-pill" value={first} />
            </FormGroup>

            <FormGroup>
                <Input type="text" name="second" onChange={this.inputChangeHandler} placeholder="Deuxième joueur" bsSize="lg" className="rounded-pill" value={second} />
            </FormGroup>
        </> : <>
                <FormGroup>
                    <Label className="text-large">Première équipe : <span className="text-700">{teams.first.name}</span></Label>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="first_first" onChange={this.inputChangeHandler} placeholder="Premier joueur" bsSize="lg" className="rounded-pill" value={first_first} />
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="first_second" onChange={this.inputChangeHandler} placeholder="Deuxième joueur" bsSize="lg" className="rounded-pill" value={first_second} />
                </FormGroup>

                <hr />

                <FormGroup>
                    <Label className="text-large">Deuxième équipe : <span className="text-700">{teams.second.name}</span></Label>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="second_first" onChange={this.inputChangeHandler} placeholder="Premier joueur" bsSize="lg" className="rounded-pill" value={second_first} />
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="second_second" onChange={this.inputChangeHandler} placeholder="Deuxième joueur" bsSize="lg" className="rounded-pill" value={second_second} />
                </FormGroup>
            </>;

        return <div className="flex-fill row align-items-center justify-content-between">
            <Col lg={5}>
                <img src={Img} alt="Tennis player" className="img-fluid fill-green" />
            </Col>

            <Col lg={5} className="text-center text-secondary pb-5">
                <Form onSubmit={this.submitHandler}>
                    {form}

                    <FormGroup className="pt-5 text-center">
                        <AbsoluteButton type="button" onClick={this.backHandler} color="darkgreen" icon={faAngleLeft} className="rounded-pill text-x-large py-3 px-4 mr-2" before>Retour</AbsoluteButton>
                        <AbsoluteButton color="green" icon={faAngleRight} className="rounded-pill text-x-large py-3 px-4">Continuez</AbsoluteButton>
                    </FormGroup>
                </Form>
            </Col>
        </div>;
    }
}

export default withRouter(Players);