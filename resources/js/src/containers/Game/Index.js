import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import AbsoluteButton from '../../components/UI/Button/AbsoluteButton/AbsoluteButton';
import Storage from '../../components/Storage';
import { updateObject } from '../../shared/utility';

class Game extends Component {
    componentDidMount() {
        const type = Storage.get('type');
        const teams = Storage.get('teams');
        const players = Storage.get('players');
        if (!type) return this.props.history.push('/type');
        if (type === 1 && !players) return this.props.history.push('/players');
        if (type === 2 && !teams.first) return this.props.history.push('/teams');
        if (type === 2 && !teams.first.players) return this.props.history.push('/players');
    }

    backHandler = () => {
        Storage.set('players', undefined);
        return this.props.history.push('/players');
    }

    scoreUpdateHandler = key => {
        const teams = Storage.get('teams');
        const players = Storage.get('players');

        const participants = teams ? teams : players;
        const participant = participants[key];
        const opponent = participants[key === 'first' ? 'second' : 'first'];

        if (participant.points == 0) participant.points = 15;
        else if (participant.points == 15) participant.points = 30;
        else if (participant.points == 30) participant.points = 40;
        else if (participant.points == 40) {
            if (opponent.points == 40) participant.points = '40A';
            else if (opponent.points == '40A') opponent.points = 40;
            else {
                participant.points = 0;
                opponent.points = 0;
                
                const setKey = Object.keys(participant.sets).find(key => !sets[key].done);
                const set = participant.sets[setKey];
                
                participant.sets[setKey] = +set + 1;


            }
        }
    }

    newGame = () => {

    }

    newSet = () => {
        
    }

    render() {
        const teams = Storage.get('teams');
        const players = Storage.get('players');

        const participants = teams ? teams : players;
        if (!participants.first.points) {
            const defaultParameters = {
                points: 0,
                sets: {
                    first: 0,
                    second: 0,
                    third: 0,
                }
            };
            participants.first = updateObject(participants.first, defaultParameters);
            participants.second = updateObject(participants.second, defaultParameters);
            Storage.set(teams ? 'teams' : 'players', participants);
        }

        return <div className="flex-fill row align-items-center justify-content-between">
            <Col lg={5} className="d-flex justify-content-center">
                <div className="border rounded-lg border-darkgreen p-3 bg-green d-flex text-white text-x-large text-center">
                    <div className="mr-3">
                        <div>{participants.first.name}</div>
                        <div style={{ cursor: 'pointer' }} onClick={() => this.scoreUpdateHandler('first')} className="d-inline-block border bg-soft border-border p-3 text-xx-large text-700 text-dark">{participants.first.points}</div>
                    </div>

                    <div>
                        <div>{participants.second.name}</div>
                        <div style={{ cursor: 'pointer' }} onClick={() => this.scoreUpdateHandler('second')} className="d-inline-block border bg-soft border-border p-3 text-xx-large text-700 text-dark">{participants.second.points}</div>
                    </div>
                </div>
            </Col>

            <Col lg={5} className="text-center text-secondary">
                <div className="border-top border-left border-border bg-white d-inline-flex">
                    <div className="border-right border-border">
                        <div className="border-bottom border-border text-700 p-3">{participants.first.name}</div>
                        <div className="border-bottom border-border text-700 p-3">{participants.second.name}</div>
                    </div>

                    <div className="border-right border-border">
                        <div className="border-bottom border-border p-3">{participants.first.sets.first}</div>
                        <div className="border-bottom border-border p-3">{participants.second.sets.first}</div>
                    </div>
                    
                    <div className="border-right border-border">
                        <div className="border-bottom border-border p-3">{participants.first.sets.second}</div>
                        <div className="border-bottom border-border p-3">{participants.second.sets.second}</div>
                    </div>
                    
                    <div className="border-right border-border">
                        <div className="border-bottom border-border p-3">{participants.first.sets.third}</div>
                        <div className="border-bottom border-border p-3">{participants.second.sets.third}</div>
                    </div>
                </div>
            </Col>
        </div>;
    }
}

export default withRouter(Game);