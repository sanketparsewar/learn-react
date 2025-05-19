import React from "react";

export default function Service() {
return (
    <div className="service-page relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mt-12 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white shadow-lg rounded-lg">
                        <h1 className="text-4xl text-blue-800 font-extrabold tracking-tight">
                            Our Services
                        </h1>
                        <p className="text-lg text-gray-700 mt-4">
                            We offer a wide range of services to meet your needs.
                        </p>

                        <div className="flex items-center mt-8 text-gray-600">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                className="w-8 h-8 text-blue-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <div className="ml-4 text-md tracking-wide font-semibold">
                                Acme Inc, Street, State, Postal Code
                            </div>
                        </div>

                        <div className="flex items-center mt-4 text-gray-600">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                className="w-8 h-8 text-blue-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            <div className="ml-4 text-md tracking-wide font-semibold">
                                +44 1234567890
                            </div>
                        </div>

                        <div className="flex items-center mt-4 text-gray-600">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                className="w-8 h-8 text-blue-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            <div className="ml-4 text-md tracking-wide font-semibold">
                                info@acme.org
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-white shadow-lg rounded-lg">
                        <h2 className="text-3xl font-bold text-blue-800 mb-6">
                            Why Choose Us?
                        </h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>High-quality services tailored to your needs</li>
                            <li>Experienced professionals</li>
                            <li>Customer satisfaction guaranteed</li>
                            <li>Affordable pricing</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
