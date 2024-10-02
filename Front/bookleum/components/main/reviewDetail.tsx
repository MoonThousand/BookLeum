import { FaStar } from "react-icons/fa";
import React from "react";

export default function ReviewDetail() {
  return (
    <div className="bg-green-300 flex w-[90%] mx-auto h-64 mt-12">
      <div className="w-[40%] flex justify-center items-center text-[2rem]">
        Review
      </div>
      <div className="w-[60%] flex flex-col justify-center">
        <p>정의현 2024/09/19</p>
        <p className="flex items-center my-2">
          우리나라 대표 초등 코믹북을 뽑으라고 한다면아마 많은분들이 고민없이
          흔한남매를 선택하지 않을까 싶어요. 저희 큰애가 읽기독립하는데도 도움을
          많이 준 흔한남매 ~보석같은 웃음이 가득담긴 흔한남매의 일상 17권이
          나왔답니다. 유쾌한 우애와 순수한 웃음으로 아이들의 마음을 사로잡은
          흔한남매의깨알 재미있는 에피소드들 ~​호정이와 만남으로 남매와 자매의
          자존심싸움과공포의 영화관 안내방송, 요리대결 등등추석연휴 내내 즐겨볼
          놀이 페이지 ~​초등베스트셀러 일상만화 흔한남매 17
        </p>
        <p className="flex items-center justify-end pr-4">
          <FaStar className="text-[#FF4E88] text-[1.5rem]" />
          <b className="text-[1.1rem] ml-4">3.2</b>
        </p>
      </div>
    </div>
  );
}
