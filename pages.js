/* ============================================================
   사이트 설정 — 강의 정보의 단일 출처

   ▣ 구조 요약 (정보는 한 곳에만 적는다)
       TOC_ENC        번호 → [강의 제목, 교수 이름]   ← 강의 목록의 전부
       PROF_NOTE_ENC  교수 이름 → 한 줄 평
       SITE_ENC       사이트 문구 (제목·강조어·라벨·태그라인·과목명)

     예전의 PAGE_NUMBERS 배열은 없어졌다. 페이지 번호 목록은
     TOC_ENC의 키에서 자동으로 나온다. PROF_ENC도 필요 없다 —
     교수 이름이 TOC_ENC 안에 함께 있기 때문이다.

   ▣ 새 페이지 추가하는 법 (이제 두 단계뿐)
     1) 파일을 oemNNNN.html 이름으로 올린다.
        예) oem0100.html, oem3050.html
     2) 아래 TOC_ENC에 한 줄을 추가한다.
        예) "3050": ["새 강의 제목", "홍길동"],
     끝. 목차·이전/다음 페이저·문항 페이지 h1·교수별 묶기가
     전부 이 한 줄을 읽는다.

   ▣ TOC_ENC 항목 형식
       "번호": ["강의 제목", "교수 이름"]

     · 교수 칸("")을 비워 두면: 예전 방식대로 그 페이지의
       pageMetaPayload subtitle("22: 이름;")을 내려받아 읽는다.
       (기존에 배포한 파일들은 그대로 동작한다는 뜻)
     · 교수 칸을 채우면: 파일을 하나도 내려받지 않고 즉시
       교수별 묶기가 된다. 채우는 쪽을 권장.
     · 옛 형식 "번호": "강의 제목" (문자열만)도 계속 읽힌다.
     · 교수 이름 뒤에 부가 정보를 붙이려면 구분자를 하나 둔다.
       구분자부터 뒤는 이름에서 잘려 나간다.
         쓸 수 있는 구분자 :  (   [   ·   ,   /   |   그리고 전각 형태
         "홍길동 (신규 강의)"  → 홍길동
       ('-'와 '.'은 구분자가 아니다. 'Kim Sung-ho', 'Prof. Kim'이 잘리므로.)

   ▣ 암호화하는 법 (모든 *_ENC 공통)
     평문 JSON을 파일로 저장한 뒤 동일한 비밀번호로 암호화해
     아래 해당 자리에 붙여 넣는다.
          python tools/encrypt_fragment.py toc.json --password <비밀번호>
     아직 암호화하지 않은 평문 JSON도 그대로 읽히므로(개발용),
     로컬에서 먼저 확인하고 배포 전에 암호화하면 된다.
   ============================================================ */

/* ▣ 사이트 문구
     title/highlight/eyebrow/tagline : 목차(index) 화면의 문구
     subject : 문항 페이지 상단의 작은 라벨(eyebrow) 기본값.
               예전엔 모든 oem 파일마다 "근골격학"을 반복해 적었지만,
               이제 여기 한 곳만 적으면 된다.
               (특정 페이지만 다르게 하려면 그 페이지 pageMetaPayload에
                "eyebrow"를 적으면 그 값이 우선한다) */

window.SITE_ENC =
{
  "salt": "XFcfol1PZ4ZhCznbBrmTzQ==",
  "iv": "pGW4Lzn0I72cWzAo",
  "data": "HLy8/dh87rhHbhKwbBFaRzdc/ymSa0aj8K2ixGZ0dJ7Ue14DquQa/fgqMrWy1MYkYaia1QzDcNnwimOLi32SUbY6+17o8sEPpjWl04Xu2lXsTsV6RhwpAKxp9UyVgpvJKVzC4lSYpFaCtBnBirhhuB+BhOkzePpB57SNb1wsPF8Gc3vgGjQifcI6OzwxDsLcQw5JDmn4x0x13W7NRpkYRsa1TvKRmpoOojicZsx6JuHmDPTpxeLzqjW8bm7tNIWIaHyIgw+BkmYd/59PEhw1EyXutYKdkptVpu/wLHFGqKpbermEaaUB6UtasAw=",
  "iterations": 600000,
  "kdf": "PBKDF2",
  "hash": "SHA-256",
  "cipher": "AES-GCM"
}
;

/* ▣ 강의 목록 — 번호 → [제목, 교수]  (단일 출처)
     교수 칸은 지금 비워 두었다. 채워 넣는 즉시 '교수별' 묶기가
     파일 스캔 없이 바로 동작한다. */

