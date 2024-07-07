# SFACLOG - Refactoring

개발자들이 서로의 경험을 공유하고 커뮤니티 정보 수집을 통해 자신을 표현할 수 있는 플랫폼

리팩토링은 개인이 하였음

<br />

- 배포 주소： https://sfaclog-refactoring-web.vercel.app/
- 스토리북: https://sfaclog-refactoring-storybook.vercel.app/
- 원본: https://github.com/ashdown0069/team-5-sfaclog?tab=readme-ov-file
- 원본 위키 보기： https://github.com/sfac-team-5/team-5-sfaclog/wiki

# 주요 기술 스택

- Next.js , Typescript, Tailwind CSS, zustand, mongoose, next-auth.js, firebase storage, tiptap editor

# 주요 변경사항

- text editor: quil -> tiptap
- Backend: BaaS(pocketbase) -> mongoose, route handler
- image upload: BaaS(pocketbase) -> firebase storage
- mail: BaaS(pocketbase) -> nodemailer
- zod 유효성검사 추가
- doc: storybook 추가

# 참고사항

- 회원가입시 인증메일은 발송하지만 인증없이 사용가능
- 소셜로그인은 구글로그인만 지원

```
  web - npm run dev
  doc - npm run storybook
```
