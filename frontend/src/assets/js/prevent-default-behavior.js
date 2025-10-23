(function($) {
    $(document).ready(function () {
        $(document).on('click', '.prevent-default', function(e) {
            e.preventDefault();
        });
    })
})(jQuery);