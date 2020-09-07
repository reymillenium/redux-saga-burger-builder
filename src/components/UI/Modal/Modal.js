import React from "react";
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

import classes from './Modal.module.scss';

const modal = (props) => (
    <Auxiliary>
        <Backdrop
            show={props.show}
            backdrop_click={props.modalClosed}/>

        <div className={classes.Modal}
             style={{
                 transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                 opacity: props.show ? '1' : '0'
             }}
        >
            {props.children}
        </div>
    </Auxiliary>
);

modal.propTypes = {
    modalClosed: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}
export default modal;