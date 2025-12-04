'use client'
import { Statcard } from "@/components/layout/Statcard"
import { DollarSign, Users, Bot, Globe } from "lucide-react"


const OverviewPage = () => {
    return <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Statcard name="Total Revenue" icon={DollarSign} value="$1122,92"/>
                    <Statcard name="Total Clients" icon={Users} value="22"/>
                    <Statcard name="Total Bots" icon={Bot} value="75"/>
                    <Statcard name="Total Proxy Hits" icon={Globe} value="5666"/>
</div>
            </main>
        </div>
  
}

export default OverviewPage
