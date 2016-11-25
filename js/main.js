(function() {

    [].slice.call( document.querySelectorAll( '.tabs' ) ).forEach( function( el ) {
        new CBPFWTabs( el );
    });

})();
$(document).ready(function(){

    $('.sortable').nestedSortable({
        forcePlaceholderSize: true,
        handle: 'div',
        helper:	'clone',
        items: 'li',
        opacity: .6,
        placeholder: 'placeholder',
        revert: 250,
        tabSize: 25,
        tolerance: 'pointer',
        toleranceElement: '> div',
        maxLevels: 6,

        isTree: true,
        expandOnHover: 700,
        startCollapsed: true
    });

    $('.disclose').on('click', function() {
        $(this).closest('li').toggleClass('mjs-nestedSortable-collapsed').toggleClass('mjs-nestedSortable-expanded');
    });

    $(".GaugeMeter").gaugeMeter();
    var work_list;

    $('.open_filter').on('click', function () {
        $('.open_filter').toggleClass('open');
        $('.filter').toggleClass('open');
    });
    $('.report').on('click' , function () {
        var position = $(this).offset();
        $('.audit_tooltip').toggleClass('open').css({
            "left" : position.left - 120,
            "top" : position.top + 40
        });
    });
    $('.edit').on('click', function(){
        var position = $(this).offset();
        $('.popup_edit.plan_work').addClass('open').css({
            "left" : position.left,
            "top" : position.top + -235
        });

        work_list  = $(this).parent().find('.work_item');
        $.each( work_list, function( key ) {
            var dataCheck = $(this).data('check');
            var change_list  = $('.check_input');

            if ( dataCheck == 1 ) {
                change_list.eq(key).prop("checked", true);
            }
        });
    });

    $('.submit').on('click', function () {
        // var work_list  = $('.work_item');
        var change_list  = $('.check_input');
        $.each( change_list, function( key ) {
            var dataCheck = $(this).data('check');
            // if ( dataCheck == 1 ) {
            //     alert(dataCheck);
            // }
            if ( $( this ).prop( "checked" ) ) {
                work_list.eq(key).attr("data-check", 1);
            } else {
                work_list.eq(key).attr("data-check", 0);
            }
        });
    });


    $('.close, .exit').on('click', function () {
        $('.popup_edit.plan_work').removeClass('open');
        $('.popup_edit.external_promotion').removeClass('open');
    });

    $('.check_all').on('click', function () {
        $(this).addClass('test');
        $('.check_input').prop( "checked", true );
    });
    $('.edit_external_promotion').on('click', function (event) {
        event.preventDefault();
        $('.popup_edit.external_promotion').addClass('open');
    });

    $('.add_link').on('click', function () {
        var link_address = $('.link_address');
        var link_list = $('.link_list li').length + 1;
        if ( link_address.val() == '' ) {
            return;
        } else {
            $('.link_list').append('<li><div class="number"><span>' + link_list +'</span></div><div class="link"><a class="e_link" href="#">' + link_address.val() + '</a></div><div class="date"><span>17.11.2016</span> <button class="edit_link"></button> <button class="delete">×</button></div></li>');
            link_address.val('');
        }
    });

    $('body').on('click', '.delete', function() {
        $(this).parent().parent().remove();
    });
    // $('.edit_link').on('click',  function() {
    //     $(this).parent().parent().find('.e_link').attr('contenteditable', true).css({'border' : '2px solid #006B63', 'padding' : '5px', 'border-radius': '3px'});
    // });

    // $('body').on('click', function() {
    //     var link_attr = $('.e_link').attr('contenteditable');
    //    if ( link_attr == 'true' ) {
    //         alert(link_attr);
    //    }
    // });

});