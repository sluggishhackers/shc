import {
  parseLocalCommitteeDetail,
  parseLocalCommittees,
  parseLocalCommitteesTotalPagesCount,
} from "./parser.ts";
import { fetchLocalCommitteeDetail, fetchLocalCommittees } from "./fetch.ts";

const html = `
<!DOCTYPE html>
<html lang="ko"> 
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="대전광역시, 대전시청, 대전광역시청">

<title> | 대전광역시청</title>
	<link rel="shortcut icon" type="image/x-icon" href="/images/drh/layout/common/favicon.ico">
<link rel="stylesheet" type="text/css" href="/css/drh/layout/reset.css" />
<link rel="stylesheet" type="text/css" href="/css/drh/layout/common.css" />
<link rel="stylesheet" type="text/css" href="/css/drh/layout/layout_2018.css" />
<link rel="stylesheet" type="text/css" href="/css/drh/layout/layout_dep.css" />
<link rel="stylesheet" type="text/css" href="/css/drh/layout/contents.css" />
<script type="text/javascript" src="/js/drh/layout/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src='/js/cmm/commonUtil.js'></script>
<script type="text/javascript" src='/js/cmm/stringUtil.js'></script>
<script type="text/javascript" src="/js/cmm/system_util.js" ></script>
<script type="text/javascript" src="/js/cmm/system_board.js"></script>
<!--<script type="text/javascript" src="/js/drh/layout/jquery.easing.1.3.min.js"></script>-->
<script type="text/javascript" src="/js/drh/layout/jquery.bxslider.min.js"></script>
<script type="text/javascript" src="/js/cmm/jquery.form.min.js"></script>
<script type="text/javascript" src="/js/cmm/html5shiv.js" ></script>
<script type="text/javascript" src="/js/drh/common.js"></script>
<script type="text/javascript" src="/js/drh/twitter/twitter.js"></script>
<script type="text/javascript" src="/js/drh/twitter/twitterCity.js"></script>
<script type="text/javascript" src="/js/drh/layout/common.js"></script>
<link rel="stylesheet" type="text/css" href="/css/drh/content.css" media="all" />
<link rel="stylesheet" type="text/css" href="/css/drh/layout/board/new_board.css" media="all" />

</head>
<body>
	<!-- skipNavi -->
	<div class="skiptoContent">
   			 <a href="#content">본문내용 바로가기</a>
			 <a href="#gnb">메인메뉴 바로가기</a>
		</div><!-- //skipNavi -->
	<!-- header -->
	<script type="text/javascript" src="/js/netfunnel/netfunnel.js" charset="UTF-8"></script>
<script type="text/javascript" src="/js/netfunnel/skin_djdefault.js" charset="UTF-8"></script>

<script type="text/javascript">

$(document).ready(function(){
	
});

$(document).keydown(function(e){
	
	var key = (e) ? e.keyCode : event.keyCode;
	if(key == 116 || (event.ctrlKey == true && key == 82)){
		event.keyCode = 0;
		event.cancelBubble = true;
		event.returnValue = false;
		return false;
	}
	 
});

function getItMobileSearch(e){
	
	if(e.id == "searchEngine3"){
		var searchWord = $("#qt3").val();
		var category = $("#menu option:selected").val();
		
		if(searchWord == ""){
			alert("검색어를 입력하십시오.");
			$("#qt3").focus();
			return false;
		}
		$.ajax({
			url:'/drh/totalSearch.do',
			type: "post",
			data: {"totalSearch_keyword" : searchWord,
				"totalSearch_category" : category},
			dataType: 'json',
			async:false,
			success:function(data, status){
				$("#searchEngine3").attr("action", "https://search.daejeon.go.kr/RSA/front/Search.jsp");
				$("#searchEngine3").attr("target", "_blank");
				$("#searchEngine3").submit();
				//return true;
			},
			error: function(request, status, opt){
				alert("서버와의 연결에 실패했습니다. Error Code ["+status+"]");
				return false;
			}
		});
	}
	else if(e.id == "searchEngine2"){
		var searchWord = $("#qt2").val();
		var category = $("#searchMenuPc").val();
		if(searchWord == ""){
			alert("검색어를 입력하십시오.");
			$("#qt2").focus();
			return false;
		}
		$.ajax({
			url:'/drh/totalSearch.do',
			type: "post",
			data: {"totalSearch_keyword" : searchWord,
				"totalSearch_category" : category},
			dataType: 'json',
			async:false,
			success:function(data, status){
				$("#searchEngine2").attr("action", "https://search.daejeon.go.kr/RSA/front/Search.jsp");
				$("#searchEngine2").attr("target", "_blank");
				$("#searchEngine2").submit();
				//return true;
			},
			error: function(request, status, opt){
				alert("서버와의 연결에 실패했습니다. Error Code ["+status+"]");
				return false;
			}
		});
	}
	else if(e[0].id == "searchEngine"){
		var searchWord = $("#qt").val();
		var category = "통합검색";
		if(searchWord == ""){
			alert("검색어를 입력하십시오.");
			$("#qt").focus();
			return false;
		}
		$.ajax({
			url:'/drh/totalSearch.do',
			type: "post",
			data: {"totalSearch_keyword" : searchWord,
				"totalSearch_category" : category},
			dataType: 'json',
			async:false,
			success:function(data, status){
				$("#searchEngine").attr("action", "https://search.daejeon.go.kr/RSA/front/Search.jsp");
				$("#searchEngine").attr("target", "_blank");
				$("#searchEngine").submit();
				//return true;
			},
			error: function(request, status, opt){
				alert("서버와의 연결에 실패했습니다. Error Code ["+status+"]");
				return false;
			}
		});
	}
}
</script>

<div id="intro"></div> <!-- intro 출력 div -->

<!-- header : s -->
<header class="header">
  	<div class="container">
  		<h1 class="logo"><a href="/index.do">
			<img src="/images/drh/layout/common/logo_typeA.png" alt="대전광역시 DAEJEON METROPOLITAN CITY" class="forPc">
			<img src="/images/drh/layout/common/logo_typeB.png" alt="대전광역시 DAEJEON METROPOLITAN CITY" class="hidePc">
  		</a></h1>
  		<div class="btnToggleMn hidePc"><a href="#" title="전체메뉴">전체메뉴 열기</a></div>
  		<div class="btnSrch hidePc"><a href="#" title="검색">검색하기</a>
			<!-- 검색하기 레이어 -->
			<div class="layerSrch">
				<h2 class="hidden">통합검색</h2>
				<div class="form">
					<form id="searchEngine" name="searchEngine" action="/">	
<!-- 						<input type="text" class="input" placeholder="검색어를 입력하세요."> -->
						<input type="hidden" name="menu" value="통합검색"/>
						<input type="text" style="ime-mode:active" name="qt" id="qt" class="input" onfocus="this.value=''" title="검색어를 입력하세요"  placeholder="검색어를 입력하세요."/>
						<p><button onclick="javascript:getItMobileSearch(searchEngine); return false;">검색</button></p>
					</form>
				</div>		
			</div>
			<!-- //검색하기 레이어 -->
  		</div>
		<div class="cnt forPc">
			<nav class="gnb" id="gnb">
				<ul>
					<li ><a href="/drh/open/index.do?menuSeq=1438" >정보공개</a>
						<div class="layerSnb" id="snb01">
							<div class="wrapCnt">
								<nav class="snb">
									<ul>
										<li class="gnb01" >
											<a class="snbLeftA" href="/drh/open/index.do?menuSeq=1438" >정보공개</a>
											<ul class="depth2">
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1519" >정보공개제도안내</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1519"  >정보공개 및 처리제도</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1448"  >정보공개청구</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6615"  >비공개 대상정보 세부기준</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1522"  >수수료</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1523"  >불복절차</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1524"  >관련법령 및 서식</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1520"  >정보공개편람</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1543"  >정보공개 모니터단이란?</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/open/drhDataOpen/drhDataOpenBoardList.do?menuSeq=3134" >사전정보공표</a>
												<ul class="depth3">
														<li >
															<a href="/drh/open/drhDataOpen/drhDataOpenBoardList.do?menuSeq=3134"  >사전정보공표</a>
														</li>
														<li >
															<a href="/drh/open/drhDataOpen/drhDataOpenBoardList.do?menuSeq=4804&amp;searchCondition2=C08&searchCondition3=D0806"  >업무추진비</a>
														</li>
														<li >
															<a href="/drh/open/drhDataOpen/drhDataOpenBoardView.do?boardSeq=640&amp;menuSeq=5788"  >주간행사계획</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2656"  >사전정보공표(2014년 1월 이전자료)</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/information/openDocInfoList.do?menuSeq=6876" >원문정보・정보목록공개</a>
												<ul class="depth3">
														<li >
															<a href="/drh/information/openDocInfoList.do?menuSeq=6876"  >원문정보공개</a>
														</li>
														<li >
															<a href="/drh/information/informationList.do?menuSeq=1540"  >정보목록검색</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_1016&menuSeq=5951"  >월별 정보목록</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/acm/drhAcmBoardList.do?menuSeq=6412" >위원회 운영정보</a>
												<ul class="depth3">
														<li >
															<a href="/drh/acm/drhAcmBoardList.do?menuSeq=6412"  >위원회 현황</a>
														</li>
														<li >
															<a href="/drh/acm/drhAcmResultBoardList.do?menuSeq=6423"  >회의결과</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=7190" >공공데이터개방</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=7190"  >이용안내</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/bud/financeinfo/main.do?menuSeq=5163" target="_blank" title="새창으로 이동">재정정보공개</a>
												<ul class="depth3">
														<li >
															<a href="https://www.daejeon.go.kr/bud/financeinfo/main.do?menuSeq=5163" target="_blank" title="새창으로 이동" >총괄현황</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/bud/financeinfo/budgetOperationStatus.do?menuSeq=5164" target="_blank" title="새창으로 이동" >자금운용현황</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/bud/financeinfo/annualRevenuesStatus.do?menuSeq=5165" target="_blank" title="새창으로 이동" >세입현황</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/bud/financeinfo/budgetExecutionStatus.do?menuSeq=5166" target="_blank" title="새창으로 이동" >세출현황</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/bud/financeinfo/budgetRealmStatus.do?menuSeq=5167" target="_blank" title="새창으로 이동" >예산분야현황</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/gyeyak?menuSeq=3133" target="_blank" title="새창으로 이동">계약정보공개</a>
												<ul class="depth3">
														<li >
															<a href="/gyeyak/order/orderList.do?menuFg=A1&cntrtFlag=&upmuGubun=3&menuSeq=5885" target="_blank" title="새창으로 이동" >발주계획</a>
														</li>
														<li >
															<a href="/gyeyak/bid/bidInList.do?menuFg=B1&cntrtFlag=&upmuGubun=3&menuSeq=5890" target="_blank" title="새창으로 이동" >입찰정보</a>
														</li>
														<li >
															<a href="/gyeyak/cntrt/cstnCntrtList.do?menuFg=C1&cntrtFlag=1&menuSeq=5899" target="_blank" title="새창으로 이동" >계약정보</a>
														</li>
														<li >
															<a href="/gyeyak/openMain.do?menuFg=K1&cntrtFlag=1&upmuGubun=&amp;menuSeq=5203" target="_blank" title="새창으로 이동" >신기술특허OPEN창구</a>
														</li>
														<li >
															<a href="/gyeyak/order/orderList.do?menuFg=A1&cntrtFlag=&upmuGubun=3&menuSeq=5916" target="_blank" title="새창으로 이동" >대금지급</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=4620" >조직정보공개</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4620"  >대전시 공무원 정원</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6146"  >대전시 공무원 현원</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/board/boardNormalList.do?boardId=normal_0201&amp;menuSeq=1482" >정책실명제</a>
												<ul class="depth3 noData">
														<li>하위 메뉴 없음</li>
													</ul>
													</li>
											<li >
												<a href="/drh/depart/board/boardNormalList.do?boardId=ins_0002&menuSeq=1042" >감사결과공개</a>
												<ul class="depth3 noData">
														<li>하위 메뉴 없음</li>
													</ul>
													</li>
											</ul>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</li>
					<li ><a href="/drh/citizen/index.do?menuSeq=1439" >참여마당</a>
						<div class="layerSnb" id="snb02">
							<div class="wrapCnt">
								<nav class="snb">
									<ul>
										<li class="gnb02" >
											<a class="snbLeftA" href="/drh/citizen/index.do?menuSeq=1439" >참여마당</a>
											<ul class="depth2">
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=6372" >시정참여</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6372"  >대전시에 바란다(국민신문고)</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6373"  >시장에게 바란다</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4606"  >시민시정제안</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6860"  >숙의제도</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6374"  >대전시소</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6375"  >대전주민참여예산</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=7191"  >고향사랑기부제</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=6854" >일반참여</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6854"  >공모·설문</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0168&amp;menuSeq=1548"  >칭찬합시다</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0167&amp;menuSeq=1547"  >자유게시판</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/board/boardNormalList.do?boardId=normal_0169&menuSeq=1549" >시민단체</a>
												<ul class="depth3">
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0169&amp;menuSeq=1549"  >알려드립니다</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1768"  >단체등록안내</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1552" >기부문화</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1552"  >기부금대상민간단체 안내</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5048"  >기부금품모집안내</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0173&amp;menuSeq=1553"  >기부금품모집자료실</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0174&amp;menuSeq=1554"  >기부금품모집등록현황</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4183"  >기부참여안내</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=4858" >SMS서비스</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4858"  >대기오염경보 SMS</a>
														</li>
														</ul>
												 	</li>
											</ul>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</li>
					<li ><a href="/drh/civil_apeal/index.do?menuSeq=1440" >전자민원</a>
						<div class="layerSnb" id="snb03">
							<div class="wrapCnt">
								<nav class="snb">
									<ul>
										<li class="gnb03" >
											<a class="snbLeftA" href="/drh/civil_apeal/index.do?menuSeq=1440" >전자민원</a>
											<ul class="depth2">
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=4769" >대전시에 바란다</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4769"  >대전시에 바란다</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4784"  >나의민원</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1563" >민원안내</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1563"  >민원소개·법령</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1771"  >민원편의시책</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=3453"  >자격증 재발급</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1565"  >무인민원발급기</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1566"  >분야별민원안내</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1567"  >시청 민원실 안내도</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1464"  >민원신청/조회</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1571" >여권안내</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1571"  >여권개요</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1575"  >여권교부/보관및반납</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=6655" >원스톱(통합) 민원안내</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6655"  >원스톱민원안내</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6654"  >2021년3월31일이전내용보기</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=5079" >민원신고센터</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5079"  >교통민원</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5067"  >화물운송불법/불공정</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4775"  >환경신문고</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4778"  >부동산실거래가위반</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4783"  >중개업소위법부당행위</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1799"  >예산낭비신고센터</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5756"  >공무원 비리익명제보</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6638"  >공직자 비리신고</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5461"  >민원부조리 신고</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4628"  >자동차관리법 위반행위 신고</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4741"  >안전신문고</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5252"  >인권침해 구제신청</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6578"  >불법하도급신고</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=7129" >부패공익신고</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=7129"  >부패·공익신고</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=3323"  >복지·보조금 부정신고</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1891" >규제개혁</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1891"  >규제개혁이란?</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1897"  >등록규제 현황</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5815"  >지방규제신고센터</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5089"  >국무조정실 규제개혁신문고</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6571"  >규제입증요청</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5180"  >규제정보포털</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0097&amp;menuSeq=6927"  >규제혁신 알림/소식</a>
														</li>
														<li >
															<a href="/drh/administration/board/boardGalleryList.do?boardId=gallery_0020&amp;menuSeq=6928"  >규제혁신 카드뉴스</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=6442" >적극행정</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6442"  >제도소개</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0310&amp;menuSeq=6443"  >알림소식</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6444"  >적극행정 국민추천</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/minwonFormList.do?boardId=normal_0200&amp;menuSeq=1466" >민원사무편람/서식</a>
												<ul class="depth3 noData">
														<li>하위 메뉴 없음</li>
													</ul>
													</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=7195" >버스전용차로 민원</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=7195"  >버스전용차로 위반 안내</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=7197"  >과태료 납부 안내</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=7198"  >의견진술 및 이의신청 안내</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=7199"  >버스전용차로 CCTV현황</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=7200"  >임차인 변경 안내</a>
														</li>
														</ul>
												 	</li>
											</ul>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</li>
					<li ><a href="/drh/administration/index.do?menuSeq=1442" >행정정보</a>
						<div class="layerSnb" id="snb04">
							<div class="wrapCnt">
								<nav class="snb">
									<ul>
										<li class="gnb04" >
											<a class="snbLeftA" href="/drh/administration/index.do?menuSeq=1442" >행정정보</a>
											<ul class="depth2">
											<li >
												<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&amp;menuSeq=1479" >Story대전</a>
												<ul class="depth3">
														<li >
															<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&categorySeq=294&amp;menuSeq=1627"  >일류 경제</a>
														</li>
														<li >
															<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&categorySeq=295&amp;menuSeq=1628"  >일류 문화</a>
														</li>
														<li >
															<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&categorySeq=293&amp;menuSeq=1626"  >일류 복지</a>
														</li>
														<li >
															<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&categorySeq=296&amp;menuSeq=1629"  >일류 과학</a>
														</li>
														<li >
															<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&categorySeq=292&amp;menuSeq=1625"  >일류 환경</a>
														</li>
														<li >
															<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&categorySeq=291&amp;menuSeq=1624"  >일류 행정</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/board/boardNormalList.do?boardId=normal_0096&amp;menuSeq=1631" >시정뉴스</a>
												<ul class="depth3">
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0096&amp;menuSeq=1631"  >시정소식</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_1029&amp;menuSeq=5056"  >달라지는 대전생활</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0189&amp;menuSeq=6825"  >보도자료</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0124&amp;menuSeq=1639"  >보도해명자료</a>
														</li>
														<li >
															<a href="/fvu/index.do" target="_blank" title="새창으로 이동" >행사안내</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=7176"  >입찰정보</a>
														</li>
														<li >
															<a href="/drh/administration/board/boardGalleryList.do?boardId=gallery_0019&amp;menuSeq=4637"  >시정카드뉴스</a>
														</li>
														<li >
															<a href="/drh/blogBoardView.do?boardId=fact_check&amp;menuSeq=5651"  >핫뉴스</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0123&amp;menuSeq=1638"  >타기관소식</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_1028&amp;menuSeq=6622"  >주요업무계획</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/drhRegulationsList.do?menuSeq=1660" >시정자료실</a>
												<ul class="depth3">
														<li >
															<a href="/drh/drhRegulationsList.do?menuSeq=1660"  >공보(고시공고)</a>
														</li>
														<li >
															<a href="/ada/index.do" target="_blank" title="새창으로 이동" >행정자료실</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=pla_0005&amp;menuSeq=6869"  >학술용역 활용상황</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_1024&amp;menuSeq=6360"  >시민의식조사</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1876" >법무행정정보</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1876"  >행정심판</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1880"  >소청심사</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1883"  >소송</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1654"  >대법원판례</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1886"  >행정절차제도</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1648"  >자치법규</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1655"  >법령해석사례</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6576"  >법령</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6452"  >지방세 납세자보호관</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/bud/index.do" target="_blank" title="새창으로 이동">예산/재정</a>
												<ul class="depth3">
														<li >
															<a href="/bud/BudFinanceboardList.do?boardId=budboard005&menuSeq=349" target="_blank" title="새창으로 이동" >세입세출예산서</a>
														</li>
														<li >
															<a href="/bud/BudFinanceboardList.do?boardId=budboard011&menuSeq=353" target="_blank" title="새창으로 이동" >재정공시</a>
														</li>
														<li >
															<a href="/bud/BudContentsHtmlView.do?menuSeq=354" target="_blank" title="새창으로 이동" >주민참여예산제</a>
														</li>
														<li >
															<a href="/bud/BudFinanceboardList.do?boardId=budboard006&menuSeq=350" target="_blank" title="새창으로 이동" >결산</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/urb/index.do" target="_blank" title="새창으로 이동">도시주택정보</a>
												<ul class="depth3">
														<li >
															<a href="/urb/UrbCityPlanDisplayList.do?menuSeq=1102" target="_blank" title="새창으로 이동" >도시계획</a>
														</li>
														<li >
															<a href="/urb/ContentsHtmlView.do?menuSeq=6475" target="_blank" title="새창으로 이동" >도시재생</a>
														</li>
														<li >
															<a href="/urb/ContentsHtmlView.do?menuSeq=1170" target="_blank" title="새창으로 이동" >도시정비</a>
														</li>
														<li >
															<a href="/urb/ContentsHtmlView.do?menuSeq=1249" target="_blank" title="새창으로 이동" >건축·주택</a>
														</li>
														<li >
															<a href="/urb/ContentsHtmlView.do?tapMenuSeq=1180&menuSeq=1179" target="_blank" title="새창으로 이동" >택지·도시개발</a>
														</li>
														<li >
															<a href="/urb/ContentsHtmlView.do?menuSeq=1306" target="_blank" title="새창으로 이동" >도시경관</a>
														</li>
														<li >
															<a href="/urb/ContentsHtmlView.do?menuSeq=1350" target="_blank" title="새창으로 이동" >토지정책</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/MediaList.do?menuSeq=2558" >대전소식모아보기(자치구)</a>
												<ul class="depth3">
														<li >
															<a href="/drh/MediaList.do?notiType=NOTI_01&amp;menuSeq=2559"  >공지사항</a>
														</li>
														<li >
															<a href="/drh/MediaList.do?notiType=NOTI_03&amp;menuSeq=2561"  >문화행사</a>
														</li>
														<li >
															<a href="/drh/MediaList.do?notiType=NOTI_04&amp;menuSeq=2562"  >입법예고</a>
														</li>
														<li >
															<a href="/drh/MediaList.do?notiType=NOTI_05&amp;menuSeq=2563"  >타기관 채용정보</a>
														</li>
														<li >
															<a href="/drh/MediaList.do?notiType=NOTI_06&amp;menuSeq=2564"  >고시공고</a>
														</li>
														<li >
															<a href="/drh/MediaList.do?notiType=NOTI_07&amp;menuSeq=2565"  >입찰정보</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/ins/index.do?menuSeq=1034" >감사행정</a>
												<ul class="depth3">
														<li >
															<a href="/drh/depart/board/boardNormalList.do?boardId=ins_0003&menuSeq=1057"  >감사정보</a>
														</li>
														<li >
															<a href="/drh/depart/board/boardNormalList.do?boardId=ins_0002&menuSeq=1042"  >감사결과</a>
														</li>
														<li >
															<a href="/drh/depart/board/boardNormalList.do?boardId=ins_0004&menuSeq=1058"  >감사(청렴)자료실</a>
														</li>
														<li >
															<a href="/ins/InsContentsHtmlView.do?menuSeq=4597"  >사전 컨설팅감사</a>
														</li>
														<li >
															<a href="/ins/InsContentsHtmlView.do?menuSeq=6389"  >적극행정 면책제도</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="https://www.daejeon.go.kr/djpol/index.do" target="_blank" title="새창으로 이동">자치경찰위원회</a>
												<ul class="depth3">
														<li >
															<a href="https://www.daejeon.go.kr/djpol/contentView.do?menuSeq=6890" target="_blank" title="새창으로 이동" >위원회소개</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/djpol/contentView.do?menuSeq=6895" target="_blank" title="새창으로 이동" >정책마당</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/djpol/depart/normalBoardList.do?boardId=pol_0003&menuSeq=6901" target="_blank" title="새창으로 이동" >회의마당</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/djpol/contentView.do?menuSeq=6903" target="_blank" title="새창으로 이동" >참여마당</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/djpol/depart/normalBoardList.do?boardId=djPol_0009&menuSeq=6907" target="_blank" title="새창으로 이동" >알림마당</a>
														</li>
														</ul>
												 	</li>
											</ul>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</li>
					<li ><a href="/drh/economy/index.do?menuSeq=1441" >열린경제</a>
						<div class="layerSnb" id="snb05">
							<div class="wrapCnt">
								<nav class="snb">
									<ul>
										<li class="gnb05" >
											<a class="snbLeftA" href="/drh/economy/index.do?menuSeq=1441" >열린경제</a>
											<ul class="depth2">
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1815" >과학산업</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1815"  >대덕연구개발특구</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=7178"  >대덕특구 재창조</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6700"  >4차 산업혁명 특별시</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1597" >기업지원</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1597"  >중소기업(소상공인)지원</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1823"  >투자유치</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6864"  >중소기업제품 공공구매</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1658"  >지방기업 규제불편 신고창구</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4852"  >해외통상사무소</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5640"  >지역 기술개발제품</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1472" >고용동향</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1602"  >대전일자리지원센터</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1603"  >인재검색</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1604"  >공개채용정보</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1606"  >대학교취업정보</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1607"  >관련기관안내</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1609" >부동산정보</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1609"  >부동산개발업등록</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1610"  >부동산중개업정보</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1611"  >공시지가조회</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1612"  >토지이용계획</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1837" >소비자정보</a>
												<ul class="depth3">
														<li >
															<a href="/cons/index.do" target="_blank" title="새창으로 이동" >소비생활센터</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1615"  >생활지리정보</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1837"  >농수산물정보</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/price/index.do?menuSeq=3302" >물가정보</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=3303"  >소비자물가지수</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_1007&amp;menuSeq=3304"  >소비자물가동향</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_1008&amp;menuSeq=3305"  >개인서비스 가격동향</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_1009&amp;menuSeq=3306"  >주요생필품 물가동향</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=3308"  >주요공공요금</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=3318"  >착한가격업소</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/board/boardNormalList.do?boardId=normal_0187&amp;menuSeq=1618" >경제지표</a>
												<ul class="depth3">
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0187&amp;menuSeq=1618"  >경제지표</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0188&amp;menuSeq=1619"  >월간경제</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1620" >협동조합</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1620"  >협동조합이란?</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1621"  >협동조합 설립신고 절차</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0152&amp;menuSeq=1622"  >자료실</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=6666" >청년정책</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6666"  >대전청년내일센터</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4828"  >청년 임차보증금 이자지원</a>
														</li>
														</ul>
												 	</li>
											</ul>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</li>
					<li ><a href="/drh/life/index.do?menuSeq=1443" >생활정보</a>
						<div class="layerSnb" id="snb06">
							<div class="wrapCnt">
								<nav class="snb">
									<ul>
										<li class="gnb06" >
											<a class="snbLeftA" href="/drh/life/index.do?menuSeq=1443" >생활정보</a>
											<ul class="depth2">
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1662" >교육·상담</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1662"  >디지털배움터</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1663"  >대전의 대학교</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1912"  >인터넷중독예방 상담</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5278"  >인권침해 상담</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1914" >복지</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1914"  >국민기초생활보장</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1917"  >의료급여제도</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=3256"  >긴급복지지원</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2116"  >장애인복지</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1925"  >어르신</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=3143"  >다자녀</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=3150"  >보육</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2269"  >가정복지ㆍ다문화</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4743"  >청소년ㆍ아동</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1671"  >노숙인복지</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1940"  >사회복지관</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1947"  >장묘관리</a>
														</li>
														<li >
															<a href="/wel/WelContentsHtmlView.do?menuSeq=2718" target="_blank" title="새창으로 이동" >보훈공원</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1951"  >지역자율형사회서비스</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4608"  >의사상자 지원제도</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6830"  >주거복지</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=5853" >성인지정책</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5853"  >성인지감수성충전소</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2254"  >양성평등정책</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5855"  >여성</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2153"  >가족</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/life/NightfloatOntheDayList.do?menuSeq=1678" >건강과의료</a>
												<ul class="depth3">
														<li >
															<a href="/drh/life/NightfloatOntheDayList.do?menuSeq=1678"  >당직의료기관</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1955"  >보건소</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1680"  >예방접종</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6848"  >모성건강</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2176"  >생활건강</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1684"  >관련사이트</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1686"  >당번약국</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1968" >환경정보</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1968"  >환경정책</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1970"  >환경협력</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5782"  >물순환회복</a>
														</li>
														<li >
															<a href="/hea/index.do" target="_blank" title="새창으로 이동" >대기정보</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6589"  >미세먼지정보</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=3275"  >자연환경조사</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2194"  >재활용정보</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1984"  >음식물쓰레기자원화</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1694"  >기후변화대응</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1693"  >관련사이트</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=2230" >3대하천정보</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2230"  >대전의 3대하천</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2235"  >3대하천 사업현황</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2225"  >3대하천 편의시설 및 이용신청</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=4550"  >하천용어</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/saf/index.do" target="_blank" title="새창으로 이동">재난·안전</a>
												<ul class="depth3">
														<li >
															<a href="https://www.daejeon.go.kr/saf/SafContentsHtmlView.do?menuSeq=6851" target="_blank" title="새창으로 이동" >어린이안전관리 제도</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/saf/SafContentsHtmlView.do?menuSeq=6610" target="_blank" title="새창으로 이동" >시민안전보험</a>
														</li>
														<li >
															<a href="/saf/SafContentsHtmlView.do?menuSeq=1278" target="_blank" title="새창으로 이동" >자연재난 길잡이</a>
														</li>
														<li >
															<a href="/saf/SafContentsHtmlView.do?menuSeq=1279" target="_blank" title="새창으로 이동" >사회재난 길잡이</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=6940" >시설이용</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6940"  >대전반려동물공원</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2493"  >공공체육시설</a>
														</li>
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_1046&amp;menuSeq=1703"  >동네체육시설</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1704"  >하천체육시설</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1706"  >시설이용신청</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2525"  >청소년수련시설</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=6526" >지역인재 의무채용</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6526"  >제도 안내</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6531"  >공공기관 목록</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6633"  >공공기관 채용정보</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6535"  >2022 지역인재 채용설명회</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6536"  >자주하는 질문</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1497" >바로가기</a>
												<ul class="depth3">
														<li >
															<a href="/urb/index.do" target="_blank" title="새창으로 이동" >도시주택정보</a>
														</li>
														<li >
															<a href="/djTram/index.do" target="_blank" title="새창으로 이동" >대전트램</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1497"  >교통정보</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5066"  >분실물 찾기</a>
														</li>
														<li >
															<a href="/hea/index.do" target="_blank" title="새창으로 이동" >보건환경연구원</a>
														</li>
														<li >
															<a href="/far/index.do" target="_blank" title="새창으로 이동" >농업기술센터</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5857"  >수돗물 수질정보</a>
														</li>
														<li >
															<a href="https://daejeon.go.kr/djeco/index.do" target="_blank" title="새창으로 이동" >친환경학교급식</a>
														</li>
														</ul>
												 	</li>
											</ul>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</li>
					<li ><a href="/drh/daejeon/index.do?menuSeq=1444" >대전소개</a>
						<div class="layerSnb" id="snb07">
							<div class="wrapCnt">
								<nav class="snb">
									<ul>
										<li class="gnb07" >
											<a class="snbLeftA" href="/drh/daejeon/index.do?menuSeq=1444" >대전소개</a>
											<ul class="depth2">
											<li >
												<a href="/drh/drhOrganization.do?menuSeq=6376" >시청안내</a>
												<ul class="depth3">
														<li >
															<a href="/drh/drhOrganization.do?menuSeq=6376"  >조직도 및 직원안내</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1848"  >청사안내</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1850"  >시민이용시설</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1846"  >청사둘러보기</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1643"  >오시는 길</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1759"  >대전120콜센터</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=6708" >대전의상징</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6708"  >시정구호·엠블렘</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1708"  >대전의 꽃·나무·새</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=3294"  >대전의 깃대종</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1711"  >상징마크·로고·대전색</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1713"  >캐릭터</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2024"  >브랜드 슬로건</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6861"  >대전 홍보영상</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6759"  >Daejeon is U 이모티콘</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2059"  >대전사랑운동</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5085"  >대전의노래</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1748"  >시민헌장</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=6867"  >홍보대사</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=2033" >대전의현황</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2033"  >자연환경</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1716"  >행정구역</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1717"  >대전의지명</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=2038" >사이버역사관</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=2038"  >대전의역사</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1719"  >대전의연혁</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/his/board/musBoardDataList.do?bbsCode=hispeople&amp;menuSeq=670" target="_blank" title="새창으로 이동" >대전의인물</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1722"  >시정ㆍ경제ㆍ환경백서</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5824"  >대전찰칵</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1725"  >기록관</a>
														</li>
														<li >
															<a href="/its/index.do" target="_blank" title="새창으로 이동" >월간일류도시대전</a>
														</li>
														<li >
															<a href="https://tv.daejeon.go.kr/?menuSeq=6370" target="_blank" title="새창으로 이동" >대전인터넷방송</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="https://www.daejeon.go.kr/sta/index.do" target="_blank" title="새창으로 이동">대전의통계</a>
												<ul class="depth3">
														<li >
															<a href="https://www.daejeon.go.kr/sta/StaDaejeonTodayList.do?menuSeq=20" target="_blank" title="새창으로 이동" >한눈에보는 대전</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/sta/StaStatisticsFldList.do?menuSeq=180" target="_blank" title="새창으로 이동" >통계자료</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/sta/StaSocialindicatorList.do?menuSeq=472" target="_blank" title="새창으로 이동" >e-대전통계</a>
														</li>
														<li >
															<a href="https://www.daejeon.go.kr/sta/StaStatisticsNewsList.do?menuSeq=186" target="_blank" title="새창으로 이동" >통계관련정보</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/DrhContentsHtmlView.do?menuSeq=1728" >국제협력</a>
												<ul class="depth3">
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1728"  >자매우호도시</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1741"  >자매우호도시 홍보관</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5276"  >국제기구</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5277"  >외국인주민 통합지원센터</a>
														</li>
														</ul>
												 	</li>
											<li >
												<a href="/drh/board/boardNormalList.do?boardId=normal_0164&amp;menuSeq=1518" >원도심이야기</a>
												<ul class="depth3">
														<li >
															<a href="/drh/board/boardNormalList.do?boardId=normal_0164&amp;menuSeq=1749"  >원도심 소식</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1750"  >원도심 자랑</a>
														</li>
														<li >
															<a href="/fod/index.do" target="_blank" title="새창으로 이동" >맛집 찾기</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=1752"  >원도심으로 오세요</a>
														</li>
														<li >
															<a href="/drh/DrhContentsHtmlView.do?menuSeq=5825"  >대전스카이로드 운영</a>
														</li>
														</ul>
												 	</li>
											</ul>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</li>
					<li><a href="#" class="point">자주찾는정보</a>						
						<div class="layerSnb" id="snb08">
							<div class="wrapCnt">
								<nav class="snb">
									<ul>
									<li class="gnb08"><a class="snbLeftA" href="#"><span>자주찾는 정보</span></a>
  <ul class="depth2">
    <li><a href="">행정예산세정</a>
      <div class="depth3">
        <dl>
          <dt>자치법규</dt>
          <dd>
            <ul>
               <li><a href="https://www.elis.go.kr/locgovalr/locgovClAlrList?ctpvSggCd=30000" target="_blank" title="새창열림">자치법규</a></li>
               <li><a href="https://www.daejeon.go.kr/sta/index.do" target="_blank" title="새창열림">대전의 통계</a></li>
               <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1891" target="_blank" title="새창열림">규제개혁</a></li>
               <li><a href="/drh/information/informationList.do?menuSeq=1540" target="_blank" title="새창열림">행정정보목록</a></li>
               <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1848" target="_blank" title="새창열림">시청안내</a></li>
               <li><a href="/mayor/index.do" target="_blank" title="새창열림">열린시장실</a></li>
               <li><a href="/ada/index.do" target="_blank" title="새창열림">행정자료실</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>세정</dt>
          <dd>
            <ul>
               <li><a href="https://www.daejeon.go.kr/tax/index.do" target="_blank" title="새창열림">세정도우미</a></li>
               <li><a href="https://www.daejeon.go.kr/tax/TaxContentsHtmlView.do?menuSeq=4710" target="_blank" title="새창열림">지방세납부안내</a></li>
               <li><a href="https://www.daejeon.go.kr/tax/TaxContentsHtmlView.do?menuSeq=4704" target="_blank" title="새창열림">마을세무사</a></li>
			   <li><a href="https://www.daejeon.go.kr/tax/TaxContentsHtmlView.do?menuSeq=4714" target="_blank" title="새창열림">구제제도</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>예산</dt>
          <dd>
            <ul>
               <li><a href="https://www.daejeon.go.kr/bud/BudFinanceboardList.do?boardId=budboard005&menuSeq=349" target="_blank" title="새창열림">세입세출예산서</a></li>
               <li><a href="https://www.daejeon.go.kr/bud/BudFinanceboardList.do?boardId=budboard011&amp;menuSeq=353" target="_blank" title="새창열림">재정공시</a></li>
               <li><a href="/bud/financeinfo/main.do?menuSeq=5163" target="_blank" title="새창열림">재정정보공개</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">문화관광체육</a>
      <div class="depth3">
        <dl>
          <dt>관광</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeontour.co.kr/ko/index.do" target="_blank" title="새창열림">대전관광</a></li>
              <li><a href="https://www.daejeontour.co.kr/ko/festival/festivalList.do?menuIdx=147" target="_blank" title="새창열림">대전의축제</a></li>
              <li><a href="https://www.oworld.kr/newkfsweb/kfs/dcco/dccoMainindex.do" target="_blank" title="새창열림">오월드(대전동물원)</a></li>
              <li><a href="https://www.daejeon.go.kr/fod/index.do" target="_blank" title="새창열림">대전의맛</a></li>
              <li><a href="https://www.daejeontour.co.kr/ko/board.do?menuIdx=160" target="_blank" title="새창열림">관광자료 신청</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>문화</dt>
          <dd>
            <ul>
              <li><a href="/fvu/index.do" target="_blank" title="새창열림">행사안내</a></li>
              <li><a href="https://daejeon.go.kr/djac/index.do" target="_blank" title="새창열림">대전예술의전당</a></li>
              <li><a href="https://www.daejeon.go.kr/kmusic/index.do" target="_blank" title="새창열림">대전시립연정국악원</a></li>
              <li><a href="https://www.daejeon.go.kr/lif/index.do" target="_blank" title="새창열림">여성가족원</a></li>
              <li><a href="https://daejeon.go.kr/dma/index.do" target="_blank" title="새창열림">시립미술관</a></li>
              <li><a href="https://www.daejeon.go.kr/pre/index.do" target="_blank" title="새창열림">선사박물관</a></li>
              <li><a href="https://www.daejeon.go.kr/his/index.do" target="_blank" title="새창열림">시립박물관</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>체육</dt>
          <dd>
            <ul>
              <li><a href="https://daejeon.go.kr/okr2019/lendRsvtList.do?menuSeq=8701&ntatcDelYn=Y&boardUseYn=N&menuUseYn=N" target="_blank" title="새창열림">축구장 예약</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">생생뉴스/민원</a>
      <div class="depth3">
        <dl>
          <dt>민원안내</dt>
          <dd>
            <ul>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1571" target="_blank" title="새창열림">여권</a></li>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1565" target="_blank" title="새창열림">무인민원발급기</a></li>
              <li><a href="/drh/minwonFormList.do?boardId=normal_0200&menuSeq=1466" target="_blank" title="새창열림">민원사무편람</a></li>
              <li><a href="https://sido.daejeon.go.kr/citynet/jsp/svp/home.jsp" target="_blank" title="새창열림">민원처리공개</a></li>
              <li><a href="/drh/open/index.do?menuSeq=1438" target="_blank" title="새창열림">정보공개</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>생생뉴스</dt>
          <dd>
            <ul>
              <li><a href="/drh/board/boardNormalList.do?boardId=normal_0096&menuSeq=1631" target="_blank" title="새창열림">시정소식</a></li>
              <li><a href="/drh/MediaList.do?menuSeq=2558" target="_blank" title="새창열림">대전소식모아보기</a></li>
              <li><a href="/exa/index.do" target="_blank" title="새창열림">시험정보</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">보건복지환경</a>
      <div class="depth3">
        <dl>
          <dt>환경</dt>
          <dd>
            <ul>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1968" target="_blank" title="새창열림">환경정보</a></li>
              <li><a href="/hea/index.do" target="_blank" title="새창열림">대기정보</a></li>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=2230" target="_blank" title="새창열림">행복한3대하천 만들기</a></li>
              <li><a href="https://www.waterworks.daejeon.kr" target="_blank" title="새창열림">상수도</a></li>
              <li><a href="/hea/index.do" target="_blank" title="새창열림">보건환경연구원</a></li>
              <li><a href="/ist/index.do" target="_blank" title="새창열림">곤충박물관</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>복지</dt>
          <dd>
            <ul>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1914" target="_blank" title="새창열림">국민기초생활</a></li>
              <li><a href="https://daejeon.childcare.go.kr/" target="_blank" title="새창열림">대전보육정보센터</a></li>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1940" target="_blank" title="새창열림">사회복지</a></li>
              <li><a href="https://www.kead.or.kr/index.jsp" target="_blank" title="새창열림">한국장애인고용공단</a></li>
              <li><a href="https://www.safe182.go.kr" target="_blank" title="새창열림">실종아동/어르신찾기</a></li>
              <li><a href="/drh/board/boardNormalList.do?boardId=normal_0153&amp;menuSeq=1921" target="_blank" title="새창열림">점자시정소식</a></li>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=2123&menuSeq=1922" target="_blank" title="새창열림">장애인일자리</a></li>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=3143" target="_blank" title="새창열림">다자녀가정우대</a></li>
              <li><a href="http://bigdata.daejeon.go.kr/condition/healthwelfare/popupN.do" target="_blank" title="새창열림">대전복지MAP</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>보건</dt>
          <dd>
            <ul>
              <li><a href="/drh/life/NightfloatOntheDayList.do?menuSeq=1678" target="_blank" title="새창열림">당직의료기관</a></li>
              <li><a href="https://www.pharm114.or.kr/common_files/sub2_page2.asp?addr1=%B4%EB%C0%FC%B1%A4%BF%AA%BD%C3" target="_blank" title="새창열림">당번약국</a></li>
              <li><a href="https://www.hira.or.kr/rd/hosp/plcMedInfm.do?pgmid=HIRAA050303000001&sidoCd=250000&sgguCd=250003#" target="_blank" title="새창열림">우리지역 좋은병원 찾기</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">도시주택정보</a>
      <div class="depth3">
        <dl>
		  <dt>도시계획</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1111" target="_blank" title="새창열림">도시계획위원회</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1117" target="_blank" title="새창열림">2030년도시기본계획</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1131" target="_blank" title="새창열림">지구단위계획</a></li>
            </ul>
          </dd>
		  <dt>도시경관</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1307" target="_blank" title="새창열림">경관위원회</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?tapMenuSeq=1311&menuSeq=1310" target="_blank" title="새창열림">경관계획</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=6489" target="_blank" title="새창열림">건축정책위원회</a></li>
			  <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1337" target="_blank" title="새창열림">옥외광고물상식</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>도시정비</dt>
          <dd>
            <ul>
               <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1170" target="_blank" title="새창열림">도시정비기본계획</a></li>
               <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=4050" target="_blank" title="새창열림">도시재정비촉진계획</a></li>
               <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=4052" target="_blank" title="새창열림">소규모주거정비</a></li>
               <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=4063" target="_blank" title="새창열림">주거환경개선</a></li>
            </ul>
          </dd>
		  <dt>건축&middot;주택</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1253" target="_blank" title="건축·주택정보 새창으로 열림">건축·주택정보</a></li>
			  <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?tapMenuSeq=4764&menuSeq=4764" target="_blank" title=" 새창으로 열림">대전지역 건설업체(자재포함) 정보</a></li>
              <li><a href="https://www.eais.go.kr/" target="_blank" title="건축행정(세움터) 새창으로 열림">건축행정(세움터)</a></li>
              <li><a href="https://hwanji.daejeon.go.kr/" target="_blank" title="환지조서발급 새창으로 열림">환지조서발급</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/UrbNormalboardList.do?boardId=normal_0033&menuSeq=1246" target="_blank" title="자료실 새창으로 열림">자료실</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
		  <dt>택지&middot;도시개발</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1179&tapMenuSeq=1180" target="_blank" title="택지개발사업 새창으로 열림">택지개발사업</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?tapMenuSeq=1190&menuSeq=1189" target="_blank" title="도시개발사업 새창으로 열림">도시개발사업</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/UrbNormalboardList.do?boardId=normal_0026&menuSeq=1187" target="_blank" title="자료실 새창으로 열림">자료실</a></li>
            </ul>
          </dd>
		  <dt>측량기준점 정보</dt>
          <dd>
            <ul>
              <li><a href="/urb/ContentsHtmlView.do?menuSeq=5181" target="_blank" title="국가기준점, 지적 기준점 새창으로 열림">국가기준점지적기준점</a></li>
              <li><a href="/urb/ContentsHtmlView.do?menuSeq=5182" target="_blank" title="복합(공공)기준점 새창으로 열림">복합(공공)기준점</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">시민참여</a>
      <div class="depth3">
        <dl>
          <dt>자율참여</dt>
          <dd>
            <ul>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=4769" target="_blank" title="새창열림">대전시에 바란다</a></li>
              <li><a href="/drh/board/boardNormalList.do?boardId=normal_0167&menuSeq=1547" target="_blank" title="새창열림">자유게시판</a></li>
              <li><a href="/drh/board/boardNormalList.do?boardId=normal_0168&menuSeq=1548" target="_blank" title="새창열림">칭찬합시다</a></li>
              <li><a href="https://daejeon.go.kr/online/index.do" target="_blank" title="새창열림">설문참여</a></li>
              <li><a href="https://www.daejeon.go.kr/jumin/index.do" target="_blank" title="새창열림">주민참여예산제</a></li>
              <li><a href="/okr/index.do" target="_blank" title="새창열림">OK예약서비스</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>교육/강좌</dt>
          <dd>
            <ul>
              <li><a href="https://daejeon.go.kr/okr2019/eduRsvtList.do?menuSeq=8100&ntatcDelYn=Y&boardUseYn=N&menuUseYn=N" target="_blank" title="새창열림">OK예약(강좌,시설)</a></li>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1662" target="_blank" title="새창열림">시민정보화교육</a></li>
              <li><a href="/lif/index.do" target="_blank" title="새창열림">여성가족원</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">교통건설소방</a>
      <div class="depth3">
        <dl>
          <dt>교통</dt>
          <dd>
            <ul>
              <li><a href="https://www.djet.co.kr/" target="_blank" title="새창열림">지하철정보</a></li>
              <li><a href="/veh/VehCarInsptView.do?menuSeq=587" target="_blank" title="새창열림">자동차검사일조회</a></li>
              <li><a href="https://www.tashu.or.kr/mainPageAction.do?process=mainPage" target="_blank" title="새창열림">시민공용자전거(타슈)</a></li>
			  <li><a href="https://carfree.daejeon.go.kr" target="_blank" title="새창열림">승용차요일제</a></li>
			  <li><a href="https://www.daejeon.go.kr/bus/index.do" target="_blank" title="새창열림">시내버스 시민모니터단</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>건설</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeon.go.kr/saf/index.do" target="_blank" title="새창열림">Safe대전</a></li>
              <li><a href="https://www.daejeon.go.kr/gun/index.do" target="_blank" title="새창열림">건설관리본부</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>소방</dt>
          <dd>
            <ul>
               <li><a href="https://www.daejeon.go.kr/dj119/index.do" target="_blank" title="새창열림">소방본부</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">경제과학</a>
      <div class="depth3">
        <dl>
          <dt>경제</dt>
          <dd>
            <ul>
               <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1597" target="_blank" title="새창열림">기업지원</a></li>
               <li><a href="/cons/index.do" target="_blank" title="새창열림">소비생활센터</a></li>
               <li><a href="/ohj/index.do" target="_blank" title="새창열림">오정농수산물도매시장</a></li>
               <li><a href="/noe/index.do" target="_blank" title="새창열림">노은농수산물도매시장</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>과학</dt>
          <dd>
            <ul>
              <li><a href="https://www.djtp.or.kr/" target="_blank" title="새창열림">대덕테크노파크</a></li>
              <li><a href="https://www.science.go.kr/" target="_blank" title="새창열림">국립중앙과학관</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">동물보호센터</a>
     <div class="depth3">
        <dl>
          <dt>동물보호센터</dt>
          <dd>
            <ul>
              <li><a href="/ani/AniStrayAnimalList.do?menuSeq=3108" target="_blank" title="새창열림">보호동물공고</a></li>
              <li><a href="/ani/AniContentsHtmlView.do?menuSeq=119" target="_blank" title="새창열림">동물등록제</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>입양참여</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeon.go.kr/ani/AniAdoptionApplicationList.do?menuSeq=124" target="_blank" title="새창열림">입양신청</a></li>
              <li><a href="https://www.daejeon.go.kr/ani/AniAdoptionCommentList.do?menuSeq=125" target="_blank" title="새창열림">입양후기</a></li>
            </ul>
          </dd>
        </dl>
      </div> 
    </li>
  </ul></ul>
								</nav>
							</div>
						</div>
					</li>
				</ul>
			</nav>
			<!--<div class="btnAllMn"><a href="/drh/info/sitemap.do?menuSeq=1506">전체메뉴 보기</a></div>-->
			<div class="btnSrch"><a href="#">검색하기</a><!--  class="btnClose" -->
				<!-- 검색하기 레이어 -->
				<div class="layerSrch">
					<div class="inputArea">
						<h2 class="tit">통합검색</h2>
						<div class="form">
							<form id="searchEngine2" name="searchEngine" action="/">
								<div id="searchCate" class="select">
								<input type="hidden" id="searchMenuPc" name="menu" value="통합검색"/>
									<span class="selected"><a href="#" onclick="javascript:fn_searchPcMenuCheck(this);">통합검색</a></span>
									<ul class="list">
									<li><a href="#" onclick="javascript:fn_searchPcMenuCheck(this);">통합검색</a></li>
									<li><a href="#" onclick="javascript:fn_searchPcMenuCheck(this);">메뉴</a></li>
									<li><a href="#" onclick="javascript:fn_searchPcMenuCheck(this);">시정뉴스</a></li>
									<li><a href="#" onclick="javascript:fn_searchPcMenuCheck(this);">문화관광</a></li>
									<li><a href="#" onclick="javascript:fn_searchPcMenuCheck(this);">웹페이지</a></li>
									<li><a href="#" onclick="javascript:fn_searchPcMenuCheck(this);">직원/업무</a></li>
									<li><a href="#" onclick="javascript:fn_searchPcMenuCheck(this);">게시판</a></li>
									<li><a href="#" onclick="javascript:fn_searchPcMenuCheck(this);">멀티미디어</a></li>
									<li><a href="#" onclick="javascript:fn_searchPcMenuCheck(this);">첨부문서</a></li>
									<li><a href="#" onclick="javascript:fn_searchPcMenuCheck(this);">SNS검색</a></li>
									</ul>
								</div>
<!-- 								<input type="text" class="input" value="검색어를 입력하세요."> -->
								<input type="text" style="ime-mode:active" name="qt" id="qt2" class="input" value="" onfocus="this.value=''" title="검색어를 입력하세요" placeholder="검색어를 입력하세요"/>
								<p><button onclick="javascript:getItMobileSearch(searchEngine2); return false;">검색하기</button></p>
							</form>
						</div>
					</div>
					<div class="bestRanking">
						<h2 class="tit">추천 검색어</h2>
						<ul class="list">
							<li><span class="num">1</span><a href="javascript:getItSearchHot('ok예약서비스');" title="해당 추천 검색어가 새창으로 열립니다">ok예약서비스</a></li>
							<li><span class="num">2</span><a href="javascript:getItSearchHot('동물보호센터');" title="해당 추천 검색어가 새창으로 열립니다">동물보호센터</a></li>
							<li><span class="num">3</span><a href="javascript:getItSearchHot('대전관광');" title="해당 추천 검색어가 새창으로 열립니다">대전관광</a></li>
							<li><span class="num">4</span><a href="javascript:getItSearchHot('한밭수목원');" title="해당 추천 검색어가 새창으로 열립니다">한밭수목원</a></li>
							<li><span class="num">5</span><a href="javascript:getItSearchHot('직원검색');" title="해당 추천 검색어가 새창으로 열립니다">직원검색</a></li>
							</ul>
					</div>
				</div>
				<!-- //검색하기 레이어 -->
			</div>
			<div class="util">
				<p class="login" style="margin-top:8px;"><a href="https://www.daejeon.go.kr/cmm/memberLogin.do?siteCd=DRH">로그인</a></p>
					 <!-- 				<p class="login"><a href="">로그인</a></p> -->

                
			<div style="margin-top:-10px;">
				<div class="lang">
                        <span class="selected"><a href="#">LANGUAGE</a></span>
                        <ul class="list">
                            <li><a href="/english/index.do" target="_blank">ENGLISH</a></li>
                            <li><a href="/japanese/index.do">JAPANESE</a></li>
                            <li><a href="/chinese/index.do">CHINESE</a></li>
                        </ul>
               </div>
				</div>
				</div>
		</div>
	</div>
</header>



<script>
// alert("");
</script>
<!-- SNB layer  -->
<div class="layerSnb_mo">
	<div class="wrapCnt_mo">
		<div class="util">
			<p class="login"><a href="/cmm/memberLogin.do?siteCd=DRH">로그인</a></p>
					 <p class="sitemap2"><a href="/drh/info/sitemap.do?menuSeq=1506">사이트맵</a></p>
			<div class="lang">
					<span class="selected"><a href="#">LANGUAGE</a></span>
					<ul class="list">
						<li><a href="/english/index.do" target="_blank">ENGLISH</a></li>
						<li><a href="/japanese/index.do" target="_blank">JAPANESE</a></li>
						<li><a href="/chinese/index.do" target="_blank">CHINESE</a></li>
					</ul>
				</div>
		</div>
		<nav class="snb_mo">
				<ul>
				<li class="gnb01">
							<a class="snbLeftA" href="/drh/open/index.do?menuSeq=1438" >정보공개</a>
						<ul class="depth2 dep2">
					<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1519" >정보공개제도안내</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1519"  >정보공개 및 처리제도</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1448"  >정보공개청구</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6615"  >비공개 대상정보 세부기준</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1522"  >수수료</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1523"  >불복절차</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1524"  >관련법령 및 서식</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1520"  >정보공개편람</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1543"  >정보공개 모니터단이란?</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/open/drhDataOpen/drhDataOpenBoardList.do?menuSeq=3134" >사전정보공표</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/open/drhDataOpen/drhDataOpenBoardList.do?menuSeq=3134"  >사전정보공표</a>
									</li>
									<li >
										<a href="/drh/open/drhDataOpen/drhDataOpenBoardList.do?menuSeq=4804&amp;searchCondition2=C08&searchCondition3=D0806"  >업무추진비</a>
									</li>
									<li >
										<a href="/drh/open/drhDataOpen/drhDataOpenBoardView.do?boardSeq=640&amp;menuSeq=5788"  >주간행사계획</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2656"  >사전정보공표(2014년 1월 이전자료)</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/information/openDocInfoList.do?menuSeq=6876" >원문정보・정보목록공개</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/information/openDocInfoList.do?menuSeq=6876"  >원문정보공개</a>
									</li>
									<li >
										<a href="/drh/information/informationList.do?menuSeq=1540"  >정보목록검색</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_1016&menuSeq=5951"  >월별 정보목록</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/acm/drhAcmBoardList.do?menuSeq=6412" >위원회 운영정보</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/acm/drhAcmBoardList.do?menuSeq=6412"  >위원회 현황</a>
									</li>
									<li >
										<a href="/drh/acm/drhAcmResultBoardList.do?menuSeq=6423"  >회의결과</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=7190" >공공데이터개방</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=7190"  >이용안내</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/bud/financeinfo/main.do?menuSeq=5163" target="_blank" title="새창으로 이동">재정정보공개</a>
						<ul class="depth3 dep3">
									<li >
										<a href="https://www.daejeon.go.kr/bud/financeinfo/main.do?menuSeq=5163" target="_blank" title="새창으로 이동" >총괄현황</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/bud/financeinfo/budgetOperationStatus.do?menuSeq=5164" target="_blank" title="새창으로 이동" >자금운용현황</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/bud/financeinfo/annualRevenuesStatus.do?menuSeq=5165" target="_blank" title="새창으로 이동" >세입현황</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/bud/financeinfo/budgetExecutionStatus.do?menuSeq=5166" target="_blank" title="새창으로 이동" >세출현황</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/bud/financeinfo/budgetRealmStatus.do?menuSeq=5167" target="_blank" title="새창으로 이동" >예산분야현황</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/gyeyak?menuSeq=3133" target="_blank" title="새창으로 이동">계약정보공개</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/gyeyak/order/orderList.do?menuFg=A1&cntrtFlag=&upmuGubun=3&menuSeq=5885" target="_blank" title="새창으로 이동" >발주계획</a>
									</li>
									<li >
										<a href="/gyeyak/bid/bidInList.do?menuFg=B1&cntrtFlag=&upmuGubun=3&menuSeq=5890" target="_blank" title="새창으로 이동" >입찰정보</a>
									</li>
									<li >
										<a href="/gyeyak/cntrt/cstnCntrtList.do?menuFg=C1&cntrtFlag=1&menuSeq=5899" target="_blank" title="새창으로 이동" >계약정보</a>
									</li>
									<li >
										<a href="/gyeyak/openMain.do?menuFg=K1&cntrtFlag=1&upmuGubun=&amp;menuSeq=5203" target="_blank" title="새창으로 이동" >신기술특허OPEN창구</a>
									</li>
									<li >
										<a href="/gyeyak/order/orderList.do?menuFg=A1&cntrtFlag=&upmuGubun=3&menuSeq=5916" target="_blank" title="새창으로 이동" >대금지급</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=4620" >조직정보공개</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4620"  >대전시 공무원 정원</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6146"  >대전시 공무원 현원</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/board/boardNormalList.do?boardId=normal_0201&amp;menuSeq=1482" >정책실명제</a>
						<ul class="depth3 noData">
								<li>하위 메뉴 없음</li>
							</ul>
							</li>
							<li >
						<a href="/drh/depart/board/boardNormalList.do?boardId=ins_0002&menuSeq=1042" >감사결과공개</a>
						<ul class="depth3 noData">
								<li>하위 메뉴 없음</li>
							</ul>
							</li>
							</ul>
							</li>
							<li class="gnb02">
							<a class="snbLeftA" href="/drh/citizen/index.do?menuSeq=1439" >참여마당</a>
						<ul class="depth2 dep2">
					<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=6372" >시정참여</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6372"  >대전시에 바란다(국민신문고)</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6373"  >시장에게 바란다</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4606"  >시민시정제안</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6860"  >숙의제도</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6374"  >대전시소</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6375"  >대전주민참여예산</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=7191"  >고향사랑기부제</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=6854" >일반참여</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6854"  >공모·설문</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0168&amp;menuSeq=1548"  >칭찬합시다</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0167&amp;menuSeq=1547"  >자유게시판</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/board/boardNormalList.do?boardId=normal_0169&menuSeq=1549" >시민단체</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0169&amp;menuSeq=1549"  >알려드립니다</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1768"  >단체등록안내</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1552" >기부문화</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1552"  >기부금대상민간단체 안내</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5048"  >기부금품모집안내</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0173&amp;menuSeq=1553"  >기부금품모집자료실</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0174&amp;menuSeq=1554"  >기부금품모집등록현황</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4183"  >기부참여안내</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=4858" >SMS서비스</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4858"  >대기오염경보 SMS</a>
									</li>
									</ul>
							 </li>
							</ul>
							</li>
							<li class="gnb03">
							<a class="snbLeftA" href="/drh/civil_apeal/index.do?menuSeq=1440" >전자민원</a>
						<ul class="depth2 dep2">
					<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=4769" >대전시에 바란다</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4769"  >대전시에 바란다</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4784"  >나의민원</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1563" >민원안내</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1563"  >민원소개·법령</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1771"  >민원편의시책</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=3453"  >자격증 재발급</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1565"  >무인민원발급기</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1566"  >분야별민원안내</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1567"  >시청 민원실 안내도</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1464"  >민원신청/조회</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1571" >여권안내</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1571"  >여권개요</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1575"  >여권교부/보관및반납</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=6655" >원스톱(통합) 민원안내</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6655"  >원스톱민원안내</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6654"  >2021년3월31일이전내용보기</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=5079" >민원신고센터</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5079"  >교통민원</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5067"  >화물운송불법/불공정</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4775"  >환경신문고</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4778"  >부동산실거래가위반</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4783"  >중개업소위법부당행위</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1799"  >예산낭비신고센터</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5756"  >공무원 비리익명제보</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6638"  >공직자 비리신고</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5461"  >민원부조리 신고</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4628"  >자동차관리법 위반행위 신고</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4741"  >안전신문고</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5252"  >인권침해 구제신청</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6578"  >불법하도급신고</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=7129" >부패공익신고</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=7129"  >부패·공익신고</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=3323"  >복지·보조금 부정신고</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1891" >규제개혁</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1891"  >규제개혁이란?</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1897"  >등록규제 현황</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5815"  >지방규제신고센터</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5089"  >국무조정실 규제개혁신문고</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6571"  >규제입증요청</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5180"  >규제정보포털</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0097&amp;menuSeq=6927"  >규제혁신 알림/소식</a>
									</li>
									<li >
										<a href="/drh/administration/board/boardGalleryList.do?boardId=gallery_0020&amp;menuSeq=6928"  >규제혁신 카드뉴스</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=6442" >적극행정</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6442"  >제도소개</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0310&amp;menuSeq=6443"  >알림소식</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6444"  >적극행정 국민추천</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/minwonFormList.do?boardId=normal_0200&amp;menuSeq=1466" >민원사무편람/서식</a>
						<ul class="depth3 noData">
								<li>하위 메뉴 없음</li>
							</ul>
							</li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=7195" >버스전용차로 민원</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=7195"  >버스전용차로 위반 안내</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=7197"  >과태료 납부 안내</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=7198"  >의견진술 및 이의신청 안내</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=7199"  >버스전용차로 CCTV현황</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=7200"  >임차인 변경 안내</a>
									</li>
									</ul>
							 </li>
							</ul>
							</li>
							<li class="gnb04">
							<a class="snbLeftA" href="/drh/administration/index.do?menuSeq=1442" >행정정보</a>
						<ul class="depth2 dep2">
					<li >
						<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&amp;menuSeq=1479" >Story대전</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&categorySeq=294&amp;menuSeq=1627"  >일류 경제</a>
									</li>
									<li >
										<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&categorySeq=295&amp;menuSeq=1628"  >일류 문화</a>
									</li>
									<li >
										<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&categorySeq=293&amp;menuSeq=1626"  >일류 복지</a>
									</li>
									<li >
										<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&categorySeq=296&amp;menuSeq=1629"  >일류 과학</a>
									</li>
									<li >
										<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&categorySeq=292&amp;menuSeq=1625"  >일류 환경</a>
									</li>
									<li >
										<a href="/drh/drhStoryDaejeonList.do?boardId=blog_0001&categorySeq=291&amp;menuSeq=1624"  >일류 행정</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/board/boardNormalList.do?boardId=normal_0096&amp;menuSeq=1631" >시정뉴스</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0096&amp;menuSeq=1631"  >시정소식</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_1029&amp;menuSeq=5056"  >달라지는 대전생활</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0189&amp;menuSeq=6825"  >보도자료</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0124&amp;menuSeq=1639"  >보도해명자료</a>
									</li>
									<li >
										<a href="/fvu/index.do" target="_blank" title="새창으로 이동" >행사안내</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=7176"  >입찰정보</a>
									</li>
									<li >
										<a href="/drh/administration/board/boardGalleryList.do?boardId=gallery_0019&amp;menuSeq=4637"  >시정카드뉴스</a>
									</li>
									<li >
										<a href="/drh/blogBoardView.do?boardId=fact_check&amp;menuSeq=5651"  >핫뉴스</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0123&amp;menuSeq=1638"  >타기관소식</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_1028&amp;menuSeq=6622"  >주요업무계획</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/drhRegulationsList.do?menuSeq=1660" >시정자료실</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/drhRegulationsList.do?menuSeq=1660"  >공보(고시공고)</a>
									</li>
									<li >
										<a href="/ada/index.do" target="_blank" title="새창으로 이동" >행정자료실</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=pla_0005&amp;menuSeq=6869"  >학술용역 활용상황</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_1024&amp;menuSeq=6360"  >시민의식조사</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1876" >법무행정정보</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1876"  >행정심판</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1880"  >소청심사</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1883"  >소송</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1654"  >대법원판례</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1886"  >행정절차제도</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1648"  >자치법규</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1655"  >법령해석사례</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6576"  >법령</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6452"  >지방세 납세자보호관</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/bud/index.do" target="_blank" title="새창으로 이동">예산/재정</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/bud/BudFinanceboardList.do?boardId=budboard005&menuSeq=349" target="_blank" title="새창으로 이동" >세입세출예산서</a>
									</li>
									<li >
										<a href="/bud/BudFinanceboardList.do?boardId=budboard011&menuSeq=353" target="_blank" title="새창으로 이동" >재정공시</a>
									</li>
									<li >
										<a href="/bud/BudContentsHtmlView.do?menuSeq=354" target="_blank" title="새창으로 이동" >주민참여예산제</a>
									</li>
									<li >
										<a href="/bud/BudFinanceboardList.do?boardId=budboard006&menuSeq=350" target="_blank" title="새창으로 이동" >결산</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/urb/index.do" target="_blank" title="새창으로 이동">도시주택정보</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/urb/UrbCityPlanDisplayList.do?menuSeq=1102" target="_blank" title="새창으로 이동" >도시계획</a>
									</li>
									<li >
										<a href="/urb/ContentsHtmlView.do?menuSeq=6475" target="_blank" title="새창으로 이동" >도시재생</a>
									</li>
									<li >
										<a href="/urb/ContentsHtmlView.do?menuSeq=1170" target="_blank" title="새창으로 이동" >도시정비</a>
									</li>
									<li >
										<a href="/urb/ContentsHtmlView.do?menuSeq=1249" target="_blank" title="새창으로 이동" >건축·주택</a>
									</li>
									<li >
										<a href="/urb/ContentsHtmlView.do?tapMenuSeq=1180&menuSeq=1179" target="_blank" title="새창으로 이동" >택지·도시개발</a>
									</li>
									<li >
										<a href="/urb/ContentsHtmlView.do?menuSeq=1306" target="_blank" title="새창으로 이동" >도시경관</a>
									</li>
									<li >
										<a href="/urb/ContentsHtmlView.do?menuSeq=1350" target="_blank" title="새창으로 이동" >토지정책</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/MediaList.do?menuSeq=2558" >대전소식모아보기(자치구)</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/MediaList.do?notiType=NOTI_01&amp;menuSeq=2559"  >공지사항</a>
									</li>
									<li >
										<a href="/drh/MediaList.do?notiType=NOTI_03&amp;menuSeq=2561"  >문화행사</a>
									</li>
									<li >
										<a href="/drh/MediaList.do?notiType=NOTI_04&amp;menuSeq=2562"  >입법예고</a>
									</li>
									<li >
										<a href="/drh/MediaList.do?notiType=NOTI_05&amp;menuSeq=2563"  >타기관 채용정보</a>
									</li>
									<li >
										<a href="/drh/MediaList.do?notiType=NOTI_06&amp;menuSeq=2564"  >고시공고</a>
									</li>
									<li >
										<a href="/drh/MediaList.do?notiType=NOTI_07&amp;menuSeq=2565"  >입찰정보</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/ins/index.do?menuSeq=1034" >감사행정</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/depart/board/boardNormalList.do?boardId=ins_0003&menuSeq=1057"  >감사정보</a>
									</li>
									<li >
										<a href="/drh/depart/board/boardNormalList.do?boardId=ins_0002&menuSeq=1042"  >감사결과</a>
									</li>
									<li >
										<a href="/drh/depart/board/boardNormalList.do?boardId=ins_0004&menuSeq=1058"  >감사(청렴)자료실</a>
									</li>
									<li >
										<a href="/ins/InsContentsHtmlView.do?menuSeq=4597"  >사전 컨설팅감사</a>
									</li>
									<li >
										<a href="/ins/InsContentsHtmlView.do?menuSeq=6389"  >적극행정 면책제도</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="https://www.daejeon.go.kr/djpol/index.do" target="_blank" title="새창으로 이동">자치경찰위원회</a>
						<ul class="depth3 dep3">
									<li >
										<a href="https://www.daejeon.go.kr/djpol/contentView.do?menuSeq=6890" target="_blank" title="새창으로 이동" >위원회소개</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/djpol/contentView.do?menuSeq=6895" target="_blank" title="새창으로 이동" >정책마당</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/djpol/depart/normalBoardList.do?boardId=pol_0003&menuSeq=6901" target="_blank" title="새창으로 이동" >회의마당</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/djpol/contentView.do?menuSeq=6903" target="_blank" title="새창으로 이동" >참여마당</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/djpol/depart/normalBoardList.do?boardId=djPol_0009&menuSeq=6907" target="_blank" title="새창으로 이동" >알림마당</a>
									</li>
									</ul>
							 </li>
							</ul>
							</li>
							<li class="gnb05">
							<a class="snbLeftA" href="/drh/economy/index.do?menuSeq=1441" >열린경제</a>
						<ul class="depth2 dep2">
					<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1815" >과학산업</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1815"  >대덕연구개발특구</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=7178"  >대덕특구 재창조</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6700"  >4차 산업혁명 특별시</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1597" >기업지원</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1597"  >중소기업(소상공인)지원</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1823"  >투자유치</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6864"  >중소기업제품 공공구매</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1658"  >지방기업 규제불편 신고창구</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4852"  >해외통상사무소</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5640"  >지역 기술개발제품</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1472" >고용동향</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1602"  >대전일자리지원센터</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1603"  >인재검색</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1604"  >공개채용정보</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1606"  >대학교취업정보</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1607"  >관련기관안내</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1609" >부동산정보</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1609"  >부동산개발업등록</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1610"  >부동산중개업정보</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1611"  >공시지가조회</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1612"  >토지이용계획</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1837" >소비자정보</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/cons/index.do" target="_blank" title="새창으로 이동" >소비생활센터</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1615"  >생활지리정보</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1837"  >농수산물정보</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/price/index.do?menuSeq=3302" >물가정보</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=3303"  >소비자물가지수</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_1007&amp;menuSeq=3304"  >소비자물가동향</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_1008&amp;menuSeq=3305"  >개인서비스 가격동향</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_1009&amp;menuSeq=3306"  >주요생필품 물가동향</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=3308"  >주요공공요금</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=3318"  >착한가격업소</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/board/boardNormalList.do?boardId=normal_0187&amp;menuSeq=1618" >경제지표</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0187&amp;menuSeq=1618"  >경제지표</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0188&amp;menuSeq=1619"  >월간경제</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1620" >협동조합</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1620"  >협동조합이란?</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1621"  >협동조합 설립신고 절차</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0152&amp;menuSeq=1622"  >자료실</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=6666" >청년정책</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6666"  >대전청년내일센터</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4828"  >청년 임차보증금 이자지원</a>
									</li>
									</ul>
							 </li>
							</ul>
							</li>
							<li class="gnb06">
							<a class="snbLeftA" href="/drh/life/index.do?menuSeq=1443" >생활정보</a>
						<ul class="depth2 dep2">
					<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1662" >교육·상담</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1662"  >디지털배움터</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1663"  >대전의 대학교</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1912"  >인터넷중독예방 상담</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5278"  >인권침해 상담</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1914" >복지</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1914"  >국민기초생활보장</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1917"  >의료급여제도</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=3256"  >긴급복지지원</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2116"  >장애인복지</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1925"  >어르신</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=3143"  >다자녀</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=3150"  >보육</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2269"  >가정복지ㆍ다문화</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4743"  >청소년ㆍ아동</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1671"  >노숙인복지</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1940"  >사회복지관</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1947"  >장묘관리</a>
									</li>
									<li >
										<a href="/wel/WelContentsHtmlView.do?menuSeq=2718" target="_blank" title="새창으로 이동" >보훈공원</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1951"  >지역자율형사회서비스</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4608"  >의사상자 지원제도</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6830"  >주거복지</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=5853" >성인지정책</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5853"  >성인지감수성충전소</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2254"  >양성평등정책</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5855"  >여성</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2153"  >가족</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/life/NightfloatOntheDayList.do?menuSeq=1678" >건강과의료</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/life/NightfloatOntheDayList.do?menuSeq=1678"  >당직의료기관</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1955"  >보건소</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1680"  >예방접종</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6848"  >모성건강</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2176"  >생활건강</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1684"  >관련사이트</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1686"  >당번약국</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1968" >환경정보</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1968"  >환경정책</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1970"  >환경협력</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5782"  >물순환회복</a>
									</li>
									<li >
										<a href="/hea/index.do" target="_blank" title="새창으로 이동" >대기정보</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6589"  >미세먼지정보</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=3275"  >자연환경조사</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2194"  >재활용정보</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1984"  >음식물쓰레기자원화</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1694"  >기후변화대응</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1693"  >관련사이트</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=2230" >3대하천정보</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2230"  >대전의 3대하천</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2235"  >3대하천 사업현황</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2225"  >3대하천 편의시설 및 이용신청</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=4550"  >하천용어</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/saf/index.do" target="_blank" title="새창으로 이동">재난·안전</a>
						<ul class="depth3 dep3">
									<li >
										<a href="https://www.daejeon.go.kr/saf/SafContentsHtmlView.do?menuSeq=6851" target="_blank" title="새창으로 이동" >어린이안전관리 제도</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/saf/SafContentsHtmlView.do?menuSeq=6610" target="_blank" title="새창으로 이동" >시민안전보험</a>
									</li>
									<li >
										<a href="/saf/SafContentsHtmlView.do?menuSeq=1278" target="_blank" title="새창으로 이동" >자연재난 길잡이</a>
									</li>
									<li >
										<a href="/saf/SafContentsHtmlView.do?menuSeq=1279" target="_blank" title="새창으로 이동" >사회재난 길잡이</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=6940" >시설이용</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6940"  >대전반려동물공원</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2493"  >공공체육시설</a>
									</li>
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_1046&amp;menuSeq=1703"  >동네체육시설</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1704"  >하천체육시설</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1706"  >시설이용신청</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2525"  >청소년수련시설</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=6526" >지역인재 의무채용</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6526"  >제도 안내</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6531"  >공공기관 목록</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6633"  >공공기관 채용정보</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6535"  >2022 지역인재 채용설명회</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6536"  >자주하는 질문</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1497" >바로가기</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/urb/index.do" target="_blank" title="새창으로 이동" >도시주택정보</a>
									</li>
									<li >
										<a href="/djTram/index.do" target="_blank" title="새창으로 이동" >대전트램</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1497"  >교통정보</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5066"  >분실물 찾기</a>
									</li>
									<li >
										<a href="/hea/index.do" target="_blank" title="새창으로 이동" >보건환경연구원</a>
									</li>
									<li >
										<a href="/far/index.do" target="_blank" title="새창으로 이동" >농업기술센터</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5857"  >수돗물 수질정보</a>
									</li>
									<li >
										<a href="https://daejeon.go.kr/djeco/index.do" target="_blank" title="새창으로 이동" >친환경학교급식</a>
									</li>
									</ul>
							 </li>
							</ul>
							</li>
							<li class="gnb07">
							<a class="snbLeftA" href="/drh/daejeon/index.do?menuSeq=1444" >대전소개</a>
						<ul class="depth2 dep2">
					<li >
						<a href="/drh/drhOrganization.do?menuSeq=6376" >시청안내</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/drhOrganization.do?menuSeq=6376"  >조직도 및 직원안내</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1848"  >청사안내</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1850"  >시민이용시설</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1846"  >청사둘러보기</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1643"  >오시는 길</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1759"  >대전120콜센터</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=6708" >대전의상징</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6708"  >시정구호·엠블렘</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1708"  >대전의 꽃·나무·새</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=3294"  >대전의 깃대종</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1711"  >상징마크·로고·대전색</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1713"  >캐릭터</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2024"  >브랜드 슬로건</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6861"  >대전 홍보영상</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6759"  >Daejeon is U 이모티콘</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2059"  >대전사랑운동</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5085"  >대전의노래</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1748"  >시민헌장</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=6867"  >홍보대사</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=2033" >대전의현황</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2033"  >자연환경</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1716"  >행정구역</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1717"  >대전의지명</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=2038" >사이버역사관</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=2038"  >대전의역사</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1719"  >대전의연혁</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/his/board/musBoardDataList.do?bbsCode=hispeople&amp;menuSeq=670" target="_blank" title="새창으로 이동" >대전의인물</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1722"  >시정ㆍ경제ㆍ환경백서</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5824"  >대전찰칵</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1725"  >기록관</a>
									</li>
									<li >
										<a href="/its/index.do" target="_blank" title="새창으로 이동" >월간일류도시대전</a>
									</li>
									<li >
										<a href="https://tv.daejeon.go.kr/?menuSeq=6370" target="_blank" title="새창으로 이동" >대전인터넷방송</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="https://www.daejeon.go.kr/sta/index.do" target="_blank" title="새창으로 이동">대전의통계</a>
						<ul class="depth3 dep3">
									<li >
										<a href="https://www.daejeon.go.kr/sta/StaDaejeonTodayList.do?menuSeq=20" target="_blank" title="새창으로 이동" >한눈에보는 대전</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/sta/StaStatisticsFldList.do?menuSeq=180" target="_blank" title="새창으로 이동" >통계자료</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/sta/StaSocialindicatorList.do?menuSeq=472" target="_blank" title="새창으로 이동" >e-대전통계</a>
									</li>
									<li >
										<a href="https://www.daejeon.go.kr/sta/StaStatisticsNewsList.do?menuSeq=186" target="_blank" title="새창으로 이동" >통계관련정보</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/DrhContentsHtmlView.do?menuSeq=1728" >국제협력</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1728"  >자매우호도시</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1741"  >자매우호도시 홍보관</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5276"  >국제기구</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5277"  >외국인주민 통합지원센터</a>
									</li>
									</ul>
							 </li>
							<li >
						<a href="/drh/board/boardNormalList.do?boardId=normal_0164&amp;menuSeq=1518" >원도심이야기</a>
						<ul class="depth3 dep3">
									<li >
										<a href="/drh/board/boardNormalList.do?boardId=normal_0164&amp;menuSeq=1749"  >원도심 소식</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1750"  >원도심 자랑</a>
									</li>
									<li >
										<a href="/fod/index.do" target="_blank" title="새창으로 이동" >맛집 찾기</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=1752"  >원도심으로 오세요</a>
									</li>
									<li >
										<a href="/drh/DrhContentsHtmlView.do?menuSeq=5825"  >대전스카이로드 운영</a>
									</li>
									</ul>
							 </li>
							</ul>
							</li>
							<!--  자주 찾는 정보 시작 -->
					<li class="gnb08"><a class="snbLeftA" href="#"><span>자주찾는 정보</span></a>
  <ul class="depth2">
    <li><a href="">행정예산세정</a>
      <div class="depth3">
        <dl>
          <dt>자치법규</dt>
          <dd>
            <ul>
               <li><a href="https://www.elis.go.kr/locgovalr/locgovClAlrList?ctpvSggCd=30000" target="_blank" title="새창열림">자치법규</a></li>
               <li><a href="https://www.daejeon.go.kr/sta/index.do" target="_blank" title="새창열림">대전의 통계</a></li>
               <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1891" target="_blank" title="새창열림">규제개혁</a></li>
               <li><a href="/drh/information/informationList.do?menuSeq=1540" target="_blank" title="새창열림">행정정보목록</a></li>
               <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1848" target="_blank" title="새창열림">시청안내</a></li>
               <li><a href="/mayor/index.do" target="_blank" title="새창열림">열린시장실</a></li>
               <li><a href="/ada/index.do" target="_blank" title="새창열림">행정자료실</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>세정</dt>
          <dd>
            <ul>
               <li><a href="https://www.daejeon.go.kr/tax/index.do" target="_blank" title="새창열림">세정도우미</a></li>
               <li><a href="https://www.daejeon.go.kr/tax/TaxContentsHtmlView.do?menuSeq=4710" target="_blank" title="새창열림">지방세납부안내</a></li>
               <li><a href="https://www.daejeon.go.kr/tax/TaxContentsHtmlView.do?menuSeq=4704" target="_blank" title="새창열림">마을세무사</a></li>
			   <li><a href="https://www.daejeon.go.kr/tax/TaxContentsHtmlView.do?menuSeq=4714" target="_blank" title="새창열림">구제제도</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>예산</dt>
          <dd>
            <ul>
               <li><a href="https://www.daejeon.go.kr/bud/BudFinanceboardList.do?boardId=budboard005&menuSeq=349" target="_blank" title="새창열림">세입세출예산서</a></li>
               <li><a href="https://www.daejeon.go.kr/bud/BudFinanceboardList.do?boardId=budboard011&amp;menuSeq=353" target="_blank" title="새창열림">재정공시</a></li>
               <li><a href="/bud/financeinfo/main.do?menuSeq=5163" target="_blank" title="새창열림">재정정보공개</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">문화관광체육</a>
      <div class="depth3">
        <dl>
          <dt>관광</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeontour.co.kr/ko/index.do" target="_blank" title="새창열림">대전관광</a></li>
              <li><a href="https://www.daejeontour.co.kr/ko/festival/festivalList.do?menuIdx=147" target="_blank" title="새창열림">대전의축제</a></li>
              <li><a href="https://www.oworld.kr/newkfsweb/kfs/dcco/dccoMainindex.do" target="_blank" title="새창열림">오월드(대전동물원)</a></li>
              <li><a href="https://www.daejeon.go.kr/fod/index.do" target="_blank" title="새창열림">대전의맛</a></li>
              <li><a href="https://www.daejeontour.co.kr/ko/board.do?menuIdx=160" target="_blank" title="새창열림">관광자료 신청</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>문화</dt>
          <dd>
            <ul>
              <li><a href="/fvu/index.do" target="_blank" title="새창열림">행사안내</a></li>
              <li><a href="https://daejeon.go.kr/djac/index.do" target="_blank" title="새창열림">대전예술의전당</a></li>
              <li><a href="https://www.daejeon.go.kr/kmusic/index.do" target="_blank" title="새창열림">대전시립연정국악원</a></li>
              <li><a href="https://www.daejeon.go.kr/lif/index.do" target="_blank" title="새창열림">여성가족원</a></li>
              <li><a href="https://daejeon.go.kr/dma/index.do" target="_blank" title="새창열림">시립미술관</a></li>
              <li><a href="https://www.daejeon.go.kr/pre/index.do" target="_blank" title="새창열림">선사박물관</a></li>
              <li><a href="https://www.daejeon.go.kr/his/index.do" target="_blank" title="새창열림">시립박물관</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>체육</dt>
          <dd>
            <ul>
              <li><a href="https://daejeon.go.kr/okr2019/lendRsvtList.do?menuSeq=8701&ntatcDelYn=Y&boardUseYn=N&menuUseYn=N" target="_blank" title="새창열림">축구장 예약</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">생생뉴스/민원</a>
      <div class="depth3">
        <dl>
          <dt>민원안내</dt>
          <dd>
            <ul>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1571" target="_blank" title="새창열림">여권</a></li>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1565" target="_blank" title="새창열림">무인민원발급기</a></li>
              <li><a href="/drh/minwonFormList.do?boardId=normal_0200&menuSeq=1466" target="_blank" title="새창열림">민원사무편람</a></li>
              <li><a href="https://sido.daejeon.go.kr/citynet/jsp/svp/home.jsp" target="_blank" title="새창열림">민원처리공개</a></li>
              <li><a href="/drh/open/index.do?menuSeq=1438" target="_blank" title="새창열림">정보공개</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>생생뉴스</dt>
          <dd>
            <ul>
              <li><a href="/drh/board/boardNormalList.do?boardId=normal_0096&menuSeq=1631" target="_blank" title="새창열림">시정소식</a></li>
              <li><a href="/drh/MediaList.do?menuSeq=2558" target="_blank" title="새창열림">대전소식모아보기</a></li>
              <li><a href="/exa/index.do" target="_blank" title="새창열림">시험정보</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">보건복지환경</a>
      <div class="depth3">
        <dl>
          <dt>환경</dt>
          <dd>
            <ul>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1968" target="_blank" title="새창열림">환경정보</a></li>
              <li><a href="/hea/index.do" target="_blank" title="새창열림">대기정보</a></li>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=2230" target="_blank" title="새창열림">행복한3대하천 만들기</a></li>
              <li><a href="https://www.waterworks.daejeon.kr" target="_blank" title="새창열림">상수도</a></li>
              <li><a href="/hea/index.do" target="_blank" title="새창열림">보건환경연구원</a></li>
              <li><a href="/ist/index.do" target="_blank" title="새창열림">곤충박물관</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>복지</dt>
          <dd>
            <ul>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1914" target="_blank" title="새창열림">국민기초생활</a></li>
              <li><a href="https://daejeon.childcare.go.kr/" target="_blank" title="새창열림">대전보육정보센터</a></li>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1940" target="_blank" title="새창열림">사회복지</a></li>
              <li><a href="https://www.kead.or.kr/index.jsp" target="_blank" title="새창열림">한국장애인고용공단</a></li>
              <li><a href="https://www.safe182.go.kr" target="_blank" title="새창열림">실종아동/어르신찾기</a></li>
              <li><a href="/drh/board/boardNormalList.do?boardId=normal_0153&amp;menuSeq=1921" target="_blank" title="새창열림">점자시정소식</a></li>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=2123&menuSeq=1922" target="_blank" title="새창열림">장애인일자리</a></li>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=3143" target="_blank" title="새창열림">다자녀가정우대</a></li>
              <li><a href="http://bigdata.daejeon.go.kr/condition/healthwelfare/popupN.do" target="_blank" title="새창열림">대전복지MAP</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>보건</dt>
          <dd>
            <ul>
              <li><a href="/drh/life/NightfloatOntheDayList.do?menuSeq=1678" target="_blank" title="새창열림">당직의료기관</a></li>
              <li><a href="https://www.pharm114.or.kr/common_files/sub2_page2.asp?addr1=%B4%EB%C0%FC%B1%A4%BF%AA%BD%C3" target="_blank" title="새창열림">당번약국</a></li>
              <li><a href="https://www.hira.or.kr/rd/hosp/plcMedInfm.do?pgmid=HIRAA050303000001&sidoCd=250000&sgguCd=250003#" target="_blank" title="새창열림">우리지역 좋은병원 찾기</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">도시주택정보</a>
      <div class="depth3">
        <dl>
		  <dt>도시계획</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1111" target="_blank" title="새창열림">도시계획위원회</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1117" target="_blank" title="새창열림">2030년도시기본계획</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1131" target="_blank" title="새창열림">지구단위계획</a></li>
            </ul>
          </dd>
		  <dt>도시경관</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1307" target="_blank" title="새창열림">경관위원회</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?tapMenuSeq=1311&menuSeq=1310" target="_blank" title="새창열림">경관계획</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=6489" target="_blank" title="새창열림">건축정책위원회</a></li>
			  <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1337" target="_blank" title="새창열림">옥외광고물상식</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>도시정비</dt>
          <dd>
            <ul>
               <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1170" target="_blank" title="새창열림">도시정비기본계획</a></li>
               <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=4050" target="_blank" title="새창열림">도시재정비촉진계획</a></li>
               <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=4052" target="_blank" title="새창열림">소규모주거정비</a></li>
               <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=4063" target="_blank" title="새창열림">주거환경개선</a></li>
            </ul>
          </dd>
		  <dt>건축&middot;주택</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1253" target="_blank" title="건축·주택정보 새창으로 열림">건축·주택정보</a></li>
			  <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?tapMenuSeq=4764&menuSeq=4764" target="_blank" title=" 새창으로 열림">대전지역 건설업체(자재포함) 정보</a></li>
              <li><a href="https://www.eais.go.kr/" target="_blank" title="건축행정(세움터) 새창으로 열림">건축행정(세움터)</a></li>
              <li><a href="https://hwanji.daejeon.go.kr/" target="_blank" title="환지조서발급 새창으로 열림">환지조서발급</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/UrbNormalboardList.do?boardId=normal_0033&menuSeq=1246" target="_blank" title="자료실 새창으로 열림">자료실</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
		  <dt>택지&middot;도시개발</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?menuSeq=1179&tapMenuSeq=1180" target="_blank" title="택지개발사업 새창으로 열림">택지개발사업</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/ContentsHtmlView.do?tapMenuSeq=1190&menuSeq=1189" target="_blank" title="도시개발사업 새창으로 열림">도시개발사업</a></li>
              <li><a href="https://www.daejeon.go.kr/urb/UrbNormalboardList.do?boardId=normal_0026&menuSeq=1187" target="_blank" title="자료실 새창으로 열림">자료실</a></li>
            </ul>
          </dd>
		  <dt>측량기준점 정보</dt>
          <dd>
            <ul>
              <li><a href="/urb/ContentsHtmlView.do?menuSeq=5181" target="_blank" title="국가기준점, 지적 기준점 새창으로 열림">국가기준점지적기준점</a></li>
              <li><a href="/urb/ContentsHtmlView.do?menuSeq=5182" target="_blank" title="복합(공공)기준점 새창으로 열림">복합(공공)기준점</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">시민참여</a>
      <div class="depth3">
        <dl>
          <dt>자율참여</dt>
          <dd>
            <ul>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=4769" target="_blank" title="새창열림">대전시에 바란다</a></li>
              <li><a href="/drh/board/boardNormalList.do?boardId=normal_0167&menuSeq=1547" target="_blank" title="새창열림">자유게시판</a></li>
              <li><a href="/drh/board/boardNormalList.do?boardId=normal_0168&menuSeq=1548" target="_blank" title="새창열림">칭찬합시다</a></li>
              <li><a href="https://daejeon.go.kr/online/index.do" target="_blank" title="새창열림">설문참여</a></li>
              <li><a href="https://www.daejeon.go.kr/jumin/index.do" target="_blank" title="새창열림">주민참여예산제</a></li>
              <li><a href="/okr/index.do" target="_blank" title="새창열림">OK예약서비스</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>교육/강좌</dt>
          <dd>
            <ul>
              <li><a href="https://daejeon.go.kr/okr2019/eduRsvtList.do?menuSeq=8100&ntatcDelYn=Y&boardUseYn=N&menuUseYn=N" target="_blank" title="새창열림">OK예약(강좌,시설)</a></li>
              <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1662" target="_blank" title="새창열림">시민정보화교육</a></li>
              <li><a href="/lif/index.do" target="_blank" title="새창열림">여성가족원</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">교통건설소방</a>
      <div class="depth3">
        <dl>
          <dt>교통</dt>
          <dd>
            <ul>
              <li><a href="https://www.djet.co.kr/" target="_blank" title="새창열림">지하철정보</a></li>
              <li><a href="/veh/VehCarInsptView.do?menuSeq=587" target="_blank" title="새창열림">자동차검사일조회</a></li>
              <li><a href="https://www.tashu.or.kr/mainPageAction.do?process=mainPage" target="_blank" title="새창열림">시민공용자전거(타슈)</a></li>
			  <li><a href="https://carfree.daejeon.go.kr" target="_blank" title="새창열림">승용차요일제</a></li>
			  <li><a href="https://www.daejeon.go.kr/bus/index.do" target="_blank" title="새창열림">시내버스 시민모니터단</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>건설</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeon.go.kr/saf/index.do" target="_blank" title="새창열림">Safe대전</a></li>
              <li><a href="https://www.daejeon.go.kr/gun/index.do" target="_blank" title="새창열림">건설관리본부</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>소방</dt>
          <dd>
            <ul>
               <li><a href="https://www.daejeon.go.kr/dj119/index.do" target="_blank" title="새창열림">소방본부</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">경제과학</a>
      <div class="depth3">
        <dl>
          <dt>경제</dt>
          <dd>
            <ul>
               <li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1597" target="_blank" title="새창열림">기업지원</a></li>
               <li><a href="/cons/index.do" target="_blank" title="새창열림">소비생활센터</a></li>
               <li><a href="/ohj/index.do" target="_blank" title="새창열림">오정농수산물도매시장</a></li>
               <li><a href="/noe/index.do" target="_blank" title="새창열림">노은농수산물도매시장</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>과학</dt>
          <dd>
            <ul>
              <li><a href="https://www.djtp.or.kr/" target="_blank" title="새창열림">대덕테크노파크</a></li>
              <li><a href="https://www.science.go.kr/" target="_blank" title="새창열림">국립중앙과학관</a></li>
            </ul>
          </dd>
        </dl>
      </div>
    </li>
    <li><a href="#">동물보호센터</a>
     <div class="depth3">
        <dl>
          <dt>동물보호센터</dt>
          <dd>
            <ul>
              <li><a href="/ani/AniStrayAnimalList.do?menuSeq=3108" target="_blank" title="새창열림">보호동물공고</a></li>
              <li><a href="/ani/AniContentsHtmlView.do?menuSeq=119" target="_blank" title="새창열림">동물등록제</a></li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>입양참여</dt>
          <dd>
            <ul>
              <li><a href="https://www.daejeon.go.kr/ani/AniAdoptionApplicationList.do?menuSeq=124" target="_blank" title="새창열림">입양신청</a></li>
              <li><a href="https://www.daejeon.go.kr/ani/AniAdoptionCommentList.do?menuSeq=125" target="_blank" title="새창열림">입양후기</a></li>
            </ul>
          </dd>
        </dl>
      </div> 
    </li>
  </ul><!--  자주 찾는 정보 끝 -->
				<!--  실국홈페이지 시작 -->
				<li class="gnb09">
					<a href="/off/OffContentsHtmlView.do?menuSeq=1068" target="_blank">실국홈페이지</a>
				</li>
				<!--  실국홈페이지 끝 -->
			</ul>
		</nav>
	</div>
</div>
<!-- //SNB layer --><!-- //hader -->
	<div class="wrap">
		<div class="container">
			<!-- leftmenu -->
			<nav class="snb snb02">
	<h1 >
	<!-- 메뉴가 새창이면 새로운 메뉴 Level 구조로 변경  -->
			</h1>
		<ul>
			</ul>
	</nav><!-- //leftmenu -->

			<div class="wrapCnt">
				<!-- content -->
				<!-- menuNavi -->
				<script>
// alert("");
</script>
	<header>
		<h2 class="tit" id="ckSubNm"></h2>
		<div class="bcNav">
		<span class="home">Home</span>
<!-- 모바일일때 서브메인지움 -->
		</div>
<script type="text/javascript"> 
		$(document).ready(function() {
			if(""==''){
			$("#ckSubNm").text("");
			}else{
			$("#ckSubNm").text("");
			}
		});
		</script>	
<ul class="listIcon">
	<li><a href="#none" onclick="javascript:facebook();return false;" title="대전광역시 페이스북 새 창으로 이동"><span>Facebook 담기</span></a></li>
	<li><a href="#none" onclick="javascript:twitter('[대전광역시] ')" title="대전광역시 트위터 새 창으로 이동"><span>Twitter 담기</span></a></li>
	<!-- <li><a href="/common/print.jsp" class="link2" onclick="window.open('/common/print.jsp', 'print', 'width=1034, height=500, scrollbars=1');return false;" target="_blank" title="새창으로 이동"><span>인쇄</span></a></li> -->
	<li><a href="#none" class="link2" onclick="window.open('/common/print.do', 'print', 'width=1034, height=500, scrollbars=1');return false;" target="_blank" title="새창으로 이동"><span>인쇄</span></a></li>
	<li><a href="#none" onclick="bookmarks('/drh/acm/drhAcmBoardList.do','');return false;" class="link1"><span>스크랩</span></a></li>
</ul>

</header><!-- //menuNavi -->
				<div id="content" class="contents">
					<script>
var delta = 300;
var timerResize = null;
$(document).ready(function(e) {
	mobToggle ();
});
	
var cacheWidth = $(window).width();
$(window).resize(function(){
	var newWidth = $(window).width();
	if(newWidth !== cacheWidth){
	//do
		clearTimeout(timerResize);
		timerResize = setTimeout(resizeDone, delta);
		function resizeDone(){
			mobToggle ();
			clearTimeout(timerResize);
	// 		location.reload();
		}
	}
});

$(window).ready(function(){
	$(".toggle_m").click(function(){
		$(this).toggleClass("ov");
		$(".teb2").slideToggle(400);	
		return false;	
	});
});

function mobToggle (){
	if($(window).width()<768){
		if($(".toggle_m").is(":hidden")){
//				$(".teb2").show();	
			$(".teb2").hide();
		} else {
			$(".toggle_m").removeClass("ov");
			$(".teb2").hide();
		}
		/* 
		$(".toggle_m").click(function(){
			alert("?");
			$(this).toggleClass("ov");
			$(".teb2").slideToggle(400);	
			return false;	
		});
		 */
		var tebChkYn = $("ul.teb2 li:gt(0) a.on").text();
// 			alert(tebChkYn);
		if(tebChkYn==''){
			$(".toggle_m").text($("ul.teb2 li:eq(0)").text());
		}else{
			$(".depth2_tab a:eq(0)").text(tebChkYn);
		}
	}else{
		$(".teb2").show();
	}
}

</script>
<!-- 게시판 리스트 시작 -->
					<div id="new_bbs">
						<p class="total_counter">
							총 <strong>234</strong>건&nbsp;&nbsp;|&nbsp;&nbsp;<strong>1/24</strong> 페이지
						</p>
						<div class="board_search">
							<form id="searchForm" name="searchForm" method="post" action="/drh/acm/drhAcmBoardList.do">
								<input type="hidden" name="pageIndex" value="1">
								<input type="hidden" name="menuSeq" value="">
								<fieldset>
									<legend>게시판 검색</legend>
									<label for="search_select">검색대상</label> 
									<select id="search_select" name="searchCondition" title="검색대상을 선택합니다">
										<option value="all">전체</option>
										<option value="acmNm" >위원회명</option>
										<option value="esbFunc" >주요기능</option>
										<option value="deptNm" >담당부서</option>
									</select> 
									<label for="searchKeyword">검색입력</label> 
									<input type="text" class="search_input" id="searchKeyword" name="searchKeyword" title="검색어를 입력하세요" value=""> 
									<input type="submit" class="" value="검색">
								</fieldset>
							</form>
						</div>

						<!-- 테이블 생성 -->
						<table class="board_table_list">
							<caption>위원회현황 (목록화면) – 번호, 분류, 위원회명, 주요기능 및 역활, 구성일자, 담당부서 정보를 제공하는 표 입니다.</caption>
							<colgroup>
								<col style="width: 7%;">
								<col style="width: 10%;">
								<col style="width: 18%;">
								<col style="width: auto;">
								<col style="width: 13%;">
								<col style="width: 18%;">
							</colgroup>
							<thead>
								<tr>
									<th scope="col" class="lnone">번호</th>
									<th scope="col">분류</th>
									<th scope="col">위원회명</th>
									<th scope="col">주요기능 및 역활</th>
									<th scope="col">구성일자</th>
									<th scope="col">담당부서</th>
								</tr>
							</thead>
							<tbody>
								<tr>
<td class="lnone">1</td>
										<td>농림수산</td>
<!-- 										<td class="subject"> -->
										<td class="al_left">
											<a href="/drh/acm/drhAcmBoardView.do?acmCode=227&esbFieGbn=&menuSeq=&amp;pageIndex=1">가축전염병지역예찰협의회</a>
										</td>
										<td class="al_left">
											지방자치단체 가축 방역과 관련된 주요 정책에 관한 협의 ...</td>
										<td>1997-03-17</td>
										<td>보건환경연구원 동물위생시험소</td>
									</tr>
								<tr>
<td class="lnone">2</td>
										<td>기관운영</td>
<!-- 										<td class="subject"> -->
										<td class="al_left">
											<a href="/drh/acm/drhAcmBoardView.do?acmCode=102&esbFieGbn=&menuSeq=&amp;pageIndex=1">갈등관리심의위원회</a>
										</td>
										<td class="al_left">
											&#8228;사회전반의 갈등예방 및 해결능력 강화 등을 위한 「갈등관리 종합시책」수립·추진 ...</td>
										<td>2009-08-17</td>
										<td>행정자치국 소통정책과</td>
									</tr>
								<tr>
<td class="lnone">3</td>
										<td>보건복지</td>
<!-- 										<td class="subject"> -->
										<td class="al_left">
											<a href="/drh/acm/drhAcmBoardView.do?acmCode=319&esbFieGbn=&menuSeq=&amp;pageIndex=1">감염병관리위원회</a>
										</td>
										<td class="al_left">
											1. 감염병 예방 및 관리에 관한 시행계획 심의 및 자문2. 감염병 위기관리대책 심의 및  ...</td>
										<td>2022-11-16</td>
										<td>시민체육건강국 감염병관리과</td>
									</tr>
								<tr>
<td class="lnone">4</td>
										<td>산업경제</td>
<!-- 										<td class="subject"> -->
										<td class="al_left">
											<a href="/drh/acm/drhAcmBoardView.do?acmCode=299&esbFieGbn=&menuSeq=&amp;pageIndex=1">감정노동자보호위원회</a>
										</td>
										<td class="al_left">
											감정노동자보호 및 정책에 관한 사항 등 전반 심의   1. 개선계획 수립에 관한 사항    ...</td>
										<td>2021-09-01</td>
										<td>경제과학국 일자리경제과</td>
									</tr>
								<tr>
<td class="lnone">5</td>
										<td>기관운영</td>
<!-- 										<td class="subject"> -->
										<td class="al_left">
											<a href="/drh/acm/drhAcmBoardView.do?acmCode=142&esbFieGbn=&menuSeq=&amp;pageIndex=1">거주외국인지원자문위원회</a>
										</td>
										<td class="al_left">
											－ 거주외국인 등에 대한 지원에 대한 사항 자문－ 거주외국인 등의 지역사회 적응 프로그램의 ...</td>
										<td>2009-06-18</td>
										<td>기획조정실 도시브랜드담당관</td>
									</tr>
								<tr>
<td class="lnone">6</td>
										<td>보건복지</td>
<!-- 										<td class="subject"> -->
										<td class="al_left">
											<a href="/drh/acm/drhAcmBoardView.do?acmCode=283&esbFieGbn=&menuSeq=&amp;pageIndex=1">건강도시위원회</a>
										</td>
										<td class="al_left">
											－ 기본계획 수립·시행에 관한 사항 － 건강도시 조성을 위한 사업에 관한 사항－ 건강도시  ...</td>
										<td>2020-12-07</td>
										<td>시민체육건강국 건강보건과</td>
									</tr>
								<tr>
<td class="lnone">7</td>
										<td>건설교통</td>
<!-- 										<td class="subject"> -->
										<td class="al_left">
											<a href="/drh/acm/drhAcmBoardView.do?acmCode=129&esbFieGbn=&menuSeq=&amp;pageIndex=1">건축위원회</a>
										</td>
										<td class="al_left">
											○ 건축물 건축에 관한 사항 심의○ 건축 조례 개정에 관한 심의 ...</td>
										<td>1993-03-31</td>
										<td>도시주택국 건축경관과</td>
									</tr>
								<tr>
<td class="lnone">8</td>
										<td>도시계획</td>
<!-- 										<td class="subject"> -->
										<td class="al_left">
											<a href="/drh/acm/drhAcmBoardView.do?acmCode=275&esbFieGbn=&menuSeq=&amp;pageIndex=1">건축정책위원회</a>
										</td>
										<td class="al_left">
											1. 설계비 추정가격이 5천만원 이상인 공공건축심의2. 해당 지역의 지역건축기본계획의 수립 ...</td>
										<td>2020-03-20</td>
										<td>도시주택국 건축경관과</td>
									</tr>
								<tr>
<td class="lnone">9</td>
										<td>도시계획</td>
<!-- 										<td class="subject"> -->
										<td class="al_left">
											<a href="/drh/acm/drhAcmBoardView.do?acmCode=109&esbFieGbn=&menuSeq=&amp;pageIndex=1">경관위원회</a>
										</td>
										<td class="al_left">
											심의 및 자문 - 심의대상 : (경관법제7조, 제15조)경관계획의 수립(변경) 또는 승인, ...</td>
										<td>2008-06-29</td>
										<td>도시주택국 건축경관과</td>
									</tr>
								<tr>
<td class="lnone">10</td>
										<td>기관운영</td>
<!-- 										<td class="subject"> -->
										<td class="al_left">
											<a href="/drh/acm/drhAcmBoardView.do?acmCode=166&esbFieGbn=&menuSeq=&amp;pageIndex=1">계약심의위원회</a>
										</td>
										<td class="al_left">
											추정가격 70억 이상 공사계약(물품,용역 등의 경우에는 20억원 이상) 자격제한 등 적법성 ...</td>
										<td>2006-07-24</td>
										<td>행정자치국 회계과</td>
									</tr>
								</tbody>
						</table>
						
						<!-- paging -->
					    <div class="paging">
					        <div class="boardbtn">
				       			<div class="pagination">
				       				<a class="direction"  href="#this" onclick="fn_link_page(1); return false;"><img src="/images/common/page_01.gif" alt="처음 페이지으로"></a><a class="direction first" href="#this" onclick="fn_link_page(1); return false;"><img src="/images/common/page_02.gif" alt="이전 페이지로"></a><strong>1</strong><a href="#this" onclick="fn_link_page(2); return false;">2</a><a href="#this" onclick="fn_link_page(3); return false;">3</a><a href="#this" onclick="fn_link_page(4); return false;">4</a><a href="#this" onclick="fn_link_page(5); return false;">5</a><a href="#this" onclick="fn_link_page(6); return false;">6</a><a href="#this" onclick="fn_link_page(7); return false;">7</a><a href="#this" onclick="fn_link_page(8); return false;">8</a><a href="#this" onclick="fn_link_page(9); return false;">9</a><a href="#this" onclick="fn_link_page(10); return false;">10</a><a class="direction last" href="#this" onclick="fn_link_page(11); return false;"><img src="/images/common/page_03.gif" alt="다음 페이지로"></a><a class="direction" href="#this" onclick="fn_link_page(24); return false;"><img src="/images/common/page_04.gif" alt="끝 페이지로"></a>
</div>
					        </div>
					    </div>
					    <!--// paging -->

						<div style="display: none;">
							<form id="pageForm" name="pageForm" method="post" action="/drh/acm/drhAcmBoardList.do">
								<input type="hidden" name="pageIndex" value=""> 
								<input type="hidden" name="searchCondition" value=""> 
								<input type="hidden" name="searchKeyword" value="">
								<input type="hidden" name="menuSeq" value="">
								<input type="hidden" name="esbFieGbn" value="">
							</form>
						</div>
					</div>
					<!-- 게시판 리스트 끝 -->

					<!-- //content_body -->
					</div>
				<!-- //content -->

			</div>
		</div>
	</div>
	<!-- footer -->
	<script type="text/javascript" src="/js/drh/layout/jquery.easing.1.3.min.js"></script>
<!-- footer : s -->
<footer class="footer">
	<div class="linkArea">
		<div class="container">
			<div class="cnt">
				<ul class="btmMenu2 pcview">
					<li><a href="/drh/DrhContentsHtmlView.do?menuSeq=3274" target="_blank">이용안내</a></li>
					<li><a href="/drh/DrhContentsHtmlView.do?menuSeq=2062" class="point" target="_blank">개인정보처리방침</a></li>
					<li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1757" target="_blank">영상정보처리기기 운영&middot;관리방침</a></li>
					<li><a href="/drh/board/boardNormalList.do?boardId=homepage_0001&menuSeq=1507" target="_blank">누리집 개선의견</a></li>
					<li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1643" target="_blank">찾아오시는길</a></li>
				</ul>
				<div class="siteLink">
					<div class="depart">
						<span class="selected"><a href="#">실국 홈페이지</a></span>
						<ul class="list" style="display:none;">
							<li><a href="/prmt/index.do?menuSeq=6542" target="_blank">홍보담당관</a></li>
							<li><a href="/itd/Staff.do?menuSeq=5672" target="_blank">인사혁신담당관</a></li>
							<li><a href="/pla/index.do?menuSeq=1017" target="_blank">기획조정실</a></li>
							<li><a href="/csf/index.do?menuSeq=3500" target="_blank">시민안전실</a></li>
							<li><a href="/sci/index.do?menuSeq=5678" target="_blank">전략사업추진실</a></li>
							<li><a href="/eco/index.do?menuSeq=2687" target="_blank">경제과학국</a></li>
							<li><a href="/sel/index.do?menuSeq=990" target="_blank">행정자치국</a></li>
							<li><a href="/cul/index.do?menuSeq=44" target="_blank">문화관광국</a></li>
							<li><a href="/citz/index.do" target="_blank">시민체육건강국</a></li>
							<li><a href="/wel/index.do?menuSeq=177" target="_blank">복지국</a></li>
							<li><a href="/env/index.do?menuSeq=2673" target="_blank">환경녹지국</a></li>
							<li><a href="/tra/index.do?menuSeq=2699" target="_blank">교통건설국</a></li>
							<li><a href="/tram/Staff.do?menuSeq=6001" target="_blank">철도광역교통본부</a></li>
							<li><a href="/cit/index.do?menuSeq=972" target="_blank">도시주택국</a></li>				
							<li><a href="/ins/index.do?menuSeq=1034" target="_blank">감사위원회</a></li>
							<li><a href="/dj119/index.do" target="_blank">소방본부</a></li>								
							<li><a href="/djpol/index.do" target="_blank">자치경찰위원회</a></li>
						</ul>
					</div>
					<span class="second_link"><a href="/drh/DrhContentsHtmlView.do?menuSeq=1754">대전시관련</a></span>
					<span><a href="/drh/DrhContentsHtmlView.do?menuSeq=1755">유관기관</a></span>
				</div>
			</div>
		</div>
	</div>
	<div class="container cntBtm">
		<div class="fl mt22n">
			<ul class="btmMenu moview">
				<li><a href="/drh/DrhContentsHtmlView.do?menuSeq=3274" target="_blank">이용안내</a></li>
				<li><a href="/drh/DrhContentsHtmlView.do?menuSeq=2062" class="point" target="_blank">개인정보처리방침</a></li>
				<li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1757" target="_blank">영상정보처리기기 운영&middot;관리방침</a></li>		
				<li><a href="/drh/board/boardNormalList.do?boardId=homepage_0001&menuSeq=1507" target="_blank">누리집 개선의견</a></li>
				<li><a href="/drh/DrhContentsHtmlView.do?menuSeq=1643" target="_blank">찾아오시는길</a></li>
			</ul>
			<address>(35242) 대전광역시 서구 둔산로 100 (둔산동)<span class="callCenter hidePc"><a href="/drh/DrhContentsHtmlView.do?menuSeq=1759">콜센터 <strong>042-120</strong></a></span></address>
			<p class="copy">(c) DAEJEON METROPOLITAN CITY. ALL RIGHTS RESERVED.</p>
		</div>
		<div class="fr">
			<dl class="callCenter forPc">
				<dt>콜센터</dt>
				<dd>
					<a href="/drh/DrhContentsHtmlView.do?menuSeq=1759"><strong>042-120</strong> <span>(365일)</span><br>
					평일 08:00~21:00<br>
					토&middot;공휴일 09:00~18:00</a>
				</dd>
			</dl>
			<ul class="listLogo">
				<li><a href="https://www.kogl.or.kr/" title="새창으로 공공누리 홈페이지로 이동합니다." target="_blank"><img src="/images/drh/layout/common/btm_logo01.png" alt="공공누리 오픈마크"></a></li>
				<li><a href="/drh/DrhContentsHtmlView.do?menuSeq=3342"><img src="/images/drh/layout/common/btm_logo02_1.png" alt="과학기술정보통신부 WA(WEB접근성) 품질인증 마크, 웹와치(WebWatch) 2022.9.13~2023.9.12" title="WA 품질인증 마크, 웹와치(WebWatch) 2022.9.13~2023.9.12"></a></li>
				<li><a href="https://www.mois.go.kr/frt/sub/popup/p_taegugki_banner/screen.do" title="새창으로 국가상징 국무회의 알아보기로 이동합니다." target="_blank"><img src="/images/drh/layout/common/btm_logo04.png" alt="국가상징 국무회의 알아보기"></a></li>
			</ul>
		</div>
	</div>		
</footer>
<!-- footer : e -->

<!-- //layer popup -->	
<script type="text/javascript" >
// select layer
$('.siteLink .depart .selected a').click(function(){
	$(this).parent().toggleClass('on').next('.list').slideToggle('fast');
	return false;
});
$('.siteLink .depart .list').click(function(){
	$(this).hide();
});


//cookie(name=value) 형태
function getCookieFull( name )
{
	var nameOfCookie = name + '=';
	var x = 0;
	while( x <= document.cookie.length ) {
		var y = (x + nameOfCookie.length);
		if( document.cookie.substring( x, y ) == nameOfCookie ) {		
	        if( ( endOfCookie=document.cookie.indexOf( ';', y ) ) == -1 )
	            endOfCookie = document.cookie.length;  
            return unescape( document.cookie.substring( y, endOfCookie ) );  
        }  
        x = document.cookie.indexOf( ' ', x ) + 1;  
        if ( x == 0 )  
            break;  
	}
	return '';  
}

function closeWinLayer(name) {
	if( document.getElementById('day_checkbox').checked ) {
		setCookie(name,"doneLayer",parseInt(''));
	}
	document.getElementById('open_popup_wrap').style.display = "none";
	$('div.layerSnb').css('top','80px');
}

	var cookiedata = document.cookie;
	</script><!-- //footer -->
</body>
</html>
`;

// Deno.test("parser - local committee detail", () => {
//   // const html = await fetchLocalCommitteeDetail({ code: 166 });
//   const localCommitteeDetail = parseLocalCommitteeDetail(html);
//   console.log(localCommitteeDetail);
// });

// Deno.test("parser - local committees", () => {
//   // const html = await fetchLocalCommittees({ page: 1 });
//   const localCommittees = parseLocalCommittees(html);
//   console.log(localCommittees);
// });

Deno.test("parser - local committees total pages count", () => {
  // const html = await fetchLocalCommittees({ page: 1 });
  const totalPagesCount = parseLocalCommitteesTotalPagesCount(html);
  console.log(totalPagesCount);
});
