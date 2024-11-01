# BookLeum

<img src="https://github.com/user-attachments/assets/a2f3ed74-266e-4dd8-865f-0acf9402bf7a" width="300" height="300"/>

<br>
  
## 🌳 프로젝트 소개

- 해당 프로젝트는 알라딘 API를 이용해 만든 도서정보 검색 및 모의 구매 사이트입니다. 
- AWS EC2를 사용해 백엔드, 프론트엔드 서버를 각각 배포하였습니다.
- 사이트 주소
 - https://bookleum.net
 - 테스트 계정
   - ID : user2
   - PW : a123

## ⏰ 개발 기간

- 프로젝트 기간 : 2024.09.15 ~ 2024.10.20

## 👤 팀원

<div align="center">

| **정의현** | **박병근** |
| :------: | :------: |
| [<img src="https://github.com/user-attachments/assets/6c4c2288-38e2-4458-a751-454917530ab6" height=150 width=150> <br/> @Euihyunee](https://github.com/Euihyunee) | [<img src="https://github.com/Dejong1706/MyBlog/assets/75114974/dc9fa281-1359-4c2c-866b-f426b258ee0a" height=150 width=150> <br/> @Dejong1706](https://github.com/Dejong1706) |
|한국공학대학교 소프트웨어학과(졸)|한남대학교 컴퓨터공학과(졸)|

</div>

## 😁 팀원 역할
| **이름**     | **역할**         | **담당**                                                                                         |
|:--------------:|:----------------:|:-------------------------------------------------------------------------------------------------|
| 정의현       | 백엔드 개발      | 요청 도메인 개발과 Spring Boot를 이용한 백엔드 서버와 MySQL을 이용한 DB 설계와 구축을 담당했습니다. |
| 박병근       | 프론트엔드 개발  | React와 NextJS 기반의 프론트엔드 서버의 개발과 배포를 담당하였으며 사용자 UI/UX 기획과 디자인을 담당했습니다. |

<br>

## 💻 개발 환경

- Front : React, NextJS, Redux-toolkit, TypeScript, JWT, TailwindCSS
- Back-end : Java17, Spring boot 3.3.4, IntelliJ IDEA, MySQL, postman
- 버전 및 이슈관리 : Github
- 협업 툴 : Discord, Figma
- 배포 : AWS EC2
 
<br>

## 🚀 페이지별 기능 설명

### [로그인, 회원가입]
- 로그인 페이지에 로그인 기능을 이용해 회원 서비스를 이용할 수 있게됩니다.
- 회원가입 페이지에서는 아이디, 비밀번호, 이메일, 이름, 전화번호, 주소, 생년월일를 입력받습니다.
- 빈칸이 없고 각각의 유효성 검사를 모두 통과한다면 회원가입에 성공하게 됩니다.

| 로그안 | 회원가입 |
|----------|----------|
|![로그인](https://github.com/user-attachments/assets/7b09139d-4bb9-40a3-960b-8633965293f1)|![회원가입](https://github.com/user-attachments/assets/3c4e202c-02fc-4d44-8869-03815dbbdaad)|

### [메인, 검색결과]
- 로그인, 비 로그인 상관없이 메인페이지에서는 오늘의 책과, 베스트셀러 상위 3권의 책을 살펴볼수 있습니다.
- 메인 페이지 검색바에서는 작가, 책 제목을 입력하면 해당 검색결과 페이지로 이동합니다.
- 검색결과는 최대 50개를 보여주며 회원일 경우 구매하기, 찜하기 기능을 사용할 수 있게됩니다.

| 메인 | 검색결과 |
|----------|----------|
|![메인](https://github.com/user-attachments/assets/3f6a84d6-d915-4594-8d38-21a403f7c6b4)|![검색결과](https://github.com/user-attachments/assets/4ca28dcf-7c80-4b03-83ee-f3afe7d94397)|

### [베스트셀러, 신작리스트, 책 개별]
- 베스트 셀러, 신작리스트를 통해 해당 카테고리와 일치하는 책 50권을 확인할수 있습니다. 
- 베스트 셀러에서는 년,월,주차를 선택하여 날짜별 결과를 조회할 수 있습니다. 
- 베스트셀러, 신작리스트, 검색결과에서 나온 책을 클릭하게 되면 책 개별 페이지로 넘어가게됩니다
- 개별 페이지에서는 회원일경우 구매하기, 찜하기, 장바구니를 이용할 수 있으며, 비회원일 경우 로그인이 필요하다는 문구가 띄워집니다.

| 베스트셀러 | 신작리스트 | 책 개별 페이지 |
|----------|----------|----------|
|![베스트셀러](https://github.com/user-attachments/assets/b8829dd0-9ca6-4660-96da-c5221be42332)|![신작](https://github.com/user-attachments/assets/a96edd4e-4fba-463c-8093-266035c1df0d)|![개별구매](https://github.com/user-attachments/assets/537e10bf-457e-4d45-b4f7-d38fc3fa5d7f)|

### [주문 내역 조회, 장바구니, 찜 목록]
- 해당 기능들은 모두 로그인시 이용가능하며 로그인 이후 마이페이지를 통해서 이동할 수 있는 페이지입니다.
- 주문 내역 조회를 통해 구매한 책 이름과 날짜, 수령인, 배송지, 메모를 확인할 수 있습니다.
- 장바구니에서는 내가 담은 내역들을 살펴볼 수 있으며 전체 구매와 전체 삭제, 개별 구매, 개별 삭제의 기능을 사용할 수 있습니다.
- 찜목록에서는 내가 찜한 목록들을 살펴볼 수 있으며, 개별구매와 개별 삭제만 이용할 수 있습니다.

| 주문 내역 조회 | 장바구니 | 찜 목록 |
|----------|----------|----------|
|![주문내역조회](https://github.com/user-attachments/assets/20367790-5f3b-45ca-ad0e-ba415595efb9)|![장바구니](https://github.com/user-attachments/assets/a40aee36-9999-44d3-941d-859f28807389)|![찜목록](https://github.com/user-attachments/assets/6bb02413-9b9c-44af-812a-44a97df8f8f8)|

### [공지사항, 자주하는 질문 , 1:1문의]
- 공지사항, 자주하는 질문 페이지에서 관리자가 게시한 공지사항들을 살펴볼 수 있으며 개별 클릭할 경우 상세 페이지로 넘어갑니다
- 1:1문의 페이지는 로그인을 진행후 사용할 수 있는 기능이며 문의유형, 제목, 내용을 입력해 문의 사항을 작성할 수 있습니다.

| 공지사항 | 공지사항 상세 |
|----------|----------|
|![공지사항](https://github.com/user-attachments/assets/1edbf820-4268-4788-b39c-f9c1ebd71ed3)|![공지사항상세](https://github.com/user-attachments/assets/5a61177c-f95a-47b6-9406-eb54c184becc)|
| 자주하는 질문 | 1:1문의 |
|----------|----------|
|![자주하는 질문](https://github.com/user-attachments/assets/17c4ed26-5157-4060-a191-ad2fe8f8c0c6)|![1대1문의](https://github.com/user-attachments/assets/b7c8119f-2c9f-483c-94fc-84ef5e04d63c)|

### [이벤트]
- 이벤트 페이지를 통해 다른 유저들과 자신이 작성한 가을 문구를 살펴볼 수 있습니다.
- 개별로 글을 클릭할 경우 이벤트 상세 페이지로 이동합니다.
- 이벤트 작성하기 버튼은 회원만 이용이 가능합니다.

| 이벤트 | 이벤트 상세 |
|----------|----------|
|![이벤트](https://github.com/user-attachments/assets/627bae17-0f1f-4fe4-8618-2eda8484c718)|![이벤트 상세](https://github.com/user-attachments/assets/57198778-4fbb-466a-b097-8eab3f006d08)|

<br>

## ☢️ 주요 문제 해결
### 1. catch의 error type 문제
   - TypeScript는 catch 구문에서 발생하는 error를 기본적으로 unknown 타입으로 지정하는 것을 권장함, 하지만 무작정 unknown을 타입으로 설정하고 실행하면 TypeScript에서 오류를 표시함, 이유는 error가 AxiosError인지 아닌지 모르기 때문
   - 해결 : 이를 해결하고자 타입 좁히기(instanceof를 사용)을 사용해 error가 특정 타입인지 확인 후 실행하도록 변경 

### 2. Either include it or remove the dependency array
   - 이는 의존성 배열은 내부에서 사용하는 모든 변수나 함수가 포함되어 있어야 하지만, 그렇지 않을 때 발생하는 오류
   - 프로젝트 테스트에서는 에러없이 실행되었기에 확인을 못했지만, 빌드 실행 후 발생한 에러메시지로 해당 오류를 발견
   - 해결 : 불필요한 변수는 제거하고 필요한 변수들은 의존성 배열에 추가시키는 것으로 문제 해결 

### 3.  hostname "image.aladin.co.kr" is not configured under images in your `next.config.js`
   - 이 에러는 NextJS의 next/image 컴포넌트를 사용해 외부 이미지를 불러오고자 할 때 발생하는 에러
   - NextJS에서는 보안상의 이유로, 외부 호스트에서 이미지를 가려오려면, next.config.js파일에서 해당 호스트를 허용해야 함
   - 해결: next.config.js에 iamges 설정을 추가하여 image.aladin.co.kr 호스트를 허용하는 방식으로 문제 해결



