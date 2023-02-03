(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let acc = 0.2;
  let delayedYOffset = 0;
  let rafId;
  let rafState;

  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 6, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
        messageE: document.querySelector("#scroll-section-0 .main-message.e"),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.0, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.2, end: 0.3 }],
        messageC_opacity_in: [0, 1, { start: 0.4, end: 0.5 }],
        messageD_opacity_in: [0, 1, { start: 0.6, end: 0.7 }],
        messageE_opacity_in: [0, 1, { start: 0.8, end: 0.9 }],
        messageA_translateY_in: [20, 0, { start: 0.0, end: 0.1 }],
        messageB_translateY_in: [20, 0, { start: 0.2, end: 0.3 }],
        messageC_translateY_in: [20, 0, { start: 0.4, end: 0.5 }],
        messageD_translateY_in: [20, 0, { start: 0.6, end: 0.7 }],
        messageE_translateY_in: [20, 0, { start: 0.8, end: 0.9 }],
        messageA_opacity_out: [1, 0, { start: 0.15, end: 0.2 }],
        messageB_opacity_out: [1, 0, { start: 0.35, end: 0.4 }],
        messageC_opacity_out: [1, 0, { start: 0.55, end: 0.6 }],
        messageD_opacity_out: [1, 0, { start: 0.75, end: 0.8 }],
        messageE_opacity_out: [1, 1, { start: 0.95, end: 1 }],
        messageA_translateY_out: [0, -20, { start: 0.15, end: 0.2 }],
        messageB_translateY_out: [0, -20, { start: 0.35, end: 0.4 }],
        messageC_translateY_out: [0, -20, { start: 0.55, end: 0.6 }],
        messageD_translateY_out: [0, 0, { start: 0.75, end: 0.8 }],
        messageE_translateY_out: [0, 0, { start: 0.95, end: 1 }],
      },
    },
    {
      // 1
      type: "normal",
      // heightNum: 5, // type normal에서는 필요 없음
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
        content: document.querySelector("#scroll-section-1 .description"),
      },
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === "sticky") {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
        sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
      }
    }

    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }

  function calcValues(values, currentYOffset) {
    let rv;
    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = ((currentYOffset - partScrollStart) / partScrollHeight) * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    // console.log(scrollRatio);
    if (currentScene === 0) {
      if (scrollRatio <= 0.01) {
        // in
        objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
        objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
      } else {
        // out
        objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
        objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.21) {
        // in
        objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
        objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
      } else {
        // out
        objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
        objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.41) {
        // in
        objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
        objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
      } else {
        // out
        objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
        objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.61) {
        // in
        objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
        objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
      } else {
        // out
        objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
        objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.81) {
        // in
        objs.messageE.style.opacity = calcValues(values.messageE_opacity_in, currentYOffset);
        objs.messageE.style.transform = `translate3d(0, ${calcValues(values.messageE_translateY_in, currentYOffset)}%, 0)`;
      } else {
        // out
        objs.messageE.style.opacity = calcValues(values.messageE_opacity_out, currentYOffset);
        objs.messageE.style.transform = `translate3d(0, ${calcValues(values.messageE_translateY_out, currentYOffset)}%, 0)`;
      }
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (delayedYOffset < prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      document.body.classList.remove("scroll-effect-end");
    }

    if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      if (currentScene === sceneInfo.length - 1) {
        document.body.classList.add("scroll-effect-end");
      }
      if (currentScene < sceneInfo.length - 1) {
        currentScene++;
      }
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (delayedYOffset < prevScrollHeight) {
      enterNewScene = true;
      // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }

  function loop() {
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

    // 일부 기기에서 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
    // 페이지 맨 위로 갈 경우: scrollLoop와 첫 scene의 기본 캔버스 그리기 수행
    if (delayedYOffset < 1) {
      scrollLoop();
    }
    // 페이지 맨 아래로 갈 경우: 마지막 섹션은 스크롤 계산으로 위치 및 크기를 결정해야할 요소들이 많아서 1픽셀을 움직여주는 것으로 해결
    if (document.body.offsetHeight - window.innerHeight - delayedYOffset < 1) {
      let tempYOffset = yOffset;
      scrollTo(0, tempYOffset - 1);
    }

    rafId = requestAnimationFrame(loop);

    if (Math.abs(yOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  window.addEventListener("load", () => {
    setLayout(); // 중간에 새로고침 시, 콘텐츠 양에 따라 높이 계산에 오차가 발생하는 경우를 방지하기 위해 before-load 클래스 제거 전에도 확실하게 높이를 세팅하도록 한번 더 실행
    document.body.classList.remove("before-load");
    setLayout();

    // 중간에서 새로고침 했을 경우 자동 스크롤로 제대로 그려주기
    let tempYOffset = yOffset;
    let tempScrollCount = 0;
    if (tempYOffset > 0) {
      let siId = setInterval(() => {
        scrollTo(0, tempYOffset);
        tempYOffset += 5;

        if (tempScrollCount > 20) {
          clearInterval(siId);
        }
        tempScrollCount++;
      }, 20);
    }

    window.addEventListener("scroll", () => {
      yOffset = window.pageYOffset;
      scrollLoop();

      if (!rafState) {
        rafId = requestAnimationFrame(loop);
        rafState = true;
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        window.location.reload();
      }
    });

    window.addEventListener("orientationchange", () => {
      scrollTo(0, 0);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  });
})();