window.TOC_ENC =
{
  "salt": "XFcfol1PZ4ZhCznbBrmTzQ==",
  "iv": "covqdY+5HDcD6rn2",
  "data": "1wUUY494B4ac+54bNZIqOC28yzeexi740wdFKvTOfPSwJoIc/1thQk+o/4uNUUf2PbS/hEkid5LWiF9OVaPXGLsyp1XGLMnoRfvyUJ9RUqpmYBRkMjNiQuREw0A5gz6oBBAyIcJwxoElogksUiNTCvN70TyJFRS9T1gr5aSMHMfiTcafN355EphSJkU8GrG0ZFthkLvOX+E2ZhUNhLyMx8Ioyb993nx4kPe8KKU5QvBOTXD44BAnIfMmD9fkDDuOsj3XeG+nRU7W+tfsw8Buzy2S+1wAZ6wdevwBhPasp685zCM0FpeZUUDl5hfoGbrJcC7eu/UqfoN7HKO1ZduI8wutYRBkuYhEcCmUkdIvH8YfW5m7hQ8tcovhledA+60jAbLZbtQWUnQfzKBHymBAmTkqS7gQf3tpK9o9RqfPUovBwECzIvbb3o8MTed7Rrgw0i62ypFuJW4caTkWc/p4eogA2p1+wsop11SHjEqK4PRBml1Rdg/XKU6QMZADbo//Q2rKosrpigpZb+ClJSlaYWTpG6ahzvo+fzf9EWXos+Zrh+cWC+AN+Rpnbcb7GNxjN/ETB3p0+lHzgSkAm3QoR3hn6Gvy96ruGn/vtB70d9OGbnK5SHWm0wbMrX+EOhZnOOz/MlF4MNP9Bx9Lyh2PbmRMRdLRyXgOB6/P3NAsB2cY4nC/Dw/dlHo3Gj50M9wZCusHkkN7Ra2WrrJleTHdjEOvzTFMSnNhq1GZDObB2e51+jYQyYio16Ou+qFt5HhH0xxFpTr9TkezYZLAi87Mx7RcABxXTkXdkPY8l3auhciovxqdkEOi+24rP9RTwWbe9BYt/uajLnKKq0dCUpyvLjxpD0AydyaeL0ZYvCFx4XcwNQ/H5ZKlb1YesO0KjApWj9f+A2PJqVKxc9Fb3W76kJMWKvDR/zBh9H3o7PvBAGf1iT2z6yZqRTxoBOCjPCK5RZx2n8zU/PwYhMSfvtnecJj5t3dz6Nu7FkJpQWEYK++F3sUgxD/dp61Tawg828uVrWP/2xv3sBbhpSUDN8RgC6rfLCUzuhbUcza9G7Q4zlUbTYnm/CahsXFf+G25sluSPciIQWn26j/kbpLulpmddNCGGH17KIJowjX/xcDZ9YhUbhPe19wHHxJDtIJr95GUK9zF/nT0ZFn6ZjWdaAzvFIXPhugI4/gDl3FRLEy3igyh8bDYtCZ+fSpug9H9nmZRJu4yry5868wdwu1ZDbRsHmhTAucOCALrynriIpBTGuHuo225xhRMlyEAXQ2LfdpM99A54CEovxSI2N1Dtvp44+nOT9MlDYlrcZn/Ln0BUhhSLJIye0rG6l+jsyuzhsCIZXD1jazmEg48YPPyUWfLbYSQzrh+A5XchH3idZ2r2UYhYvE8FLWc75WVPdACcJagIY8SXteFcQhhQrzorvVRC5k30lmhtFVELyVyt2NDOlVA5FwwFeHOWFq3rr2ll7a92qM7auRuiPsw1mzJLEdZEXwDuOXE",
  "iterations": 600000,
  "kdf": "PBKDF2",
  "hash": "SHA-256",
  "cipher": "AES-GCM"
}
;

/* ▣ 교수 한 줄 평 — 교수 이름 → 한 줄
     목차를 교수별로 묶으면 머리글에 이름과 함께 이 한 줄이 뜬다.

     · 한 줄 평은 '강의'가 아니라 '교수'에 붙는다. 강의가 5개여도 한 번만.
     · 키 = TOC_ENC에 적은 교수 이름(또는 subtitle에서 뽑힌 이름).
       '홍길동.'처럼 마침표가 붙어도 같은 규칙으로 맞춰 준다.
     · 안 적은 교수는 이름만 뜬다. 통째로 지워도 동작한다. */

window.PROF_NOTE_ENC =
{
  "salt": "XFcfol1PZ4ZhCznbBrmTzQ==",
  "iv": "2rtGPEr+DlrbPUS2",
  "data": "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",
  "iterations": 600000,
  "kdf": "PBKDF2",
  "hash": "SHA-256",
  "cipher": "AES-GCM"
}
;

// 파일명 접두어 — index.html과 assets/question_set.js가 이 값을 읽는다.
// 파일명 규칙이 바뀌면 여기 한 곳만 고친다.

window.FILE_PREFIX = 'oem';
