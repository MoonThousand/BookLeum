package Bukgu.Dalcheon.component.OpenApi;

import Bukgu.Dalcheon.domain.OpenApi.SearchProduct;
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
public class ProductSearchAPI implements ProductAPI{
    @Value("${API-KEY.aladinKey}")
    private String ttbkey;

    @Override
    public String makeURL(SearchProduct searchProduct) {
        return searchProduct.getBASE_URL() + ttbkey +
                "&QueryTyoe=" + searchProduct.getQueryType() +
                "&Query=" + searchProduct.getQuery() +
                "&MaxResults=" + searchProduct.getMaxResults() +
                "&start=" + searchProduct.getStart() +
                "&SearchTarget=" + searchProduct.getSearchTarget() +
                "&Cover=" + searchProduct.getCover() +
                searchProduct.getEnd();
    }
    @Override
    public ResponseEntity<?> fetch(SearchProduct searchProduct) throws UnsupportedEncodingException {
        System.out.println(makeURL(searchProduct));
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<?> entity = new HttpEntity<>(new HttpHeaders());
        ResponseEntity<Map> resultMap = restTemplate.exchange(makeURL(searchProduct), HttpMethod.GET, entity, Map.class);
        System.out.println(resultMap.getBody());
        return resultMap;
    }
}

