import './floatingAddButton.scss';

import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';




export const FloatingAddButton = props => {

    return (
        <div className={"fab-wrapper"}>
            <Button className={"fab fab-button"} color="primary" id="fabAddWeight" type="submit">
                <FontAwesomeIcon className={"fab-sign"} icon="plus" />
            </Button>
            <ul className={"fab-options"}>
                <li>
                    <span className={"fab-label"}><Translate contentKey="home.button.addWeight"/></span> 
                    <Button tag={Link} to={`./weights/add`} className={"fab-button"} color="primary" id="fabAddWeight" type="submit">
                        <FontAwesomeIcon className={"fab-sign"} icon="weight" />
                    </Button>
                </li>
                <li>
                    <span className={"fab-label"}><Translate contentKey="home.button.startWorkout"/></span> 
                    <Button tag={Link} to={`./workouts/start`} className={"fab-button"} disabled color="primary" id="fabStartWorkout" type="submit">
                        <FontAwesomeIcon className={"fab-sign"} icon="dumbbell" />
                    </Button>
                </li>
                <li>
                    <span className={"fab-label"}><Translate contentKey="home.button.addTarget"/></span> 
                    <Button tag={Link} to={`./targets/add`} className={"fab-button"} disabled color="primary" id="fabAddTarget" type="submit">
                        <FontAwesomeIcon className={"fab-sign"} icon="bullseye" />
                    </Button>
                </li>
                <li>
                <span className={"fab-label"}><Translate contentKey="home.button.feedback"/></span> 
                    <Button className={"fab-button"} color="primary" disabled id="fabAddWeight">
                        <FontAwesomeIcon className={"fab-sign"} icon="comment-alt" />
                    </Button>
                </li>
            </ul>
        </div>
    )
}

  
  export default FloatingAddButton;