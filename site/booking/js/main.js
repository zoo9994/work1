(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
		$container = $("#container");

		/* 분류선택, 기관선택 탭 */

		var $select = $container.find('.select'),
		$selectTabButton = $select.find('.tab_button'),
		$selectTabPanel = $select.find('.tab_panel'),
		$insList = $select.find('.institution_list');

		
		/* 기관선택  슬라이드 */
		var $institution = $container.find(".institution_box"),
			$institutionList = $container.find(".institution_box .institution_list"),
			$institutionPrev = $institution.find('.institution_prev'),
			$institutionNext = $institution.find('.institution_next'),
			$institutionSlickOpt = {
				slidesPerRow: 3,
				rows : 3,
				slidesToScroll: 1,
				speed: 500,
				infinite: false,
				arrow: true,
				prevArrow : $institutionPrev,
				nextArrow : $institutionNext,
				autoplay: false,
				draggable: true,
				variableWidth: false,
				dots: true,
				dotsClass: 'slick_count',
				customPaging: function (slick,index) {
					return '<span class="institution_current">' + (index + 1) + '</span>' + ' / ' + '<span class="institution_total">' + slick.slideCount + '</span>';
				},
				responsive: [
				{
					breakpoint:541,
					settings : {
						slidesPerRow: 2,
					}
				},
				{
					breakpoint:601,
					settings : {
					slidesToShow: 1,
					}
				}
				]
			};

		/* 카테고리 체크박스 초기화 */
		var $cateResetBtn = $container.find('.category_reset .reset_btn');
		function cateCheckbox()  {
			const checkboxes = Array.from(document.getElementsByName('categorySelect'));
			checkboxes.forEach((checkbox) => {
				checkbox.checked = false;
			})
		}
		$cateResetBtn.on('click', function (event) {
			cateCheckbox();
        });

		/* 기관선택 체크박스 초기화 */
		var $instResetBtn = $container.find('.institution_btns .institution_reset .reset_btn');
		function instCheckbox()  {
			const checkboxes = Array.from(document.getElementsByName('institutionSelect'));
			checkboxes.forEach((checkbox) => {
				checkbox.checked = false;
			});
			$('.institution_btns .instAll').prop('checked', false);
		}
		$instResetBtn.on('click', function (event) {
			instCheckbox();
        });

		/* 인풋 전체선택 */
		var $instAllBtn = $('.institution_btns .instAll'),
		$instInput = $('.institution_itm input');

		$instAllBtn.on("click", function () {
			$(this).parents('.institution_box').find('.institution_itm input').prop("checked", $(this).is(":checked"));
		});



		/* 분류,기관 선택 탭 */
		$selectTabButton.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            //$this.attr('title', '선택됨');
            $parent.siblings().children('.tab_button').removeAttr('title');
            $selectTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
            
            $('.select .select_wrap').removeClass('active open');
			$institutionList.slick($institutionSlickOpt); 
			cateCheckbox();
			instCheckbox();
        });


		/* 지도선택 */
		$('.area_map button').each(function () {
			$(this).on('click', function () {
				function findTab() {
					$('.area_map .map_wrap').attr('class', 'map_wrap show' + btnIdx);
					$('.area_map .map_wrap .map_btn').eq(btnIdx).addClass('active').siblings().removeClass('active');
				}

				if ($(this).parent().hasClass('map_btn')) {
					var btnIdx = $(this).parent().index() - 1;
					findTab();
				} else {
					var btnIdx = $(this).parent().index();
					findTab();
				}
			});
		});



		/* 운영중인 강좌현황 탭 */
		var $state = $container.find('.state'),
		$stateTabButton = $state.find('.tab_btn'),
		$stateTabPanel = $state.find('.cont_pannel');

		function arrayBtnClickHandler() {
			var	$arrayBtn = $container.find(".cont_pannel.active .array_btn");

			$arrayBtn.off('click').on('click', function () {
				var $this = $(this),
					$parent = $this.closest('.array_btns');
				$parent.find('.array_btn').removeClass('active');
				$this.addClass('active');
			});
		}
		arrayBtnClickHandler();
		
		$stateTabButton.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.tab_itm'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $parent.siblings().children('.tab_button').removeAttr('title');
            $stateTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
			arrayBtnClickHandler();
        });



	

		var $thumbnail = $container.find(".cont_pannel.thumbnail"),
		$thumbnailList = $thumbnail.find(".thumbnail_list"),
		$thumbnailPrev = $thumbnail.find('.thumbnail_prev'),
		$thumbnailNext = $thumbnail.find('.thumbnail_next'),
		$thumbnailSlickOpt = {
			slidesToShow : 4,
			slidesToScroll: 1,
			speed: 500,
			infinite: false,
			arrow: true,
			prevArrow : $thumbnailPrev,
			nextArrow : $thumbnailNext,
			autoplay: false,
			draggable: true,
			variableWidth: false,
			responsive: [
			{
				breakpoint:1401,
				settings : {
				slidesToShow: 3,
				}
			},
			{
				breakpoint:961,
				settings : {
				slidesToShow: 2,
				}
			},
			{
				breakpoint:581,
				settings : {
				slidesToShow: 1,
				}
			}
			]
		};
		$thumbnailList.slick($thumbnailSlickOpt); 

		
	});
})(window.jQuery);
