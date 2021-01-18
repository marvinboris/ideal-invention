import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Col } from 'reactstrap';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import AbsoluteButton from '../../components/UI/Button/AbsoluteButton/AbsoluteButton';
import Storage from '../../components/Storage';

import Img from '../../assets/images/tennis-svgrepo-com.svg';

class Type extends Component {
    componentDidMount() {
        const type = Storage.get('type');
        if (type === 1) this.props.history.push('/players');
        else if (type === 2) this.props.history.push('/teams');
    }

    singleClickHandler = () => {
        Storage.set('type', 1);
        this.props.history.push('/players');
    }

    doubleClickHandler = () => {
        Storage.set('type', 2);
        this.props.history.push('/teams');
    }

    render() {
        return <div className="flex-fill row align-items-center">
            <Col lg={5}>
                <img src={Img} alt="Tennis player" className="img-fluid fill-green" />
            </Col>

            <Col lg={7} className="text-center text-secondary pb-5">
                <div className="pb-4">
                    <AbsoluteButton color="green" onClick={this.singleClickHandler} icon={faAngleRight} size="lg" className="rounded-pill text-x-large py-3 px-4">Simple</AbsoluteButton>
                </div>

                <div>
                    <AbsoluteButton color="darkgreen" onClick={this.doubleClickHandler} icon={faAngleRight} size="lg" className="rounded-pill text-x-large py-3 px-4">Double</AbsoluteButton>
                </div>
            </Col>
        </div>;
    }
}

export default withRouter(Type);