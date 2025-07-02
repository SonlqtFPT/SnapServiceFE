'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CartItem } from '../cart/typeOfCart';
import CartSumary from './components/CartSumary';
import dynamic from 'next/dynamic';

const MapAddressPicker = dynamic(() => import('./components/MapAddressPicker'), { ssr: false });

interface Province {
    code: number;
    name: string;
}

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
        provinceCode: '',
        districtCode: '',
        wardCode: '',
        lat: 10.762622,
        lng: 106.660172,
    });

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

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
        const fetchProvinces = async () => {
            try {
                const res = await axios.get('https://provinces.open-api.vn/api/p/');
                setProvinces(res.data);
            } catch (err) {
                console.error('Failed to fetch provinces:', err);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (!formData.provinceCode) {
                setDistricts([]);
                setWards([]);
                return;
            }
            try {
                const res = await axios.get(`https://provinces.open-api.vn/api/p/${formData.provinceCode}?depth=2`);
                setDistricts(res.data.districts);
            } catch (err) {
                console.error('Failed to fetch districts:', err);
            }
        };
        fetchDistricts();
    }, [formData.provinceCode]);

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
                    <h2 className="text-xl font-bold text-center text-gray-700 bg-gray-100 p-3 rounded">Thông tin giao hàng</h2>

                    <div>
                        <label className="block text-sm font-medium">Họ và tên *</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Số điện thoại *</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Chọn vị trí trên bản đồ *</label>
                        <MapAddressPicker
                            address={formData.address}
                            onAddressChange={(addr) => {
                                updateFormData({ address: addr });
                            }}

                            onCoordinatesChange={(lat, lng) => {
                                updateFormData({ lat: Number(lat), lng: Number(lng) });
                            }}
                        />

                    </div>

                    <div>
                        <label className="block text-sm font-medium">Tỉnh / Thành phố *</label>
                        <select
                            name="provinceCode"
                            value={formData.provinceCode}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        >
                            <option value="">-- Chọn Tỉnh / Thành phố --</option>
                            {provinces.map(p => (
                                <option key={p.code} value={p.code}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Quận / Huyện *</label>
                        <select
                            name="districtCode"
                            value={formData.districtCode}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                            disabled={!formData.provinceCode}
                        >
                            <option value="">-- Chọn Quận / Huyện --</option>
                            {districts.map(d => (
                                <option key={d.code} value={d.code}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phường / Xã *</label>
                        <select
                            name="wardCode"
                            value={formData.wardCode}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                            disabled={!formData.districtCode}
                        >
                            <option value="">-- Chọn Phường / Xã --</option>
                            {wards.map(w => (
                                <option key={w.code} value={w.code}>{w.name}</option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>

            <CartSumary cartItems={selectedItems} />
        </div>
    );
}
