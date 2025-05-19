'use client';
import ImpedanceTabs from "@/components/impedance-tabs";
import VSWRTabs from "@/components/vswr-tabs";
import { useState } from "react";

type CalculationTab = 'vswr' | 'impedance';

export function ClientPage(){
     const [activeTab, setActiveTab] = useState<CalculationTab>('vswr');
     return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-wrap border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm md:text-base ${
                activeTab === 'vswr' 
                  ? 'text-blue-500 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('vswr')}
            >
              VSWR & Reflection
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm md:text-base ${
                activeTab === 'impedance' 
                  ? 'text-blue-500 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('impedance')}
            >
              Impedance Z(x)
            </button>
          </div>

            {activeTab === 'vswr' && <VSWRTabs/>}

            {activeTab === 'impedance' &&  <ImpedanceTabs/>}
        </div>
     )
}