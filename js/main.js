(function() {

    [].slice.call( document.querySelectorAll( '.tabs' ) ).forEach( function( el ) {
        new CBPFWTabs( el );
    });

})();
// $('.labelInput').on('click',function(){
//     console.log('clicic');
// });
$(function() {
    $('.top5').easyPieChart({
        barColor:"#FFB440",
        lineWidth:8,
        scaleColor:"#000",
        onStep: function(from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
        }
    });
    $('.top10').easyPieChart({
        lineWidth:8,
        barColor:"#71C820",
        scaleColor:"#000",
        onStep: function(from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
        }
    });
    $('.top100').easyPieChart({
        lineWidth:8,
        barColor:"#FF735A",
        scaleColor:"#000",
        onStep: function(from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
        }
    });
});
$(document).ready(function(){


    $(document).on('click','.disclose', function (event) {
        $(this).closest('li').toggleClass('mjs-nestedSortable-collapsed').toggleClass('mjs-nestedSortable-expanded');
    });

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

    $('.edit_input').on('click', function(e){
        e.preventDefault();
        var position = $(this).offset();
        $('.popup_edit.input_edit').addClass('open').css({
            "left" : position.left + (-205),
            "top" : position.top + (-105)
        });
        var input_val = $(this).parent().find('input').val();
        $('.input_text').val(input_val);
    });
    $('.submit_input_edit').on('click', function(){
        $('.popup_edit.input_edit').removeClass('open');
        var change_input_val = $('.input_text').val();
        $('.input_value').val(change_input_val);
    });
    $('.cancel').on('click', function () {
        $('.popup_edit.input_edit').removeClass('open');
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

    // $('.setting').on('click', function(event) {
    //     event.preventDefault();
    //     $('.popup_edit.project').addClass('open');
    //     $('.modal_overlay').addClass('open');
    // });


    $('.close, .exit').on('click', function () {
        $('.popup_edit.plan_work').removeClass('open');
        $('.popup_edit.rrs').removeClass('open');
        $('.popup_edit.external_promotion').removeClass('open');
        $('.modal_overlay').removeClass('open');
        $('.popup_edit.project').removeClass('open');
        $('.popup_edit.status_work_edit').removeClass('open');
        $('.popup_edit.input_edit').removeClass('open');
        $('.popup_edit.link_edit').removeClass('open');
    });
    $('.close_table').on('click', function () {
        $('.responsive_table').removeClass('open');
        $('.open_hidden_table').removeClass('active');
        $('.modal_overlay').removeClass('open');
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
            $('.link_list').append('<li><div class="number"><span>' + link_list +'</span></div><div class="link"><a class="e_link" href="#">' + link_address.val() + '</a></div><div class="date"><span>17.11.2016</span> <button class="edit_link"><img src="img/edit.svg" alt=""></button> <button class="delete"><img src="img/delete.svg" alt=""></button></div></li>');
            link_address.val('');
        }
    });


    $('body').on('click', '.delete', function() {
        $(this).parent().parent().remove();
    });

    $('body').on('click', '.edit_link',  function() {
        $(this).parent().parent().find('.e_link').attr('contenteditable', true).css({'border' : '2px solid #000', 'padding' : '5px', 'border-radius': '3px'});
    });

    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
                clearTimeout (timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();

    if($(window).width() < 1200) {


        var table_line = $('.table_line');
        $.each(table_line, function () {
            $current_table_line = $(this);
            $.each($('.head_element'), function (key) {
                var project_margin;
                var line_element = $current_table_line.find('.line_element').eq(key);
                var project_width = $(this).outerWidth();


                if (key == 0) {
                    project_margin = 50;
                } else {
                    project_margin = 0;
                }
                line_element.css('width', project_width - project_margin);
            });

        });
       var search_requests = $('.search_requests').outerWidth();
       $('.search_wrap').css('width', search_requests);
    }



    $(document).mouseup(function (e) {
        var popup = $(".popup_edit");
        var e_link = $('.e_link');

        if (!$('.popup_edit').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
            $('.popup_edit.external_promotion').removeClass('open');
            $('.modal_overlay').removeClass('open');
            $('.audit_tooltip').removeClass('open');
            $('.popup_edit.project').removeClass('open');
            $('.responsive_table').removeClass('open');
            $('.open_hidden_table').removeClass('active');
            $('.popup_edit.input_edit').removeClass('open');
        }else if(!$('.e_link').is(e.target) && !e_link.is(e.target) && e_link.has(e.target).length == 0){
            e_link.attr('contenteditable', false).css({'border' : 'none','border-bottom' : '2px dotted #b3b3b3', 'padding' : '0', 'border-radius': 'none'});
        }

        // if(!$('.select2-results__option').is(e.target) && !e_link.is(e.target) && e_link.has(e.target).length == 0){
        //     $('.modal_overlay').addClass('open');
        //     $('.popup_edit.project').addClass('open');
        // }
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
    $( ".from_date, .to_date" ).keyup(function() {
        var targetClass = $('.f_date');
        $(this).css('background', '#fff');
        targetClass.addClass('filter_span_bold');
        if ( $(this).val() == "" ) {
            $(this).css('background', '#f7f7f7');
        }
        if ( $('.from_date').val() == 'дд.мм.рррр' &&  $('.to_date').val() == 'дд.мм.рррр' ) {
            targetClass.removeClass('filter_span_bold');
        }
    });
    $( ".from_position, .to_position" ).keyup(function() {
        var targetClass = $('.position');
        $(this).css('background', '#fff');
        targetClass.addClass('filter_span_bold');
        if ( $(this).val() == "" ) {
            $(this).css('background', '#f7f7f7');
        }
        if ( $('.from_position').val() == '' &&  $('.to_position').val() == '' ) {
            targetClass.removeClass('filter_span_bold');
        }
    });
    $( ".search_input" ).keyup(function() {
        var targetClass = $('.f_search');
        $(this).css('background', '#fff');
        targetClass.addClass('filter_span_bold');
        if ( $(this).val() == "" ) {
            $(this).css('background', '#f7f7f7');
        }
        if ( $('.search_input').val() == '' ) {
            targetClass.removeClass('filter_span_bold');
        }
    });
// ===============================================================

    var inside_optimization =  $('main .filter .optimize .optimize_input');
    var inside_optimization_label = $('main .filter .optimize .optimize_inside');
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
    var inside_rrs =  $('main .filter .optimize .rrs_input');
    var inside_rrs_label = $('main .filter .optimize .rrs_inside');
    var inside_check = 0;

    $.each( inside_rrs, function( key ) {
        if ( $(this).prop("checked") == true ) {
            inside_rrs_label.addClass('filter_span_bold');
            return false;
        }
    });
    inside_rrs.change(function() {
        $.each( inside_rrs, function( key ) {
            if ( $(this).prop("checked") == true ) {
                inside_rrs_label.addClass('filter_span_bold');
                inside_check = 1;
                return false;
            }
        });
        if ( inside_check == 0 ) {
            inside_rrs_label.removeClass('filter_span_bold');
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
    $('#user').on("change", function() {
        $(this).parent().parent().find('label').addClass('filter_span_bold');
    });

    $('#user').on("select2:unselect", function() {
        $(this).parent().parent().find('label').removeClass('filter_span_bold');
    });

    $('#domain').on("change", function() {
        $(this).parent().parent().find('label').addClass('filter_span_bold');
    });

    $('#domain').on("select2:unselect", function() {
        $(this).parent().parent().find('label').removeClass('filter_span_bold');
    });

    $('.open_hidden_table').on('click', function (event) {
        event.preventDefault();
       $(this).toggleClass('active');
        $(this).parent().parent().find('.responsive_table').addClass('open');
        $('.modal_overlay').addClass('open');
    });
    var this_status;
    $('.change_status').on('click', function (event) {
        event.preventDefault();
        var position = $(this).offset();
        var width = $(this).outerWidth();
        this_status = $(this).parent().find('.change_status');
        $('.status_work_edit').addClass('open').css({
            "left" : position.left + width,
            "top" : position.top + (-55)
        });
    });
    $('.submit_status').on('click', function () {
        var select_status = $('.edit_status option:selected').text();
        var select_val = $('.edit_status option:selected').val();
        if ( select_val == 1){
            $(this_status).css('color', '#ffa31c');
        }else if ( select_val == 2){
            $(this_status).css('color', '#38a0f4');
        }else if ( select_val == 3){
            $(this_status).css('color', '#FF5252');
        }
        $(this_status).text(select_status);
        $('.popup_edit.status_work_edit').removeClass('open');
    });

    $('.update').find('img').attr( "src", "img/update.svg");
    $('.report').find('img').attr( "src", "img/report.svg");
    $('.update.wait').find('img').attr( "src", "img/sand_clock.svg");
    $('.decrease').find('img').attr( "src", "img/decrease.svg");
    $('.increase').find('img').attr( "src", "img/increase.svg");
    $('.unchanged').find('img').attr( "src", "img/unchanged.svg");

    $(document).on('click','.switch_btn', function (event) {
        event.preventDefault();
        $(this).parent().find('.switch_btn').removeClass('active');
        $(this).addClass('active');
    });
    var line_sitemap = $('.sortable').find('li').html();
    $('.add_line').on('click', function (event) {
        event.preventDefault();
        $('.sortable').append('<li class="mjs-nestedSortable-leaf">' +line_sitemap + '</li>');
        $('.sortable').nestedSortable('refresh');
    });

    $('.open_link').on('click', function () {
       $('.link_hidden').toggleClass('open');
    });

    $('#ya_check_position').on('click', function () {
        $('.region').toggleClass('open');
    });
    $('#change_user').on('click', function () {
        $('#user_select').hide();
        $('.select2').show(" slow ");
    });
    $(document).on('click','.link_btn', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
        var position = $(this).offset();
        $('.link_edit').toggleClass('open').css({
            "left" : position.left + (-305),
            "top" : position.top + (-105)
        });
    });
    $('.submit_input_edit').on('click', function(){
        $('.popup_edit.link_edit').removeClass('open');
    });
    $('.cancel').on('click', function () {
        $('.popup_edit.link_edit').removeClass('open');
    });
    $('.check_all').click(function(event) {
        if(this.checked) {
            $(':checkbox').prop('checked', true);
            $('.check').parent().parent().parent().parent().addClass('checked');
        } else {
            $(':checkbox').prop('checked', false);
            $('.check').parent().parent().parent().parent().removeClass('checked');
        }
    });
    $('.check').on('click', function () {
        if(this.checked) {
            $(this).parent().parent().parent().parent().addClass('checked');
        }
        else {
            $(this).parent().parent().parent().parent().removeClass('checked');
        }
    });

});

$(window).resize(function () {
    // if($(window).width() < 1200) {
        var table_line = $('.table_line');
        $.each(table_line, function () {
            $current_table_line = $(this);
            $.each($('.head_element'), function (key) {
                var project_margin;
                var line_element = $current_table_line.find('.line_element').eq(key);
                var project_width = $(this).outerWidth();


                if (key == 0) {
                    project_margin = 50;
                } else {
                    project_margin = 0;
                }
                line_element.css('width', project_width - project_margin);
            });

        });
        var search_requests = $('.search_requests').outerWidth();
        $('.search_wrap').css('width', search_requests);
    // }
});