import { IconCalendar } from "@tabler/icons-react";

const icons = {
    IconCalendar
};

export const appointments = {
    id: 'appointments',
    title: 'Citas',
    type: 'group',
    children: [
        {
            id: 'appointment',
            title: 'Citas',
            type: 'item',
            url: '/home/appointment',
            icon: icons.IconCalendar
        }
    ]
};