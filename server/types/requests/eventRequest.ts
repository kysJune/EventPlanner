export interface EventRequest {
	name: string;
	day: number;
	month: number;
	year: number;
	start: number;
	end: number;
	location?: string;
	description: string;
}
