const btnText = document.querySelectorAll(".header-browse-text");
const twitchLogo = document.querySelector("#twitch-logo-js");
const rightSides = Array.from(document.querySelectorAll(".right-contents"));
const continerTumbnail = document.querySelectorAll(".tumbnail-picture");
const tumbnailBody = document.querySelectorAll(".tumbnail-picture-body");
const continerContents = Array.from(document.querySelectorAll(".wraper > div"));
const contnerRecomended = document.querySelector(".recoumended-channel-grid");

const buttons = document.querySelectorAll(".buttons > div");
const controlersContiner = document.querySelectorAll(".controlers-flex");
let setContnents = true;

// Twitch slider
// check
const continerImages = document.querySelector(".wraper");
// const images = Array.from(document.querySelectorAll(".wraper > div"));
let nextValue;

twitchLogo.addEventListener("click", () => {
  btnText.forEach((v, i) => {
    v.classList.remove("header-btn-active");
  });
});

btnText.forEach((v, i) => {
  v.addEventListener("click", () => {
    btnText.forEach((v, i) => {
      v.classList.remove("header-btn-active");
    });
    v.classList.add("header-btn-active");
  });
});

//import data from twitch

async function importData() {
  return new Promise(async (resolve, reject) => {
    users = await fetch("https://api.twitch.tv/helix/streams", {
      method: "GET",
      headers: {
        Authorization: "Bearer fhyjq03em41bbisiw26z3s3r6kzhy3",
        "Client-Id": "9m8dogzjkmv0wdjjw1b5nyy1cyyfkd",
      },
    });

    console.log(users);

    users = await users.json();
    users = users.data;

    userImageUrl = addStemer("https://api.twitch.tv/helix/users?", users);

    usersImages = await fetch(userImageUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer fhyjq03em41bbisiw26z3s3r6kzhy3",
        "Client-Id": "9m8dogzjkmv0wdjjw1b5nyy1cyyfkd",
      },
    });

    usersImages = await usersImages.json();
    usersImages = usersImages.data;

    users = users.map((v, i) => {
      usersImages.find((s) =>
        s.login === v.user_login
          ? (v.profile_image = s.profile_image_url)
          : null
      );

      // viver count fix

      let d = v.viewer_count.toString().split("").length - 1;
      let b = "1";
      for (i = 0; i < d; i++) b += "0";

      v.viewer_count = (v.viewer_count / b).toFixed(1) + "K";

      v.tumbnail_image = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${v.user_login.toLowerCase()}-530x300.jpg`;

      return v;
    });

    users.push({
      id: "515323105",
      user_id: "515323105",
      user_login: "3FTV",
      user_name: "3FTV",
      game_id: "509658",
      game_name: "World Of Warcraft",
      type: "live",
      title: "Soltan",
      viewer_count: "8.1 Billion",
      started_at: "2024-01-30T10:08:25Z",
      language: "ko",
      thumbnail_url:
        "https://static-cdn.jtvnw.net/previews-ttv/live_user_lilpaaaaaa-{width}x{height}.jpg",
      tag_ids: [],
      tags: [],
      is_mature: false,
      profile_image:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/beb6a468-2113-4059-94d1-fb34c8626132-profile_image-70x70.png",
      tumbnail_image:
        "https://static-cdn.jtvnw.net/previews-ttv/live_user_lilpaaaaaa-530x300.jpg",
    });

    resolve(users);
  });
}

//export data to site

async function exportData() {
  users = await importData();
  const x = genrateRandom(rightSides.length, 0, users.length - 1);
  const w = genrateRandom(5, 0, users.length - 1);
  // export sideabr

  users.forEach((v, i) => {
    const liveChannels = document.createElement("div");
    liveChannels.innerHTML = `
          <div class="channel-continer">
                     <img class="channel-profile" src=${v.profile_image} alt="">
                     <div class="channel-contents">
                         <div class="channel-information">
                             <div class="channel-name">
                                 ${v.user_name}
                             </div>
                             <div class="game-catgory">
                                 ${v.game_name}
                             </div>
                         </div>
                         <div class="channel-live-view">
                             <div class="live-icon">
                             </div>
                             <div class="channel-live-view-text">
                                 ${v.viewer_count}
                             </div>
                         </div>
                     </div>
                     <div class="tolltip">
                                 ${v.profile_image}
                     </div>
                 </div> `;
    document
      .querySelector(".channels-sidebar")
      .insertAdjacentElement("afterbegin", liveChannels);
  });

  // set tumbnail
  continerContents.forEach((v, i) => {
    continerTumbnail[i] = users.find((g) => {
      g.user_login === users[x[i]].user_login
        ? (continerTumbnail[i].src = `${g.tumbnail_image}`)
        : null;
    });
  });

  document.querySelectorAll(".top-side-channel-flex").forEach((v, i) => {
    v.addEventListener("mouseover", () => {
      if (
        document.querySelector(".Main  .top-side-channel-flex") === v &&
        rightSides[i].classList.contains("op-1")
      ) {
        tumbnailBody[i].classList.add("box-shadow-continer");
        document.querySelectorAll(".controlers-flex")[i].classList.add("op-1");
        document.querySelectorAll(".controlers-flex")[i].style.visibility =
          "visible";
      }
    });
  });

  document.querySelectorAll(".top-side-channel-flex").forEach((v, i) => {
    v.addEventListener("mouseleave", () => {
      if (
        document.querySelector(".Main  .top-side-channel-flex") === v &&
        rightSides[i].classList.contains("real")
      ) {
        tumbnailBody[i].classList.remove("box-shadow-continer");
        document
          .querySelectorAll(".controlers-flex")
          [i].classList.remove("op-1");
        document.querySelectorAll(".controlers-flex")[i].style.visibility =
          "hidden";
      }
    });
  });

  // set main in first time

  // set main with click
  rightSides.forEach((v, i) => {
    v.classList.add("op-0");
    v.style.display = "none";
    !continerContents[i].classList.contains("Main")
      ? (continerContents[i].style.cssText += "cursor: pointer")
      : null;
  });
  continerContents.forEach((v, i) => {
    // first time set to main
    if (v.classList[0] === "Main") {
      rightSides[i].style.display = "block";
      setToMain(rightSides[i], x, users, i);
      document.querySelector(".Main .right-contents").classList.add("op-1");
      document.querySelector(".Main .right-contents").classList.add("focuse");
      utilitys("Main");
    }

    // set contienr
    v.addEventListener("click", () => {
      setContiner("Main", x, users);
    });
  });

  buttons.forEach((q) => {
    q.addEventListener("click", () => {
      if (q.classList.contains("left")) {
        setContiner("Left-Secoundry", x, users);
      } else {
        setContiner("Right-Primary", x, users);
      }
      sliderBright();
    });
  });

  // recommneded channels
  for (a = 0; a < 5; a++) {
    console.log(users[w[a]]);

    const html = document.createElement("div");
    html.innerHTML = `<div class="recoumended-channel">

                        <div class="video-tumbanil">
                            <div class="recoumended-channel-tumbnail-body">
                                <img class="recoumended-channel-tumbnail"
                                    src="${users[w[a]].tumbnail_image}" alt="">
                            </div>
                            <div class="video-tumbanil-top-flex">
                                <div class="live-status">
                                    LIVE
                                </div>
                            </div>
                            <div class="video-tumbanil-bottom-view">
                                  ${users[w[a]].viewer_count} viewers
                            </div>
                        </div>
                        <div class="video-flex-information">
                            <div class="video-profile">
                                <img class="profile-image-right-contnent"
                                    src="${users[w[a]].profile_image}"
                                    alt="">
                            </div>
                            <div class="video-profile-main-information">
                                <div class="video-profile-main-title">
                                    ${users[w[a]].title}
                                </div>
                                <div class="video-profile-id">
                                    ${users[w[a]].user_name}
                                </div>

                                <div class="video-catgory">
                                    ${users[w[a]].game_name}
                                </div>
                                <div class="channel-tags">
                                
                                </div>
                            </div>
                            <div class="video-more-option">

                            </div>
                        </div>
                    </div>`;
    contnerRecomended.insertAdjacentElement("afterbegin", html);
  }

  for (i = 0; i < 5; i++) {
    let tagCount = users[w[i]].tags.length > 3 ? 4 : users[w[i]].tags.length;

    const channelTagsContiner = document.querySelectorAll(
      ".recoumended-channel .channel-tags"
    )[i];
    console.log(tagCount);
    setTags(channelTagsContiner, w, tagCount, i);
  }
}
// functions

// 1- export main channel continer

function setShadow(elment) {
  elment.style.cssText = "box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);";
}

function setContiner(posstions, x, users) {
  let z;

  continerContents.forEach((v, i) => {
    v.classList.contains(`${posstions}`) ? (z = i) : null;
  });

  if (
    !document.querySelector(`.${posstions}`).classList.contains("focuse") &&
    !document
      .querySelector(`.${posstions} .right-contents`)
      .classList.contains("op-1")
  ) {
    rightSides.forEach((v, i) => {
      v.classList.remove("op-1");
      v.classList.add("op-0");
      v.style.display = "none";
      continerContents[i].style.cssText = "";
      !continerContents[i].classList.contains("Main")
        ? (continerContents[i].style.cssText += "cursor: pointer")
        : null;

      //
    });

    document.querySelector(`.${posstions} .right-contents`).style.display =
      "block";

    // set vloume

    utilitys(posstions);
    if (
      !document.querySelector(`.${posstions}`).classList.contains("focuse") &&
      !document
        .querySelector(`.${posstions} .right-contents`)
        .classList.contains("real")
    ) {
      setToMain(
        document.querySelector(`.${posstions} .right-contents`),
        x,
        users,
        z
      );
      changePostion(posstions, findPic(posstions));
    } else {
      changePostion(posstions, findPic(posstions));
      setTimeout(() => {
        document.querySelector(`.Main .right-contents`).classList.add("op-1");
        setShadow(continerContents[z]);
      }, 700);

      // setShadow(continerContents[i]);
    }
  }
}

function setToMain(elment, x, users, i) {
  if (setContnents) {
    setContnents = false;
    document.querySelector(".Main .right-contents").classList.add("op-1");
    document.querySelector(".Main .right-contents").classList.remove("op-0");
    const html = document.createElement("div");
    const tagCount = users[x[i]].tags.length >= 2 ? 2 : 1;
    console.log(tagCount);
    setShadow(continerContents[i]);
    elment.classList.add("real");
    elment.classList.add("focuse");
    html.innerHTML = `<div class="flex-contnets-channel">
                  <img class="profile-image-right-contnent" src=${
                    users[x[i]].profile_image
                  } alt="profile image">
                  <div class=top-flex-contents>
                  <div class="channel-profile-name">${
                    users[x[i]].user_login
                  }</div>
                  <div class="channel-catgory">${users[x[i]].game_name}</div>
                  <div class="channel-views-count">
                  ${users[x[i]].viewer_count}</div>
                  </div>
              </div>
              <div class="channel-tags">
              </div>
              <div class="live-descrption">
                  Check out this stream from <br>
                  ${users[x[i]].user_login}!
              </div>`;

    elment.insertAdjacentElement("afterbegin", html);

    const channelTagsContiner = document.querySelector(
      ".Main .right-contents .channel-tags"
    );

    console.log(channelTagsContiner);
    setTags(channelTagsContiner, x, tagCount, i);
    setContnents = true;
  }
}
continerTumbnail.forEach((v, i) => {
  v.setAttribute("draggable", false);
  controlersContiner[i].setAttribute("draggable", false);
});

// 2- add stremer
function addStemer(url, stremr) {
  let x = "https://api.twitch.tv/helix/users?";
  stremr.forEach((v, i) => {
    userId = v.user_id;
    x += `id=${userId}&`;
  });
  return x;
}

// 3- random number for stremer user name slider

function genrateRandom(count, min, max) {
  let arry = [];
  let x;
  while (arry.length < count) {
    x = Math.round(Math.random() * max + min);
    if (arry.includes(x) === false) {
      arry.push(x);
    }
  }
  return arry;
}

// set tags

function setTags(elment, randomArry, tagCount, i) {
  for (s = 0; s < tagCount; s++) {
    const tag = document.createElement("div");
    tag.innerHTML = `<div class="channgle-tag-list">${
      users[randomArry[i]].tags[s]
    }</div>`;

    elment.insertAdjacentElement("afterbegin", tag);
  }
}
// Twitch Slider V2

const posstions = {
  0: {
    class: "Left-Primary",
  },
  1: {
    class: "Left-Secoundry",
  },
  2: {
    class: "Main",
  },
  3: {
    class: "Right-Primary",
  },
  4: {
    class: "Right-Secoundry",
  },
};

continerContents.forEach((v, i) => {
  v.classList.add(posstions[i].class);
});

continerContents.forEach((v, i, m) => {
  v.addEventListener("click", () => {
    changePostion(v.classList[0], v);
  });
});

function findPic(direction) {
  return continerContents.find((v) => v.classList[0] === direction);
}

//Slider function

function changePostion(position, elment) {
  s = findPic("Main");
  c = findPic("Left-Primary");
  b = findPic("Left-Secoundry");
  z = findPic("Right-Primary");
  k = findPic("Right-Secoundry");
  temp = elment.classList[0];
  temp3 = c.classList[0];
  temp4 = b.classList[0];
  temp5 = z.classList[0];
  temp6 = k.classList[0];

  switch (position) {
    case "Right-Primary":
      // 1

      elment.className = s.className;
      s.className = b.className;

      // 2

      c.className = k.className;
      k.className = temp;

      // 3

      b.className = temp3;

      break;

    case "Left-Secoundry":
      // 1

      elment.className = s.className;
      s.className = z.className;
      z.className = k.className;

      //2
      k.className = c.className;
      c.className = temp4;

      break;

    case "Right-Secoundry":
      // 1

      elment.className = s.className;
      s.className = c.className;
      z.className = b.className;

      //2
      c.className = temp5;
      b.className = temp6;

      break;

    case "Left-Primary":
      // 1

      elment.className = s.className;
      s.className = k.className;
      b.className = z.className;

      //2

      z.className = temp3;
      k.className = temp4;
      break;
  }
}

function utilitys(elmentPossiton) {
  document
    .querySelectorAll(`.controlers-flex`)
    .forEach((v) => (v.innerHTML = ``));
  document.querySelector(`.${elmentPossiton} .controlers-flex`).innerHTML = `
   <div class="left-side">
                                          <div id="puse-btn-js" class="puse-button svg-btn">

                                          <div class="toll-tip" draggable="false">
                                          Play (space/k)
                                           <div>

                                           </div>
                                            </div>
                                              <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20"
                                                  x="0px" y="0px" aria-hidden="true" focusable="false">
                                                  <g>
                                                      <path
                                                          d="M5 17.066V2.934a.5.5 0 01.777-.416L17 10 5.777 17.482A.5.5 0 015 17.066z">
                                                      </path>
                                                  </g>

                                              </svg>
                                          </div>
                                          <div class="sound-contoler">
                                              <div id="mute-btn-js" class="mute-btn svg-btn">

                                              <div class="toll-tip" draggable="false">
                                          Mute (m)
                                           <div>

                                           </div>
                                            </div>
                                                  <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20"
                                                      x="0px" y="0px" aria-hidden="true" focusable="false"
                                                      class="ScIconSVG-sc-1q25cff-1 jpczqG">
                                                      <path
                                                          d="M5 7l4.146-4.146a.5.5 0 01.854.353v13.586a.5.5 0 01-.854.353L5 13H4a2 2 0 01-2-2V9a2 2 0 012-2h1zM12 8.414L13.414 7l1.623 1.623L16.66 7l1.414 1.414-1.623 1.623 1.623 1.623-1.414 1.414-1.623-1.623-1.623 1.623L12 11.66l1.623-1.623L12 8.414z">
                                                      </path>
                                                  </svg>
                                              </div>
                                              <div class="vloume-input">
                                              <div class="toll-tip" draggable="false">
                                          Mute (m)
                                           <div>

                                           </div>
                                            </div>
                                                  <input id="vloume-input-js" type="range" value="50">
                                              </div>

                                              <div class="compersor-btn">

                                              </div>

                                          </div>

                                      </div>
                                      <div class="right-side">
                                          <div class="setting-btn">
                                              <div class="setting-tolltip svg-btn">
                                                  <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20"
                                                      x="0px" y="0px" aria-hidden="true" focusable="false"
                                                      class="ScIconSVG-sc-1q25cff-1 jpczqG">
                                                      <g>
                                                          <path d="M10 8a2 2 0 100 4 2 2 0 000-4z"></path>
                                                          <path fill-rule="evenodd"
                                                              d="M9 2h2a2.01 2.01 0 001.235 1.855l.53.22a2.01 2.01 0 002.185-.439l1.414 1.414a2.01 2.01 0 00-.439 2.185l.22.53A2.01 2.01 0 0018 9v2a2.01 2.01 0 00-1.855 1.235l-.22.53a2.01 2.01 0 00.44 2.185l-1.415 1.414a2.01 2.01 0 00-2.184-.439l-.531.22A2.01 2.01 0 0011 18H9a2.01 2.01 0 00-1.235-1.854l-.53-.22a2.009 2.009 0 00-2.185.438L3.636 14.95a2.009 2.009 0 00.438-2.184l-.22-.531A2.01 2.01 0 002 11V9c.809 0 1.545-.487 1.854-1.235l.22-.53a2.009 2.009 0 00-.438-2.185L5.05 3.636a2.01 2.01 0 002.185.438l.53-.22A2.01 2.01 0 009 2zm-4 8l1.464 3.536L10 15l3.535-1.464L15 10l-1.465-3.536L10 5 6.464 6.464 5 10z"
                                                              clip-rule="evenodd"></path>
                                                      </g>
                                                  </svg>
                                              </div>
                                              <div class="quality-tolltip">

                                              </div>
                                              <div class="setting-menu">

                                                  <div class="close-btn">
                                                      <div class="close-text">

                                                      </div>
                                                      <div class="close-icon">

                                                      </div>

                                                      <div class="-">

                                                      </div>

                                                      <div class="quality-seeting">
                                                          <div class="qualtiy-text">

                                                          </div>

                                                          <div class="curent-quality">

                                                          </div>

                                                          <div class="open-tab">

                                                          </div>
                                                      </div>

                                                      <div class="advance-seeting">
                                                          <div class="advance-text">

                                                          </div>

                                                          <div class="open-tab">

                                                          </div>
                                                      </div>

                                                      <div class="report-seeting">
                                                          <div class="report-text">

                                                          </div>

                                                          <div class="open-tab">

                                                          </div>
                                                      </div>

                                                      <div class="report-player">

                                                      </div>

                                                      <div class="keyboard-shortcuts">

                                                      </div>

                                                  </div>
                                              </div>
                                          </div>

                                          <div class="fullscreen-btn">
                                              <div class="fullscreen-tolltip svg-btn">
                                                  <svg width="100%" height="100%" viewBox="0 0 20 20"
                                                      focusable="false" aria-hidden="true">
                                                      <path
                                                          d="M7 3H2v5h2V5h3V3zm11 5V3h-5v2h3v3h2zm-5 9v-2h3v-3h2v5h-5zm-9-5H2v5h5v-2H4v-3z">
                                                      </path>
                                                  </svg>
                                              </div>
                                          </div>

                                      </div>`;

  let puseBtn = document.querySelector(`.${elmentPossiton} #puse-btn-js`);
  let vloumeInput = document.querySelector(
    `.${elmentPossiton} #vloume-input-js`
  );
  let muteBtn = document.querySelector(`.${elmentPossiton} #mute-btn-js`);
  let muted = JSON.parse(localStorage.getItem("muted"));
  vloumeInput.value = localStorage.getItem("vloume") || 50;
  const elmentTollTip = document.querySelector(".vloume-input .toll-tip");
  muted ? (vloumeInput.value = 0) : null;

  setVloume(vloumeInput);

  vloumeInput.addEventListener("input", () => {
    elmentTollTip.style.cssText = `transform : translateX(${vloumeInput.value}px)`;
    elmentTollTip.innerText = `${vloumeInput.value}%`;
    setVloume(vloumeInput);
    localStorage.setItem("vloume", v);
  });

  muteBtn.addEventListener("click", () => {
    if (vloumeInput.value > 0) {
      muted = false;
    }

    if (!muted) {
      muteBtn.innerHTML = `
      <div class="toll-tip" draggable="false">
                                          Unmute (m)
                                           <div>

                                           </div>
                                            </div>
      <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" aria-hidden="true" focusable="false"
       class="ScIconSVG-sc-1q25cff-1 jpczqG">
       <path
           d="M5 7l4.146-4.146a.5.5 0 01.854.353v13.586a.5.5 0 01-.854.353L5 13H4a2 2 0 01-2-2V9a2 2 0 012-2h1zM12 8.414L13.414 7l1.623 1.623L16.66 7l1.414 1.414-1.623 1.623 1.623 1.623-1.414 1.414-1.623-1.623-1.623 1.623L12 11.66l1.623-1.623L12 8.414z">
       </path>
   </svg>`;
      vloumeInput.value = 0;
      muted = true;
      setVloume(vloumeInput);
      localStorage.setItem("muted", JSON.stringify(muted));
    } else {
      localStorage.getItem("vloume") > 0
        ? (vloumeInput.value = localStorage.getItem("vloume"))
        : (vloumeInput.value = 10);
      setVloume(vloumeInput);

      muted = false;
      localStorage.setItem("muted", JSON.stringify(muted));
      localStorage.setItem("vloume", vloumeInput.value);
    }
  });

  function setVloume(elment) {
    v = elment.value;
    muted = false;
    if (v > 0 && v <= 50) {
      muteBtn.innerHTML = `
      <div class="toll-tip" draggable="false">
                                          Mute (m)
                                           <div>

                                           </div>
                                            </div>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<g id="Layer_2">
</g>
<g id="Layer_1">
	<path d="M9.1,2.9L5,7H4C2.9,7,2,7.9,2,9v2c0,1.1,0.9,2,2,2h1l4.1,4.1c0.1,0.1,0.2,0.1,0.4,0.1c0.3,0,0.5-0.2,0.5-0.5V3.2   c0-0.1-0.1-0.3-0.1-0.4C9.7,2.7,9.3,2.7,9.1,2.9z"/>
	<path class="st0" d="M11.5,13c1.7-1.4,1.7-4,0.1-6"/>
</g>
</svg>`;
    } else if (v >= 50) {
      muteBtn.innerHTML = `
      <div class="toll-tip" draggable="false">
                                          Mute (m)
                                           <div>

                                           </div>
                                            </div>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<g id="Layer_2">
</g>
<g id="Layer_1">
	<path d="M9.1,2.9L5,7H4C2.9,7,2,7.9,2,9v2c0,1.1,0.9,2,2,2h1l4.1,4.1c0.1,0.1,0.2,0.1,0.4,0.1c0.3,0,0.5-0.2,0.5-0.5V3.2   c0-0.1-0.1-0.3-0.1-0.4C9.7,2.7,9.3,2.7,9.1,2.9z"/>
	<path class="st0" d="M11.5,13c1.7-1.4,1.7-4,0.1-6"/>
	<path class="st0" d="M12.8,15.6C16,12.4,16,7.2,12.8,4"/>
</g>
</svg>`;
    } else {
      muteBtn.innerHTML = `
      <div class="toll-tip" draggable="false">
                                          Unmute (m)
                                           <div>

                                           </div>
                                            </div>
      <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" aria-hidden="true" focusable="false"
     class="ScIconSVG-sc-1q25cff-1 jpczqG">
     <path
         d="M5 7l4.146-4.146a.5.5 0 01.854.353v13.586a.5.5 0 01-.854.353L5 13H4a2 2 0 01-2-2V9a2 2 0 012-2h1zM12 8.414L13.414 7l1.623 1.623L16.66 7l1.414 1.414-1.623 1.623 1.623 1.623-1.414 1.414-1.623-1.623-1.623 1.623L12 11.66l1.623-1.623L12 8.414z">
     </path>
 </svg>
 
 `;
      muted = true;
    }
    localStorage.setItem("muted", JSON.stringify(muted));
  }

  puseBtn.addEventListener("click", () => {
    if (puseBtn.id === "unpuse") {
      puseBtn.innerHTML = `      

      <div id="puse-btn-js" class="puse-button svg-btn">
                                <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px"
                                    aria-hidden="true" focusable="false">
                                    <g>
                                        <path
                                            d="M5 17.066V2.934a.5.5 0 01.777-.416L17 10 5.777 17.482A.5.5 0 015 17.066z">
                                        </path>
                                    </g>

                                </svg>
                            </div>
                            <div class="toll-tip" draggable="false">
                                          Play (space/k)
      <div>
                            `;
      puseBtn.id = "puse";
    } else {
      puseBtn.innerHTML = `    
      
      <div class="svg-btn">
                                <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13 7h-3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1m7 0h-3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1">
                                    </path>
                                </svg>
                            </div>
                            <div class="toll-tip" draggable="false">
                                          Pause (space/k)
      <div>
                            `;
      puseBtn.id = "unpuse";
    }
  });
}

function sliderBright() {
  continerContents.forEach((v) => {
    !v.classList.contains("Main") ? v.classList.add("not-focused") : null;

    v.addEventListener("mouseover", () => {
      !v.classList.contains("Main") ? v.classList.add("hvored") : null;
    });

    v.addEventListener("mouseout", () => {
      !v.classList.contains("Main") ? v.classList.remove("hvored") : null;
    });

    v.addEventListener("click", () => {
      continerContents.forEach((v) => {
        !v.classList.contains("Main") ? v.classList.add("not-focused") : null;
      });
    });
  });
}

exportData();
sliderBright();
