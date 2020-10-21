function addStore(id) {
    if (!id || id <= 0) {
        notify('zmdi zmdi-alert-polygon zmdi-hc-fw', 'danger', 'Error', 'Block undefined!');
        return false;
    }

    $('#block-id-store').val(id);
    $('#modalStore').modal('show');
}

function editStore(block, store) {
    if (!block || block <= 0) {
        notify('zmdi zmdi-alert-polygon zmdi-hc-fw', 'danger', 'Error', 'Block undefined!');
        return false;
    }

    if (!store || store <= 0) {
        notify('zmdi zmdi-alert-polygon zmdi-hc-fw', 'danger', 'Error', 'Store undefined!');
        return false;
    }

    $('#block-id-store').val(block);
    $('#block-store-update').val(store);
    var elm = $('#block-item-' + block + ' tr[data-id="'+store+'"]');
    $('#select2-select-store-container .select2-selection__placeholder').html($.trim(elm.find('.sName').text()));
    storeSelected = {
        id: store,
        name: $.trim(elm.find('.sName').text())
    }

    var type = elm.find('.sType').text();
    if (type == 'NON_PRIORITY') {
        $('#store-type__NON_PRIORITY').prop('checked', true);
        $('#store-type__PRIORITY').prop('checked', false);
    } else {
        $('#store-type__PRIORITY').prop('checked', true);
        $('#store-type__NON_PRIORITY').prop('checked', false);
    }

    var showLogo = elm.find('.sShowLogo').text();
    if (showLogo == 'SYSTEM') {
        $('#store_show_logo-SYSTEM').prop('checked', true);
        $('#store_show_logo-SHOP').prop('checked', false);
    } else {
        $('#store_show_logo-SHOP').prop('checked', true);
        $('#store_show_logo-SYSTEM').prop('checked', false);
    }

    var showBanner = elm.find('.sShowBanner').text();
    if (showBanner == 'SYSTEM') {
        $('#store_show_banner-SYSTEM').prop('checked', true);
        $('#store_show_banner-SHOP').prop('checked', false);
    } else {
        $('#store_show_banner-SHOP').prop('checked', true);
        $('#store_show_banner-SYSTEM').prop('checked', false);
    }

    $('#block-store-logo').val($.trim(elm.find('.sLogo img').attr('src')));
    $('#block-store-banner').val($.trim(elm.find('.sBanner img').attr('src')));
    $('#block-store-logoMobile').val($.trim(elm.find('.sLogo').data('mobile')));
    $('#block-store-bannerMobile').val($.trim(elm.find('.sBanner').data('mobile')));

    $('#modalStore').modal('show');
}

function confirmStore() {
    var id = $('#block-id-store').val();
    var store = $('#block-store-update').val();
    if (!id || id <= 0) {
        notify('zmdi zmdi-alert-polygon zmdi-hc-fw', 'danger', 'Error', 'Block undefined!');
        return false;
    }

    if ($.isEmptyObject(storeSelected)) {
        notify('zmdi zmdi-alert-polygon zmdi-hc-fw', 'danger', 'Error', 'No store selected');
        return false;
    }

    if (($('#priority-'+id+' tr[data-id="'+storeSelected.id+'"]').length > 0 || $('#non-priority-'+id+' tr[data-id="'+storeSelected.id+'"]').length > 0) && !store) {
        notify('zmdi zmdi-alert-polygon zmdi-hc-fw', 'danger', 'Error', 'Store aready selected');
        return false;
    }

    var type = $('input[name="store_type"]:checked').val();
    var show_logo = $('input[name="store_show_logo"]:checked').val();
    var show_banner = $('input[name="store_show_banner"]:checked').val();
    var logo = $('#block-store-logo').val();
    var banner = $('#block-store-banner').val();
    var logoMobile = $('#block-store-logoMobile').val();
    var bannerMobile = $('#block-store-bannerMobile').val();
    if (show_logo == 'SYSTEM' && !logo) {
        notify('zmdi zmdi-alert-polygon zmdi-hc-fw', 'danger', 'Error', 'Logo undefined!');
        return false;
    }

    if (show_banner == 'SYSTEM' && !banner) {
        notify('zmdi zmdi-alert-polygon zmdi-hc-fw', 'danger', 'Error', 'Banner undefined!');
        return false;
    }

    var html = genStoreRow(id, storeSelected, type, logo, banner, show_logo, show_banner, logoMobile, bannerMobile);
    if (type == "PRIORITY") {
        if (store > 0) {
            $('#priority-'+id+' tr[data-id="'+store+'"]').replaceWith(html);
        } else {
            $('#priority-'+id).append(html);
        }
    } else {
        if (store > 0) {
            $('#non-priority-'+id+' tr[data-id="'+store+'"]').replaceWith(html);
        } else {
            $('#non-priority-'+id).append(html);
        }
    }

    $('#block-item-' + id +' .btn-save-store').show();
    $('#modalStore').modal('hide');
    return false;
}

