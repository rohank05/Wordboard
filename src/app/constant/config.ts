export const STATUS = [
    { label: 'Pending', value: 'pending' },
    { label: 'In-Progress', value: 'in-progress' },
    { label: 'Done', value: 'done' }
]

export const ASSIGNEE = [
    { label: 'Jiya', value: 'jiya' },
    { label: 'Rahul', value: 'rahul' },
    { label: 'Sumit', value: 'sumit' }
]

export const StatusColor = ["#C63C51", "#FFA24C", "#86A788"];
export const AssigneeColor = ["#56021F", "#7D1C4A", "#D17D98", "#F4CCE9"];

export const Rows = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
    { label: '100', value: 100 }
];


export const Capitalize = (str: string | number) => {
    if (typeof str !== "string") return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

