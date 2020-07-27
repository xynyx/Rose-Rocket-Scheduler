import {} from "../actionTypes";

const initialState = [
  {
    userId: 0,
    name: "Bobby McBob",
    appts: [],
  },
  {
    userId: 1,
    name: "Hammy Hambone",
    appts: [
      {
        title: "Dropoff",
        startDate: new Date(),
        endDate: new Date(),
        id: 0,
      },
    ],
  },
];

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
