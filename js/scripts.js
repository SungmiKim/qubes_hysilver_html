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
});