function genStoreRow(id, data, type, logo, banner, show_logo, show_banner, logoMobile, bannerMobile) {
    var html = '';
    html += '<tr data-id="' + data.id + '">';
    html += '<td class="sId">' + data.id + '</td>';
    html += '<td class="sName">' + data.name + '</td>';
    html += '<td class="sType">' + type + '</td>';
    html += '<td class="sShowLogo">' + show_logo + '</td>';
    if (logo) {
        html += '<td class="sLogo" data-mobile="'+logoMobile+'"><img src="'+logo+'" style="max-height: 100px;"/></td>';
    } else {
        html += '<td class="sLogo" data-mobile="'+logoMobile+'"></td>';
    }

    html += '<td class="sShowBanner">' + show_banner + '</td>';
    if (banner) {
        html += '<td class="sBanner" data-mobile="'+bannerMobile+'"><img src="'+banner+'" style="max-height: 100px;"/></td>';
    } else {
        html += '<td class="sBanner" data-mobile="'+bannerMobile+'"></td>';
    }

    html += '<td><i class="zmdi zmdi-edit text-info mr-3" onclick="editStore('+id+', '+data.id+')"></i><i class="zmdi zmdi-delete text-danger" onclick="removeStore('+id+', '+data.id+')"></i></td>';
    html += '</tr>';
    return html;
}

function removeStore(block, store) {
    if (!block || block <= 0) {
        notify('zmdi zmdi-alert-polygon zmdi-hc-fw', 'danger', 'Error', 'Block undefined!');
        return false;
    }

    if (!store || store <= 0) {
        notify('zmdi zmdi-alert-polygon zmdi-hc-fw', 'danger', 'Error', 'Store undefined!');
        return false;
    }

    $('#block-item-' + block+' tr[data-id="'+store+'"]').remove();
    $('#block-item-' + block +' .btn-save-store').show();
    return false;
}

function saveStore(id) {
    if (!id || id <= 0) {
        notify('zmdi zmdi-alert-polygon zmdi-hc-fw', 'danger', 'Error', 'Block undefined!');
        return false;
    }

    var items = {
        priority: [],
        nonPriority: []
    };
    $('#priority-'+id+' tr').each(function() {
        items.priority.push({
            id: $(this).find('td.sId').text(),
            type: $(this).find('td.sType').text(),
            showLogo: $(this).find('td.sShowLogo').text(),
            logo: $(this).find('td.sLogo img').attr('src'),
            logoMobile: $(this).find('td.sLogo').data('mobile'),
            showBaner: $(this).find('td.sShowBanner').text(),
            banner: $(this).find('td.sBanner img').attr('src'),
            bannerMobile: $(this).find('td.sBanner').data('mobile'),
        });
    });
    $('#non-priority-'+id+' tr').each(function() {
        items.nonPriority.push({
            id: $(this).find('td.sId').text(),
            type: $(this).find('td.sType').text(),
            showLogo: $(this).find('td.sShowLogo').text(),
            logo: $(this).find('td.sLogo img').attr('src'),
            logoMobile: $(this).find('td.sLogo').data('mobile'),
            showBaner: $(this).find('td.sShowBanner').text(),
            banner: $(this).find('td.sBanner img').attr('src'),
            bannerMobile: $(this).find('td.sBanner').data('mobile'),
        });
    });

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {items: items, action: 'store'},
        type: 'PUT',
        url: '/setting/layout/update/' + id,
        success: function (res) {
            $('#block-item-' + res.block.id).find('.btn-save-store').hide();
            notify('zmdi zmdi-check zmdi-hc-fw', 'success', 'Success', "Update success!");
        },
        error: function (xhr, status, error) {
            var res = eval("(" + xhr.responseText + ")");
            notify('zmdi zmdi-alert-polygon zmdi-hc-fw', 'danger', 'Error', res.message);
        }
    });
}

$('#modalStore').on('hidden.bs.modal', function () {
    $('#block-id-store').val(0);
    $('#block-store-image').val('');
    $('#block-store-link').val('');
    storeSelected = {};
});

$("select#select-store").select2({
  ajax: {
      url: "/seller/filterShop",
      dataType: 'json',
      delay: 250,
      data: function (params) {
          return {
              q: params.term,
              page: params.page
          };
      },
      processResults: function (data, params) {
          params.page = params.page || 1;

          return {
              results: data.items,
              pagination: data.pagination
          };
      },
      cache: true
  },
  escapeMarkup: function (markup) {
      return markup;
  },
  allowClear: true,
  placeholder: 'Search store...',
  minimumInputLength: 0,
  templateResult: formatRepoStore,
  templateSelection: formatRepoSelectionStore
});

function formatRepoStore (repo) {
  if (repo.loading) {
      return "Loading....";
  }
  var $container = $(
      "<div class='select2-result-repository clearfix d-flex'>" +
          "<div class='select2-result-repository__meta ml-2'>" +
              "<div class='select2-result-repository__statistics'>" +
              "<span class='select2-result-repository__forks'></span>" +
              "<span class='select2-result-repository__stargazers'></span>" +
              "</div>" +
          "</div>" +
      "</div>"
  );

  $container.find(".select2-result-repository__forks").append(repo.name);
  if (repo.phone) {
      $container.find(".select2-result-repository__stargazers").append(" - " + repo.phone);
  }

  if (repo.email) {
      $container.find(".select2-result-repository__stargazers").append(" - " + repo.email);
  }

  return $container;
}

function formatRepoSelectionStore (repo) {
  if (repo.name) {
      var str = repo.name;
      if (repo.phone) {
          str += " - " + repo.phone;
      } else {
          if (repo.email) {
              str += " - " + repo.email;
          }
      }
      return str;
  }
  return 'Search store...';
}

var storeSelected = {};
$('#select-store').on('select2:select', function (e) {
  storeSelected = e.params.data;
});

$('#select-store').on('select2:unselect', function (e) {
  storeSelected = {};
});

$(".store-list tbody").sortable(
    {
        update: function(event, ui) {
            $(this).parent().parent().prev().find('button.btn-save-store').show();
        }
    }
);
