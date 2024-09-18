<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>

<link
	href="${pageContext.request.contextPath}/resources/bootstrap.min.css"
	rel="stylesheet">
<script
	src="${pageContext.request.contextPath}/resources/bootstrap/bootstrap.bundle.min.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/bootstrap/jquery.min.js"></script>
<link
	href="${pageContext.request.contextPath}/resources/css/admin/productadd.css"
	rel="stylesheet" type="text/css" />
<!-- summernote html editor -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"
	crossorigin="anonymous"></script>
<script
	src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
	integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
	crossorigin="anonymous"></script>

<!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> -->
<script
	src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
	integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
	crossorigin="anonymous"></script>

<link
	href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css"
	rel="stylesheet">
<script
	src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.js"></script>
</head>

<body>
	<div>
		<div class="top-text-margin">
			상품관리 > <span class="text-success"><b>상품등록 / 수정</b></span>
		</div>
		<h2 class="top-text-margin">
			<b>상품등록 / 수정</b>
		</h2>
		<h5 class="top-text-margin">
			<b>기본 정보</b>
		</h5>
		<form method="post" action="updateProduct" enctype="multipart/form-data">
			<input type="hidden" name="productId" value="${product.productId}">
			<div class="form-group">
				<label>상품명<span class="text-essential">(필수)</span></label> <input
					id="product-name" type="text" name="productName"
					value="${product.productName}" maxlength="250">
				<div id="charCount">0 / 250</div>
			</div>
			<div class="form-group">
				<label>판매가<span class="text-essential">(필수)</span></label> <input
					type="text" name="productPrice" value="${product.productPrice}"
					maxlength="10">
				<div class="form-blank">원</div>
			</div>
			<div class="form-group">
				<label>상품 수량<span class="text-essential">(필수)</span></label> <input
					type="text" name="productStock" value="${product.productStock}">
				<div class="form-blank">개</div>
			</div>
			<div class="form-group">
				<label>카테고리<span class="text-essential">(필수)</span></label> <input
					type="text" name="productCategory"
					value="${product.productCategory}">
			</div>
			<div class="image-thumnail">
				<label>상품 대표 이미지 (썸네일)</label>
				<div class="image-upload-container">
					<!-- 1번 이미지 (대표 이미지) -->
					<c:if test="${image1 != null}">
						<div class="image-preview" id="image-preview1">
							<img src="imageDown?productId=${product.productId}&usecase=1"
								alt="${product.productName}" class="product-image">
						</div>
					</c:if>
					<c:if test="${image1 == null }">
						<div class="image-preview" id="image-preview1"
							onclick="document.getElementById('image-input1').click();">
							<span>+</span>
						</div>
						<input type="file" id="image-input1" name="productImage1"
							accept="image/*" style="display: none;"
							onchange="previewImage(event, 'image-preview1')" />
					</c:if>


					<!-- 2번 이미지 -->
					<c:if test="${image2 != null}">
						<div class="image-preview" id="image-preview2">
							<img src="imageDown?productId=${product.productId}&usecase=2"
								alt="${product.productName}" class="product-image">
						</div>
					</c:if>
					<c:if test="${image2 == null }">
						<div class="image-preview" id="image-preview2"
							onclick="document.getElementById('image-input2').click();">
							<span>+</span>
						</div>
						<input type="file" id="image-input2" name="productImage2"
							accept="image/*" style="display: none;"
							onchange="previewImage(event, 'image-preview2')" />
					</c:if>

					<!-- 3번 이미지 -->
					<c:if test="${image3 != null}">
						<div class="image-preview" id="image-preview3">
							<img src="imageDown?productId=${product.productId}&usecase=3"
								alt="${product.productName}" class="product-image">
						</div>
					</c:if>
					<c:if test="${image3 == null }">
						<div class="image-preview" id="image-preview3"
							onclick="document.getElementById('image-input3').click();">
							<span>+</span>
						</div>
						<input type="file" id="image-input3" name="productImage3"
							accept="image/*" style="display: none;"
							onchange="previewImage(event, 'image-preview3')" />
					</c:if>

					<!-- 4번 이미지 -->
					<c:if test="${image4 != null}">
						<div class="image-preview" id="image-preview4">
							<img src="imageDown?productId=${product.productId}&usecase=4"
								alt="${product.productName}" class="product-image">
						</div>
					</c:if>
					<c:if test="${image4 == null }">
						<div class="image-preview" id="image-preview4"
							onclick="document.getElementById('image-input4').click();">
							<span>+</span>
						</div>
						<input type="file" id="image-input4" name="productImage4"
							accept="image/*" style="display: none;"
							onchange="previewImage(event, 'image-preview4')" />
					</c:if>

				</div>
			</div>

			<div class="form-group">
				<label>상품 대표 설명 (썸네일)</label> <input type="text"
					name="mainDescription" value="${product.mainDescription}">
			</div>
			<div class="form-group">
				<label>상품 간략한 설명</label> <input type="text"
					name="summaryDescription" value="${product.summaryDescription}">
			</div>
			<div class="form-group">
				<label>상품 상세페이지 대표 설명</label> <input type="text"
					name="detailDescription" value="${product.detailDescription}">
			</div>
			<div class="image-thumnail">
				<label>상품 상세페이지 상세정보 설명</label>
				<c:if test="${detailImage != null}">
					<div class="image-preview" id="image-preview5">
						<img src="imageDown?productId=${product.productId}&usecase=5"
							alt="${product.productName}" class="product-image">
					</div>
				</c:if>
				<c:if test="${detailImage == null}">
					<div class="image-upload-container"
						onclick="document.getElementById('image-input5').click();">
						<div class="image-preview" id="image-preview5">
							<span>+</span>
						</div>
					</div>
					<input type="file" id="image-input5" name="detailImage"
						accept="image/*" style="display: none;"
						onchange="previewImage(event, 'image-preview5')" />
				</c:if>
			</div>
			<div class="btn-register-div">
				<button type="submit" class="btn-register">수정하기</button>
			</div>
		</form>

	</div>

	<script
		src="${pageContext.request.contextPath}/resources/js/admin/productadd.js"></script>
</body>
</html>