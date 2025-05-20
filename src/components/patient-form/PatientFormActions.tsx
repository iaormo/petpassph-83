
import React from "react";
import { Button } from "@/components/ui/button";

interface PatientFormActionsProps {
  isEditing: boolean;
}

const PatientFormActions: React.FC<PatientFormActionsProps> = ({ isEditing }) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button type="submit">
        {isEditing ? "Update Patient" : "Add Patient"}
      </Button>
    </div>
  );
};

export default PatientFormActions;
