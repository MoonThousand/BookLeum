package Bukgu.Dalcheon.component.OpenApi;

import Bukgu.Dalcheon.domain.Api.ListProduct;
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
public class ProductListAPI {
    @Value("${API-KEY.aladinKey}")
    private String ttbkey;

    public String makeURL(ListProduct listProduct) {
        return listProduct.getBASE_URL() + ttbkey +
                "&QueryType=" + listProduct.getQueryType() +
                "&MaxResults=" + listProduct.getMaxResults() +
                "&start=" + listProduct.getStart() +
                "&SearchTarget=" + listProduct.getSearchTarget() +
                "&Year=" + listProduct.getYear() +
                "&Month=" + listProduct.getMonth() +
                "&Week=" + listProduct.getWeek() +
                "&Cover=" + listProduct.getCover() +
                listProduct.getEnd();
    }
    public ResponseEntity<?> fetch(ListProduct listProduct) throws UnsupportedEncodingException {
        System.out.println(makeURL(listProduct));
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<?> entity = new HttpEntity<>(new HttpHeaders());
        ResponseEntity<Map> resultMap = restTemplate.exchange(makeURL(listProduct), HttpMethod.GET, entity, Map.class);
        System.out.println(resultMap.getBody());
        return resultMap;
    }
}
