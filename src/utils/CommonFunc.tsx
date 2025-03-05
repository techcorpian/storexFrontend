export const DateFormatter = (dateToFormat: string): string => {
    const date = new Date(dateToFormat).toLocaleDateString("en-CA");
    return date;
};
