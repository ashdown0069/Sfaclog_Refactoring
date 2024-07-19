# SFACLOG - Refactoring

개발자들이 서로의 경험을 공유하고 커뮤니티 정보 수집을 통해 자신을 표현할 수 있는 플랫폼

풀스택 개발자를 지향하기 때문에 리팩토링은 개인이 하였음

<br />

- 배포 주소： https://sfaclog-refactoring-web.vercel.app/
- 스토리북: https://sfaclog-refactoring-storybook.vercel.app/
- 원본: https://github.com/ashdown0069/team-5-sfaclog?tab=readme-ov-file
- 원본 위키 보기： https://github.com/sfac-team-5/team-5-sfaclog/wiki

# 주요 기술 스택

- 프론트엔드: Next.js , Typescript
- 백엔드: next.js route handler, MongoDB(Mongoose ODM)
- 스타일: Tailwind CSS
- 상태관리: zustand
- 인증: next-auth.js(auth.js) - JWT
- 이미지 업로드: firebase storage
- 텍스트 에디터: tiptap editor
- 유효성검사: zod

# 주요 변경사항

- 텍스트 에디터: quil -> tiptap
- 백엔드: BaaS(pocketbase) -> mongoose, route handler
- 인증: BaaS(pocketbase) -> next-auth.js
- 이미지 업로드: BaaS(pocketbase) -> firebase storage
- 이메일: BaaS(pocketbase) -> nodemailer
- zod 유효성검사 추가
- doc: storybook 추가

# 참고사항

- 회원가입시 인증메일은 발송하지만 인증없이 사용가능, DB상태만 변경됨
- 소셜로그인은 구글로그인만 지원

```
  web - npm run dev
  doc - npm run storybook
```
