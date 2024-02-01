// const puseBtn = document.querySelector("#puse-btn-js");
// const vloumeInput = document.querySelector("#vloume-input-js");
// const muteBtn = document.querySelector("#mute-btn-js");
// let muted = JSON.parse(localStorage.getItem("muted")) ;
// vloumeInput.value = localStorage.getItem("vloume");

// if (muted === false) {
//   vloumeInput.value = 0;
// }

// setVloume(vloumeInput);

//   vloumeInput.addEventListener("input", () => {
//     v = vloumeInput;
//     setVloume(v);
//     localStorage.setItem("vloume", v);
//   });

// muteBtn.addEventListener("click", () => {
//   if (vloumeInput.value > 0) {
//     muted = true;
//   }

//   if (muted) {
//     muteBtn.innerHTML = `<svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" aria-hidden="true" focusable="false"
//        class="ScIconSVG-sc-1q25cff-1 jpczqG">
//        <path
//            d="M5 7l4.146-4.146a.5.5 0 01.854.353v13.586a.5.5 0 01-.854.353L5 13H4a2 2 0 01-2-2V9a2 2 0 012-2h1zM12 8.414L13.414 7l1.623 1.623L16.66 7l1.414 1.414-1.623 1.623 1.623 1.623-1.414 1.414-1.623-1.623-1.623 1.623L12 11.66l1.623-1.623L12 8.414z">
//        </path>
//    </svg>`;
//     vloumeInput.value = 0;
//     muted = false;
//     setVloume(vloumeInput);
//     localStorage.setItem("muted", JSON.stringify(muted));
//   } else {
//     vloumeInput.value = localStorage.getItem("vloume") || "0";
//     setVloume(vloumeInput);
//     muted = true;
//     localStorage.setItem("muted", JSON.stringify(muted));
//   }
// });

// function setVloume(elment) {
//   v = elment.value;
//   if (v > 0 && v <= 50) {
//     muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
// <g id="Layer_2">
// </g>
// <g id="Layer_1">
// 	<path d="M9.1,2.9L5,7H4C2.9,7,2,7.9,2,9v2c0,1.1,0.9,2,2,2h1l4.1,4.1c0.1,0.1,0.2,0.1,0.4,0.1c0.3,0,0.5-0.2,0.5-0.5V3.2   c0-0.1-0.1-0.3-0.1-0.4C9.7,2.7,9.3,2.7,9.1,2.9z"/>
// 	<path class="st0" d="M11.5,13c1.7-1.4,1.7-4,0.1-6"/>
// </g>
// </svg>`;
//   } else if (v >= 50) {
//     muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
// <g id="Layer_2">
// </g>
// <g id="Layer_1">
// 	<path d="M9.1,2.9L5,7H4C2.9,7,2,7.9,2,9v2c0,1.1,0.9,2,2,2h1l4.1,4.1c0.1,0.1,0.2,0.1,0.4,0.1c0.3,0,0.5-0.2,0.5-0.5V3.2   c0-0.1-0.1-0.3-0.1-0.4C9.7,2.7,9.3,2.7,9.1,2.9z"/>
// 	<path class="st0" d="M11.5,13c1.7-1.4,1.7-4,0.1-6"/>
// 	<path class="st0" d="M12.8,15.6C16,12.4,16,7.2,12.8,4"/>
// </g>
// </svg>`;
//   } else {
//     muteBtn.innerHTML = `<svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" aria-hidden="true" focusable="false"
//      class="ScIconSVG-sc-1q25cff-1 jpczqG">
//      <path
//          d="M5 7l4.146-4.146a.5.5 0 01.854.353v13.586a.5.5 0 01-.854.353L5 13H4a2 2 0 01-2-2V9a2 2 0 012-2h1zM12 8.414L13.414 7l1.623 1.623L16.66 7l1.414 1.414-1.623 1.623 1.623 1.623-1.414 1.414-1.623-1.623-1.623 1.623L12 11.66l1.623-1.623L12 8.414z">
//      </path>
//  </svg>`;
//   }
// }

// puseBtn.addEventListener("click", () => {
//   if (puseBtn.id === "unpuse") {
//     puseBtn.innerHTML = `                            <div id="puse-btn-js" class="puse-button svg-btn">
//                                 <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px"
//                                     aria-hidden="true" focusable="false">
//                                     <g>
//                                         <path
//                                             d="M5 17.066V2.934a.5.5 0 01.777-.416L17 10 5.777 17.482A.5.5 0 015 17.066z">
//                                         </path>
//                                     </g>

//                                 </svg>
//                             </div>`;
//     puseBtn.id = "puse";
//   } else {
//     puseBtn.innerHTML = `        <div class="svg-btn">
//                                 <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
//                                     <path
//                                         d="M13 7h-3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1m7 0h-3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1">
//                                     </path>
//                                 </svg>
//                             </div>`;
//     puseBtn.id = "unpuse";
//   }
// });
