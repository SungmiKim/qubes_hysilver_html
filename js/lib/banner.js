window.onload = function () {
  //rolling banner(왼쪽)-----------------------------------------------
  var $imgLeftWidth = $(".banner_wraper.left img").width();
  var bannerLeft = 0;
  var first = 1;
  var last;
  var imgCnt = 0;
  var $imgLeft = $(".banner_wraper.left img");
  var $first;
  var $last;

  $imgLeft.each(function () {
    // 5px 간격으로 배너 처음 위치 시킴
    $(this).css("left", bannerLeft);
    bannerLeft += $(this).width(); // 여기서 배너 사이 간격 조절
    $(this).attr("id", "banner" + ++imgCnt); // img에 id 속성 추가
  });

  last = imgCnt;

  function rollingLeft() {
    rollingLeftStart = setInterval(function () {
      $imgLeft.each(function () {
        $(this).css("left", $(this).position().left - 1); // 1px씩 왼쪽으로 이동
      });
      $first = $("#banner" + first);
      $last = $("#banner" + last);
      if ($first.position().left < -$imgLeftWidth) {
        // 제일 앞에 배너 제일 뒤로 옮김
        $first.css("left", $last.position().left + $last.width()); // 여기서 배너 사이 간격 조절
        first++;
        last++;
        if (last > imgCnt) {
          last = 1;
        }
        if (first > imgCnt) {
          first = 1;
        }
      }
    }, 30); //여기 값을 조정하면 속도를 조정할 수 있다.
  }

  // 롤링 시작
  rollingLeft();

  // 이미지에 마우스 올라갔을 때 롤링 Stop
  $imgLeft.hover(
    function () {
      clearInterval(rollingLeftStart);
    },
    function () {
      rollingLeft();
    }
  );
};
