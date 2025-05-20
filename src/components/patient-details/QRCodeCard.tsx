
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeCardProps {
  qrCode: string;
  patientName: string;
}

const QRCodeCard: React.FC<QRCodeCardProps> = ({ qrCode, patientName }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="bg-white p-4 rounded-lg border mb-4">
          <QRCodeCanvas 
            value={qrCode} 
            size={150} 
            includeMargin={true}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
          />
        </div>
        <p className="text-sm text-center text-muted-foreground">
          Scan to quickly access {patientName}'s records
        </p>
      </CardContent>
    </Card>
  );
};

export default QRCodeCard;
