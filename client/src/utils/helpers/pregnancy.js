export const getCurrentWeek = (dueDate) => {
    if (!dueDate) return null;

    const [year, month, day] = dueDate.split("-").map(Number);

    const due = new Date(year, month - 1, day);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const daysUntilDue = Math.ceil((due - today) / MS_PER_DAY);
    const daysPregnant = 280 - daysUntilDue;

    if (daysPregnant < 0 || daysPregnant > 280) {
        return null;
    }

    return Math.min(Math.floor(daysPregnant / 7) + 1, 40);
};

export const isUpcoming = (weekNumber, currentWeek) => weekNumber > currentWeek;