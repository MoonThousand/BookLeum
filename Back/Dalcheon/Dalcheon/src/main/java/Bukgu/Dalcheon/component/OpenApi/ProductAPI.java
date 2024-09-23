package Bukgu.Dalcheon.component.OpenApi;

import Bukgu.Dalcheon.domain.Api.SearchProduct;
import org.springframework.http.ResponseEntity;

import java.io.UnsupportedEncodingException;

public interface ProductAPI {

    String makeURL(SearchProduct searchProduct);

    ResponseEntity<?> fetch(SearchProduct searchProduct) throws UnsupportedEncodingException;
}
