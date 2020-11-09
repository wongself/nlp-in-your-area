$(function() {
  // Initialization
  // $('#source_textarea').val('')
  // $('.target-text').html('')
  $('[data-toggle="tooltip"]').tooltip()
  new WOW().init()

  // Browser Detect
  if (bowser.name == 'Internet Explorer') {
    console.error('不兼容当前浏览器！')
    console.error('Not compatible with this browser.')
    return
  }
})

function _switch_mode_to_text() {
  $('#extract_button').fadeIn()
  $('#upload_button').hide()
}

function _switch_mode_to_doc() {
  $('#extract_button').hide()
  $('#upload_button').fadeIn()
}

// Modal Error
function _toggle_contrast() {
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

// Modal Error
function raise_modal_error(error_info) {
  $('#modal_error #modal_error_content').text(error_info)
  $('#modal_error').modal()
  console.error(error_info)
}
