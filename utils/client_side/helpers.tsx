import {Interest, User, UserAvailability} from "@/interfaces";

export function getWeekStartingDate(date: Date, underscores: boolean): string {
    // Example usage
    // const date: Date = new Date('2023-10-26'); // Assuming this is a Thursday
    // console.log(getWeekStartingDate(date)); // Should return '2023-10-23' (which is the Monday of that week)
    // const givenDate = new Date(date);
    // const dayOfWeek = givenDate.getUTCDay(); // 0 (Sunday) - 6 (Saturday)
    // const difference = (dayOfWeek + 6) % 7; // Offset for Monday
    // givenDate.setUTCDate(givenDate.getUTCDate() - difference);
    // return `${givenDate.getUTCFullYear()}_${String(givenDate.getUTCMonth() + 1).padStart(2, '0')}_${String(givenDate.getUTCDate()).padStart(2, '0')}`;

    const day = date.getDay()
    const diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    const monday = new Date(date.setDate(diff));
    if (underscores) {
        return `${monday.getFullYear()}_${String(monday.getMonth() + 1).padStart(2, '0')}_${String(monday.getDate()).padStart(2, '0')}`;
    } else {
        return `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;
    }


}


export function parseAvailabilityDocId(userId: string, date: Date): string {
    const weekStart = getWeekStartingDate(date, true);
    return `${userId}_${weekStart}`;
}

export function parseAvailability(user: User, formData: string[]): UserAvailability {
    if (!user || !user.id) throw new Error('User is required');
    const docId = parseAvailabilityDocId(user.id, new Date());
    const weekStart = getWeekStartingDate(new Date(), false);

    return {
        id: docId,
        userId: user.id,
        weekStart: weekStart,
        fridayMorning: formData.includes("fridayMorning") || false,
        fridayAfternoon: formData.includes("fridayAfternoon") || false,
        fridayEvening: formData.includes("fridayEvening") || false,
        fridayLateNight: formData.includes("fridayLateNight") || false,
        saturdayMorning: formData.includes("saturdayMorning") || false,
        saturdayAfternoon: formData.includes("saturdayAfternoon") || false,
        saturdayEvening: formData.includes("saturdayEvening") || false,
        saturdayLateNight: formData.includes("saturdayLateNight") || false,
        sundayMorning: formData.includes("sundayMorning") || false,
        sundayAfternoon: formData.includes("sundayAfternoon") || false,
        sundayEvening: formData.includes("sundayEvening") || false,
        sundayLateNight: formData.includes("sundayLateNight") || false,
        interests: getUsersInterestsAsArray(user),
    };
}

export function getUsersInterestsAsArray(user: User): Interest[] {
    const interests: Interest[] = [];
    if (user.basketball) interests.push(Interest.basketball);
    if (user.poker) interests.push(Interest.poker);
    return interests;
}
