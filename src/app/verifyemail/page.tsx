'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function VerifyUserEmail() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
            setError(false);
        } catch (err: unknown) {
            setError(true);
            const errorMessage = err instanceof Error ? err.message : "Verification failed";
            console.log(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Grab the token from the URL when the component loads
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get("token") || "";
        setToken(urlToken);
    }, []);

    // Automatically trigger verification once the token is found in state
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl mb-4">Verify Email</h1>
            
            <h2 className="p-2 bg-orange-500 text-black mb-4">
                {token ? `${token.substring(0, 15)}...` : "No token found"}
            </h2>

            {loading && <p>Verifying your email, please wait...</p>}

            {verified && (
                <div>
                    <h2 className="text-2xl text-green-500">Email Verified Successfully!</h2>
                    <Link href="/login" className="text-blue-500 underline mt-2 block">
                        Login here
                    </Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl text-red-500">Error: Verification Failed</h2>
                    <p>The token may be invalid or expired.</p>
                </div>
            )}
        </div>
    );
}
