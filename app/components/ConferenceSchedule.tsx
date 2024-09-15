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

const events = [
	{
		companies: [],
		date: "20 Sep",
		description: null,
		floorplan: {
			floorplan_id: 2113,
			location_name: "Left Curve Stage",
			marker_id: 242263,
		},
		has_livestream: false,
		id_object: "2da9fe3bb34442c59b0f",
		image_url: null,
		interaction_tool_url: null,
		is_favorite: false,
		is_live: false,
		is_viewable: true,
		loc: "Left Curve Stage",
		local_date: "20 Sep",
		local_time: "12:50 PM - 12:55 PM",
		media_content: null,
		name: "Product Keynote: Sling",
		speaker: [
			{
				companyname: "Sling Money",
				fullname: "Mike Hudack",
				id_agenda_speaker: 61615,
				position: "CEO & Co-founder",
				speaker_image:
					"https://v5.airtableusercontent.com/v3/u/33/33/1726408800000/oMWq6bOePeFSO9s3ARamKg/rrSPb7h8b8Ald6iaDxSoO7d6G4B3cPKfuy2kaJqRxqiqNgh4jD8Ll0bc0lre7Gb5E6mRYZuD0yif8jFkgvnE2y0EPZSFZMkKFjOsF4nJzYFWrWo_YYv-fbzDLYPE9kDl640-bbZXHDjlLi7tl1UWuQ/K_QXG0nrQWwL7TY6y8NbTSQ5QIWCTPEAhURV7zx28PA",
				tags: [],
			},
		],
		speaker_photos: [
			"https://v5.airtableusercontent.com/v3/u/33/33/1726408800000/oMWq6bOePeFSO9s3ARamKg/rrSPb7h8b8Ald6iaDxSoO7d6G4B3cPKfuy2kaJqRxqiqNgh4jD8Ll0bc0lre7Gb5E6mRYZuD0yif8jFkgvnE2y0EPZSFZMkKFjOsF4nJzYFWrWo_YYv-fbzDLYPE9kDl640-bbZXHDjlLi7tl1UWuQ/K_QXG0nrQWwL7TY6y8NbTSQ5QIWCTPEAhURV7zx28PA",
		],
		summary: null,
		tags: [],
		time: "12:50 PM - 12:55 PM",
		timestamp: 1726836600000,
		timestamp_end: 1726836900000,
		track: "Left Curve Stage",
		track_color: "#A7D5D4",
		type: "session",
	},
];
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
