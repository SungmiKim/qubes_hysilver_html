$(function () {
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
  var name = $(location).attr("pathname"),
    path = name.slice(1);

  $(".sub_nav .links li").each(function () {
    var li_path = $(this).find("a").attr("href");
    if (path == li_path) {
      $(this).addClass("active").sibling().removeClass("active");
    }
  });
});
