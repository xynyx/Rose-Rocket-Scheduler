import {} from "../actionTypes";

const initialState = {
  0: [
    {
      title: "Pickup",
      startDate: new Date(),
      endDate: new Date(),
      id: 0,
    },
  ],
  1: [],
  2: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
