import React from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { toggleModal } from "../actions/index";
import { connect } from "react-redux";

const App = ({isModalOpen}) => {
    return (
        <>
            <Table />
            {isModalOpen && <Modal />}
        </>
    );
}

export const mapDispatchToProps = dispatch => {
    return {
        toggleModal: (bool) => dispatch(toggleModal(bool)),
    }
};

export const mapStateToProps = state => {
    return {
        isModalOpen: state.isModalOpen,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)