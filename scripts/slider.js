// // Twitch Slider V2
// const continerImages = document.querySelector(".wraper");
// const images = Array.from(document.querySelectorAll(".wraper > div"));
// const buttons = document.querySelectorAll(".buttons > div");

// let nextValue;
// const posstions = {
//   0: {
//     class: "Left-Primary",
//   },
//   1: {
//     class: "Left-Secoundry",
//   },
//   2: {
//     class: "Main",
//   },
//   3: {
//     class: "Right-Primary",
//   },
//   4: {
//     class: "Right-Secoundry",
//   },
// };

// images.forEach((v, i) => {
//   v.classList.add(posstions[i].class);
// });

// images.forEach((v, i, m) => {
//   v.addEventListener("click", () => {
//     changePostion(v.className, v);
//   });
// });

// buttons.forEach((v) => {
//   v.addEventListener("click", () => {
//     v.classList[0] === "left"
//       ? changePostion("Left-Secoundry", findPic("Left-Secoundry"))
//       : changePostion("Right-Primary", findPic("Right-Primary"));
//   });
// });

// function findPic(direction) {
//   return images.find((v) => v.className === direction);
// }

// function changePostion(position, elment) {
//   s = findPic("Main");
//   c = findPic("Left-Primary");
//   b = findPic("Left-Secoundry");
//   z = findPic("Right-Primary");
//   k = findPic("Right-Secoundry");
//   temp = elment.className;
//   temp3 = c.className;
//   temp4 = b.className;
//   temp5 = z.className;
//   temp6 = k.className;

//   switch (position) {
//     case "Right-Primary":
//       // 1

//       elment.className = s.className;
//       s.className = b.className;

//       // 2

//       c.className = k.className;
//       k.className = temp;

//       // 3

//       b.className = temp3;

//       break;

//     case "Left-Secoundry":
//       // 1

//       elment.className = s.className;
//       s.className = z.className;
//       z.className = k.className;

//       //2
//       k.className = c.className;
//       c.className = temp4;

//       break;

//     case "Right-Secoundry":
//       // 1

//       elment.className = s.className;
//       s.className = c.className;
//       z.className = b.className;

//       //2
//       c.className = temp5;
//       b.className = temp6;

//       break;

//     case "Left-Primary":
//       // 1

//       elment.className = s.className;
//       s.className = k.className;
//       b.className = z.className;

//       //2

//       z.className = temp3;
//       k.className = temp4;
//       break;
//   }
// }
