import moment from "moment";

const todoData = [
  {
    id: '1',
    title: "上班",
    description:
      "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
    completed: true,
    expiredDate: moment("2024-09-05 15:30").format("YYYY-MM-DD HH:mm")
  },
  {
    id: '2',
    title: "上課",
    description:
      "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, ",
    completed: false,
    expiredDate: moment("2024-09-10 15:30").format("YYYY-MM-DD HH:mm")
  },
  {
    id: '3',
    title: "游泳",
    description:
      "from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    completed: false,
    expiredDate: moment("2024-09-11 15:30").format("YYYY-MM-DD HH:mm")
  },
  {
    id: '4',
    title: "et porro tempora",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat a magna sit amet suscipit. Cras volutpat accumsan leo in molestie",
    completed: true,
    expiredDate: moment("2024-09-12 15:30").format("YYYY-MM-DD HH:mm")
  },
  {
    id: '5',
    title: "開學gogogo",
    description:
      "Fusce accumsan, mi id imperdiet pretium, tellus nibh varius nulla, sed suscipit urna felis in diam. Nunc elementum ligula luctus, efficitur lacus a",
    completed: false,
    expiredDate: moment("2024-09-15 15:30").format("YYYY-MM-DD HH:mm")
  }
];

export { todoData };

