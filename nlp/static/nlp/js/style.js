$(function() {
  // Initialization
  // $('#source_textarea').val('')
  // $('.target-text').html('')
  // $('.tab-mask').show()
  $('[data-toggle="tooltip"]').tooltip()
  new WOW().init()

  // Browser Detect
  if (bowser.name == 'Internet Explorer') {
    console.error('不兼容当前浏览器！')
    console.error('Not compatible with this browser.')
    return
  }
})

function ajax_src_submit(source, qtype) {
  // Disable Operation
  disable_operation(qtype)

  // Print Source
  // console.log('source:', source)

  var qurl = '../query_' + qtype + '/'
  $.ajax({
    type: 'post',
    url: qurl,
    data: {
      'source': source,
      csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val()
    },
    // try_count: 0,
    // retry_limit: 3,
    success: function(ret) {
      // Print Result
      console.log('result:', ret)

      try {
        switch (qtype) {
          case 'extract':
            parse_extract(ret['jextract'])
            break
          default:
            raise_modal_error('未知错误，请重试！')
            break
        }
      } catch (e) {
        raise_modal_error('未知错误，请重试！')
        console.error(e)
      } finally {
        enable_operation(qtype)
      }
    },
    error: function(ret) {
      console.error(ret)
      enable_operation(qtype)
    }
  })
}

// Extract
function trigger_extract() {
  var $src = $('#left_text_area')
  var src = $src.val()

  src = 'We introduce SpERT, an attention model for span-based joint entity and relation extraction. Our key contribution is a light-weight reasoning on BERT embeddings, which features entity recognition and filtering, as well as relation classification with a localized, marker-free context representation. The model is trained using strong within-sentence negative samples, which are efficiently extracted in a single BERT pass.'

  src = src.replace(/(^\s*)|(\s*$)/g, '')
  src = src.replace(/\s+/g, ' ')
  $src.val(src)

  if (src.length <= 0) {
    raise_error('无有效输入！')
    return
  }

  ajax_src_submit(src, 'extract')
}

function parse_extract(jresult) {
  // var jents = jresult['entity']
  // var jrels = jresult['relation']
  $.each(jresult, function(index, jsent) {
    console.log(jsent)
  })
  annotate_predict(jresult, $('#showcase_extract'))
}

// Operation
function disable_operation(qtype) {
  switch (qtype) {
    case 'extract':
      // Mask
      $('#mask_extract_result').fadeIn()
      // Button
      $('#extract_query_button').html('<div \
        class="spinner-border spinner-border-sm mr-1" \
        role="status" aria-hidden="true"></div>' + '抽取中...').addClass('disabled')
      $('#upload_document_button').html('<div \
        class="spinner-border spinner-border-sm mr-1" \
        role="status" aria-hidden="true"></div>' + '上传中...').addClass('disabled')
      $('#export_predict_button').addClass('disabled')
      break
    default:
      break
  }
}

function enable_operation(qtype) {
  switch (qtype) {
    case 'extract':
      // Mask
      $('#mask_extract_result').fadeOut()
      // Button
      $('#extract_query_button').html('开始抽取' + '<i \
        class="fas fa-arrow-right ml-1"></i>').removeClass('disabled')
      $('#upload_document_button').html('上传文档' + '<i \
        class="fas fa-arrow-up ml-1"></i>').removeClass('disabled')
      $('#export_predict_button').removeClass('disabled')
      break
    default:
      break
  }
}

// Mode
function switch_mode_to_text() {
  $('#extract_button').fadeIn()
  $('#upload_button').hide()
}

function switch_mode_to_doc() {
  $('#extract_button').hide()
  $('#upload_button').fadeIn()
}

// Contrast
function toggle_contrast() {
  if ($('.fa-moon').hasClass('d-none')) {
    // Button
    $('.fa-moon').removeClass('d-none')
    $('.fa-sun').addClass('d-none')
    // Page
    $('.navbar').removeClass('navbar-light').addClass('navbar-dark')
    $('.sun').each(function() {
      $(this).removeClass('sun').addClass('moon')
    })
  } else if ($('.fa-sun').hasClass('d-none')) {
    // Button
    $('.fa-moon').addClass('d-none')
    $('.fa-sun').removeClass('d-none')
    // Page
    $('.navbar').removeClass('navbar-dark').addClass('navbar-light')
    $('.moon').each(function() {
      $(this).removeClass('moon').addClass('sun')
    })
  } else {
    raise_modal_error('未知错误，请重试！')
  }
}

// Error
function raise_modal_error(error_info) {
  $('#modal_error #modal_error_content').text(error_info)
  $('#modal_error').modal()
  console.error(error_info)
}

// Debouncing
var waitForFinalEvent = (function() {
  var timers = {}
  return function(callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId."
    }
    if (timers[uniqueId]) {
      clearTimeout(timers[uniqueId])
    }
    timers[uniqueId] = setTimeout(callback, ms)
  }
})()

// Progress
NProgress.configure({
  showSpinner: false
})

$(document).ajaxStart(function() {
  NProgress.start()
})

$(document).ajaxStop(function() {
  NProgress.done()
})
