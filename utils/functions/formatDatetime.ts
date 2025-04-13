const formatDateOnly = (isoString: string): string => {
    const date = new Date(isoString);
    const pad = (num: number) => String(num).padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

const formatTimeOnly = (isoString: string): string => {
    const date = new Date(isoString);
    const pad = (num: number) => String(num).padStart(2, '0');

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
};

const formatDatetime = {
    formatTimeOnly,
    formatDateOnly
}

export default formatDatetime