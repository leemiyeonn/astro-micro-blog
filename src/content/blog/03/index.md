---
title: "🗂️ 프로젝트 공통 유틸리티 (3)"
description: ""
date: "2024-08-04"
---

---

## ⚙️ logger filter

![](https://velog.velcdn.com/images/leemiyeonn/post/c3d38a5a-5212-41c0-ae1e-a636ed97c1dc/image.png)

```
@Slf4j
@Component
public class LoggerFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // 요청과 응답을 래핑하여 여러 번 읽을 수 있게 함
        var req = new ContentCachingRequestWrapper((HttpServletRequest) request);
        var res = new ContentCachingResponseWrapper((HttpServletResponse) response);

        // 초기 URI 로깅 (이 시점에는 요청 본문이 아직 읽히지 않음)
        log.info("INIT URI : {}", req.getRequestURI());

        // 다음 필터 또는 실제 요청 처리기로 요청을 전달
        chain.doFilter(req, res);

        // 요청 처리 후 로깅 시작

        // 요청 헤더 정보 수집
        var headerNames = req.getHeaderNames();
        var headerValues = new StringBuilder();

        headerNames.asIterator().forEachRemaining(headerKey -> {
            var headerValue = req.getHeader(headerKey);
            // 각 헤더를 [키 : 값] 형식으로 추가
            headerValues.append("[").append(headerKey).append(" : ")
                    .append(headerValue).append("] ");
        });

        // 요청 본문 읽기 (ContentCachingRequestWrapper 덕분에 가능)
        var requestBody = new String(req.getContentAsByteArray());
        var uri = req.getRequestURI();  // 요청 URI 가져오기
        var method = req.getMethod();   // HTTP 메소드 가져오기

        // 요청 정보 로깅
        log.info(">>>>> uri : {} , method : {}, header : {} , body : {}",
                uri, method, headerValues, requestBody);

        // 응답 헤더 정보 수집
        var responseHeaderValues = new StringBuilder();

        res.getHeaderNames().forEach(headerKey -> {
            var headerValue = res.getHeader(headerKey);
            // 각 응답 헤더를 [키 : 값] 형식으로 추가
            responseHeaderValues.append("[").append(headerKey).append(" : ")
                    .append(headerValue).append("] ");
        });

        // 응답 본문 읽기 (ContentCachingResponseWrapper 덕분에 가능)
        var responseBody = new String(res.getContentAsByteArray());

        // 응답 정보 로깅
        log.info("<<<<< uri : {} , method : {}, header : {} , body : {}",
                uri, method, responseHeaderValues, responseBody);

        // 응답 본문을 클라이언트에게 전송
        // (ContentCachingResponseWrapper를 사용했기 때문에 필수)
        res.copyBodyToResponse();
    }
}

```

### 🤔❓

ContentCachingRequestWrapper:
요청 본문을 여러 번 읽을 수 있게 해줍니다. 필터 체인 실행 후에도 요청 본문을 읽을 수 있습니다.

ContentCachingResponseWrapper:
응답 본문을 캐싱하여 로깅할 수 있게 해줍니다.
res.copyBodyToResponse()를 통해 클라이언트에게 응답을 전송합니다.

헤더 정보 로깅:
요청과 응답의 모든 헤더를 로깅하여 상세한 정보를 제공합니다.

본문 내용 로깅:
요청과 응답의 본문 내용을 로깅하여 완전한 통신 내용을 파악할 수 있습니다.

URI와 HTTP 메소드 로깅:
각 요청의 URI와 HTTP 메소드를 로깅하여 어떤 엔드포인트가 호출되었는지 쉽게 확인할 수 있습니다.
