//Car page start

var initButtonSelection = function (selectedId, optionsId, buttonClass, editId, showNext, showNextId) {

	$(editId).on("click", function () {
		$(selectedId).toggleClass("hidden");
		$(optionsId).toggleClass("hidden");
	});

	var buttons = $(optionsId).find(buttonClass);
	buttons.each(function () {

		$(this).on("click", function () {

			$(selectedId).find("#select-value").html($(this).html());
			$(selectedId).toggleClass("hidden");
			$(optionsId).toggleClass("hidden");
			if (showNext) {
				$(showNextId).removeClass("hidden");
			}
		})
	})
}


var modalControl = function (selectedId, optionsId, clearId, addOptionsId, showNext, showNextId) {

	$(clearId).on("click", function () {
		$(optionsId).addClass("hidden");
		$(selectedId).removeClass("hidden");
	});

	$(addOptionsId).on("click", function () {
		$(optionsId).removeClass("hidden");
		$(selectedId).addClass("hidden");
		if (showNext) {
			$(showNextId).removeClass("hidden");
		}
	})
}

var selectNext = function (selectId, showNextId) {

	$(selectId).change(function () {
		$(showNextId).removeClass("hidden");
	});
}

//car page end


var initMinusPlus = function () {
	//plugin bootstrap minus and plus
	//http://jsfiddle.net/laelitenetwork/puJ6G/
	$('.btn-number').click(function (e) {
		e.preventDefault();

		fieldName = $(this).attr('data-field');
		type = $(this).attr('data-type');
		var input = $("input[name='" + fieldName + "']");
		var currentVal = parseInt(input.val());
		if (!isNaN(currentVal)) {
			if (type == 'minus') {

				if (currentVal > input.attr('min')) {
					input.val(currentVal - 1).change();
				}
				if (parseInt(input.val()) == input.attr('min')) {
					$(this).attr('disabled', true);
				}

			} else if (type == 'plus') {

				if (currentVal < input.attr('max')) {
					input.val(currentVal + 1).change();
				}
				if (parseInt(input.val()) == input.attr('max')) {
					$(this).attr('disabled', true);
				}

			}
		} else {
			input.val(0);
		}
	});
	$('.input-number').focusin(function () {
		$(this).data('oldValue', $(this).val());
	});
	$('.input-number').change(function () {

		minValue = parseInt($(this).attr('min'));
		maxValue = parseInt($(this).attr('max'));
		valueCurrent = parseInt($(this).val());

		name = $(this).attr('name');
		if (valueCurrent >= minValue) {
			$(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
		} else {
			alert('Sorry, the minimum value was reached');
			$(this).val($(this).data('oldValue'));
		}
		if (valueCurrent <= maxValue) {
			$(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
		} else {
			alert('Sorry, the maximum value was reached');
			$(this).val($(this).data('oldValue'));
		}


	});
	$(".input-number").keydown(function (e) {
		// Allow: backspace, delete, tab, escape, enter and .
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
			// Allow: Ctrl+A
			(e.keyCode == 65 && e.ctrlKey === true) ||
			// Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});
}

var initFinanceAdd = function (buttonId, formId, balanceId, itemsId, submitId, itemsWrapperId) {

	var type = "";
	$(buttonId).each(function () {
		$(this).on("click",
			function () {
				type = $(this).data("id");
				$(itemsWrapperId).removeClass("hidden");
				$(formId).removeClass("hidden");
			});
	});

	$(submitId).on("click",
		function () {
			
			$(formId).addClass("hidden");
			addFinanceItem(itemsId, type, $(balanceId).val());
		});
}


var count = 1;

var addFinanceItem = function (itemsId, type, balance) {
	
	var itemId = "item-" + count;
	var deleteItemId = "delete-" + itemId;
	var balanceCurrency = balance.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	var item = "<div class='row' id='" + itemId + "'>" +
		"<div class='col-md-6'>" +
		"<p>" + type + "</p>" +
		"</div>" +
		"<div class='col-md-6'> " +
		"<div class='row'> " +
		"<div class='col-md-5'> " +
		"<p>$" + balanceCurrency + "</p> " +
		"</div> " +
		"<div class='col-md-4'> " +
		"<p>" +
		"<a>edit</a>" +
		"</p> " +
		"</div> " +
		"<div class='col-md-3'> " +
		"<p><a data-id='#"+ itemId + "' id='" + deleteItemId + "' class='delete-finance-item'><span class='glyphicon glyphicon-remove-circle'></span></a></p> " +
		"</div> " +
		"</div> " +
		"</div> " +
		"</div>";

	$(itemsId).append(item);
	initFinanceDelete("#" + deleteItemId);
	count++;
}

var initFinanceDelete = function(id) {

	$(id).on("click",
		function() {
			var elementId = $(this).data("id");
			$(elementId).remove();
		});
}