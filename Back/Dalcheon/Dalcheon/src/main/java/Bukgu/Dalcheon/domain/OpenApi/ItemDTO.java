package Bukgu.Dalcheon.domain.OpenApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true) // JSON에서 필요한 필드만 매핑하고, 나머지는 무시
public class ItemDTO {
    private String title;
    private String link;
    private String author;
    private String pubDate;
    private String description;
    private String isbn13;
    private long itemId;
    private int priceSales;
    private int priceStandard;
    private String cover;
    private int categoryId;
    private String categoryName;
    private String publisher;
}
