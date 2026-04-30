"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import DietCard from "../../components/diet/DietCard"
import DietSection from "../../components/diet/DietSection"
import DietCardList from "../../components/diet/DietCardList"
import Navbar from '@/src/components/global/Navbar';
import { Loader } from 'lucide-react';

function Page() { // Capitalized component name (Best practice)
    const [loading, setLoading] = useState(false);
    const [dietData, setDietData] = useState([]);
    const { data: session } = useSession();

    async function getDietData() {
        if (!session?.user?.email) return;
        setLoading(true);

        try {
            const body = JSON.stringify({ userEmail: session.user.email });
            const response = await fetch("http://localhost:3010/users/plan", {
                method: "POST",
                body: body,
                headers: { "Content-Type": "application/json" },
            });

            const jsonData = await response.json();
            // Ensure the path matches your API response structure
            setDietData(jsonData.dietRecommendation.sevenDayDietPlan);
        } catch (error) {
            console.error("Failed to fetch diet data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (session?.user?.email) getDietData();
    }, [session?.user?.email]);

    if (loading) return <div className="text-white p-10">Loading your plan...</div>;

    return (
        <>
            <Navbar/>
            <div className="mt-20">
                
                {
                    dietData && dietData.length>0?
                    <>
                        {dietData.map((dietDay, index) => (
                            <DietSection key={index} title={dietDay.day}>
                                <DietCardList>
                                    {Object.keys(dietDay).map((key, i) => {
                                        // Filter out 'day' or other non-meal keys
                                        if (key === "day") return null;
                                        return (
                                            <DietCard 
                                                heading= {key}
                                                key={i} 
                                                title={dietDay[key]} 
                                                // image={""} 
                                            />
                                        );
                                    })}
                                </DietCardList>
                            </DietSection>
                        ))}
                    </>
                    :
                    <div className='h-screen w-screen flex items-center justify-center'>
                        <div className='flex space-x-4 items-center'>
                            <span><Loader className='animate-spin' size={20}/></span>
                            <span className='text-lg'>Plan is generating</span>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default Page;