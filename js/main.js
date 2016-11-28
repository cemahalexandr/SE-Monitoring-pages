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
    var social_item;

    $('.open_filter').on('click', function () {
        $('.open_filter').toggleClass('open');
        $('.filter').toggleClass('open');
    });
    $('.report').on('click' , function (event) {
        event.preventDefault();
        var position = $(this).offset();
        $('.audit_tooltip').toggleClass('open').css({
            "left" : position.left - 120,
            "top" : position.top + 40
        });
    });

    $('.edit').on('click', function(){
        var position = $(this).offset();
        var change_list = $('.check_input');

        $('.popup_edit.plan_work').addClass('open').css({
            "left" : position.left,
            "top" : position.top + (-235)
        });
        work_list  = $(this).parent().find('.work_item');

        $.each( work_list, function( key ) {
            change_list.eq(key).prop("checked", false);
            var dataCheck = $(this).attr('data-check');
          
            if ( dataCheck == 1 ) {
                change_list.eq(key).prop("checked", true);
            }
        });
    });

    $('.edit_rrs').on('click', function(){
        var position = $(this).offset();
        var change_rrs = $('.check_rrs');

        $('.popup_edit.rrs').addClass('open').css({
            "left" : position.left,
            "top" : position.top + (-235)
        });
        social_item = $(this).parent().find('.social_item');

        $.each( social_item, function( key ) {
            change_rrs.eq(key).prop("checked", false);
            var dataCheck = $(this).attr('data-check');

            if ( dataCheck == 1 ) {
                change_rrs.eq(key).prop("checked", true);
            }
        });
    });



    $('.submit').on('click', function () {
        var change_list  = $('.check_input');
        $.each( change_list, function( key ) {
            var dataCheck = $(this).data('check');
   
            if ( $( this ).prop( "checked" ) ) {
                work_list.eq(key).attr("data-check", 1);
            } else {
                work_list.eq(key).attr("data-check", 0);
            }
        });
        $('.popup_edit.plan_work').removeClass('open');
    });

    $('.submit_rrs').on('click', function () {
        var change_rrs = $('.check_rrs');
        $.each( change_rrs, function( key ) {
            var dataCheck = $(this).data('check');

            if ( $( this ).prop( "checked" ) ) {
                social_item.eq(key).attr("data-check", 1);
            } else {
                social_item.eq(key).attr("data-check", 0);
            }
        });
        $('.popup_edit.rrs').removeClass('open');
    });

    $('.setting').on('click', function(event) {
        event.preventDefault();
        $('.popup_edit.project').addClass('open');
        $('.modal_overlay').addClass('open');
    });


    $('.close, .exit').on('click', function () {
        $('.popup_edit.plan_work').removeClass('open');
        $('.popup_edit.rrs').removeClass('open');
        $('.popup_edit.external_promotion').removeClass('open');
        $('.modal_overlay').removeClass('open');
        $('.popup_edit.project').removeClass('open');
    });

    $('.check_all').on('click', function () {
        $('.check_input').prop( "checked", true );
        $('.check_rrs').prop( "checked", true );
    });
    $('.edit_external_promotion').on('click', function (event) {
        event.preventDefault();
        $('.popup_edit.external_promotion').addClass('open');
        $('.modal_overlay').addClass('open');
    });

    $('.add_link').on('click', function (event) {
        event.preventDefault();
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
        var popup = $(".popup_edit");
        if (!$('.popup_edit').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
            $('.popup_edit.external_promotion').removeClass('open');
            $('.modal_overlay').removeClass('open');
            $('.audit_tooltip').removeClass('open');
            $('.popup_edit.project').removeClass('open');
        }
    });
    // =====================================================
    $.each( $('.filter_block input'), function( key ) {
        if ( $(this).val() != "" ) {
            $(this).css('background', '#fff');
        }
    });

    if ( $('.from').val() != '' ||  $('.to').val() != '' ) {
        $('.duration').addClass('filter_span_bold');
    } 

    if ( $('.from_second').val() != '' ||  $('.to_second').val() != '' ) {
        $('.promotion').addClass('filter_span_bold');
    } 
  

    $( ".from, .to" ).keyup(function() {
        var targetClass = $('.duration');
        targetClass.addClass('filter_span_bold');
        $(this).css('background', '#fff');

        if ( $(this).val() == "" ) {
            $(this).css('background', '#f7f7f7');
        }

        if ( $('.from').val() == '' &&  $('.to').val() == '' ) {
            targetClass.removeClass('filter_span_bold');
        }
    });

    $( ".from_second, .to_second" ).keyup(function() {
        var targetClass = $('.promotion');
        $(this).css('background', '#fff');
        targetClass.addClass('filter_span_bold');
        if ( $(this).val() == "" ) {
            $(this).css('background', '#f7f7f7');
        }
        if ( $('.from_second').val() == '' &&  $('.to_second').val() == '' ) {
          targetClass.removeClass('filter_span_bold');
        }
    });
// ===============================================================

    var inside_optimization =  $('main .filter .optimize input');
    var inside_optimization_label = $('main .filter .optimize span');
    var inside_check = 0;

    $.each( inside_optimization, function( key ) {
        if ( $(this).prop("checked") == true ) {
            inside_optimization_label.addClass('filter_span_bold');
            return false;
        }
    });
    inside_optimization.change(function() {
        $.each( inside_optimization, function( key ) {
            if ( $(this).prop("checked") == true ) {
                inside_optimization_label.addClass('filter_span_bold');
                inside_check = 1;
                return false;
            }
        });
        if ( inside_check == 0 ) {
            inside_optimization_label.removeClass('filter_span_bold');  
        }
        inside_check = 0;
    });




    var filter_status =  $('main .filter .status_block .status input');
    var filter_status_label = $('main .filter .status_block .status span');
    var status_check = 0;

     $.each( filter_status, function( key ) {
        if ( $(this).prop("checked") == true ) {
            filter_status_label.addClass('filter_span_bold');
            return false;
        }
    });

    filter_status.change(function() {
        $.each( filter_status, function( key ) {
            if ( $(this).prop("checked") == true ) {
                filter_status_label.addClass('filter_span_bold');
                status_check = 1;
                return false;
            }
        });
        if ( status_check == 0 ) {
            filter_status_label.removeClass('filter_span_bold');  
        }
        status_check = 0;
        
    });


    var filter_growth =  $('main .filter .status_block .growth input');
    var filter_growth_label = $('main .filter .status_block .growth span');
    var growth_check = 0;

     $.each( filter_growth, function( key ) {
        if ( $(this).prop("checked") == true ) {
            filter_growth_label.addClass('filter_span_bold');
            return false;
        }
    });

    filter_growth.change(function() {
        $.each( filter_growth, function( key ) {
            if ( $(this).prop("checked") == true ) {
                filter_growth_label.addClass('filter_span_bold');
                growth_check = 1;
                return false;
            }
        });
        if ( growth_check == 0 ) {
            filter_growth_label.removeClass('filter_span_bold');  
        }
        growth_check = 0;
        
    });

});

