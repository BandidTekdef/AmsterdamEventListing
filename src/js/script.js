$(function () {

    var idx = 1;

    function timePickerPopOver() {
        var datePickerPopup = $('.popover-content').children();
        var options = {
            content: function () {               
                return datePickerPopup;
            },
            html: true,
            placement: 'right',
            trigger: 'click',
        };        
        $('.time-picker').popover(options);


        $('body').on('click', function (e) {
				
            //Use each to hide Popovers with the same class
             $('.time-picker').each(function(index, elm) {
                hidePopover(elm, e);
            }); 
        });
    
         // hide any open popovers when anywhere else in the body is clicked
        var hidePopover = function(element, e){
          if (!$('.time-picker').is(e.target) && $('.time-picker').has(e.target).length === 0 && $('.popover').has(e.target).length === 0){
            $('.time-picker').popover('hide');
          }
        }
    }

    
    function setTimePicker() {

        var updateTime = function () {
            var h1 = $('.start-date').find('.hours-option').val();
            var m1 = $('.start-date').find('.min-option').val();
            var p1 = $('.start-date').find('.period-option').val();
            var h2 = $('.end-date').find('.hours-option').val();
            var m2 = $('.end-date').find('.min-option').val();
            var p2 = $('.end-date').find('.period-option').val();
            
            var format = '[hours1]:[minutes1] [period1] - [hours2]:[minutes2] [period2]';
            var text = format.replace('[hours1]', h1).replace('[minutes1]', m1).replace('[period1]', p1).replace('[hours2]', h2).replace('[minutes2]', m2).replace('[period2]', p2);

            $('#event-time').val(text);
        };

        
        var updateTime2 = function (el) {
            var parent = $(el).parents('.event-start');
            var h = $(parent).find('.hours-option').val();
            var m = $(parent).find('.min-option').val();
            var p = $(parent).find('.period-option').val();
            
            var format = '[hours]:[minutes] [period]';
            var text = format.replace('[hours]', h).replace('[minutes]', m).replace('[period]', p);
            
            $(parent).find('input').val(text);
        };

        $('.start-date').find('.hours-option, .min-option, .period-option').change(function () {
            updateTime();
        });
        $('.end-date').find('.hours-option, .min-option, .period-option').change(function () {
            updateTime();
        });

        $('#late-night-date').find('.hours-option, .min-option, .period-option').change(function () {
            updateTime2(this);
        });

        $('#event-notify-date').find('.hours-option, .min-option, .period-option').change(function () {
            updateTime2(this);
        });
    }


    function getValueFromToggle() {

        $('.late-night-toggle').click(function () { 
            if ($(this).prop("checked") === true) {
                $('.late-night-btn').removeClass('active');
                $('.scan-app-username').hide();
                $('.scan-app-password').hide();
                $('.scan-app-email').hide();
                $('.event-start').hide();  
                $('input[name="scan-app-username"]').val("");
                $('input[name="scan-app-password"]').val("");
                $('input[name="scan-app-email"]').val("");
            }

            else {
                $('.notify-btn').removeClass('active');
                $('.scan-app-username').hide();
                $('.scan-app-password').hide();
                $('.scan-app-email').hide();
                $('.event-start').hide();  
                $('input[name="late-night-username"]').val("");
                $('input[name="late-night-password"]').val("");
                $('input[name="late-night-email"]').val("");
            }
        });

        $('#scan-only').click(function () {
            $('.late-night-btn').removeClass('active');
            $(this).addClass('active');
            $('.scan-app-username').show();
            $('.scan-app-password').show();
            $('.scan-app-email').hide();
            $('.event-start').hide();  
            $('input[name="late-night-email"]').val("");    
            $('input[name="late-night-start-date"]').val("");
        });

        $('#scan-guest').click(function () {
            $('.late-night-btn').removeClass('active');
            $(this).addClass('active');
            $('.scan-app-username').show();
            $('.scan-app-password').show();
            $('.scan-app-email').show();
            $('.event-start').show();  
            $('#late-night-date').find('.hours-option option[value="09"]').prop('selected', true);
            $('#late-night-date').find('.min-option option[value="00"]').prop('selected', true);
            $('#late-night-date').find('.period-option option[value="PM"]').prop('selected', true);
            $('#late-night-date').find('.scan-form').val("09:00 PM");
        });

        $('#notify-scan-only').click(function () {
            $('.notify-btn').removeClass('active');
            $(this).addClass('active');
            $('.scan-app-username').show();
            $('.scan-app-password').show();
            $('.scan-app-email').hide();
            $('.event-start').hide();  
            $('input[name="notify-email"]').val("");
            $('input[name="notify-start-date"]').val("");
            $('#notificationCollapse').find('select').val("");
        });

        $('#notify-guest-only').click(function () {
            $('.notify-btn').removeClass('active');
            $(this).addClass('active');
            $('.scan-app-username').hide();
            $('.scan-app-password').hide();
            $('.scan-app-email').show();
            $('.event-start').show();  
            $('input[name="notify-username"]').val("");
            $('input[name="notify-password"]').val("");
            $('#event-notify-date').find('.hours-option option[value="09"]').prop('selected', true);
            $('#event-notify-date').find('.min-option option[value="00"]').prop('selected', true);
            $('#event-notify-date').find('.period-option option[value="PM"]').prop('selected', true);
            $('#event-notify-date').find('.scan-form').val("09:00 PM");
        });

        $('#notify-guestlist').click(function () {
            $('.notify-btn').removeClass('active');
            $(this).addClass('active');
            $('.scan-app-username').show();
            $('.scan-app-password').show();
            $('.scan-app-email').show();
            $('.event-start').show();  
            $('#event-notify-date').find('.hours-option option[value="09"]').prop('selected', true);
            $('#event-notify-date').find('.min-option option[value="00"]').prop('selected', true);
            $('#event-notify-date').find('.period-option option[value="PM"]').prop('selected', true);
            $('#event-notify-date').find('.scan-form').val("09:00 PM");
        });
    }


    function onSubmit() {

        $('#submitButton').click(function () {
            getValueOnSubmit();
        });

        var getValueOnSubmit = function () {
            var getVal;
            $('.recur-event').each(function () {
                var parent = $(this).parents('#eventdate');
                var isActive = $(this).hasClass('active');
                var isManual = $(this).hasClass('manual-date');
            
                if (isActive && !isManual) {                    
                    getVal = $(this).val();    
                    $(parent).find('input[name="event-date-value"]').val(getVal);
                }    
                else if (isActive && isManual) {      
                    getVal = $(this).find('.datetimepicker-input').val();
                    $(parent).find('input[name="event-date-value"]').val(getVal);
                }
                
            });

            var Arr = [];

            $('.music-genre').each(function () {
                var parent = $(this).parents('#event-music-genre');
                var isActive = $(this).hasClass('active');
                var isOthers = $(this).hasClass('others');

                if (isActive && !isOthers) {                    
                    getVal = $(this).val(); 
                    Arr.push(getVal);
                    $(parent).find('.input-result').val(Arr);
                   
                } 
                else if (isActive && isOthers) {                        
                    getVal = $(parent).find('.other-fields').val();
                    Arr.push(getVal);
                    $(parent).find('.input-result').val(Arr);
                }
            });


            $('.dress-code').each(function () {
                var parent = $(this).parents('#event-dress-code');
                var isActive = $(this).hasClass('active');
                var isOthers = $(this).hasClass('others');

                if (isActive && !isOthers) {                    
                    getVal = $(this).val();    
                    $(parent).find('.input-result').val(getVal);
                } 
                else if (isActive && isOthers) {                        
                    getVal = $(parent).find('.other-fields').val();
                    $(parent).find('.input-result').val(getVal);
                }
                
            });


            $('.age').each(function (index, el) {                
                var parent = $(this).parents('#event-age-restriction');
                var isActive = $(this).hasClass('active');
                var isOthers = $(this).hasClass('others');

                if (isActive && !isOthers) {                    
                    getVal = $(this).val();    
                    $(parent).find('.input-result').val(getVal);
                } 
                else if (isActive && isOthers) {                        
                    getVal = $(parent).find('.other-fields').val();
                    $(parent).find('.input-result').val(getVal);
                }
            });

            $('.guests-amount').each(function (index, el) {                
                var parent = $(this).parents('#event-amount-guests');
                var isActive = $(this).hasClass('active');
                var isOthers = $(this).hasClass('others');

                if (isActive && !isOthers) {                    
                    getVal = $(this).val();    
                    $(parent).find('.input-result').val(getVal);
                } 
                else if (isActive && isOthers) {                        
                    getVal = $(parent).find('.guest-other-amount').val();
                    $(parent).find('.input-result').val(getVal);
                }
            });

            


        }
    }

    function validateForm() {      
        // ('.input-group.date').datepicker({format: "dd.mm.yyyy"});
        $(".needs-validation").on("submit", function (e) {
            var hasError = false; 
            var hasValue = false;
            var checkInputFile = false;
            var checkLogoFile = true;
   
            $(".form-control.event-form").each(function () {
                var parent = $(this).parent();
                var $this = $(this);
                var fieldvalue = $this.val();

                if (!fieldvalue) {
                    e.preventDefault();   
                    hasError = true;
                    $this.addClass("is-invalid");
                    $($this).focusout(function () {
                        $(this).addClass('desired');
                    });                           
                }
                if ($this.val() != "") {
                    $this.removeClass("is-invalid");
                    $(parent).removeClass('inputError');
                    
                } else {
                    $(parent).addClass('inputError');
                    return true;
                }

            }); 

            $(".form-control.required").each(function () {
                var parent = $(this).parents('section');
                var $this = $(this);
                var fieldvalue = $this.val();

                if (!fieldvalue) {
                    hasError = true;
                    $this.addClass("is-invalid");
                    e.preventDefault();
                 
                }
                if ($this.val() != "") {
                    $this.removeClass("is-invalid");
                    $(parent).removeClass('inputError');
                    $(parent).find('.required-star').css('color', 'black');
                    $(parent).find('.sub-title-name').css('color', 'black');
                    
                } else {
                    $(parent).addClass('inputError');
                    $(parent).find('.required-star').css('color', 'red');
                    $(parent).find('.sub-title-name').css('color', 'red');
                    return true;
                }

            });

            $(".scan-form").each(function (e) {             
                var $this = $(this);
                var fieldvalue = $this.val();

                if(fieldvalue !== "") {                   
                    hasValue = true;
                }
            });


            $(".upload-template").each(function(e) {             
                var $this = $(this);
                var isAttached = $($this).hasClass('attached');
                if(isAttached) {                   
                    checkInputFile = true;
                }

            });

            $(".logo-upload-btn").each(function () {
                var $this = $(this);
                var isAttached = $($this).find('input').hasClass('logo-attached');
                if(!isAttached) {                   
                    checkLogoFile = false;
                }
            });


            if (!checkLogoFile) {
                $('.logo-upload-title').css('color', 'red');
            }
            else {
                $('.logo-upload-title').css('color', 'black');
            }

            if (!checkInputFile) {
                $('.upload-title').css('color', 'red');
                e.preventDefault();
            }
            else {
                $('.upload-title').css('color', 'black');
            }

            if (!hasValue) {
                $('.error-message').show();
                e.preventDefault();
            }
            else {
                $('.error-message').hide();
            }

            if (hasError) {
                $('.check-required').show();
            }
            else {
                $('.check-required').hide();
            }
        });
    }

    function checkInput() {

        const inputForm = document.getElementsByClassName('form-control');
        const signUpForm = document.getElementById('signUpForm');
        const emailField = document.getElementById('emailField');
        const okButton = document.getElementById('okButton');
        
        inputForm.addEventListener('keyup', function (event) {
            var isValid = inputForm.checkValidity();
            
        var validations = Array.prototype.filter.call(inputForm, function(input) {
          input.addEventListener('keyup', function(event) {
              if (input.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }           
                input.classList.add('hello');
               // input.querySelector('.required-label').classList.add('active');
          }, false);
        })
        
        if ( isValidEmail ) {
            okButton.disabled = false;
        } else {
            okButton.disabled = true;
        }
        });
        
        okButton.addEventListener('click', function (event) {
        signUpForm.submit();
        });
    }

    function optionList() { 
        var $hour = $('.hours-option');
        var $min = $('.min-option');
        for (let i = 1; i <= 12; i++){          
            if (i < 10) {
                $hour.append($('<option></option>').val('0'+ i).html('0'+ i))
            }
            else {
                $hour.append($('<option></option>').val(i).html(i))
            }
        }

        for (let i = 1; i <= 59; i++){          
            if (i < 10) {
                $min.append($('<option></option>').val('0'+ i).html('0'+ i))
            }
            else {
                $min.append($('<option></option>').val(i).html(i))
            }
        }
    }

    function bindButtonClick () {

        var btnToggle = function (el) {          
            var parent = $(el).parents('section');
            var isActive = $(el).hasClass('active');
            var isManualDate = $(el).hasClass('manual-date');
            var isDisabled = $(parent).find('.event-dress-code').hasClass('disabled');      
            var isMusicGenre = $(el).hasClass('music-genre');
            var isOthers = $(el).hasClass('others');
               
            if (isManualDate) { 
                $(parent).find('.btn-date').removeClass('active');
                $('.confirm').click(function(){
                    $(el).addClass('active');
                });
                
                $('.clear').click(function(){
                    $(el).removeClass('active');
                });
            }

            if (isMusicGenre && !isManualDate) {

                if (!isActive) {
                    $(el).addClass('active');
                }
                else {
                    $(el).removeClass('active');
                }

                if (isOthers) {
                    $(parent).find('.other-fields').show();
                    if (isActive) {
                        $(el).removeClass('active');
                        $(parent).find('.other-fields').hide();
                    }
                }
            }
            else if (!isManualDate && !isMusicGenre) {
                $(parent).find('.btn-date').removeClass('active');

                if (!isActive) {
                    $(el).addClass('active');
                    if (isOthers) {
                        $(parent).find('.other-fields').show();
                    }
                    else {
                        $(parent).find('.other-fields').hide();
                    }    
    
                }
                else {
                    $(parent).find('.other-fields').hide();
                }
            }
        }
        
        $('[name="recur-event"], [name="music-genre"], [name="dress-code"], [name="age"], [name="amount"], [name="late-night"], [name="notification"]').on("click" , function (e) {
            btnToggle(this);
        });
    };


    function uploadImage() {
        if (window.File && window.FileList && window.FileReader) {

            $(".close").click(function(){
                var ImgParent = $(this).parents('.upload-btn');
                var idx = $(ImgParent).find('input').attr('data-upload-index');
                var preview = $('.last-preview').find('img[data-index="' + idx + '"]');
                preview.remove();
                ImgParent.find('.image-preview').attr('src', './asset/icon/upload_default.png');
                ImgParent.find('input').val('');
                ImgParent.find('.added').hide();
                ImgParent.find('.order-number').show();
                ImgParent.find('.upload-template').removeClass('attached');
                $(this).hide();

                if ($('.template-display').length === 1) {
                    $('.template-display').css('width', 100 + '%');
                    $('.template-display').css('height', 100 + '%');
                }
                else {
                    $('.template-display').css('width', 49.99 + '%');
                    $('.template-display').css('height', 49.99 + '%');
                }
            });
           
            $('.upload-template').change(function (e) { 
                var $this = $(this);
                var files = e.target.files,
                    filesLength = files.length;
                var index = $(this).attr('data-upload-index');
                var filterType = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/+ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                
                for (var i = 0; i < filesLength; i++) { 
                    var f = files[i];
                    var fileReaders = new FileReader();
                    var parent = $($this).parent();
 
                    //check and retuns the length of uploded file.
                    if (e.target.files.length === 0) {
                        return;
                      }
                    //Is Used for validate a valid file.
                    if (!filterType.test(e.target.files[i].type)) {
                        alert('Please select a valid image.');
                        return;
                    }

                    $(parent).find('.order-number').hide();
                    $(parent).find('.close').show();
                    $(parent).find('.added').show();
                    
                    fileReaders.onload = function (e) {
                        var file = e.target;
                        
                        $(parent).find('.image-preview').attr('src', e.target.result);
                        $(parent).find('.file-input').addClass('attached');
                        
                        var getImg = $('.last-preview').find('img').length + 1;
                        $('.last-preview').attr('class', 'last-preview img-' + getImg);
                        var preview = $('<img class="image-preview template-display show-' + index + '" src="' + e.target.result + '" data-index="' + index + '" >');
                      
                        $('.last-preview').find('span.img-pre' + index).html(preview);
                        if ($('.template-display').length === 1) {
                            $('.template-display').css('width', 100 + '%');
                            $('.template-display').css('height', 100 + '%');
                        }
                        else {
                            $('.template-display').css('width', 49.99 + '%');
                            $('.template-display').css('height', 49.99 + '%');
                        }
                    }
                   
                    fileReaders.readAsDataURL(f);
                }
            });
          
        }
    }


    function calendarPicker() {
        $('#event-date').datepicker({
            autoclose: false,
            clearBtn: false,
            forceParse: false,
            todayHighlight: true,
            orientation: "right",
            confirmBtn: false,
        });
        
        $('#datepicker2').datepicker({
            autoclose: false,
            clearBtn: false,
            forceParse: false,
            todayHighlight: true,
            orientation: "right",
            confirmBtn: false,
            multidate: true
        });
        
    }
  
    function isLateNightToggle() {
        $('.toggle.late-night').click(function(e) {
            if ($(this).hasClass('collapsed')) {
                $('.notify-container').show();
            }
            else {
                $('.notify-container').hide();          
            }
        });
    }

    function teicketTemplateToggle() {
        $('.toggle.template-active').click(function () {
            var parent = $(this).parents();     
            $(parent).find('#previewShow').show();
            if (!$(this).hasClass('collapsed')) {
                $(parent).find('#previewShow').hide();
            }
        });
    }

    function cropImage() {
        var event_Image = $('#main-cropper').croppie({
            enableExif: true,
            viewport: { width: 100 + '%', height: 100 + '%' },
            boundary: { width: 100 + '%', height: 100 + '%' },
            showZoomer: false
        });

        var logo_Image = $('#sub-cropper').croppie({
            enableExif: true,
            viewport: { width: 100, height: 55 },
            boundary: { width: 100, height: 55 },
            enableOrientation: true,
            showZoomer: false,
            
        });

        var readFile = function (input) {
          if (input.files && input.files[0]) {
              var reader = new FileReader();
              var filterType = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/+ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
            
              reader.onload = function (e) {
                //call function
                  if ($(input).hasClass('logo-input')) {
                      $('#sub-cropper').croppie('bind', {                     
                          url: e.target.result
                      });       
                  }                  
                  else {                    
                      $('#main-cropper').croppie('bind', {                          
                          url: e.target.result                                   
                      });                   
                  }
                  $('.template-logo').hide();
                  $(input).addClass('logo-attached');
                  $(input).parent().find('.insert-complete').show();

                    //check and retuns the length of uploded file.
                    if (input.files.length === 0) {
                        return;
                      }
                    //Is Used for validate a valid file.
                    if (!filterType.test(input.files[0].type)) {
                        alert('Please select a valid image.');
                        return;
                    }
            }
        
            reader.readAsDataURL(input.files[0]);
          }
        }

        /* Send crop to preview modal */
        $('#submitButton').on('click', function (ev) {
            event_Image.croppie('result', {
                type: 'canvas',
                size: 'original',
                quality: 1 
            }).then(function (resp) {
                $('#eventCoverImg').val(resp);
            });

            logo_Image.croppie('result', {
                type: 'canvas',
                size: {width: 100, height: 75},
                quality: 1 
            }).then(function (resp) {
                $('#eventLogoImg').val(resp);
            });
        });


        
        $('.template-input, .logo-input').on('change', function () {
            readFile(this);
        });
    }

    function toolTips() {
        var popup;
        var init = function () {
            bindElements();
            createElement();
        }

        var bindElements = function () {
            const ctx = this;
            var allPopups = $('span[data-tooltip-content]');
            allPopups.hover(function (e) {
                displayPopup(this);
            }, function () {
                hidePopup(this);
            });
            allPopups.click(function (e) {
                displayPopup(this);
            });
        }
    
       var createElement = function () {
            popup = document.createElement("div");
            popup.classList.add('tooltiptext');
            document.body.appendChild(popup);
        }
    
        var displayPopup = function (element) {
            var text = $(element).data('tooltip-content');
            var x = window.matchMedia("(max-width: 640px)");
            popup.innerText = text;
            $(popup).addClass("active");
            $(popup).css('visibility', 'visible');
            var pos = $(element).offset();
            $(popup).css('top', pos.top + 20);
            var w = parseInt($('.tooltiptext').css('width'));
    
            if (x.matches) {             
                $(popup).css('left', pos.left - w);           
                if ((pos.left-185) < 0) {
                    $(popup).css('left', 0);
                }
            }
    
            else {
              $(popup).css('left', pos.left + 30);
            }
        }
    
        var hidePopup = function (element) {
    
            if ($(popup).hasClass('active')) {
                $(popup).removeClass('active');
                $(popup).css("visibility", "hidden");
            }   
        }

        init();
    }

    function onKeyupOtherField() {
        $('#text-dress-code').on('keypress change', function(event) {
            var $body = $(tinymce.get('tiny-field'+ idx).getBody());
            var input = $("#text-dress-code").val();
            var tags = $body.find('.dress-code-tags');
            $(tags[tags.length - 1]).text(input);
        });

    }

    function onToggleButton() {
        $('.guestlist-toggle').change(function () {
            if($(this).prop("checked") == true){
                $('.template-off').show();
                $('.template-on').hide();
            }
            else {
                $('.template-on').show();
                $('.template-off').hide();
            }
        });

        $('.restrict-toggle').change(function () {
            if(idx === 1) {
                if ($(this).prop("checked") == true) {
                    var templateB = '<div class="tiny-content2">' +
                        '<div>Please note, this event has a strict dress code:</div>' +
                        '<div class="text-auto"></div>'+
                        '<div class="tiny-footer">Make sure that you strict to the dress code because this club has the right to refuse admittance/entrance if you don\'t.</p>' +
                        '<hr>' +
                        '<p></p>'+
                        '</div>';

                    var activeEditor = tinyMCE.get('tiny-field'+ idx);
                        if (activeEditor!==null){
                            activeEditor.setContent(templateB);
                        }               
                }
                else {
                    var templateA = '<div class="tiny-content1">' +
                                    '<div class="text-auto"></div>'+
                                    '<p class="tiny-header">Sunrise is the new feel-good club evening in Paradiso.</p>' + 
                                    '<p>After a long week, you can shake off all your worries on the best tropical sounds that the Sunrise DJ crew have on offer.</p>' +
                                    '<p>The Afro, Latin, Dancehall, Pop hits alternate nicely, with a wonderful touch of feel-good Urban'+
                                        'so that you can dance full steam into the weekend full of positive energy.</p>' +
                                    '<p class="tiny-footer">The motto is: Get yourself on the dance floor & have a good time!</p>'+
                        '</div>';
                    
                        var activeEditor = tinyMCE.get('tiny-field'+ idx);
                        if(activeEditor!==null){
                            activeEditor.setContent(templateA);
                        }
            
                }
            }
        });



        $(".btn-date.dress-code").click(function (element) {
            var getResult = '';
            var isActive = $(this).hasClass('active');
            var $body = $(tinymce.get('tiny-field'+ idx).getBody());
            getResult = $(this).val();
            if (isActive) {
                $body.find('.text-auto').append($('<span class="dress-code-tags">' + getResult + '</span> <span class="right-bordered">|</span>'));
            }

        });         
    }

    function WellComeShotToggle() { 
    
        $('.free-shot-toggle').click(function () { 
            if ($(this).prop("checked") === true) {
                $('.wellcome-shot').show();
            }

            else {
                $('.wellcome-shot').hide();
            }
        });
    }

    function textfieldEditor() {
        var templateA = '<div class="tiny-content1">' +
                        '<div class="text-auto"></div>'+
                        '<p class="tiny-header">Sunrise is the new feel-good club evening in Paradiso.</p>' + 
                        '<p>After a long week, you can shake off all your worries on the best tropical sounds that the Sunrise DJ crew have on offer.</p>' +
                        '<p>The Afro, Latin, Dancehall, Pop hits alternate nicely, with a wonderful touch of feel-good Urban'+
                            'so that you can dance full steam into the weekend full of positive energy.</p>' +
                        '<p class="tiny-footer">The motto is: Get yourself on the dance floor & have a good time!</p>'+
                        '</div>';
                        
        
        var templateC = '<div class="text-auto"></div>';

        tinymce.init({
            selector: '#tiny-field1',
            height: 250,
            menubar: false,
            mobile: {
              menubar: true
            },
            force_br_newlines : false,
            force_p_newlines : false,
            forced_root_block : '',
            content_css : 'css/tinyMCEstyle.css',
            toolbar: 'undo redo | formatselect | ' +
            ' bold italic backcolor | alignleft aligncenter ' +
            ' alignright alignjustify | bullist numlist outdent indent |' +
                ' removeformat | help',
                 setup: function (editor) {
                    editor.on('init', function () {
                        editor.setContent(templateA);
                    });
                    editor.on('change', function () {
                        tinymce.triggerSave();
                    });
                }
        });

        tinymce.init({
            selector: '#tiny-field2, #tiny-field3, #tiny-field4, #tiny-field5, #tiny-field6',
            height: 250,
            menubar: false,
            mobile: {
              menubar: true
            },
            force_br_newlines : false,
            force_p_newlines : false,
            forced_root_block : '',
            content_css : 'css/tinyMCEstyle.css',
            toolbar: 'undo redo | formatselect | ' +
            ' bold italic backcolor | alignleft aligncenter ' +
            ' alignright alignjustify | bullist numlist outdent indent |' +
                ' removeformat | help',
                 setup: function (editor) {
                    editor.on('init', function(e) {
                        e.target.hide();
                        editor.setContent(templateC);
                    });
                    editor.on('change', function () {
                        tinymce.triggerSave();
                    });
                }
        });

        $('.submit-text').click(function (e) {
            e.preventDefault();      
            var msg = '';
            var activeEditor = tinyMCE.get('tiny-field'+ idx).getContent();
            $('#tiny-field'+ idx).each(function (index, ta) {
                var $ta = $(ta);
                msg += '<div><strong> ' + 'Event Descripiton' + ' </strong><br />' + activeEditor + '</div>';
            });
            $('#values').html(msg);
        });
    }

    function onChangeFlag() {
        var flagList = $('div.flag-dropdown > a.dropdown-item');

       flagList.click(function (event) {
           var $target = $(event.currentTarget);
           var flagVal = $($target).find('.flag-icon').attr('value');
          // 
         
           if (flagVal === 'us') {
                idx = 1;
           }
           else if (flagVal === 'it') {
                idx = 2;
           }
           else if (flagVal === 'nl') {
               idx = 3;          
           }
           else if (flagVal === 'gb') {
               idx = 4;
           }
           else if (flagVal === 'fr') {
               idx = 5;
           }
           else if (flagVal === 'es') {
               idx = 6;
           }
           
          tinymce.editors['tiny-field' + idx].show();
         
           for (var i = 1; i <= 6; i++) {
               if (i !== idx) {
                tinymce.editors['tiny-field' + i].hide();
               }             
           }           
            $target.closest('.dropdown')
               .find('[data-bind="label"]').html($target.html())
                  .end()
               .children('.flag-btn').dropdown('toggle');
           
           return false;
        });
    }
    
    function run() {
        var context = this;
        
        var init = function () {
            context.timePickerPopOver = new timePickerPopOver();
            context.setTimePicker = new setTimePicker();
            context.calendarPicker = new calendarPicker();
            context.onSubmit = new onSubmit();
            context.validateForm = new validateForm();
            context.optionList = new optionList();
            context.bindButtonClick = new bindButtonClick();
            context.isLateNightToggle = new isLateNightToggle();
            context.teicketTemplateToggle = new teicketTemplateToggle();
            context.uploadImage = new uploadImage();
            context.cropImage = new cropImage();
            context.textfieldEditor = new textfieldEditor();
            context.toolTips = new toolTips();
            context.onToggleButton = new onToggleButton();
            context.getValueFromToggle = new getValueFromToggle();
            context.onKeyupOtherField = new onKeyupOtherField();
            context.WellComeShotToggle = new WellComeShotToggle();
            context.onChangeFlag = new onChangeFlag();
        };
        init();
       
    }

    new run();
 });