
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
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateQRCode } from "@/lib/utils/patientUtils";

const QRCodeFormSection: React.FC = () => {
  const form = useFormContext();

  const regenerateQRCode = () => {
    const newQRCode = generateQRCode();
    form.setValue("qrCode", newQRCode);
    toast({
      title: "QR Code Generated",
      description: `New QR Code: ${newQRCode}`,
    });
  };

  return (
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
  );
};

export default QRCodeFormSection;
