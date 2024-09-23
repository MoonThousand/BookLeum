package Bukgu.Dalcheon.domain.Api;

import lombok.Getter;

@Getter
public class CheckProduct {
    private final String BASE_URL;
    private final String itemIdType;
    private final String itemId;
    private final String cover;
    private final String end;

    public CheckProduct(String itemIdType,String itemId, String cover) {
        this.BASE_URL = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=";
        this.itemIdType = itemIdType;
        this.itemId = itemId;
        this.cover = cover;
        this.end = "&output=js&Version=20131101";
    }
}
