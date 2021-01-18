import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Col } from 'reactstrap';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import AbsoluteButton from '../../components/UI/Button/AbsoluteButton/AbsoluteButton';
import Storage from '../../components/Storage';

import Img from '../../assets/images/tennis-svgrepo-com.svg';

class Home extends Component {
    componentDidMount() {
        const type = Storage.get('type');
        if (type) this.props.history.push('/type');
    }

    render() {
        return <div className="flex-fill row align-items-center">
            <Col lg={7} className="text-center text-secondary pb-5">
                <div className="pb-5 text-500 text-x-large">Bienvenue</div>

                <div className="text-darkgreen text-700 text-xx-large">Prenez le contrôle de la partie</div>

                <div className="py-4 text-small text-large text-300 w-50 mx-auto">Mettez à jour le score de la partie d'un simple clic.</div>

                <Link to="/type" className="text-reset">
                    <AbsoluteButton color="darkgreen" icon={faAngleRight} size="lg" className="rounded-pill text-x-large py-3 px-4">Commencez</AbsoluteButton>
                </Link>
            </Col>

            <Col lg={5}>
                <img src={Img} alt="Tennis player" className="img-fluid fill-green" />
            </Col>
        </div>;
    }
}

export default withRouter(Home);