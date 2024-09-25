package Bukgu.Dalcheon.domain.OpenApi;

import lombok.Getter;

@Getter
public class ListProduct {
    private final String BASE_URL;
    private final String queryType;
    private final String maxResults;
    private final int start;
    private final String searchTarget;
    private final int year;
    private final int month;
    private final int week;
    private final String cover;
    private final String end;

    public ListProduct(String queryType, String maxResults, String searchTarget, int year, int month, int week, String cover) {
        this.BASE_URL = "http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=";
        this.queryType = queryType;
        this.maxResults = maxResults;
        this.start = 1;
        this.searchTarget = searchTarget;
        this.year = year;
        this.month = month;
        this.week = week;
        this.cover = cover;
        this.end = "&output=js&Version=20131101";
    }
}
