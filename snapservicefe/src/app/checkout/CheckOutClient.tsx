'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function CheckoutClient() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        streetAddress: '',
        apartment: '',
        city: '',
        district: 'District 1',
        phone: '',
        email: '',
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-9">
                <form className="max-w-4xl mx-auto space-y-6">
                    <h2 className="text-xl font-bold rounded-t-md p-2 text-center text-gray-600 bg-gray-200">Billing details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">First name *</label>
                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Last name *</label>
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Street address *</label>
                        <input
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={handleChange}
                            required
                            placeholder="House number and street name"
                            className="w-full border rounded px-3 py-2 mb-2"
                        />
                        <input
                            name="apartment"
                            value={formData.apartment}
                            onChange={handleChange}
                            placeholder="Apartment, suite, unit, etc. (optional)"
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Town / City *</label>
                        <input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">District *</label>
                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option>District 1</option>
                            <option>District 2</option>
                            <option>District 3</option>
                        </select>
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
                        <label className="block text-sm font-medium">Email address *</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Order notes (optional)</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Notes about your order, e.g. special notes for delivery."
                            className="w-full border rounded px-3 py-2"
                            rows={3}
                        />
                    </div>
                </form>
            </div>
            <div className="col-span-3">
                <div className="sticky top-6 z-10">
                    <div className="text-xl text-center  font-bold rounded-t-md p-2 text-gray-600 bg-gray-200">Summary</div>

                    <div className='rounded-b-md shadow px-4 py-2' >
                        <div className="flex justify-between items-center mb-2">
                            <span>Subtotal</span>
                            {/* <span>${subtotal}</span> */}
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <hr className="border-dashed border-t-2 border-gray-300 my-4" />
                        <div className="flex justify-between items-center font-bold text-lg ">
                            <span>Total</span>
                            {/* <span>${subtotal}</span> */}
                        </div>
                        <p className='text-sm text-gray-500 my-4'>Your personal data will be used to process your order,
                            support your experience throughout this website, and for
                            other purposes described in our privacy policy.</p>

                        <div className="flex flex-col items-center space-y-3">
                            <button
                                className="w-[80%] bg-[#634C9F] text-white py-2 rounded-4xl text-lg cursor-pointer"
                            >
                                Place Order
                            </button>
                            <button className="w-[80%] bg-gray-100 text-[#634C9F] py-2 rounded-4xl text-lg cursor-pointer"
                                onClick={() => router.push('/home')}
                            >
                                ⟵ Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
