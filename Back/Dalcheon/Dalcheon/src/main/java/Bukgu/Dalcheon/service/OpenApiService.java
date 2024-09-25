package Bukgu.Dalcheon.service;

import Bukgu.Dalcheon.component.OpenApi.ProductCheckAPI;
import Bukgu.Dalcheon.component.OpenApi.ProductListAPI;
import Bukgu.Dalcheon.component.OpenApi.ProductSearchAPI;
import Bukgu.Dalcheon.domain.OpenApi.CheckProduct;
import Bukgu.Dalcheon.domain.OpenApi.ListProduct;
import Bukgu.Dalcheon.domain.OpenApi.SearchProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class OpenApiService {

    private final ProductSearchAPI productSearchAPI;
    private final ProductListAPI productListAPI;
    private final ProductCheckAPI productCheckAPI;

    @Autowired
    public OpenApiService(ProductSearchAPI productSearchAPI, ProductListAPI productListAPI, ProductCheckAPI productCheckAPI) {
        this.productSearchAPI = productSearchAPI;
        this.productListAPI = productListAPI;
        this.productCheckAPI = productCheckAPI;
    }

    public Object AladinSearchProduct(SearchProduct searchProduct) throws UnsupportedEncodingException {
        return productSearchAPI.fetch(searchProduct).getBody();
    }
    public Object AladinListProduct(ListProduct listProduct) throws UnsupportedEncodingException {
        return productListAPI.fetch(listProduct).getBody();
    }
    public Object AladinCheckProduct(CheckProduct checkProduct) throws UnsupportedEncodingException {
        return productCheckAPI.fetch(checkProduct).getBody();
    }


}
