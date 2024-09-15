export type Speaker = {
	companyname: string;
	fullname: string;
	id_agenda_speaker: number;
	position: string;
	speaker_image: string;
	tags: string[];
};

export type Event = {
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
