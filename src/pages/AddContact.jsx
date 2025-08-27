import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { contactActions } from "../store";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { idElement } = useParams();
    const isEditing = !!idElement;
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (isEditing && store.contacts) {
            const contactToEdit = store.contacts.find(contact => contact.id == idElement);
            if (contactToEdit) {
                setFormData({
                    name: contactToEdit.name || '',
                    email: contactToEdit.email || '',
                    phone: contactToEdit.phone || '',
                    address: contactToEdit.address || ''
                });
            }
        }
    }, [isEditing, idElement, store.contacts]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            alert('Please insert a name');
            return;
        }

        let success;
        if (isEditing) {
            success = await contactActions.updateContact(dispatch, parseInt(idElement), formData);
        } else {
            success = await contactActions.createContact(dispatch, formData);
        }

        if (success) {
            navigate('/contact');
        } else {
            alert('There is an error saving this contact');
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="text-center mb-4">
                        <h2>{isEditing ? 'Edit contact' : 'Add a new contact'}</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                required
                                disabled={store.loading}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter email"
                                disabled={store.loading}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="tel"
                                className="form-control form-control-lg"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter phone"
                                disabled={store.loading}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter address"
                                disabled={store.loading}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-100 py-3 mb-3"
                            disabled={store.loading}
                        >
                            {store.loading ? 'Saving...' : 'save'}
                        </button>

                        <div className="text-center">
                            <Link to="/contact" className="btn btn-link">
                                or get back to contacts
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};