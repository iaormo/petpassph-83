
// Go High Level API integration
// Documentation: https://highlevel.stoplight.io/docs/integrations/

interface GoHighLevelConfig {
  apiKey: string;
  locationId: string;
}

// API client initialization with API key
const initializeGHLClient = (config: GoHighLevelConfig) => {
  return {
    baseUrl: "https://services.leadconnectorhq.com",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
      locationId: config.locationId,
    },
  };
};

// Contact sync functions
export const syncContactToGHL = async (
  contact: any,
  config: GoHighLevelConfig
) => {
  try {
    const client = initializeGHLClient(config);
    
    // Format the contact data according to GHL API requirements
    const contactData = {
      email: contact.ownerContact,
      firstName: contact.ownerName.split(' ')[0],
      lastName: contact.ownerName.split(' ').slice(1).join(' '),
      phone: contact.ownerContact.includes('@') ? '' : contact.ownerContact,
      customField: [
        {
          key: "pet_name",
          value: contact.name,
        },
        {
          key: "pet_species",
          value: contact.species,
        },
        {
          key: "pet_breed",
          value: contact.breed,
        },
      ],
    };

    const response = await fetch(`${client.baseUrl}/contacts/upsert`, {
      method: "POST",
      headers: client.headers,
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error(`Failed to sync contact: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Contact synced to GHL:", data);
    
    return data;
  } catch (error) {
    console.error("Error syncing contact to GHL:", error);
    throw error;
  }
};

// Appointment sync functions
export const syncAppointmentToGHL = async (
  appointment: any,
  config: GoHighLevelConfig
) => {
  try {
    const client = initializeGHLClient(config);
    
    // Format date and time for GHL calendar
    const [year, month, day] = appointment.date.split('-');
    const [hours, minutes] = appointment.time.split(':');
    const startTime = new Date(year, month-1, day, hours, minutes);
    
    // Default appointment duration is 30 minutes
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
    
    // Format the appointment data according to GHL API requirements
    const appointmentData = {
      title: `${appointment.type} - ${appointment.patientName}`,
      description: appointment.notes || "No additional notes",
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      calendarId: "medical-appointments", // This should be configured based on your GHL setup
      contactId: appointment.contactId || "", // If available from previous contact sync
    };

    const response = await fetch(`${client.baseUrl}/appointments`, {
      method: "POST",
      headers: client.headers,
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      throw new Error(`Failed to sync appointment: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Appointment synced to GHL:", data);
    
    return data;
  } catch (error) {
    console.error("Error syncing appointment to GHL:", error);
    throw error;
  }
};

// Medical records sync functions
export const syncMedicalRecordToGHL = async (
  medicalRecord: any,
  patientId: string,
  config: GoHighLevelConfig
) => {
  try {
    const client = initializeGHLClient(config);
    
    // Format the note data for GHL
    const noteData = {
      contactId: patientId,
      body: `
        <strong>Medical Record - ${medicalRecord.date}</strong>
        <p>Description: ${medicalRecord.description}</p>
        <p>Treatment: ${medicalRecord.treatment}</p>
        <p>Medication: ${medicalRecord.medication}</p>
        <p>Physician: ${medicalRecord.veterinarian}</p>
        ${medicalRecord.followUp ? `<p>Follow-up: ${medicalRecord.followUp}</p>` : ''}
      `,
      type: "MEDICAL_RECORD",
    };

    const response = await fetch(`${client.baseUrl}/contacts/notes`, {
      method: "POST",
      headers: client.headers,
      body: JSON.stringify(noteData),
    });

    if (!response.ok) {
      throw new Error(`Failed to sync medical record: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Medical record synced to GHL:", data);
    
    return data;
  } catch (error) {
    console.error("Error syncing medical record to GHL:", error);
    throw error;
  }
};

// Initialize the API with environment variables if available
export const getGHLConfig = (): GoHighLevelConfig | null => {
  const apiKey = localStorage.getItem('GHL_API_KEY');
  const locationId = localStorage.getItem('GHL_LOCATION_ID');
  
  if (!apiKey || !locationId) {
    console.warn('GHL API credentials not found. Some features may be limited.');
    return null;
  }
  
  return { apiKey, locationId };
};
