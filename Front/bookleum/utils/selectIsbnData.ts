import axios from "axios";

export const fetchData = async (isbn13) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/open/check-product/ISBN/${isbn13}/mid}`
    );
    if (response.status === 200) {
      console.log(response);
      const myBookData = response.data.item.map((data: MyList) => {
        const originalCoverUrl = data.cover;
        const modifiedCoverUrl = originalCoverUrl.replace(
          "/coversum/",
          "/cover500/"
        );

        return {
          isbn: data.isbn,
          title: data.title,
          cover: modifiedCoverUrl,
          priceSales: data.priceSales,
          quantity: 1,
        };
      });
      setBookData(myBookData);
    } else {
      console.error("데이터를 불러오지 못했습니다.");
    }
  } catch (error) {
    console.error("서버 에러:", error);
    alert("서버 에러 발생");
  }
};
