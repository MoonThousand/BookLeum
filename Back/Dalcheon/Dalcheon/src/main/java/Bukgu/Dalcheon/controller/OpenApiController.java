package Bukgu.Dalcheon.controller;

import Bukgu.Dalcheon.domain.OpenApi.CheckProduct;
import Bukgu.Dalcheon.domain.OpenApi.ItemDTO;
import Bukgu.Dalcheon.domain.OpenApi.ListProduct;
import Bukgu.Dalcheon.domain.OpenApi.SearchProduct;
import Bukgu.Dalcheon.service.OpenApiService;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.json.simple.parser.ParseException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.time.Duration;

@RestController
@RequestMapping(value = "/api")
public class OpenApiController {
    private final OpenApiService openApiService;

    @Autowired
    public OpenApiController(OpenApiService openApiService) {
        this.openApiService = openApiService;
    }

    @GetMapping("/open/search-product/{queryType}/{query}/{maxResults}/{searchTarget}/{cover}")
    public Object openApiSearchProduct(@PathVariable(value = "queryType") String queryType,
                                       @PathVariable(value = "query") String query,
                                       @PathVariable(value = "maxResults") String maxResults,
                                       @PathVariable(value = "searchTarget") String searchTarget,
                                       @PathVariable(value = "cover") String cover) throws UnsupportedEncodingException {
        SearchProduct searchProduct = new SearchProduct(queryType, query, maxResults, searchTarget, cover);
        return openApiService.AladinSearchProduct(searchProduct);
    }
    // TODO Open API DTO 매핑해서 Item만 전송
    @GetMapping("/open/search2-product/{query}")
    public Object testSearchProduct(@PathVariable String query) throws Exception {
        SearchProduct searchProduct = new SearchProduct(query);
        return openApiService.testSearchProduct(searchProduct);
    }

    @GetMapping("/open/list-product/{queryType}/{maxResults}/{searchTarget}/{year}/{month}/{week}/{cover}")
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
    // TODO Open API DTO 매핑해서 Item만 전송
    @GetMapping("/open/list2-product/{queryType}/{year}/{month}/{week}")
    public Object testListProduct(@PathVariable(value = "queryType") String queryType,
                                  @PathVariable(value = "year") int year,
                                  @PathVariable(value = "month") int month,
                                  @PathVariable(value = "week") int week) throws Exception {
        ListProduct listProduct = new ListProduct(queryType, year, month, week);
        return openApiService.testListProduct(listProduct);
    }

    @GetMapping("/open/check-product/{itemIdType}/{itemId}/{cover}")
    public Object openApiCheckProduct(@PathVariable(value = "itemIdType") String itemIdType,
                                      @PathVariable(value = "itemId") String itemId,
                                      @PathVariable(value = "cover") String cover) throws UnsupportedEncodingException {
        CheckProduct checkProduct = new CheckProduct(itemIdType, itemId, cover);
        return openApiService.AladinCheckProduct(checkProduct);
    }

    @GetMapping("/open/check2-product/{itemId}")
    public Object testCheckProduct(@PathVariable(value = "itemId") String itemId) throws Exception {
        CheckProduct checkProduct = new CheckProduct(itemId);
        return openApiService.testCheckProduct(checkProduct);
    }
    @PostMapping("/open/crawling")
    public String crawlData(@RequestParam String url) {


        String pleManiaFeed = "";
        // WebDriver 설정
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        // ChromeDriver 경로 설정
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\lobil\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe");

        try {
            driver.get(url);
            Thread.sleep(4000); // 페이지 로딩 시간 동안 기다림

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
            WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='Ere_prod_allwrap']/div[9]/div[6]/div[3]")));

            pleManiaFeed = element.getText(); // 텍스트 가져오기
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit(); // 드라이버 종료
        }

        return pleManiaFeed; // 선택한 내용 반환
    }

}
