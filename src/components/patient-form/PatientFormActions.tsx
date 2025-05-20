
import React from "react";
import { Button } from "@/components/ui/button";

interface PatientFormActionsProps {
  isEditing: boolean;
  onCancel?: () => void;
}

const PatientFormActions: React.FC<PatientFormActionsProps> = ({ isEditing, onCancel }) => {
  return (
    <div className="flex justify-end space-x-2">
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      )}
      <Button type="submit">
        {isEditing ? "Update Patient" : "Add Patient"}
      </Button>
    </div>
  );
};

export default PatientFormActions;
