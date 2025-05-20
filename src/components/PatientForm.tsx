import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Patient } from "@/lib/models/types";
import { generateQRCode } from "@/lib/utils/patientUtils";

// Import sub-components
import ProfileImageUploader from "./patient-form/ProfileImageUploader";
import BasicInfoFormSection from "./patient-form/BasicInfoFormSection";
import ContactInfoFormSection from "./patient-form/ContactInfoFormSection";
import InsuranceFormSection from "./patient-form/InsuranceFormSection";
import QRCodeFormSection from "./patient-form/QRCodeFormSection";
import PatientFormActions from "./patient-form/PatientFormActions";

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (data: Patient) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSubmit }) => {
  const isEditing = !!patient;
  
  const form = useForm({
    defaultValues: patient || {
      id: "",
      name: "",
      dateOfBirth: new Date().toISOString().split("T")[0],
      gender: "Male" as const,
      bloodType: "",
      height: 0,
      weight: 0,
      contactPhone: "",
      contactEmail: "",
      address: "",
      insuranceProvider: "",
      insuranceNumber: "",
      emergencyContact: "",
      medicalRecords: [],
      vaccineRecords: [],
      notes: [],
      qrCode: generateQRCode(),
      profileImg: ""
    },
  });

  const handleSubmit = (data: any) => {
    // For a new patient, we'd generate an ID server-side
    // For now we're just mocking that behavior
    if (!isEditing) {
      data.id = data.qrCode || generateQRCode();
      data.medicalRecords = [];
      data.vaccineRecords = [];
      data.notes = [];
    }

    // Handle the image submission
    const fileInput = document.getElementById('profileImage') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // In a real app, we would upload this to a server
        // For now, we'll use the data URL directly
        data.profileImg = reader.result as string;
        onSubmit(data as Patient);
      };
      
      reader.readAsDataURL(file);
    } else {
      // No new image was selected, keep existing or use placeholder
      if (!data.profileImg) {
        data.profileImg = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop";
      }
      onSubmit(data as Patient);
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Profile Image Upload */}
            <ProfileImageUploader profileImg={patient?.profileImg} />
            
            {/* Basic Information */}
            <BasicInfoFormSection />
            
            {/* Contact Information */}
            <ContactInfoFormSection />
            
            {/* Insurance Information */}
            <InsuranceFormSection />
            
            {/* Emergency Contact is in ContactInfoFormSection */}
            
            {/* QR Code */}
            <QRCodeFormSection />
          </div>

          {/* Form Actions */}
          <PatientFormActions isEditing={isEditing} />
        </form>
      </Form>
    </FormProvider>
  );
};

export default PatientForm;
