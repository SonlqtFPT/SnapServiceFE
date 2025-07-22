'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CartItem } from '../cart/typeOfCart';
import CartSumary from './components/CartSumary';


interface District {
    code: number;
    name: string;
}

interface Ward {
    code: number;
    name: string;
}

export default function CheckoutClient() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        provinceCode: '79',
        districtCode: '',
        wardCode: '',
        lat: 10.762622,
        lng: 106.660172,
    });

    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const validateFormData = () => {
        const errors: string[] = [];

        if (!formData.name.trim()) errors.push("Full name is required\n");
        if (!formData.phone.trim()) errors.push("Phone number is required\n");
        if (!formData.address.trim()) errors.push("Address is required\n");
        if (!formData.districtCode) errors.push("District is required\n");
        if (!formData.wardCode) errors.push("Ward is required\n");


        return errors;
    };

    useEffect(() => {
        const storedItems = localStorage.getItem('checkout');
        if (storedItems) {
            try {
                setCartItems(JSON.parse(storedItems));
            } catch (error) {
                console.error('Failed to parse checkout items:', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const res = await axios.get(`https://provinces.open-api.vn/api/p/79?depth=2`);
                setDistricts(res.data.districts);
            } catch (err) {
                console.error('Failed to fetch districts:', err);
            }
        };
        fetchDistricts();
    }, []);

    useEffect(() => {
        const fetchWards = async () => {
            if (!formData.districtCode) {
                setWards([]);
                return;
            }
            try {
                const res = await axios.get(`https://provinces.open-api.vn/api/d/${formData.districtCode}?depth=2`);
                setWards(res.data.wards);
            } catch (err) {
                console.error('Failed to fetch wards:', err);
            }
        };
        fetchWards();
    }, [formData.districtCode]);

    const selectedItems = cartItems.filter(item => item.isChecked);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateFormData({ [e.target.name]: e.target.value });
    };


    const updateFormData = (updates: Partial<typeof formData>) => {
        setFormData(prev => {
            const next = { ...prev, ...updates };
            localStorage.setItem('checkoutFormData', JSON.stringify(next));
            return next;
        });
    };
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-9">
                <form className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-xl font-bold text-center text-gray-700 bg-gray-100 p-3 rounded">Delivery information</h2>

                    <div>
                        <label className="block text-sm font-medium">Full name *</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone *</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Address *</label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                            placeholder='Số nhà, tên đường...'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">District *</label>
                        <select
                            name="districtCode"
                            value={formData.districtCode}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        >
                            <option value="">-- Select District --</option>
                            {districts.map(d => (
                                <option key={d.code} value={d.code}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Ward *</label>
                        <select
                            name="wardCode"
                            value={formData.wardCode}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                            disabled={!formData.districtCode}
                        >
                            <option value="">-- Select Ward --</option>
                            {wards.map(w => (
                                <option key={w.code} value={w.code}>{w.name}</option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>

            <CartSumary
                cartItems={selectedItems}
                validateFormData={validateFormData}
            />

        </div>
    );
}
