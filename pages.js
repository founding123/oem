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
  "iv": "oFHxwt+b18MI2r6R",
  "data": "ANK0ZKKDYgqFD+HIs0ZrjUoKYpUtYIFvfCENy50b7YDq3dO8rJkCZ0f/8Pf8i/NXQDNzG4zCFljWT5mPmzZp8IyMaA8jI9Gq+6ugU4MINuNf2m6f06b4Z7MheHsWJxsYXD2HlkRC2z17cfukbpu6ud+LraDVj6EYHi8Gi5nLVgMHAFc8YsTvfpQK3rqLIhqlkvL0IgvqqYb1U0dz7slQ58zHeDLVM6rkZWwTxPSYLOTIJybpCl/wFUdsS7fcwTJG57lPmj2yjYkLA5GVfXDrcpV3DE1lXjNIhGBbjQ1bWa67Kaqq8zbVNEB1SNiwA2pUpNMLhtokXbeaE5f3Bh1kBButh10IKADjb5heJLlbJd9nirCGT2njNKAJU3aHZOaVO5p9kI0Fq9KwCNifvlbieOlsgkXOA57ZMNgmjFAaMB8m5fETVN7DC7FfW2WSv4aI9VuEF3okDHeIczjN7lkwXECwBSj3lLsJesAWyNlVyuY3WP6wTZ7Qa8FdApL1sUPo848zDn9BzZ9Vn/YeFky9d9o6zpZaDKaEiaU7QFUtZOCvuzykVKWlQzJTFdWqJE9zXmtaj2DzR2+CpPAqmO4zClCoCSSIpi9w1m6U4a8MqflBiHuGqaDlPRDLWRKIsYxf8h3C8isVsQUpR8CkgDzpWW7H05s1KlWjQpgeNyF/atRRIzB5OEu3Tjcpxb53oKN9Sc2Ism1XraPMhmbUns3gMcbn5V7aOQyU3q2O4CZwgenjLTeikrWbXgKyDt/IdyAyRNdsivsAzJcoA4gxwtMeQGw7UB3UPja7n/duGbmOfVCXzC5YJWk7YVZ4dTCJkRjQGB5hwqlvzKfIpCTNyh5OL4p4KwS2MA77LTuOMqSmgPV1e0ppaMyt+iKZGQCIUcUFsyIddPvG8OuZeRtJvwxCKWwKr6AEfERlJzNQuAsm1UsOo3hYPgf1QkUd+ugd8QKDlMS0nrx6Hirk9lNwfNaMBnN/4W3Vt38e7xWb2qpi5M/ZRvg4aPGDNDMmUJsjcF7M+P8c01LWPW+cbJMbRIm8QmR356zj8YsVjz4EYcVfG6fd+KGcYhgFN5qn7XbSg5ENQVyIlsv5vU4b80yjIrp/q6KfoonNw30P+pYkfSI6ZHMNuLRELCusqLSVJJYTBHjJOu4NQA8Fm/2FYWeyuDaH3s2cSgb3wekGoeBP1a5LGzK2o8pAQb538pFerR8wAF7aIRi4WB3BKVQfu7MdgEpYPrARs+vyL7adOrPfbYcpCbdr",
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
  "iv": "yD5GubSlEE/HVHgq",
  "data": "GKBiHpf2gvb/lKH6DWYmhEmi6f8/uGhrXjpaU8KUkSr61IZy6vCQ5F+xwuYqiL3AlyODEAlZZ44ROi1U5ZZhvIBdY1qaF1hgcHK5t/JQIX6ZjxMe5fYS/YDuO//vgHhAZAfA7kQcAw5GqNdiuPVxNc6xpqTzxpTYG3SRnTUcJT7fi1yC/LB4y1H35q+RDOTvQoKvaioUHZ+hAmOrVJVoNQZaID/Q0qTkEQELtNTlLC+Y/16R0sXVw6yXR+HD4UlCztLYJ0ntRG+BYeshgvKVcVXIBXDzsiX38LoeDk0xsdaQZL47vpSAzXIINcCmLb04S8EjnM63s1p6Z4v8xyOpU8Jut39r/ve6rTtFCFaw7aijQ1b6gDeFh390vcj3osHNUXmPih3EjKVGieHtw0hWPsZcDf3yyx1GUIk3lPhfXYLyp6az8IKHy4MSe+UCLzkIAOVE80cSZ7yz96cdu0m3P+PD50I4t/G8u7RKE8M400fcRj10kI7X3wOntFs6tWLtt2sMMNSgJ1IQVSEf8suD+mkULgWi9BSY88B5J++wOniPpEfUEcel/3HiNSUuqjUwkK/crqX5xu33GavR3mdeds0rH0WuAHaR0MYi81hl7mMfNW8zwI1qAWx9UL4tI/8Grg59mGZ4jxwmDGei4Ab4jUl5tS8/J9zoPk2stNwOTaS+PQyFZjHCX9/gPAAYH0jxYXWK3x1qgWEIaFDXbCJd5UMUAvUt1V012YPl2xf/HWwmotZ4KHa+whrbCK3wkqetKmemKvIaKKUTysEYqRJHt1F3bHqmyzBA7AQCI7wVH0QNTlKf229GwJH4Tk9BoOpkB732eL4DdSyrzor3GPKEs2bgjM3YIDbszdO57R62NlvFnEpSU6nSaJ7CMleXoolltHvJJoLzKqn6F+xj69ZPOuw1CZz7XJ2U9JBbu8qxaxnSPM66TF7Wpjc/djWvOVnOQgM6J+Xd5ShFeRvf41knoVtC2RhvlG6PC9SyUggPuIopTq9jIWUlN/hV64qZOyWtKY5Oui0SHxEwnFptyxVs7BKMG6F4evj4qEwFWmiIzgqvPj0Js5CUhLux9ovipFRfxMsgFaC/p8nPXgyErJHjWEV4DyK6tMdpOhmMkjmUemWXouVQZb4PBwxqBHIHlaBT4XG/y5lZIKKbVv0RoWEiTj2iKtEYM9MminupC/qZQVI24UcFNMvK+dzw592Qx0Hnd+uz+HY/f2BWD4Q42HiXjkrb8V3kRmfWG39PGzyIQ0/3E/Zuyf4I+2aHciSeSXZm4ScQC7hjN+rFKy7MHUrK1Rh13m+FTU03DPeh9EzyJ2XXyI7T74mVD9lx3xh2ZmlTtwi1PCCsPS8OWci4nubaUR5azmDC86ME68ZH4xsLGMQw+Y/imx47mZD2F9ZM1qCvp11GbB2xt6EWnYt6XTs7EUMSptWBE4BLBAYHLIFlxGZKERS13HuLU0W6cqyjtWuqc9ovlxiMAYaEC578Eana/CCESvaD9uWrGIE15i4KQlL8SjHp437UI5d/CVxHgqhf0U9eR3g0rj9l9CiO65NxOiZCWaYwXQjEHjbTU84olEwEQN6L3CgOkeZdeaoiNybG5oCIUl5EVHmPjKL4m//FaQsZnffLjJgH2eLOUcw/ucrkitUFm3t6IB1tCfdUAuOLGY6MJSkTsurrYNDBFJRbscxf3iOJXSBTDw0stwYwo6kEW6E9wriyZncgIVcJ1NZRHCPZBTUcQcR0/Srz1x7g7gvBVPjrFbGkvmjI5n4YcWhqrlQ8PjgszRtLFoq6sEDt+EVIARvFZoBSlSYO6TRCBZn7L7XP7h1Xpyt8CZ/NS+OX/MIZ9fM0+CjCdFgS3XI3/hDpQJmOh9+MOWB6rsacdD52CDxDiaT8QDaeLV+K5tNccaezhGQvYMu7eBE76VowJ2Vn3ainTkKL5xNtJMlaaUAnxrW9GgyAaToc+Wf0NkDUqpB2EpSNlfcFfnX9YxBFEz8XfixcwHKzIy4Y4Dr6RbTW8QjkvFUJS2Cd+essEY3wwH6gdU/teBJsgPR8kj0uuTWHsOXq+8JrO2/IIAgrwlUfE8mygd5wauYO8BHcYqWNxhocrFNvV+6DeWuzWTkgZnKiozj/oe69pIZD9bFebl1COBcCSSgiV7cN+Eln5Riftq69wXN7FsrUEtjNA+OJMEjqR0C83eBYNTNbCcG5iniLd5+KX7iQgJGFaKx5Kelj2DFNp/naauuWxRwFO4AqDH1k33NwR3VzeYlJTy72c0UCuPr/SKuMhgQRLQNDCymgAjwIH+wLlQAzbPgZP7Hsn7eGT8i6pDNGr/+oNlH+iYwUZ0e9RXqMnfy/GFWMzqXMBtOj7JoMa5u7ZzTluUM+e2uON66DnUbg2CVeXAp2SOxuiQN/nPx3A1FUJAGCXcglFgqh7jKcCXBwViYmXbzm01CjVzyHS835ouTLDbY99tmbiu//oXAg4rXp3HpCLBoYkBEEAlToka8V7qt+vEram6MIjSv2V9RJfR11M8KBtzWJzQkWFpVl31aHrZwerpvBt2vqgvUipyAn3iSKAGfCbg0aFo27/Cl1sVMdDXRNfrqTF0YnTu4g9Akcf4mO6BkzQJsHvykOX3OW1Om/PYKTjWbEVo/EEBQbXOF4s0n6+Z2soYFkPqvC5vsu9T/RRIzhllhbVxd5Sfmb32RfJoPmMZ4lq9DtoWKr23oZrF/7UPQRCqka/cGCNRKSq9qHSTUPDltX9zFpDlN5DkuGMhhQgbkHnsQGjnYbUrpHsROVZjQkSZzywCEJthhtm7xoT9NejXbEW63vPMlRm7AynSv9XDOSZxKfipSwukXZouT/zW9ws55ODFqB/DEMXCBwQnPH4u5ziDWsw2+uo3yNvq/8albuqGKiTGDklfqtQHX48TRmfKwqeUvCgYwXP4P8HlhP4HzmReBMEBAOcLN7b7ulbUHpLV8XNX53ztILxE3sKo6pQz8iErVrNqdZ40A057Hv+C908ZK8+ksB3OCXouNXDSVHZdg5vSIk2Mio4O58AqZViJy0la5jBbD5q3UwUj6vgRz409S7uD3E/jO17GCzPpPWbd5Ve7ONB2CpIzdmDS/WR/kXF11JNiGbbyygG4sEha7UJLNZ5ZJl97t21UbWNIz6pEkw78cGPvm/ziGIg+gWBM77ftj2n09aIV3VkxVv1/R1QQbe1F8fvxrbqbrFDyOG+o53zVpJYzOIbvUQqNS6PKhWRpdc1bZ1jFzroIaOvV6wWrRb9Hd4LLhG/spy2G2bnzCvAa2a4j7tRIeEBIHNkgy65LlgI/ovUgz+Dp+9RheZ49g+NxVrh7dSE3RFQpZt4OlA2asxHBc4Qof0XrPbWzkk+0/Tb4hMuRCPReS/sZ0/k8i6dUKFtntYtecLxScx2ZDn9Wv7SNh5faJ7oHFFddJbm14mdlv3NI+vDxbOp3hX0mF9ubz8kMu4gO0cQKv+9nXfsvQXhTXywZ8hqjgqmhC5uzOJ/AQUamRLuaMjrgkMEP5drj8nygihw7nSgUYyV31xm6zYNmHxNXsnEqYiNmLS5HEEEHgDdeO953I9M28fekrLq2mdf3sey0de/tk0dcO43FUuAkJBbzOaMU+wcrU0/ElI0buIq5mm8rP2PrIMAhd3W89bqsbDYCatadWTfrhC3UnfATqnvrpaG1vQW3knEMXBqjOpaQiZ8g9mbQugNQH9bxrIr0vi+oxPyMxyUa1yC495OXlL/yuBoEvPatYenLsAuEMYogM413i1n6vXOu4Btxk8ke3lIEzQHlPsEMA2ny1CHuD6+4G+nqrSWv0TygOe+uKLrbY9VmVkt66PfVH+rwIk74K4mRQvyIXEkX2lvZ+dNcImjYcRNiFwgJjPaAuWK2ghscqxJB9D70SCW+UkfGuTu9dK+nYcZqIAwln4gTspQkuUm6FEs++rM5jUm9RrGjpGJLG02hnf9E68/ClHiQOqNFgsFiovfi0Zsxkv1eqGEAcQCVYd+pEWTjgmKl9oHSkafVO0lezlRgAUqyYZxGTIYBTRoGgIT4hJloHthccn8Hah0Z+xdjQEzYtQnyF9wZa7vV8OTp4w2DfV0MArNw27L7KD1hw52oxagXAM6GUiM/fJbDWJHhWMuf13Y74L3ipFHkvuJAFFgqlJ0UTov+k3HQlxeOuEBD4OAKpFfhLg/9fZfgy5Ry2R1AYja5QMXs1gBWnTwFbTg0vQDMLNF6oAMHIaRHUDUS+lTA8AEnvz7DM0q6AZrBV/MjIqsHarfUKSWMQAu5Ob57FXwsDp07zHW7uUbTji/k8PkIfsFlnwJhNPEkGzyDnmIGKFNyzEw/tSLCZQuF0AtOqsE4cH2ZDTeWeeQEmn1z4JlE1mtc1jEzzoANN8qf3hbBaiF/c8blbkhm+rPQj+LQpgafxG3rRzYvRjtsfbZPvibr5GzopzGEh5/GxfBMeAD1mKFQX26VUKMpvmCbMO+SuFSF08jXt3UFXweZ3aKgcljpLx+mBlBgmoznI2HbsJa30mKXCHmAwaN11d/YmsNcqa9hrvSzOI9SL7CKwVH0o/VPbsxfJDse6LtI178Qz9fJo1QJ7XpwlsytlUA5/C0DLnaXnPOFX9DJrf6OCYky8s0uRAwU2gMwis9QvTuvX0IAUZXWQrJZ25gpOSAKn3jppmAy7/+N4fXCoQlrZD77Jsn3FlfTHCGt3htnf+MVgUJyeaoO8Td8zCiCik2ZyvH8QeMvmM1SEjfdene7RYvT1503we7pRtPaJfJTTSyNP1pYCQkikrbMWPn7655ZNTBQZ34kNw+CeaQmz/XqSU7GJ9F7+DrJrqROeEu/xr2INGSg21lFuCDe9iRrp9a5hGQOY6UmT9JWpIFoEmD6yYEW7iwAoISv9xhFr55+s/LvO6F39caUlVDSCrG2vF37e5o2BB22BJsP9Cm+XO+t+tNXyNdufclt4jKjaShBnp68SKrUGsWGFeoBg+BTbLNAzpSPomCEwcd/RWJtGXzk1akLhceSBo9hd8amyjo8gu1XaeVG00bLtf7rGhIxamowUcaKNgP5T7oEagkVmUvdwbwHku3Aajy81boruwAQiZTVb/G/UjVUDlSui4KmrWwdtY/ldi1dxExIhVI6iuXjTUspZt+imk81dUKA1227tLgzudG+n6ZQtLEU3tltqFltU3JCgEfK2YiLn7cUN+OrU7VpCZ6bTHd+BHrdQE+i32Jdu8+GZL+VzxSdZ6EwUMJj2uGkLQ138QuwHZ+zLNV6vmZona+CaDfnFLOoFYmez0sTcOX8BogDTU1bjgJ/i0V3Vb8iF/e+Q/K/4E2VvyzWIgATfkvcZMyn7DJwDBGnI+8J61G/mf9VpAW2iGHz8o5ytp903wmD2pm7kFrHlVEPePgLMR7GZEZY1NNY+N5xr84jLz0QTDvvl6b516jQm5wmS3",
  "iterations": 600000,
  "kdf": "PBKDF2",
  "hash": "SHA-256",
  "cipher": "AES-GCM"
}
;

// 파일명 접두어 — index.html과 assets/question_set.js가 이 값을 읽는다.
// 파일명 규칙이 바뀌면 여기 한 곳만 고친다.

window.FILE_PREFIX = 'oem';
