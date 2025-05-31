import HomeLayout from "@/components/layouts/home";
import { APIConfig } from "@/config";

interface TimeTrackingData {
	data: {
		best_day: {
			date: string;
			text: string;
			total_seconds: number;
		};
		grand_total: {
			daily_average: number;
			daily_average_including_other_language: number;
			human_readable_daily_average: string;
			human_readable_daily_average_including_other_language: string;
			human_readable_total: string;
			human_readable_total_including_other_language: string;
			total_seconds: number;
			total_seconds_including_other_language: number;
		};
		range: {
			start: string;
			end: string;
			range: string;
			days_including_holidays: number;
			days_minus_holidays: number;
			holidays: number;
		};
	};
}

interface OSUsageItem {
	name: string;
	percent: number;
	color: string;
}

interface OSUsageData {
	data: OSUsageItem[];
}

interface LanguageDataItem {
	name: string;
	percent: number;
	color: string;
}

interface LanguageData {
	data: LanguageDataItem[];
}

export interface WakaTimeData {
	timeTrackingData: TimeTrackingData;
	osUsageData: OSUsageData;
	languageData: LanguageData;
}

const fetchCodesInfo = async (): Promise<WakaTimeData | null> => {
	try {
		const [codemessageResponse, systemUsageResponse, languageUsageResponse] = await Promise.all([
			fetch(APIConfig.endpoints.wakatime.TimeTracking, {
				next: { revalidate: 3600 }, // Cache for 1 hour
			}),
			fetch(APIConfig.endpoints.wakatime.Language, {
				next: { revalidate: 3600 },
			}),
			fetch(APIConfig.endpoints.wakatime.OSUsage, {
				next: { revalidate: 3600 },
			}),
		]);

		if (!codemessageResponse.ok || !systemUsageResponse.ok || !languageUsageResponse.ok) {
			console.error("Failed to fetch WakaTime data");
			return null;
		}

		const [timeTrackingData, osUsageData, languageData] = await Promise.all([
			codemessageResponse.json() as Promise<TimeTrackingData>,
			systemUsageResponse.json() as Promise<OSUsageData>,
			languageUsageResponse.json() as Promise<LanguageData>,
		]);

		return {
			timeTrackingData,
			osUsageData,
			languageData,
		};
	} catch (error) {
		console.error("Error fetching WakaTime data:", error);
		return null;
	}
};

export default async function Page() {
	const wakaTimeData = await fetchCodesInfo();

	return (
		<div className="flex min-h-screen justify-center">
			<div className="max-w-7xl w-full">
				<HomeLayout wakaTimeData={wakaTimeData} />
			</div>
		</div>
	);
}
