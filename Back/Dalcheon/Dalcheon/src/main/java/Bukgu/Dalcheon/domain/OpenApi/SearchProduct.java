package Bukgu.Dalcheon.domain.OpenApi;

import lombok.Getter;

@Getter
public class SearchProduct {
    private String BASE_URL;
    private String queryType;
    private String query;
    private String maxResults;
    private String start;
    private String searchTarget;
    private String cover;
    private String end;

    public SearchProduct(String queryType, String query, String maxResults, String searchTarget, String cover) {
        this.BASE_URL = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=";
        this.queryType = queryType;
        this.query = query;
        this.maxResults = maxResults;
        this.start = "1";
        this.searchTarget = searchTarget;
        this.cover = cover;
        this.end = "&output=js&Version=20131101";
    }

    public SearchProduct(String query) {
        this.BASE_URL = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=";
        this.queryType = "Keyword";
        this.query = query;
        this.maxResults = "100";
        this.start = "1";
        this.searchTarget = "Book";
        this.cover = "mid";
        this.end = "&output=js&Version=20131101";
    }
}
