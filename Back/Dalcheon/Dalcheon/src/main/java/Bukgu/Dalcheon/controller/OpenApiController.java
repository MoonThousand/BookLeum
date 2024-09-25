package Bukgu.Dalcheon.controller;

import Bukgu.Dalcheon.domain.OpenApi.CheckProduct;
import Bukgu.Dalcheon.domain.OpenApi.ListProduct;
import Bukgu.Dalcheon.domain.OpenApi.SearchProduct;
import Bukgu.Dalcheon.service.OpenApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping(value = "/api")
public class OpenApiController {
    private final OpenApiService openApiService;

    @Autowired
    public OpenApiController(OpenApiService openApiService) {
        this.openApiService = openApiService;
    }

    @GetMapping("/search-product/{queryType}/{query}/{maxResults}/{searchTarget}/{cover}")
    public Object openApiSearchProduct(@PathVariable(value = "queryType") String queryType,
                                       @PathVariable(value = "query") String query,
                                       @PathVariable(value = "maxResults") String maxResults,
                                       @PathVariable(value = "searchTarget") String searchTarget,
                                       @PathVariable(value = "cover") String cover) throws UnsupportedEncodingException {
        SearchProduct searchProduct = new SearchProduct(queryType, query, maxResults, searchTarget, cover);
        return openApiService.AladinSearchProduct(searchProduct);
    }

    @GetMapping("list-product/{queryType}/{maxResults}/{searchTarget}/{year}/{month}/{week}/{cover}")
    public Object openApiListProduct(@PathVariable(value = "queryType") String queryType,
                                     @PathVariable(value = "maxResults") String maxResults,
                                     @PathVariable(value = "searchTarget") String searchTarget,
                                     @PathVariable(value = "year") int year,
                                     @PathVariable(value = "month") int month,
                                     @PathVariable(value = "week") int week,
                                     @PathVariable(value = "cover") String cover) throws UnsupportedEncodingException {
        ListProduct listProduct = new ListProduct(queryType, maxResults, searchTarget, year, month, week, cover);
        return openApiService.AladinListProduct(listProduct);
    }
    @GetMapping("check-product/{itemIdType}/{itemId}/{cover}")
    public Object openApiCheckProduct(@PathVariable(value = "itemIdType") String itemIdType,
                                      @PathVariable(value = "itemId") String itemId,
                                      @PathVariable(value = "cover") String cover) throws UnsupportedEncodingException {
        CheckProduct checkProduct = new CheckProduct(itemIdType, itemId, cover);
        return openApiService.AladinCheckProduct(checkProduct);
    }

}
