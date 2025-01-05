import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          async
          onLoad={() => console.log('Kakao SDK 로드 완료')}
          onError={() => console.error('Kakao SDK 로드 실패')}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
