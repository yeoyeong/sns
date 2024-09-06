# YEOYEONG-SNS

> ### 목차

1. [서비스 개요](#서비스-개요)

2. [기술 스택](#기술-스택)

3. [ERD](#erd)

4. [아키텍처](#아키텍처)

5. [기술적인 도전](#기술적인-도전)

6. [트러블슈팅](#트러블슈팅)

7. [리팩토링](#리팩토링)

8. [기능 소개](#기능-소개)

9. [프로젝트 소개](#프로젝트-소개)

<br/>

> ## 서비스 개요
👉 나만의 일기를 다른 사람과 공유하는 서비스입니다. <br/>
👉 서비스 -  https://yeoyeong-sns.vercel.app/

<br/>

> ## 기술 스택

<table>
  <th></th>
  <th></th>
  <tr>
    <td align="center"><b>common</b></td>
    <td>
      <img src="https://img.shields.io/badge/Typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white" />
      <img src="https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white" />
      <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=Prettier&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>frontend</b></td>
    <td>
      <img src="https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=React&logoColor=%2361DAFB" />
      <img src="https://img.shields.io/badge/React%20Query-FF4154?style=flat&logo=react%20query&logoColor=white" />
      <img src="https://img.shields.io/badge/Zustand-000000?style=flat&logo=zustand&logoColor=white" />
      <img src="https://img.shields.io/badge/TailwindCss-06B6D4.svg?style=flat&logo=tailwindcss&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>backend</b></td>
    <td>
      <img src="https://img.shields.io/badge/NextJS-000000.svg?style=flat&logo=nextdotjs&logoColor=white" />
      <img src="https://img.shields.io/badge/supabase-000000.svg?style=flat&logo=supabase&logoColor=green" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>DB<b></td>
    <td>
      <img src="https://img.shields.io/badge/PostgreSQL-00758f.svg?style=flat&logo=postgresql&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>deployment</b></td>
    <td>
      <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=Vercel&logoColor=white" />
  </tr>
  <tr>
    <td align="center"><b>others</b></td>
    <td>
      <img src="https://img.shields.io/badge/Notion-%23000000.svg?style=flat&logo=notion&logoColor=white" />
      <img src="https://img.shields.io/badge/figma-ffffff?style=flat&logo=figma" />
    </td>
  </tr>
</table>

<p>
    🔗 <a href="https://github.com/yeoyeong/yeoyeong-sns/wiki/%F0%9F%A7%BE-%EA%B8%B0%EC%88%A0-%EC%84%A0%ED%83%9D-%EC%9D%B4%EC%9C%A0">기술 선택 이유</a>
</p>

<br/>

> ## ERD
![erd](https://github.com/user-attachments/assets/721ef75b-b986-4617-90e6-f26fc8f9c0cc)

<br/>

> ## 아키텍쳐
![스크린샷 2024-09-07 024217](https://github.com/user-attachments/assets/ebf7dce7-7323-4909-a8d0-c97932108a91)



<br/>

### 📝 기술적인 도전
<div markdown="1">

  - 🔗 <a href="https://github.com/yeoyeong/yeoyeong-sns/wiki/%F0%9F%A7%BE%EC%9D%B4%EB%AF%B8%EC%A7%80-Lazy-Loading-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0">🧾이미지 Lazy Loading 구현하기</a>
  
</div>


### 📝 트러블슈팅
<div markdown="1">

- 🔗 <a href="https://github.com/yeoyeong/yeoyeong-sns/wiki/%F0%9F%A7%BEReact-Virtuoso-%EB%8F%84%EC%9E%85-%ED%9B%84-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EA%B9%9C%EB%B0%95%EC%9E%84-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0%3A-React.memo%EB%A1%9C-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94">🧾React Virtuoso 도입 후 이미지 깜박임 문제 해결: React.memo로 성능 최적화</a>

- 🔗 <a href="https://github.com/yeoyeong/yeoyeong-sns/wiki/%F0%9F%A7%BE-React-Query-%EC%BA%90%EC%8B%B1-%EC%9D%B4%EC%8A%88-%ED%95%B4%EA%B2%B0">🧾 React Query 캐싱 이슈 해결
</a>

</div>


### 📝 리팩토링
<div markdown="1">

- 🔗 <a href="https://github.com/yeoyeong/yeoyeong-sns/wiki/%F0%9F%A7%BE-React-Query-%EC%BA%90%EC%8B%B1-%EC%9D%B4%EC%8A%88-%ED%95%B4%EA%B2%B0">🧾 단계별 렌더링 방식 수정
</a>

- 🔗 <a href="https://github.com/yeoyeong/yeoyeong-sns/wiki/%F0%9F%A7%BE-%EC%8B%A4%EC%8B%9C%EA%B0%84-UI-%EB%B0%98%EC%98%81%EC%9D%84-%EC%9C%84%ED%95%9C-useMutation-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81">🧾 실시간 UI 반영을 위한 useMutation 리팩토링
</a>

- 🔗 <a href="https://github.com/yeoyeong/yeoyeong-sns/wiki/%F0%9F%A7%BE-%EC%A2%8B%EC%95%84%EC%9A%94-%EC%9A%94%EC%B2%AD-%EC%B5%9C%EC%A0%81%ED%99%94-%3A-debounce-%EC%A0%81%EC%9A%A9">🧾 좋아요 요청 최적화 : debounce 적용
</a>


</div>

<br />

## 기능 소개
| 로그인 | 회원가입 |
|----------|----------|
| ![login](https://github.com/user-attachments/assets/d2e62418-8804-4928-8696-5393e7834747) | ![signup](https://github.com/user-attachments/assets/c2fb3dba-34ea-4021-8467-e0c444280eaf) |

| 홈 | 게시글 생성 |
|----------|----------|
| ![home](https://github.com/user-attachments/assets/fc4ecb63-72e2-4bbd-b63b-c7d46aa90c10) | ![create](https://github.com/user-attachments/assets/2dbf5744-f468-4fcf-9a1f-5d2a2dc1982b) |

| 게시글 수정 / 삭제 | 게시글 좋아요 |
|----------|----------|
| ![fatchDelete](https://github.com/user-attachments/assets/737afcd6-caa1-4b71-b0d2-2ae7ca076891) | ![like](https://github.com/user-attachments/assets/90dced91-3bff-4ad2-ab2e-a9662f4e8774) |

| 팔로우 팔로워 목록 | 유저정보 수정 |
|----------|----------|
| ![followList](https://github.com/user-attachments/assets/23758bc1-3523-4d34-95ad-5344dee0e8d1) | ![userFatch](https://github.com/user-attachments/assets/3eefb4d6-1e34-4911-85d4-772f73e8b00c) |

| 댓글/답글 | 팔로잉 |
|----------|----------|
| ![comment](https://github.com/user-attachments/assets/6b7e0890-3a4a-4714-ad14-fa1f7d3c9df9) | ![follow](https://github.com/user-attachments/assets/b5efbf68-7fe5-4c39-aa91-9e168bd5a919) |

| 채팅기능 |
|----------|
| ![chat](https://github.com/user-attachments/assets/e8c3c82a-44b9-433f-b0be-3dc3982a9c20) |
  
## 프로젝트 소개
> 개인 프로젝트이며 **1명** 으로 구성되어 있어요
> 
> Supabase와 nextJs를 활용한 풀스택 프로젝트 입니다!

  
<table>
  <tr>
    <td align="center"><a href="https://github.com/yeoyeong">김영호</a>
    </td>
  </tr>
  <tr>
    <td align="center">Frontend
    </td>
  </tr>
</table>