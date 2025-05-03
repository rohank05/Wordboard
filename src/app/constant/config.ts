export const STATUS = [
    {label:'Pending',value:'pending'},
    {label:'In-Progress',value:'in-progress'},
    {label:'Done',value:'done'}
]

export const ASSIGNEE = [
    { label: 'Jiya', value: 'jiya' },
    { label: 'Rahul', value: 'rahul' },
    { label: 'Sumit', value: 'sumit' }
]

export const Capitalize = (str: string | number) => {
    if (typeof str !== "string") return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

