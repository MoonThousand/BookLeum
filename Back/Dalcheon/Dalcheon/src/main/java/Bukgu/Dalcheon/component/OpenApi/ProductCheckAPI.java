package Bukgu.Dalcheon.component.OpenApi;

import Bukgu.Dalcheon.domain.OpenApi.CheckProduct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.util.Map;

@Component
public class ProductCheckAPI {
    @Value("${API-KEY.aladinKey}")
    private String ttbkey;

    public String makeURL(CheckProduct checkProduct) {
        return checkProduct.getBASE_URL() + ttbkey +
                "&itemIdType=" + checkProduct.getItemIdType() +
                "&itemId=" + checkProduct.getItemId() +
                "&Cover=" + checkProduct.getCover() +
                checkProduct.getEnd();
    }
    public ResponseEntity<?> fetch(CheckProduct checkProduct) throws UnsupportedEncodingException {
        System.out.println(makeURL(checkProduct));
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<?> entity = new HttpEntity<>(new HttpHeaders());
        ResponseEntity<Map> resultMap = restTemplate.exchange(makeURL(checkProduct), HttpMethod.GET, entity, Map.class);
        return resultMap;
    }
    public String getCheckProductJsonString(CheckProduct checkProduct) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(makeURL(checkProduct), String.class);
    }

}
