'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Event = {
  time: string
  title: string
  speaker: string
}

type Stage = {
  name: string
  events: Event[]
}

const stages: Stage[] = [
  {
    name: "Main Stage",
    events: [
      { time: "09:00 AM", title: "Opening Keynote", speaker: "John Doe" },
      { time: "10:30 AM", title: "Future of AI", speaker: "Jane Smith" },
      { time: "01:00 PM", title: "Lunch Break", speaker: "" },
      { time: "02:30 PM", title: "Web3 and Blockchain", speaker: "Mike Johnson" },
    ]
  },
  {
    name: "Workshop Room",
    events: [
      { time: "09:30 AM", title: "React Hooks Deep Dive", speaker: "Emily Brown" },
      { time: "11:00 AM", title: "GraphQL Masterclass", speaker: "Chris Wilson" },
      { time: "02:00 PM", title: "Building Scalable APIs", speaker: "Sarah Lee" },
    ]
  },
  {
    name: "Panel Discussion",
    events: [
      { time: "10:00 AM", title: "Diversity in Tech", speaker: "Panel" },
      { time: "12:30 PM", title: "Future of Work", speaker: "Panel" },
      { time: "03:00 PM", title: "Sustainability in Tech", speaker: "Panel" },
    ]
  }
]

export function ConferenceScheduleComponent() {
  const [activeTab, setActiveTab] = useState("Main Stage")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Conference Schedule</h1>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          {stages.map((stage) => (
            <TabsTrigger key={stage.name} value={stage.name}>
              {stage.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {stages.map((stage) => (
          <TabsContent key={stage.name} value={stage.name}>
            <Card>
              <CardHeader>
                <CardTitle>{stage.name}</CardTitle>
                <CardDescription>Schedule for {stage.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {stage.events.map((event, index) => (
                    <li key={index} className="border-b pb-2 last:border-b-0">
                      <p className="text-sm text-gray-500">{event.time}</p>
                      <h3 className="font-semibold">{event.title}</h3>
                      {event.speaker && <p className="text-sm">{event.speaker}</p>}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}