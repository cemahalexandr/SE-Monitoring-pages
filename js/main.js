(function() {

    [].slice.call( document.querySelectorAll( '.tabs' ) ).forEach( function( el ) {
        new CBPFWTabs( el );
    });

})();
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


    $('.disclose').on('click', function() {
        $(this).closest('li').toggleClass('mjs-nestedSortable-collapsed').toggleClass('mjs-nestedSortable-expanded');
    });

    var work_list;
    var social_item;

    $('.open_filter').on('click', function () {
        $('.open_filter').toggleClass('open');
        $('.filter').toggleClass('open');
    });
    $('body').on('click', '.report' , function (event) {
        event.preventDefault();
        var position = $(this).offset();
        var href = $(this).data('href');
        var id = $(this).data('id');
        var type = $(this).data('type');

        $('.audit_tooltip').find('.report_link').find('a').attr('href',$('.audit_tooltip').find('.report_link').find('a').data('href')+href);
        $('.audit_tooltip').find('.report_pdf').find('a').attr('href',$('.audit_tooltip').find('.report_pdf').find('a').data('href')+href);
        $('.audit_tooltip').find('.kp_link').find('a').attr('href',$('.audit_tooltip').find('.kp_link').find('a').data('href')+href);
        $('.audit_tooltip').find('.kp_pdf').find('a').attr('href',$('.audit_tooltip').find('.kp_pdf').find('a').data('href')+href);
        $('.audit_tooltip').find('.update').data('id',id);
        $('.audit_tooltip').find('.update').data('type',(type=='project') ? 1:0);

        $('.audit_tooltip').toggleClass('open').css({
            "left" : position.left - 120,
            "top" : position.top + 40
        });
    });

    $('.filter_input').keyup(function(e){
        if(e.keyCode == 13)
        {
            $('.apply_filter_btn').trigger('click');
        }
    });

    $('body').on('click', '.edit',function(){
        var position = $(this).offset();
        var change_list = $('.check_input');
        var id = $(this).data('id');
        var type = $(this).data('type');
        $('.popup_edit.plan_work').find('.submit').data('id',id);
        $('.popup_edit.plan_work').find('.submit').data('type',type);
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

    $('body').on('click', '.edit_rrs',function(){
        var position = $(this).offset();
        var change_rrs = $('.check_rrs');
        var id = $(this).data('id');
        var type = $(this).data('type');
        $('.popup_edit.rrs').find('.submit_rrs').data('id',id);
        $('.popup_edit.rrs').find('.submit_rrs').data('type',type);
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
        var data = {};
        var change_list  = $('.check_input');
        data['id'] = $(this).data('id');
        data['type'] = $(this).data('type');
        data['keys'] = {};
        $.each( change_list, function( key ) {
            var dataCheck = $(this).data('check');
            data['keys'][$(this).attr('id')]=$( this ).prop( "checked" ) ? 1:0;
            if ( $( this ).prop( "checked" ) ) {
                work_list.eq(key).attr("data-check", 1);
            } else {
                work_list.eq(key).attr("data-check", 0);
            }
        });
        set_params(data);
        $('.popup_edit.plan_work').removeClass('open');
    });

    $('.submit_rrs').on('click', function () {
        var data = {};
        var change_rrs = $('.check_rrs');
        data['id'] = $(this).data('id');
        data['type'] = $(this).data('type');
        data['keys'] = {};
        $.each( change_rrs, function( key ) {
            var dataCheck = $(this).data('check');
            data['keys'][$(this).attr('id')]=$( this ).prop( "checked" ) ? 1:0;
            if ( $( this ).prop( "checked" ) ) {
                social_item.eq(key).attr("data-check", 1);
            } else {
                social_item.eq(key).attr("data-check", 0);
            }
        });
        set_params(data);
        $('.popup_edit.rrs').removeClass('open');
    });

    $('.model_save_modal_btn').on('click',function(){
        var data = {};
        data['id'] = $(this).data('id');
        data['type'] = $(this).data('type');
        data['no_childs'] = true;
        data['keys'] = {};
        data['keys']['user_id']= $('.select_client').val();
        data['keys']['ya_check_position']= $('#ya_check_position').prop('checked') ? 1 : 0;
        data['keys']['ya_region_code'] = ($('.select_region').val() == '' || $('.select_region').val() == null) ? '1': $('.select_region').val();
        set_params(data);
    });

    $('.model_save_modal_childs_btn').on('click',function(){
        var data = {};
        data['id'] = $(this).data('id');
        data['type'] = $(this).data('type');
        data['no_childs'] = true;
        data['keys'] = {};
        data['keys']['name'] = $('.modal_model_name').val();
        data['keys']['link'] = $('.modal_model_link').val();
        data['keys']['run'] = $('.active_run_radio').prop('checked') ? 1:0;
        $('.setting_project_child[data-id="'+data['id']+'"]').data('name',data['keys']['name']);
        $('.setting_project_child[data-id="'+data['id']+'"]').data('link',data['keys']['link']);
        $('.setting_project_child[data-id="'+data['id']+'"]').data('run',data['keys']['run']);
        $('.project_name[data-id="'+data['id']+'"]').html(data['keys']['name']);
        set_params(data);
    });

    $('.stop_project_child_btn').on('click', function(){
        var data = {};
        data['id'] = $(this).data('id');
        data['type'] = "projectChild";
        data['no_childs'] = true;
        data['keys'] = {};
        data['keys']['run'] = 0;
        set_params(data);
        alert('Группа остановлена');
    });

    $('.remove_sitemap_words_btn').on('click', function(){
        var ids = $('.check_box_monitoring:checked').map(function() {
            return $(this).data('id');
        }).get();
        if(ids.length < 1)
            return false;
        $.ajax({
            url: '/my/monitoring/delete-sitemap-words',
            type: 'post',
            data: {ids: ids},
            success: function(response){
                if(response == 'deleted'){
                    console.log(ids, Array.isArray(ids))
                    if(Array.isArray(ids) == true){
                        ids.map(function(element) {
                          $('li[data-id="'+element+'"]').remove();
                        });
                    }
                    $('li[data-id="'+ids+'"]').remove();
                    alert('Запросы успешно удалены');
                }
            }
        });
    });

    function set_params(data){
        $.ajax({
            type: 'POST',
            url: '/my/monitoring/set-additional-params',
            data: data,
            success: function(response){
                console.log(response);
            }
        });
    }

    $('body').on('change','.run_check_box',function(){
        var data = {'type': $(this).data('type'), 'id': $(this).data('id'), 'keys':{'run':$(this).prop('checked') ? 1:0 }};
        set_params(data);
    });

    $('.setting_project').on('click', function(event) {
        event.preventDefault();
        $('.select_region').select2();
        $('#user_fio').html($(this).data('user_fio'));
        $('.select_client').val($(this).data('user_id'));
        $('.modal_model_name').val($(this).data('name'));
        $('.modal_model_country').val($(this).data('country_iso'));
        $('#ya_check_position').prop('checked',($(this).data('ya_check') == '1') ? true : false );
        $('.select_region').val($(this).data('ya_region'));
        $('.create_date').html($(this).data('start_date'));
        $('.model_save_modal_btn').data('id',$(this).data('id'));
        $('.model_save_modal_btn').data('type',$(this).data('type'));
        if($(this).data('run') == '1'){
            $('.active_run_radio').trigger('click');
        }else{
            $('.deactive_run_radio').trigger('click');
        }
        if($(this).data('ya_check') == '1'){
            $('.region').toggleClass('open');
        }
    });

    $('#elementId').keyup(function(e) {
        if(e.keyCode == 13){
          //do something
        }
    });


    $('body').on('click','.setting_project_child', function(event) {
        event.preventDefault();

        $('#user_fio').html($(this).data('user_fio'));
        $('.modal_model_name').val($(this).data('name'));
        $('.modal_model_country').val($(this).data('country_iso'));
        $('.modal_model_domain').val($(this).data('domain'));
        $('.modal_model_link').val($(this).data('link'));
        $('.create_date').html($(this).data('start_date'));

        $('.model_save_modal_childs_btn').data('id',$(this).data('id'));
        $('.model_save_modal_childs_btn').data('type',$(this).data('type'));
        if($(this).data('run') == '1'){
            $('.active_run_radio').trigger('click');
        }else{
            $('.deactive_run_radio').trigger('click');
        }
    });


    $('.close, .exit').on('click', function () {
        $('.popup_edit.plan_work').removeClass('open');
        $('.popup_edit.rrs').removeClass('open');
        $('.popup_edit.external_promotion').removeClass('open');
        $('.modal_overlay').removeClass('open');
        $('.popup_edit.project').removeClass('open');
        $('.popup_edit.status_work_edit').removeClass('open');
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
    $('body').on('click', '.edit_external_promotion', function (event) {
        event.preventDefault();
        $('.add_link').data('id',$(this).data('id'));
        $('.add_link').data('type',$(this).data('type'));
        $('.external_promotion_name').html($(this).data('name'));
        $('.external_links_count').html($(this).data('external_links_count'));

        $.ajax({
            type: 'POST',
            url: '/my/monitoring/get-external-links',
            data: {id:$(this).data('id'),type:$(this).data('type')},
            success: function(response){
                var links = $.parseJSON(response);
                console.log(links);
                $('.link_list').html('');
                $.each(links, function (index,link) {
                    $('.link_list').append('<li><div class="number"><span>' + (index+1) +'</span></div><div class="link"><a data-id="'+link.id+'" class="e_link update_link_field" href="#">' + link.link + '</a></div><div class="date"><span>'+link.created_at.substring(0,10)+'</span> <button class="edit_link"><img src="/my/img/monitoring/edit.svg" data-id="'+link.id+'" alt=""></button> <button class="delete delete_external_links" data-id="'+link.id+'"><img src="/my/img/monitoring/delete.svg" alt=""></button></div></li>');
                });

                $('.popup_edit.external_promotion').addClass('open');
                $('.modal_overlay').addClass('open');
            }
        });
    });

    $('body').on('click','.delete_external_links', function(){
        $.ajax({
            type: 'POST',
            url: '/my/monitoring/delete-external-link',
            data: {id:$(this).data('id')},
            success: function(response){
                $(this).closest('li').remove();
            }
        });
    });

    $('body').on('keyup','.update_link_field', function(){
        $.ajax({
            type: 'POST',
            url: '/my/monitoring/update-external-link',
            data: {id:$(this).data('id'), link:$(this).html()},
            success: function(response){
                console.log(response);
            }
        });
    });

    $('.add_link').on('click', function (event) {
        event.preventDefault();
        var link_address = $('.link_address');
        var link_list = $('.link_list li').length + 1;
        var data = {};
        data['id'] = $(this).data('id');
        data['type'] = $(this).data('type');
        data['link'] = link_address.val();
        if ( link_address.val() == '' ) {
            return false;
        } else {
            $.ajax({
                type: 'POST',
                url: '/my/monitoring/add-external-link',
                data: data,
                success: function(response){
                    var result =  JSON.parse(response);
                    $('.link_list').append('<li data-id="'+result.id+'"><div class="number"><span>' + link_list +'</span></div><div class="link"><a class="e_link" href="#">' + link_address.val() + '</a></div><div class="date"><span>'+result.date+'</span> <button class="edit_link"><img src="/my/img/monitoring/edit.svg" alt=""></button> <button class="delete delete_external_links" data-id="'+result.id+'"><img src="/my/img/monitoring/delete.svg" alt=""></button></div></li>');
                    link_address.val('');
                }
            });
        }
    });

    $('.apply_filter_btn').on('click',function(){
        var data = getFilterData();
        var filter_url = '';
        if(data['words_name'] != '' || data['from_date'] != '' || data['to_date'] != '' || data['position_from'] != '' || data['position_to'] != '' || (data['ppc_youtube'] + data['ppc_google_ad'] + data['ppc_yandex_direct'] + data['ppc_facebook'] + data['ppc_instagram']) > 0){
            console.log('TEST');
            $.redirect("/my/monitoring/search-words",data);
            return false;
        }else{
            if(window.location.href.indexOf("edit") > -1) {
                filter_url = '/my/monitoring/search-project-childs';
                data['id'] = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
            }else{
                filter_url = '/my/monitoring/search-projects';

            }
        }
        $.ajax({
            type: 'POST',
            url: filter_url,
            data: data,
            success: function(response){
                $('.result_table_list').html(response);
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
                    maxLevels: 1,
                    isTree: false,
                    expandOnHover: 700,
                    startCollapsed: true
                });
            }
        });
        console.log(data);
    });

    function getFilterData(){
        var data = {};
        data['words_name'] = $('.search_words_filter').val();
        data['user_id'] = $('.user_filter').val();
        data['domain_id'] = $('.domain_filter').val();
        data['from_date'] = $('.from_date_filter').val();
        data['to_date'] = $('.to_date_filter').val();
        if(($('.enabled_check_box_filter').prop('checked') || $('.disabled_check_box_filter').prop('checked')) && !($('.enabled_check_box_filter').prop('checked') && $('.disabled_check_box_filter').prop('checked'))){
            data['run'] = $('.enabled_check_box_filter').prop('checked') ? 1:0;
        }
        data['activity_growth'] = [];
        if($('.increase_growth_filter').prop('checked'))
            data['activity_growth'].push(1);
        if($('.static_growth_filter').prop('checked'))
            data['activity_growth'].push(0);
        if($('.decrease_growth_filter').prop('checked'))
            data['activity_growth'].push(-1);

        data['duration_from'] = $('.duration_from_filter').val();
        data['duration_to'] = $('.duration_to_filter').val();
        data['external_links_from'] = $('.external_links_from_filter').val();
        data['external_links_to'] = $('.external_links_to_filter').val();
        data['position_from'] = $('.position_from_filter').val();
        data['position_to'] = $('.position_to_filter').val();

        data['ppc_youtube'] = $('.rrs_youtube_filter').prop('checked') ? 1:'';
        data['ppc_google_ad'] = $('.rrs_google_filter').prop('checked') ? 1:'';
        data['ppc_yandex_direct'] = $('.rrs_yandex_filter').prop('checked') ? 1:'';
        data['ppc_facebook'] = $('.rss_facebook_filter').prop('checked') ? 1:'';
        data['ppc_instagram'] = $('.rrs_instagram_filter').prop('checked') ? 1:'';

        data['seo_relink'] = $('.optimize_relink_filter').prop('checked') ? 1:'';
        data['seo_add_words'] = $('.optimize_requests_filter').prop('checked') ? 1:'';
        data['seo_add_key'] = $('.optimize_key_filter').prop('checked') ? 1:'';
        data['seo_add_audit'] = $('.optimize_audit_filter').prop('checked') ? 1:'';

        return data;
    }




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
    $('.mainnav-toggle').on('click',   function() {
        setTimeout(function(){
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
        }, 370);
    });


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

    $('.update').find('img').attr( "src", "/my/img/monitoring/update.svg");
    $('.report').find('img').attr( "src", "/my/img/monitoring/report.svg");
    $('.update.wait').find('img').attr( "src", "/my/img/monitoring/sand_clock.svg");
    $('.decrease').find('img').attr( "src", "/my/img/monitoring/decrease.svg");
    $('.increase').find('img').attr( "src", "/my/img/monitoring/increase.svg");
    $('.unchanged').find('img').attr( "src", "/my/img/monitoring/unchanged.svg");

    $('.switch_btn').on('click', function () {
        $('.switch_btn').removeClass('active');
        $(this).addClass('active');
    });
    var line_sitemap = $('.sortable').find('li').html();
    $('.add_line').on('click', function (event) {
        event.preventDefault();
        $('.sortable').append('<li>' +line_sitemap + '</li>');

    })
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

$('.reupdate_report_btn').on('click', function(){
    setReportTask($(this).data('id'),$(this).data('type'));
});

function setReportTask(project_id, type){
    if(type == '1' && prompt('', 'Введите код') != '0975821201v')
        return false;
    var data = {};
    data['type'] = type;
    if(type == 0){
        data['project_child_id'] = project_id;
    }else{
        data['project_id'] = project_id;
    }
    $.ajax({
        type: 'GET',
        url: '/my/sitemaps/set-cron-report-task',
        data: data,
        success: function(result){
            var answer = JSON.parse(result);
            if (answer.status == 'error'){
                showAlert('danger', 'Ошибка создания отчета', answer.error_text);
                return false;
            }else if (answer.status == 'ok'){
                showAlert('success', 'Успех', 'Задача на генерацию отчета успешно создана');
                $('#update_report_btn_'+project_id).addClass('rotated');
                return false;
            }
        }
    });
}

function deleteMonitoring(){
    if(prompt('Подтвердите удаление: введите ', '13') != '0975821201v')
        return false;
    var ids = $('.check_box_monitoring:checked').map(function() {
        return $(this).data('id');
    }).get();
    if(ids.length < 1)
        return false;
    $.ajax({
        url: '/my/sitemaps/delete-projects',
        type: 'get',
        data: {id: ids},
        success: function(response){
            console.log(ids, Array.isArray(ids))
            if(response > 0){
                if(Array.isArray(ids) == true){
                    ids.map(function(element) {
                      $('li[data-id="'+element+'"]').remove();
                    });
                }
                $('li[data-id="'+ids+'"]').remove();
                alert( $('.panel-body').data('description')+' успешно удален');
            }
        }
    });
}

function deleteChilds(){
    if(prompt('Подтвердите удаление: введите ', '13') != '2468369')
        return false;
    var ids = $('.check_box_monitoring:checked').map(function() {
        return $(this).data('id');
    }).get();
    if(ids.length < 1)
        return false;
    $.ajax({
        url: '/my/sitemaps/delete-child-groups',
        type: 'post',
        data: {ids: ids},
        success: function(response){
            if(response == 'deleted'){
                console.log(ids, Array.isArray(ids))
                if(Array.isArray(ids) == true){
                    ids.map(function(element) {
                      $('li[data-id="'+element+'"]').remove();
                    });
                }
                $('li[data-id="'+ids+'"]').remove();
                alert('Группы успешно удален(ы)');
            }
        }
    });
}
