import Image from "next/image";

import headline_iamge from "@/public/bp-image.webp";
import DaySchedule from "./components/conference-calendar";

export default function SchedulePage() {
	return (
		<div className="py-10">
			<div className="flex items-center justify-center">
				<Image
					src={headline_iamge}
					alt="Breakpoint Logo"
					width={200}
					height={200}
				/>
			</div>
			<DaySchedule />
		</div>
	);
}
