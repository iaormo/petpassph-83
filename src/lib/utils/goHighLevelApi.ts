
/**
 * Utility functions for interacting with the Go High Level API
 */

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IldWVWxlZXJLbkN4NFlvZU9hWFg2IiwiY29tcGFueV9pZCI6IlI4cVFpaTZkdGV0RzJ5ZWNWS0I2IiwidmVyc2lvbiI6MSwiaWF0IjoxNzA1NjI1MDAxNDkzLCJzdWIiOiIwbms0QWRFSmZTcVB5WTQ1MlhuZiJ9.W61WaFzAjtiuvBoGklK8d8zQrxMM8oUSPwtNllrZak0";
const BASE_URL = "https://services.leadconnectorhq.com";

/**
 * Create a new contact in Go High Level
 */
export const createContact = async (contactData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create contact: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

/**
 * Get a contact by ID from Go High Level
 */
export const getContact = async (contactId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/contacts/${contactId}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contact: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw error;
  }
};

/**
 * Upload a file to Go High Level
 */
export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

/**
 * Create an appointment in Go High Level
 */
export const createAppointment = async (appointmentData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create appointment: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

/**
 * Get appointments for a contact
 */
export const getContactAppointments = async (contactId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/appointments?contactId=${contactId}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch appointments: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

/**
 * Add custom field value to a contact
 */
export const addCustomField = async (contactId: string, fieldId: string, value: any) => {
  try {
    const response = await fetch(`${BASE_URL}/contacts/${contactId}/custom-field`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        id: fieldId,
        value
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add custom field: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding custom field:", error);
    throw error;
  }
};

/**
 * Create a medical record note for a patient in Go High Level
 */
export const createMedicalNote = async (contactId: string, noteData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(noteData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create medical note: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating medical note:", error);
    throw error;
  }
};
