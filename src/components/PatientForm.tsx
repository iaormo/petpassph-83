import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Patient } from "@/lib/models/types";
import { Camera, RefreshCw } from "lucide-react";
import { generateQRCode } from "@/lib/utils/patientUtils";
import { toast } from "@/hooks/use-toast";

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

  const regenerateQRCode = () => {
    const newQRCode = generateQRCode();
    form.setValue("qrCode", newQRCode);
    toast({
      title: "QR Code Generated",
      description: `New QR Code: ${newQRCode}`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                <img 
                  src={patient?.profileImg || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop"} 
                  alt="Patient profile" 
                  className="h-full w-full object-cover" 
                />
              </div>
              <label 
                htmlFor="profileImage" 
                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Upload image</span>
              </label>
              <input 
                id="profileImage" 
                type="file" 
                accept="image/*"
                className="hidden" 
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter patient name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Height in cm" 
                      {...field} 
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Weight in kg" 
                      {...field} 
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bloodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Contact phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Home address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="insuranceProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Provider</FormLabel>
                  <FormControl>
                    <Input placeholder="Insurance provider name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="insuranceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Insurance policy number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="emergencyContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact</FormLabel>
                <FormControl>
                  <Input placeholder="Name and phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qrCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>QR Code</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="QR Code" {...field} readOnly />
                  </FormControl>
                  <Button type="button" variant="outline" onClick={regenerateQRCode}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit">
            {isEditing ? "Update Patient" : "Add Patient"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PatientForm;
