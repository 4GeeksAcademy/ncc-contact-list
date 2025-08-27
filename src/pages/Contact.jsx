import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../pages/ContactCard";
import { contactActions } from "../store";

const Contact = () => {
    const { store, dispatch } = useGlobalReducer();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    useEffect(() => {
        contactActions.loadContacts(dispatch);
    }, []);

    const handleDelete = (contact) => {
        setContactToDelete(contact);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        const success = await contactActions.deleteContact(dispatch, contactToDelete.id);
        if (success) {
            setShowDeleteModal(false);
            setContactToDelete(null);
        }
    };

    return (
        <div className="container mt-4">
            {showDeleteModal && (
                <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5>Do you want to delete this contact?</h5>
                                <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>If you delete this contact it would be for ever! And you have to add it again!</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Wait! Let me think about it </button>
                                <button className="btn btn-success" onClick={confirmDelete}>Delete!</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {store.loading && (
                <div className="text-center">
                    <div className="spinner-border" role="status"></div>
                </div>
            )}

            {!store.loading && store.contacts.length === 0 ? (
                <div className="text-center py-5">
                    <p>There's no contacts</p>
                    <Link to="/addcontact" className="btn btn-primary"></Link>
                </div>
            ) : (
                store.contacts.map(contact => (
                    <ContactCard
                        key={contact.id}
                        contact={contact}
                        onDelete={() => handleDelete(contact)}
                    />
                ))
            )}
        </div>
    );
};

export default Contact;

