
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const InsuranceFormSection: React.FC = () => {
  const form = useFormContext();

  return (
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
  );
};

export default InsuranceFormSection;
