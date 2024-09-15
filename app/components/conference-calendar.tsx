"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import useEvents from "@/lib/hooks/use-events";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Speaker = {
	companyname: string;
	fullname: string;
	id_agenda_speaker: number;
	position: string;
	speaker_image: string;
	tags: string[];
};

type Event = {
	companies: string[];
	date: string;
	description: string | null;
	floorplan: {
		floorplan_id: number;
		location_name: string;
		marker_id: number;
	};
	has_livestream: boolean;
	id_object: string;
	image_url: string | null;
	interaction_tool_url: string | null;
	is_favorite: boolean;
	is_live: boolean;
	is_viewable: boolean;
	loc: string;
	local_date: string;
	local_time: string;
	media_content: string | null;
	name: string;
	speaker: Speaker[];
	speaker_photos: string[];
	summary: string | null;
	tags: string[];
	time: string;
	timestamp: number;
	timestamp_end: number;
	track: string;
	track_color: string;
	type: string;
};

export default function DaySchedule() {
	const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);
	const [selectedDateIndex, setSelectedDateIndex] = useState(0);
	const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

	const allEvents = useEvents();

	const startOfDay = new Date(
		allEvents[selectedTrackIndex].dates[selectedDateIndex].events[0].timestamp,
	);
	startOfDay.setHours(0, 0, 0, 0);

	const startHour = 12; // Start at 10 AM
	const endHour = 21; // End at 9 PM
	const totalHours = endHour - startHour;

	const hourHeight = 250; // pixels per hour
	const totalHeight = totalHours * hourHeight;

	const calculateEventPosition = (event: Event) => {
		const start = new Date(event.timestamp);
		const end = new Date(event.timestamp_end);
		const top =
			(start.getHours() + start.getMinutes() / 60 - startHour) * hourHeight;
		const height =
			((end.getTime() - start.getTime()) / (1000 * 60 * 60)) * hourHeight;
		return { top, height };
	};

	const updateIndex = (e: string) => {
		setSelectedDateIndex(Number.parseInt(e));
		setHoveredEvent(null);
	};

	const updateTrackIndex = (e: string) => {
		setSelectedTrackIndex(Number.parseInt(e));
		setHoveredEvent(null);
	};

	function addEventToCalendar() {
		const event = hoveredEvent;
		if (event != null) {
			// Convert event time to start and end dates
			const [startTime, endTime] = event.time.split(" - ");
			const startDate = new Date(`${event.date} ${startTime}`);
			const endDate = new Date(`${event.date} ${endTime}`);

			// Create calendar event URL
			const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
				event.name,
			)}&dates=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}/${endDate
				.toISOString()
				.replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent(
				event.description || "",
			)}&location=${encodeURIComponent(event.loc)}&sf=true&output=xml`;

			// Open the calendar URL in a new window
			window.open(calendarUrl, "_blank");
		}
	}

	const EventComponent = ({ event }: { event: Event }) => {
		const { top, height } = calculateEventPosition(event);

		return (
			<div className="my-3">
				<div
					className="absolute left-16 right-4 rounded p-2 text-xs cursor-pointer overflow-hidden"
					style={{
						top: `${top}px`,
						height: `${height}px`,
						backgroundColor: event.track_color,
					}}
					onMouseEnter={() => setHoveredEvent(event)}
				>
					<div>
						<div className="font-bold truncate">{event.name}</div>
						<div className="truncate">
							{event.speaker.map((s) => s.fullname).join(", ")}
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex items-center justify-end py-4 gap-x-3">
				<Select onValueChange={updateTrackIndex} defaultValue="0">
					<SelectTrigger className="w-fit">
						<SelectValue placeholder="Select a track" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0">Left Curve Stage</SelectItem>
						<SelectItem value="1">Rigth Curve Stage</SelectItem>
					</SelectContent>
				</Select>
				<Select onValueChange={updateIndex} defaultValue="0">
					<SelectTrigger className="w-fit">
						<SelectValue placeholder="Select a date" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0">Sept 20</SelectItem>
						<SelectItem value="1">Sept 21</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<Card>
				<CardContent className="p-4">
					<h2 className="text-xl font-bold mb-4">
						{format(startOfDay, "MMMM d, yyyy")}
					</h2>
					<ScrollArea className="xl:h-[600px]  h-[250px] pr-4">
						<div className="relative" style={{ height: `${totalHeight}px` }}>
							{Array.from({ length: totalHours }, (_, i) => {
								const hour = startHour + i;
								return (
									<div
										key={`hour-${hour}`}
										className="absolute w-full h-[300px] border-t border-gray-200"
										style={{ top: `${i * hourHeight}px` }}
									>
										<span className="absolute -top-3 left-0 text-sm text-gray-500 w-12 text-right pr-2">
											{(hour - 2) % 12 === 0 ? "12" : (hour - 2) % 12}:00{" "}
											{hour - 2 < 12 ? "AM" : "PM"}
										</span>
									</div>
								);
							})}
							{allEvents[selectedTrackIndex].dates[
								selectedDateIndex
							].events.map((event) => (
								<EventComponent key={event.id_object} event={event} />
							))}
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
			{hoveredEvent && (
				<Card className="mt-4">
					<CardContent className="p-4">
						<div className="flex items-start space-x-4">
							<div>
								<h2 className="text-xl font-bold mb-2">{hoveredEvent.name}</h2>
								{hoveredEvent.speaker.map((speaker) => (
									<div key={speaker.id_agenda_speaker} className="mb-2">
										<p className="font-semibold">{speaker.fullname}</p>
										<p className="text-sm">
											{speaker.position} at {speaker.companyname}
										</p>
									</div>
								))}
								<p className="mb-1">
									<strong>Time:</strong> {hoveredEvent.time}
								</p>
								<p className="mb-1">
									<strong>Location:</strong> {hoveredEvent.loc}
								</p>
								{hoveredEvent.description && (
									<p className="mb-1">
										<strong>Description:</strong> {hoveredEvent.description}
									</p>
								)}
								{hoveredEvent.tags.length > 0 && (
									<div className="flex flex-wrap gap-2 mt-2">
										{hoveredEvent.tags.map((tag) => (
											<Badge key={tag} variant="secondary">
												{tag}
											</Badge>
										))}
									</div>
								)}
							</div>
						</div>
						<Button onClick={addEventToCalendar}>Add to Calendar</Button>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
