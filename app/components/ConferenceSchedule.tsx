"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useEvents from "../../lib/hooks/use-events";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ConferenceSchedule() {
	const [activeTab, setActiveTab] = useState("Left Curve Stage");

	const d = useEvents();

	const stages = [
		{
			name: "Left Curve Stage",
			events: d.filter((event) => event.track === "Left Curve Stage")[0],
			color: "#A7D5D4",
		},
		{
			name: "Right Curve Stage",
			events: d.filter((event) => event.track === "Right Curve Stage")[0],
			color: "#A7D5F4",
		},
	];

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-semibold mb-6 text-center my-20">
				Solana Breakpoint 2024
			</h1>
			<Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
				<TabsList className="grid w-full grid-cols-2">
					{stages.map((stage) => (
						<TabsTrigger
							key={stage.name}
							value={stage.name}
							className={`bg-[${stage.color}]`}
						>
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
							<TooltipProvider>
								<CardContent>
									<ul className="space-y-4">
										{stage.events.dates[0].events.map((event) => (
											<li
												key={event.id_object}
												className="border-b pb-2 last:border-b-0"
											>
												<p className="text-sm text-gray-500">{event.time}</p>
												<h3 className="font-semibold">{event.name}</h3>

												<div className="flex items-center justify-between w-full">
													<div className="flex items-center justify-center">
														{event.speaker?.map((s) => (
															<p className="text-sm mr-2" key={s.companyname}>
																{s.fullname}
															</p>
														))}
													</div>

													<div className="flex items-center gap-x-2">
														{event.speaker?.map((s) => (
															<Tooltip key={s.companyname}>
																<TooltipTrigger>
																	<Avatar>
																		<AvatarImage
																			src={s.speaker_image}
																			alt={s.fullname}
																		/>
																		<AvatarFallback>
																			{s.fullname.charAt(0)}
																		</AvatarFallback>
																	</Avatar>
																</TooltipTrigger>
																<TooltipContent>{s.fullname}</TooltipContent>
															</Tooltip>
														))}
													</div>
												</div>
											</li>
										))}
									</ul>
								</CardContent>
							</TooltipProvider>
						</Card>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
