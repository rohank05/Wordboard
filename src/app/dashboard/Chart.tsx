import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Capitalize } from "@/app/constant/config";
import { Task } from "@/app/types/tasks";

type ChartProps = {
	data: Task[];
};

const StatusColor = ["#C63C51", "#FFA24C", "#86A788"]; 
const AssigneeColor = ["#56021F", "#7D1C4A", "#D17D98", "#F4CCE9"];



const ChartsView = ({ data }: ChartProps) => {
	// Group data for charts
	const statusCounts: Record<string, number> = {};
	const assigneeCounts: Record<string, number> = {};

	data.forEach((task) => {
		const status = Capitalize(task.status || "Unknown");
		const assignee = Capitalize(task.assignee || "Unassigned");

		statusCounts[status] = (statusCounts[status] || 0) + 1;
		assigneeCounts[assignee] = (assigneeCounts[assignee] || 0) + 1;
	});

	const statusChartOptions: Highcharts.Options = {
		chart: { type: "column" },
		title: { text: "Task Status Distribution" },
		xAxis: { categories: Object.keys(statusCounts), title: { text: "Status" } },
		yAxis: { min: 0, title: { text: "Number of Tasks" } },
		legend: { enabled: false },
		credits: { enabled: false },
		series: [
			{
				name: "Tasks",
				type: "column",
				data: Object.entries(statusCounts).map(([status, count], index) => ({
					name: status,
					y: count,
					color: StatusColor[index % StatusColor.length],
				})),
			},
		],
	};

	const assigneeChartOptions: Highcharts.Options = {
		chart: { type: "pie" },
		title: { text: "Tasks by Assignee" },
		legend: { enabled: false },
		credits: { enabled: false },
		series: [
			{
				name: "Tasks",
				type: "pie",
				data: Object.entries(assigneeCounts).map(
					([assignee, count], index) => ({
						name: assignee,
						y: count,
						color: AssigneeColor[index % AssigneeColor.length],
					})
				),
			},
		],
	};

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
			<HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
			<HighchartsReact highcharts={Highcharts} options={assigneeChartOptions} />
		</div>
	);
};

export default ChartsView;
