package Bukgu.Dalcheon.component.OpenApi;

import lombok.Getter;

@Getter
public class ProductUsedAPI {

    // 기본값 Keyword -> Title, Author, Publisher
    private String QueryType;
    // 기본값 10 -> 1~100
    private String MaxResult;
    // 기본값 1 -> 1이상
    private String start;
    // 기본값 Book -> Foreign, Nusic, DVD, Used, eBook, All
    private String SearchTarget;
    // 기본값 Accuracy -> PublishTime, Title, SalesPoint, CustomerRating, MyReviewCount
    private String sort;
    // Big, MidBig, Mid, Small, Mini, None
    private String Cover;
    // 기본값 0(전체) -> 양의 정수
    private String CategoryId;
    private String outofStockfilter;
    private String RecentPublishFilter;
    private String OptResult;
}
