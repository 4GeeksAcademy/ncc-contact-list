import * as api from './services/api.js';

export const initialStore = () => {
  return {
    contacts: [],
    loading: false
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'set_loading':
      return {
        ...store,
        loading: action.payload
      };

    case 'get_contacts':
      return {
        ...store,
        contacts: action.payload,
        loading: false
      };
    
    case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
        loading: false
      };
    
    case 'update_contact':
      return {
        ...store,
        contacts: store.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        ),
        loading: false
      };
    
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload),
        loading: false
      };
    
    default:
      return store;
  }    
}

// Funciones async para usar en los componentes
export const contactActions = {
  
  loadContacts: async (dispatch) => {
    dispatch({ type: 'set_loading', payload: true });
    try {
      const contacts = await api.getContacts();
      dispatch({ type: 'get_contacts', payload: contacts || [] });
    } catch (error) {
      console.error('Error loading contacts:', error);
      dispatch({ type: 'get_contacts', payload: [] });
    }
  },

  createContact: async (dispatch, contactData) => {
    dispatch({ type: 'set_loading', payload: true });
    try {
      const newContact = await api.createContact(contactData);
      dispatch({ type: 'add_contact', payload: newContact });
      return true;
    } catch (error) {
      console.error('Error creating contact:', error);
      dispatch({ type: 'set_loading', payload: false });
      return false;
    }
  },

  updateContact: async (dispatch, id, contactData) => {
    dispatch({ type: 'set_loading', payload: true });
    try {
      const updatedContact = await api.updateContact(contactData, id);
      dispatch({ type: 'update_contact', payload: updatedContact });
      return true;
    } catch (error) {
      console.error('Error updating contact:', error);
      dispatch({ type: 'set_loading', payload: false });
      return false;
    }
  },

  deleteContact: async (dispatch, contactId) => {
    dispatch({ type: 'set_loading', payload: true });
    try {
      const success = await api.deleteContact(contactId);
      if (success) {
        dispatch({ type: 'delete_contact', payload: contactId });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting contact:', error);
      dispatch({ type: 'set_loading', payload: false });
      return false;
    }
  }
};