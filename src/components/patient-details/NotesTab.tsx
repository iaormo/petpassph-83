
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Patient, Note } from "@/lib/models/types";
import { addNote } from "@/lib/utils/patientUtils";
import AddNoteForm from "@/components/AddNoteForm";

interface NotesTabProps {
  patient: Patient;
  setPatient?: React.Dispatch<React.SetStateAction<Patient | null>>;
  userRole: "physician" | "nurse" | "admin" | "patient";
}

const NotesTab: React.FC<NotesTabProps> = ({ patient, setPatient, userRole }) => {
  const isReadOnly = userRole === "patient";
  const [showPrivateNotes, setShowPrivateNotes] = useState(userRole !== "patient");
  
  const filteredNotes = showPrivateNotes 
    ? patient.notes 
    : patient.notes.filter(note => !note.isPrivate);

  const handleAddNote = (note: Note) => {
    if (!patient) return;
    
    addNote(patient.id, note);

    // Update the UI if setPatient is provided
    if (setPatient) {
      setPatient({ ...patient, notes: [note, ...patient.notes] });
    }
  };

  return (
    <div className="space-y-6">
      {!isReadOnly && (
        <Card>
          <CardHeader>
            <CardTitle>Add Note</CardTitle>
          </CardHeader>
          <CardContent>
            <AddNoteForm patientId={patient.id} onAddNote={handleAddNote} />
          </CardContent>
        </Card>
      )}
      
      {filteredNotes.length === 0 ? (
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-muted-foreground">No notes found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <Card key={note.id} className={note.isPrivate ? "border-orange-200" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    {note.isPrivate && (
                      <span className="text-xs text-orange-600 font-medium">Private Note</span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground block">
                      {new Date(note.date).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-muted-foreground block mt-1">
                      By: {note.createdBy}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{note.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesTab;
