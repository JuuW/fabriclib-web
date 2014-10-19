var language = "en";
$(document).ready(function() {
					$("#languageSelect").change(function(e) {
						language = $(this).val();
						if (language == "cn") {
							$("#login_button").html("登录");
							$("#languageLable").html("语言");
							$("#passwordLable").html("密码");
							$("#usernameLable").html("用户");
							$("#FabricLib").html("面料库");
						} else {
							$("#login_button").html("Login");
							$("#languageLable").html("Language");
							$("#passwordLable").html("Password");
							$("#usernameLable").html("Username");
							$("#FabricLib").html("FabricLib");
						}

					});

					function checkFormField($form) {
						var error = false;
						var username = $form.find("input[name='username']"), password = $form
								.find("input[name='password']");
						if (!trim(username.val())) {
							username.addClass("error");
							error = true;
						} else {
							username.removeClass("error");
						}
						if (!password.val()) {
							password.addClass("error");
							error = true;
						} else {
							password.removeClass("error");
						}
						return error;
					}

					$("#login_form").submit(function(event) {

										event.preventDefault();

										var $form = $(this);
										var postData = $form.serializeArray();
										var formURL = $form.attr("action");

										if (!checkFormField($form)) {
											$("#login_msg").html("&nbsp");
											$.ajax({
														type : "post",
														url : formURL,
														cache : false,
														data : postData,
														success : function(data) {
															var data = JSON.parse(data);
															var location;
															var errormag;
															if (language == "cn") {
																location = "./cn_index.html";
																errormag = "用户名不存在或与密码不匹配！";
															} else {
																location = "./index.html";
																errormag = "username is not exist or not match with password!";
															}
															if (data.username) {
																window.location = location;
															} else {
																$("#login_msg").html(errormag);
															}
															// $("#login_msg").html(data);
														},
														error : function() {
															var errormag;
															if (language == "cn") {
																errormag = "错误";
															}else{
																errormag = "Error";
															}
															$("#login_msg").html(errormag);
														}
													});
										} else {
											var errormsg ;
											if (language == "cn") {
												errormag = "请检查您的输入";
											}else{
												errormag = "Please check input data";
											}
											$("#login_msg").html("<div><span class='empty_message'>"+errormag+"</span></div>");
										}

									});
				});

function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
function ltrim(str) {
	return str.replace(/(^\s*)/g, "");
}
function rtrim(str) {
	return str.replace(/(\s*$)/g, "");
}