(function ($) {
    try {
        $(document).ready(function () {
            const DECIMAL = 0.001;
            const formatter = new Intl.NumberFormat('en-EN', {minimumFractionDigits: 3, /*maximumFractionDigits: 3*/});
            const formatNumber = num => num ? formatter.format(num) : num; //num.toFixed(3).toLocaleString("en-EN") : num;
            const parseNumber = num => num.replace(',', '');

            $.fn.setInputFilter = function (inputFilter) {
                return this.on(
                    "input keydown keyup mousedown mouseup select contextmenu drop",
                    function () {
                        if (inputFilter(this.value)) {
                            this.oldValue = this.value;
                            this.oldSelectionStart = this.selectionStart;
                            this.oldSelectionEnd = this.selectionEnd;
                        } else if (this.hasOwnProperty("oldValue")) {
                            this.value = this.oldValue;
                            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                        } else {
                            this.value = 1.000;
                        }
                    }
                );
            };
            $(document).find(".ip-wrap input").setInputFilter(t => /^\d*[.]?\d*$/.test(t));

            $(document).on('keydown', '.ip-wrap input', function (e) {
                let $wrap = $(this).closest(".ip-wrap")
                if (!$wrap.length) return;
                let input = $(this),
                    btnUp = $wrap.find(".quantity-up"),
                    btnDown = $wrap.find(".quantity-down");

                input.setInputFilter(t => /^\d*[.]?\d*$/.test(t));
                38 === e.keyCode ? btnUp.trigger("click") : 40 === e.keyCode && btnDown.trigger("click");
            })

            $(document).on('blur', '.ip-wrap input', function () {
                let $wrap = $(this).closest(".ip-wrap")
                if (!$wrap.length) return;
                let input = $(this),
                    step = parseFloat(parseNumber(input.attr("step")) || DECIMAL),
                    val = parseFloat(parseNumber(input.val()) || step),
                    min = parseFloat(parseNumber(input.attr("min")) || step),
                    max = parseFloat(parseNumber(input.attr("max")));

                input.val(formatNumber(val <= min ? min : (val >= max ? max : val)));
                input.trigger("change");
            })

            $(document).on('click', '.quantity-up', function () {
                let $wrap = $(this).closest(".ip-wrap")
                if (!$wrap.length) return;
                let newVal,
                    input = $wrap.find('input[type="text"]'),
                    step = parseFloat(parseNumber(input.attr("step")) || DECIMAL),
                    val = parseFloat(parseNumber(input.val()) || step),
                    min = parseFloat(parseNumber(input.attr("min")) || step),
                    max = parseFloat(parseNumber(input.attr("max")));

                newVal = val >= max ? max : val + step;
                input.val(formatNumber(newVal));
                input.trigger("change");
            });
            $(document).on('click', '.quantity-down', function () {
                let $wrap = $(this).closest(".ip-wrap")
                if (!$wrap.length) return;
                let newVal,
                    input = $wrap.find('input[type="text"]'),
                    step = parseFloat(parseNumber(input.attr("step")) || DECIMAL),
                    val = parseFloat(parseNumber(input.val()) || step),
                    min = parseFloat(parseNumber(input.attr("min")) || step),
                    max = parseFloat(parseNumber(input.attr("max")));

                newVal = val <= min ? min : val - step;
                input.val(formatNumber(newVal));
                input.trigger("change");
            });
        })
    } catch (e) {
        console.log(e)
    }
})(jQuery)
