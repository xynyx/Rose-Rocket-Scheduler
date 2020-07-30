import moment from "moment";
moment().format();

export const initialAppointmentState = {
  0: [
    {
      title: "Pickup",
      startDate: moment({ hour: 9, minute: 15 }),
      endDate: moment({ hour: 13, minute: 45 }),
      id: 0,
    },
    {
      title: "Dropoff",
      startDate: moment({ hour: 9, minute: 15 }).subtract(1, "d"),
      endDate: moment({ hour: 13, minute: 45 }).subtract(1, "d"),
      id: 1,
    },
    {
      title: "Other",
      startDate: moment({ hour: 4 }).add(2, "d"),
      endDate: moment({ hour: 7 }).add(2, "d"),
      id: 2,
    },
    {
      title: "Pickup",
      startDate: moment({ hour: 1, minute: 30 }).subtract(3, "d"),
      endDate: moment({ hour: 5, minute: 30 }).subtract(3, "d"),
      id: 3,
    },
    {
      title: "Dropoff",
      startDate: moment({ hour: 3, minute: 30 }).subtract(4, "d"),
      endDate: moment({ hour: 14, minute: 30 }).subtract(4, "d"),
      id: 4,
    },
    {
      title: "Other",
      startDate: moment({ hour: 6 }).subtract(2, "d"),
      endDate: moment({ hour: 20 }).subtract(2, "d"),
      id: 5,
    },
    {
      title: "Other",
      startDate: moment({ hour: 3 }).add(1, "d"),
      endDate: moment({ hour: 17 }).add(1, "d"),
      id: 6,
    },
    {
      title: "Pickup",
      startDate: moment({ hour: 3 }).subtract(1, "d"),
      endDate: moment({ hour: 6 }).subtract(1, "d"),
      id: 7,
    },
    {
      title: "Dropoff",
      startDate: moment({ hour: 0, minute: 30 }),
      endDate: moment({ hour: 4 }),
      id: 8,
    },
  ],
  1: [
    {
      title: "Other",
      startDate: moment({ hour: 2 }).add(2, "d"),
      endDate: moment({ hour: 9 }).add(2, "d"),
      id: 1,
    },
    {
      title: "Pickup",
      startDate: moment({ hour: 4, minute: 30 }).subtract(3, "d"),
      endDate: moment({ hour: 18, minute: 30 }).subtract(3, "d"),
      id: 2,
    },
    {
      title: "Dropoff",
      startDate: moment({ hour: 2, minute: 30 }).subtract(4, "d"),
      endDate: moment({ hour: 9, minute: 30 }).subtract(4, "d"),
      id: 3,
    },
    {
      title: "Other",
      startDate: moment({ hour: 6 }).subtract(2, "d"),
      endDate: moment({ hour: 20 }).subtract(2, "d"),
      id: 4,
    },
    {
      title: "Other",
      startDate: moment({ hour: 2 }).add(1, "d"),
      endDate: moment({ hour: 7 }).add(1, "d"),
      id: 5,
    },
    {
      title: "Pickup",
      startDate: moment({ hour: 5 }).subtract(1, "d"),
      endDate: moment({ hour: 16 }).subtract(1, "d"),
      id: 6,
    },
    {
      title: "Dropoff",
      startDate: moment({ hour: 0, minute: 30 }),
      endDate: moment({ hour: 6 }),
      id: 7,
    },
  ],
  2: [
    {
      title: "Dropoff",
      startDate: moment({ hour: 0, minute: 30 }),
      endDate: moment({ hour: 6 }),
      id: 7,
    },
  ],
};

export const initialDownloadState = {
  year: moment().year(),
  interval: 2,
};

export const initialDriverState = {
  driverList: [
    { id: 0, name: "Tulip Train" },
    { id: 1, name: "Daffodil Dirigible" },
    { id: 2, name: "Lily Limosine" },
  ],
  selectedDriver: { id: 0, name: "Tulip Train" },
};
