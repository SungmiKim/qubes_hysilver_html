$(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
      $(".btn_skip").hide();
    } else {
      $(".btn_skip").show();
    }
  });

  /**
   * 모바일 메뉴
   */
  $("header .mo_gnb .mo_menu").click(function () {
    $(".mo_gnb .main_menu").addClass("on");
    $("body").addClass("fixed");
  });

  $(".mo_gnb .main_menu .links .link").click(function () {
    $(".mo_gnb .main_menu .links .sub_menu").slideUp();
    if ($(this).next().css("display") === "none") {
      $(this).next().slideDown();
    }
  });

  $(".mo_gnb .main_menu .top .btn_close").click(function () {
    $(".mo_gnb .main_menu").removeClass("on");
    $("body").removeClass("fixed");
  });

  /**
   * 서브 메뉴
   */
  $(".sub_nav .inner").click(function () {
    console.log("click");
    $(this).toggleClass("show");
  });

  /**
   * 탭 메뉴
   */
  $("ul.tabs li").click(function () {
    var tab_id = $(this).attr("data-tab");
    $("ul.tabs li").removeClass("current");
    $(".tab_content").removeClass("current");
    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });

  /**
   * sub_nav links active삽입
   */
  var p_name = $(location).attr("pathname"),
    pg_path = p_name.slice(1);

  $(".sub_nav .links li").each(function () {
    var li_path = $(this).find("a").attr("href");
    if (pg_path == li_path) {
      $(this).addClass("active").siblings().removeClass("active");
    }
  });

  if (p_name.indexOf("content1") === 1) {
    $(".header .gnb_link:nth-child(1)").addClass("active");
  } else if (p_name.indexOf("content2") === 1) {
    $(".header .gnb_link:nth-child(2)").addClass("active");
  } else if (p_name.indexOf("content3") === 1) {
    $(".header .gnb_link:nth-child(3)").addClass("active");
  }
  /**
   * 시설둘러보기 슬라이드
   */
  $(".tap_menu").click(function () {
    var str = $(this).data("tab");
    var num = str.replace("tab_", "");
    var path1 = $("#tab_" + num)
      .find(".swiper-slide:first-child img")
      .attr("src");

    $(".view_img img").attr("src", path1);
  });

  $(".swiper-slide").click(function () {
    var img_path = $(this).find("img").attr("src");
    $(".view_img img").attr("src", img_path);
  });

  $(".quick .btn_top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      400
    );
    return false;
  });
});
