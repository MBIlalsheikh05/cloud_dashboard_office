'use client'
import { Statcard } from "@/components/layout/Statcard"
import { DollarSign, Users, Bot, Globe } from "lucide-react"


const OverviewPage = () => {
    return <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Statcard name="Total Hits" icon={DollarSign} value="80"/>
                    <Statcard name="Usage Hits" icon={Users} value="30"/>
                    <Statcard name="Assigned Hits" icon={Bot} value="70"/>
                    <Statcard name="Remaining Hits" icon={Globe} value="40"/>
                    {/* <Statcard name="Unassigned " icon={Globe} value="5666"/> */}
</div>
            </main>
        </div>
  
}

export default OverviewPage
