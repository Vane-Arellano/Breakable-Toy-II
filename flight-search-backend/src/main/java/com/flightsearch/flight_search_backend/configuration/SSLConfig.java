// import java.net.http.HttpClient;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
// import org.springframework.web.client.RestTemplate;

// @Configuration
// public class SSLConfig {
    
//     @Bean
//     public RestTemplate restTemplate() throws Exception {
//         SSLContext sslContext = new SSLContextBuilder()
//             .loadTrustMaterial(null, (certificate, authType) -> true)
//             .build();

//         HttpClient client = HttpClients.custom()
//             .setSSLContext(sslContext)
//             .build();

//         HttpComponentsClientHttpRequestFactory factory = 
//             new HttpComponentsClientHttpRequestFactory(client);

//         return new RestTemplate(factory);
//     }
// }