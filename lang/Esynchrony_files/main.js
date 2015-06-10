; (function($) {
	$(document).ready(function() {
		$('#photo').change(function(e) {
			$(this).parents('form').submit();
		});
		pricingList();
		validForm();
		benefitCircle();
		textareaCounter();
		multiSelect();
		formDate();
		quiz();
	});

	var pricingList = function() {
		var $priceList = $('.pricing_list_item');

		$priceList.each(function() {
			var $priceItem = $(this),
			$openLink = $priceItem.find('.pricing_list_item_more a'),
			$content = $priceItem.find('.pricing_list_item_desc'),
			$closeLink = $priceItem.find('.pricing_list_item_desc_btn-close');

			$openLink.on('click', function(e) {
					e.preventDefault();
					$openLink.addClass('open');
					$content.show();
				});
			$closeLink.on('click', function(e) {
					e.preventDefault();
					$openLink.removeClass('open');
					$content.hide();
				});
		});
	};

	var validForm = function() {
		$('.form-reg').validate({
			rules: {
				password: 'required',
				firstname: 'required',
				lastname: 'required',
				name: 'required',
				number: {
					required: true,
					number: true
				},
				email: {
					required: true,
					validEmail: true
				},
				country: {
					valueNotEquals: '0'
				}
			},
			showErrors: function(errorMap, errorList) {
				$('.input-group_input-wrap').removeClass('error');
				for (var i = 0; i < errorList.length; i++) {
					$(errorList[i].element).parent('.input-group_input-wrap').addClass('error');
				}
			},
			submitHandler: function(form) {
				console.log('form submit');
				return true;
			}
		});

		$('.activation-code').validate({
			rules: {
				activationCode: {
					required: true,
					minlength: 6,
					maxlength: 6
				}
			},
			showErrors: function(errorMap, errorList) {
				$('.input-group_input-wrap').removeClass('error');
				for (var i = 0; i < errorList.length; i++) {
					$(errorList[i].element).parent('.input-group_input-wrap').addClass('error');
				}
			},
			submitHandler: function(form) {
				console.log('form submit');
				return true;
			}
		});

		$.validator.addMethod('valueNotEquals', function(value, element, arg) {
				return arg != value;
			}, 'Value must not equal arg.');

		$.validator.addMethod('validEmail', function(value, element) {
				if (value == '') return true;
				var temp1;
				temp1 = true;
				var ind = value.indexOf('@');
				var str2 = value.substr(ind + 1);
				var str3 = str2.substr(0, str2.indexOf('.'));
				if (str3.lastIndexOf('-') == (str3.length - 1) || (str3.indexOf('-') != str3.lastIndexOf('-'))) return false;
				var str1 = value.substr(0, ind);
				if ((str1.lastIndexOf('_') == (str1.length - 1)) || (str1.lastIndexOf('.') == (str1.length - 1)) || (str1.lastIndexOf('-') == (str1.length - 1))) return false;
				str = /(^[a-zA-Z0-9]+[\._-]{0,1})+([a-zA-Z0-9]+[_]{0,1})*@([a-zA-Z0-9]+[-]{0,1})+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,3})$/;
				temp1 = str.test(value);
				return temp1;
			}, 'Please enter valid email.');
	};

	var benefitCircle = function() {
		$('.benefit_list_item').on('click', function() {
				$(this).toggleClass('select');
			});

		var $btnFind = $('.header_find'),
		$btnFindMy = $('.scroll-to-meet');

		$btnFind.on('click', function(e) {
				e.preventDefault();
				$('body').animate({
					scrollTop: $('.meet-real').offset().top
				},500);
			});

		$btnFindMy.on('click', function(e) {
				e.preventDefault();
				$('body').animate({
					scrollTop: $('.meet-real').offset().top
				},500);
			});
	};

	var textareaCounter = function() {
		var $areaCounters = $('.quiz-input-group_input-wrap__area__counter');

		$areaCounters.each(function() {
			var $areaCounter = $(this),
			$textArea = $areaCounter.find('.quiz-input-group_input__area'),
			$svg = $areaCounter.find('.quiz-input-group_counter_circle-count'),
			maxCount = parseInt($areaCounter.data('maxcount')),
			$countNumb = $areaCounter.find('.quiz-input-group_counter_count_num');

			$textArea.on('keyup', function() {
					var text = $(this).val();
					var chars = text.length;
					if (chars > maxCount) {
						var new_text = text.substr(0, maxCount);
						$(this).val(new_text);
					}
					$countNumb.html(maxCount - $(this).val().length);
					var persentCircle = $(this).val().length * 100 / maxCount;
					$svg.html(circle(persentCircle));
				});

			function circle(persent) {
				var x0 = 0,
				y0 = 0,
				r = 25,
				x1, y1, angle = 0,
				angleRad = 0;
				var html;
				angle = 90 - (persent * 360 / 100);
				angleRad = (Math.PI / 180) * angle;

				x1 = x0 + (Math.cos(angleRad) * r);
				y1 = y0 + (Math.sin(angleRad) * r);
				y1 = 25 - y1;

				if (persent > 50) {
					if (persent === 100) {
						html = '<path fill="none" stroke="#0296c0" stroke-width="4" d="M27,2 a25,25 0 1,1 ' + -0.1 + ',' + 0 + '" />';
					} else {
						html = '<path fill="none" stroke="#0296c0" stroke-width="4" d="M27,2 a25,25 0 1,1 ' + x1 + ',' + y1 + '" />';
					}
				} else {
					html = '<path fill="none" stroke="#0296c0" stroke-width="4" d="M27,2 a25,25 0 0,1 ' + x1 + ',' + y1 + '" />';
				}
				return html;
			}
		});
	};

	var multiSelect = function() {
		var $multi = $('.quiz-input-group_input-wrap_multi');

		$multi.each(function() {
			var $item = $(this),
			$input = $item.find('.quiz-input-group_input'),
			$Hidden = $item.find('.Hidden'),
			$dropdown = $item.find('.quiz-input-group_input-wrap_multi_drop'),
			$inputCheck = $('.quiz-input-group_input-wrap_multi_drop_item_check');

			$input.on('click', function(e) {
					$dropdown.toggleClass('active');
					$item.toggleClass('active');
					e.stopPropagation();
	
					if ($dropdown.hasClass('active')) {
						$('body').on('click', function() {
								$dropdown.removeClass('active');
								$item.removeClass('active');
							});
					} else {
						$('body').off('click');
					}
				});

			$dropdown.on('click', function(e) {
					e.stopPropagation();
				});

			$inputCheck.on('change', function() {
					var inputVal = inputText = '';
	
					$item.find('.quiz-input-group_input-wrap_multi_drop_item_check:checked').each(function() {
						inputVal += $(this).val() + '|';
						inputText += $(this).next('label').text() + ', ';
					});
	
					$Hidden.val(inputVal);
					$input.val(inputText);
	
					if ($input.val() !== '') {
						$input.addClass('mvalid');
					} else {
						$input.removeClass('mvalid');
					}
				});
		});
	};

	var circle = function() {
		var x0 = 0,
		y0 = 0,
		r = 50,
		x1, y1, angle = 0,
		angleRad = 0,
		persent = 0;
		var html;
		persent = 75;
		angle = 90 - (persent * 360 / 100);
		console.log(angle);
		angleRad = (Math.PI / 180) * angle;
		console.log(angleRad);

		x1 = x0 + (Math.cos(angleRad) * r);
		y1 = y0 + (Math.sin(angleRad) * r);
		console.log('x =' + x1);
		console.log('y =' + (y1));
		y1 = 50 - y1;
		if (persent > 50) {
			html = '<path fill="none" stroke="#333333" stroke-width="3" d="M150,50 a50,50 0 1,1 ' + x1 + ',' + y1 + '" />';
		} else {
			html = '<path fill="none" stroke="#333333" stroke-width="3" d="M150,50 a50,50 0 0,1 ' + x1 + ',' + y1 + '" />';
		}
		$('.mysvg').html(html);
	};

	var formDate = function() {
		var $dateWrap = $('.input-group__date'),
		$month = $dateWrap.find('.input-group__date__month'),
		$day = $dateWrap.find('.input-group__date__day'),
		$year = $dateWrap.find('.input-group__date__year'),
		yearHtml = '<option value="0">Year</option>',
		arrMonthDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		dayHtml = '';

		var i = 0;
		for (i = 1960; i < 2015; i++) {
			yearHtml += '<option value="' + i + '">' + i + '</option>';
		}
		$year.html(yearHtml);

		$month.on('change', function() {
				dayHtml = '<option value="0">Day</option>';
	
				if (Number($(this).val()) > 0) {
					for (var i = 1; i < arrMonthDay[Number($(this).val())] + 1; i++) {
						dayHtml += '<option value="' + i + '">' + i + '</option>';
					}
					$day.html(dayHtml);
				} else {
					$day.html(dayHtml);
				}
			});
	};

	var quiz = function() {
		var $steps = $('.quiz-step'),
		result = [],
		step = 0,
		maxSteps = 15,
		$btn = $('.form-btn__quiz-footer'),
		$forms = $('.quiz-form-step');
		nextStep();
		validation();

		function nextStep() {
			$steps.filter('.active').removeClass('active');
			$steps.eq(step).addClass('active');
			switchBot();
			$('body').scrollTop(0);
		}

		function saveResult() {
			var $inputGroups = $forms.eq(step).find('.quiz-input-group'),
			tempResult = [];

			$inputGroups.each(function(index) {
				var tempObj = new Object();
				tempObj.name = $(this).find('.quiz-input-group_label').text();

				if ($(this).find('.quiz-input-group_input').length > 0) {
					tempObj.result = $(this).find('.quiz-input-group_input').val();
					tempResult.push(tempObj);
				} else {
					if ($(this).find('.quiz-input-group_radio').length > 0) {
						if ($(this).find('.quiz-input-group_radio:checked').length > 0) {
							if ($(this).find('.quiz-input-group_radio:checked').val() == 1) {
								tempObj.result = 'Yes';
							} else {
								tempObj.result = 'No';
							}
							tempResult.push(tempObj);
						}
					}
					if ($(this).find('.quiz-radio-group_item').length > 0) {
						var groupItem = $(this).find('.quiz-radio-group_item');

						groupItem.each(function() {
							var tempObj = new Object();
							tempObj.name = $(this).find('.quiz-radio-group_item_text').text();

							if ($(this).find('.quiz-radio-group_item_input_radio:checked').val() == 1) {
								tempObj.result = 'Yes';
							} else {
								tempObj.result = 'No';
							}
							tempResult.push(tempObj);
						});
					}
				}

			});
			result.push(tempResult);
			console.log(result);
		}

		$btn.on('click', function() {
				$('.quiz-form-step').eq(step).submit();
			});

		function validation() {
			$.validator.addMethod('valueNotEquals', function(value, element, arg) {
					return arg != value;
				}, 'Value must not equal arg.');

			$('.quiz-form-step').each(function() {
				var $form = $(this);

				$(this).validate({
					submitHandler: function(form) {
						saveResult();
						step++;
						nextStep();
						if (step > maxSteps) {
							return;
						}
						console.log('form submit');
						return true;
					}
				});

				$(this).find('.quiz-input-group_input').each(function(e) {
					if ($(this).val() !== '') {
						$(this).addClass('mvalid');
					} else {
						$(this).removeClass('mvalid');
					}
				});

				$(this).find('.quiz-input-group_input').on('change', function() {
						if ($(this).val() !== '') {
							$(this).addClass('mvalid');
						} else {
							$(this).removeClass('mvalid');
						}
						validForm($form);
						switchBot();
					});

				$(this).find('.quiz-radio-group').each(function() {
					var $radioGroup = $(this);

					$radioGroup.find('.quiz-radio-group_item_radio-label').on('click', function() {
							$radio = $(this).siblings('input'),
							$val = $radio.val() == '1' ? '2': '1',
							$class = $val == '1' ? '.least': '.most';
							$radioGroup.find('input.quiz-radio-group_item_input_radio[value=' + $radio.val() + ']').prop('checked', false).attr('checked', false);
							$radio.prop('checked', true).attr('checked', true);
							$index = $radio.parents('.quiz-radio-group_item').index() - 1;
							$radioGroup.find('input' + $class).val($index);
							$other = $radioGroup.find('input.quiz-radio-group_item_input_radio[value=' + $val + '][checked]');
							if ($other.length > 0) {
								if ($other.parents('.quiz-radio-group_item').index() == $index + 1) {
									$radioGroup.removeClass('mvalid');
									$other.prop('checked', false).attr('checked', false);
								} else {
									$radioGroup.addClass('mvalid');
								}
								validForm($form);
								switchBot();
							}
						});
				});

				$(this).find('.quiz-input-group_radio-group').each(function() {
					var $radioGroup = $(this);

					$radioGroup.find('.quiz-input-group_radio-label').on('click', function() {
							$radioGroup.addClass('mvalid');
							validForm($form);
							switchBot();
						});
				});
			});

			function validForm(form) {
				var formItems = form.find('.quiz-input-group_input').length,
				formItemsValid = form.find('.quiz-input-group_input.mvalid').length;

				formItems += form.find('.quiz-radio-group').length;
				formItemsValid += form.find('.quiz-radio-group.mvalid').length;

				formItems += form.find('.quiz-input-group_radio-group').length;
				formItemsValid += form.find('.quiz-input-group_radio-group.mvalid').length;

				formItems -= form.find('.quiz-input-group_input.novalid').length;
				formItemsValid -= form.find('.quiz-input-group_input.novalid.mvalid').length;

				if (formItems === formItemsValid) {
					form.addClass('form-valid');
					console.log(formItems + ' - ' + formItemsValid);
					return true;
				} else {
					form.removeClass('form-valid');
					console.log(formItems + ' - ' + formItemsValid);
					return false;
				}
			}
		}

		function switchBot() {
			var $progress = $('.quiz-footer-progress'),
			$save = $('.quiz-footer_valid');

			if ($forms.eq(step).hasClass('form-valid')) {
				$progress.hide();
				$save.show();
			} else {
				$progress.show();
				$save.hide();
			}
		}
	};
} (jQuery));