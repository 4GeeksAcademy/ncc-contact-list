const apiBaseUrl = "https://playground.4geeks.com/contact";

const AGENDA_NAME = "nicolas_carrillo"; 

export const getContacts = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/agendas/${AGENDA_NAME}/contacts`);
        
        if (!response.ok) {
            await createAgenda();
            return [];
        }
        
        const data = await response.json();
        return data.contacts || [];
    } catch (error) {
        console.error("Error getting contacts:", error);
        return [];
    }
};

const createAgenda = async () => {
    try {
        await fetch(`${apiBaseUrl}/agendas/${AGENDA_NAME}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error creating agenda:", error);
    }
};

// Servicio API Crear Contacto
export const createContact = async (contactData) => {
    try {
        const response = await fetch(`${apiBaseUrl}/agendas/${AGENDA_NAME}/contacts`, {
            method: "POST",
            body: JSON.stringify(contactData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error creating contact:", error);
        throw error;
    }
};

// Servicio API Actualizar Contacto 
export const updateContact = async (contactData, id) => {
    try {
        const response = await fetch(`${apiBaseUrl}/agendas/${AGENDA_NAME}/contacts/${id}`, {
            method: "PUT",
            body: JSON.stringify(contactData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error updating contact:", error);
        throw error;
    }
};

// Servicio API Borrar Contacto 
export const deleteContact = async (contactId) => {
    try {
        const response = await fetch(`${apiBaseUrl}/agendas/${AGENDA_NAME}/contacts/${contactId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        return response.ok;
    } catch (error) {
        console.error("Error deleting contact:", error);
        return false;
    }
};