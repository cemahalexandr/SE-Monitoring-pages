(function() {

    [].slice.call( document.querySelectorAll( '.tabs' ) ).forEach( function( el ) {
        new CBPFWTabs( el );
    });

})();
$(document).ready(function(){



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
        $('.popup_edit.plan_work').removeClass('open');
    });


    $('.close, .exit').on('click', function () {
        $('.popup_edit.plan_work').removeClass('open');
        $('.popup_edit.external_promotion').removeClass('open');
        $('.modal_overlay').removeClass('open');
    });

    $('.check_all').on('click', function () {
        $(this).addClass('test');
        $('.check_input').prop( "checked", true );
    });
    $('.edit_external_promotion').on('click', function (event) {
        event.preventDefault();
        $('.popup_edit.external_promotion').addClass('open');
        $('.modal_overlay').addClass('open');
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


    //
    // $( window ).resize(function() {
    //
    //     $.each( $('.head_element'), function( key ) {
    //         var project_margin;
    //         if(key == 0){
    //             project_margin = 50;
    //         }else{
    //             project_margin = 0;
    //         }
    //         var line_element  = $('.line_element').eq(key);
    //         var project_width = $(this).outerWidth();
    //
    //
    //         line_element.css('width', project_width - project_margin);
    //
    //
    //     });
    //
    // });
    $(document).mouseup(function (e) {
        var popup = $(".external_promotion");
        if (!$('.external_promotion').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
            $('.popup_edit.external_promotion').removeClass('open');
            $('.modal_overlay').removeClass('open');
            $('.audit_tooltip').removeClass('open')
        }
    });

});

