var apiServer = "http://127.0.0.1:8081/";
var currentPage = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

if (typeof(Storage) == "undefined") {
    document.body.innerHTML = "Your browser does not support local storage";
}

if (
    !['login.html', 'signup.html', 'signup2.html'].includes(currentPage) && 
    localStorage.getItem("access-token") === null
    ) {
    location.href = 'login.html';
}

if(localStorage.getItem("access-token") !== null) {
    var userToken = JSON.parse(localStorage.getItem('access-token'));
}

function loginHandler() {
    var $form = $("#msform");
    
    $.ajax({
        type: 'POST',
        url: apiServer + $form.attr("action"),
        data: $form.serialize(), 
        success: function(response) {
            localStorage.setItem("access-token", JSON.stringify("Bearer " + response.data.token));
            localStorage.setItem("current-user", JSON.stringify(response.data.user));

            location.href = "dashboard.html";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status+ " " +thrownError);
        }
    });
}

function employeeListingHandler() {
    var url = 'api/users/all';

    $.ajax({
        type: 'GET',
        headers: {"Authorization": userToken},
        url: apiServer + url, 
        success: function(response) {
            var listHtml = "",
                roleDropdownHtml = "";
            response.data.user.forEach(function(item, index) {
                listHtml += `<tr>
                                <td class="width45">
                                    <label class="fancy-checkbox">
                                        <input class="checkbox-tick" type="checkbox" name="checkbox">
                                        <span></span>
                                    </label>
                                </td>
                                <td>
                                    <h6 class="mb-0">${item.firstName} ${item.lastName}</h6>
                                    <span>${item.email}</span>
                                </td>
                                <td><span>QM${item.id + 100}</span></td>
                                <td><span>${item.dob}</span></td>
                                <td>${item.status == 1 ? '<label class="btn btn-success">Active</label>' : '<label class="btn btn-danger">Inactive</label>'}</td>
                                <td>${item.Role.name}</td>
                                <td>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" title="Edit" onclick="editEmployeeModal(${item.id})"><i class="fa fa-edit"></i></button>
                                    <button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteEmployeeHandler(${item.id})"><i class="fa fa-trash-o"></i></button>
                                </td>
                            </tr>`;
            });
            $('#employeeListBody').html(listHtml);
            
            response.data.role.forEach(function(item, index) {
                roleDropdownHtml += `<option value="${item.id}">${item.name}</option>`;
            });

            $('#roleDropdown').html(roleDropdownHtml);

            $('.js-sweetalert').on('click', function () {
                var type = $(this).data('type');
                
                if (type === 'confirm') {
                    showConfirmMessage();
                }
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if(xhr.status == 401) {
                location.href = 'login.html';
            } else {
                alert(xhr.status+ " " +thrownError);                
            }
        }
    });
}

function storeEployeeHandler() {
    var $form = $("#addEmployeeForm"),
        $url = apiServer + $form.attr("action"),
        $method = "POST";

    if($("#idInfo").val() !== ""){
        $url = apiServer + "api/users/" + $("#idInfo").val();
        $method = "PUT";
    }
    
    $.ajax({
        type: $method,
        url: $url,
        headers: {"Authorization": userToken},
        data: $form.serialize(), 
        success: function(response) {
            location.href = 'employee-management.html';
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status+ " " +thrownError);
        }
    });
}

function editEmployeeModal(id) {
    $.ajax({
        type: 'GET',
        url: apiServer + 'api/users/' + id,
        headers: {"Authorization": userToken},
        success: function(response) {
            var userDetails = response.data;
            $("#idInfo").val(userDetails.id);
            $("#firstName").val(userDetails.firstName);
            $("#lastName").val(userDetails.lastName);
            $("#email").val(userDetails.email);
            $("#dob").val(userDetails.dob);
            $("#roleDropdown").val(userDetails.Role.id);

            $("#addemployee").modal();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status+ " " +thrownError);
        }
    });
}

function deleteEmployeeHandler(id) {
    console.log("here",id);
    $.ajax({
        type: 'DELETE',
        url: apiServer + 'api/users/' + id,
        headers: {"Authorization": userToken},
        success: function(response) {
            location.href = 'employee-management.html';
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status+ " " +thrownError);
        }
    });
}

function showConfirmMessage() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this record!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        swal("Deleted!", "Record has been deleted.", "success");
    });
}

$(function() {
    "use strict";
    
    setTimeout(function() {
        $(".page-loader-wrapper").fadeOut()
    }, 50);

    $('.js-sweetalert').on('click', function () {
        var type = $(this).data('type');
        
        if (type === 'confirm') {
            showConfirmMessage();
        }
    });
});

$(document).ready(function() {
    $(".main-menu").metisMenu(), $(".cwidget-scroll").slimScroll({
        height: "263px",
        wheelStep: 10,
        touchScrollStep: 50,
        color: "#efefef",
        size: "2px",
        borderRadius: "3px",
        alwaysVisible: !1,
        position: "right"
    });

    $(".btn-toggle-fullwidth").on("click", function() {
        $("body").hasClass("layout-fullwidth") ? $("body").removeClass("layout-fullwidth") : $("body").addClass("layout-fullwidth"), $(this).find(".fa").toggleClass("fa-arrow-left fa-arrow-right")
    });

    $(".btn-toggle-offcanvas").on("click", function() {
        $("body").toggleClass("offcanvas-active")
    });

    $("#main-content").on("click", function() {
        $("body").removeClass("offcanvas-active")
    });

    $(".dropdown").on("show.bs.dropdown", function() {
        $(this).find(".dropdown-menu").first().stop(!0, !0).animate({
            top: "100%"
        }, 200)
    });

    $(".dropdown").on("hide.bs.dropdown", function() {
        $(this).find(".dropdown-menu").first().stop(!0, !0).animate({
            top: "80%"
        }, 200)
    });

    $('.navbar-form.search-form input[type="text"]').on("focus", function() {
        $(this).animate({
            width: "+=50px"
        }, 300)
    }).on("focusout", function() {
        $(this).animate({
            width: "-=50px"
        }, 300)
    }), 0 < $('[data-toggle="tooltip"]').length && $('[data-toggle="tooltip"]').tooltip(), 0 < $('[data-toggle="popover"]').length && $('[data-toggle="popover"]').popover(), $(window).on("load", function() {
        $("#main-content").height() < $("#left-sidebar").height() && $("#main-content").css("min-height", $("#left-sidebar").innerHeight() - $("footer").innerHeight())
    });
});
