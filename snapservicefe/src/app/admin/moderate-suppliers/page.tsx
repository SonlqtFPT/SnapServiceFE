'use client';

import { useEffect, useState } from 'react';
import { getAllSuppliers, moderateSupplier } from '@/services/users/supplierService';
import { Supplier } from '@/types/user/SupplierType';
import ZoomableImage from './component/ZoomableImage';
import { Check, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';

export default function ModerateSupplier() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const data = await getAllSuppliers();
      setSuppliers(data.filter((s) => !s.isVerified));
    } catch (error) {
      alert('Failed to fetch suppliers');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleAction = async (id: number, action: 'approve' | 'reject') => {
  try {
    setUpdatingId(id);
    const approve = action === 'approve';
    await moderateSupplier(id, approve);
    alert(`Supplier ${action}d successfully`);
    setSuppliers(prev => prev.filter(sup => sup.id !== id));
  } catch (error) {
    alert(`Failed to ${action} supplier`);
    console.error(error);
  } finally {
    setUpdatingId(null);
  }
};


  if (loading) return <p className="p-6 text-muted-foreground">Loading suppliers...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Moderate Suppliers ({suppliers.length})</h1>
      <Card>
        <CardHeader>
          {/* <p className="text-muted-foreground text-sm">
            Below are suppliers waiting for moderation. You can approve or reject them.
          </p> */}
        </CardHeader>

        <CardContent>
          {suppliers.length === 0 ? (
            <p className="text-muted-foreground text-sm">No pending suppliers to moderate.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Registered At</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">CCCD (Front)</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">CCCD (Back)</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {suppliers.map((sup, index) => (
                    <tr key={sup.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{sup.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{sup.description}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-700">
                        {new Date(sup.registeredAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {sup.frontImageCCCD ? (
                          <ZoomableImage src={sup.frontImageCCCD} alt="CCCD Front" />
                        ) : (
                          <span className="text-muted-foreground text-xs">No image</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {sup.backImageCCCD ? (
                          <ZoomableImage src={sup.backImageCCCD} alt="CCCD Back" />
                        ) : (
                          <span className="text-muted-foreground text-xs">No image</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            className="w-24 gap-1"
                            onClick={() => handleAction(sup.id, 'approve')}
                            disabled={updatingId === sup.id}
                          >
                            <Check className="w-4 h-4" />
                            Approve
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            className="w-24 gap-1"
                            onClick={() => handleAction(sup.id, 'reject')}
                            disabled={updatingId === sup.id}
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
