import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const comments = [
  {
    quote: "Reliable product, consistently delivers.",
    text: "lorem Ipsum many variations of passages of there are available but the have alteration in some form by injected humour or randomised words.",
    name: "Patrick Goodman",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "Excellent product, A+ customer service.",
    text: "There are many variations of passages of lorem Ipsum available but the have alteration in some form by injected humour randomised words.",
    name: "Lues Charls",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    quote: "Impressive quality, durable and reliable.",
    text: "Generation many variations of passages of even blievable lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    name: "Lues Charls",
    avatar:
      "https://demos.codezeel.com/prestashop/PRS22/PRS220545/default/modules/cz_testimonial/views/img/testimonial-1.jpg",
  },
  {
    quote: "Excellent product, A+ customer service.",
    text: "There are many variations of passages of lorem Ipsum available but the have alteration in some form by injected humour randomised words.",
    name: "Lues Charls",
    avatar:
      "https://demos.codezeel.com/prestashop/PRS22/PRS220545/default/modules/cz_testimonial/views/img/testimonial-2.jpg",
  },
];

export default function Comments() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="bg-[#eaf8f8] py-16 px-2 md:px-8 flex flex-col md:flex-row items-center justify-center w-full">
      <div className="flex flex-col items-center md:items-start md:w-1/3 mb-8 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-bold text-[#111] mb-8 text-center md:text-left leading-tight">
          What Our
          <br />
          Clients Say
        </h2>
        <div className="flex gap-4 mt-2">
          <button
            ref={prevRef}
            className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-2xl border border-gray-200 transition hover:bg-[#00A297] hover:text-white"
          >
            <svg width="24" height="24" fill="currentColor">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
            </svg>
          </button>
          <button
            ref={nextRef}
            className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-2xl border border-gray-200 transition hover:bg-[#00A297] hover:text-white"
          >
            <svg width="24" height="24" fill="currentColor">
              <path d="M10 6l-1.41 1.41L13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full md:w-2/3">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          loop={true}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
        >
          {comments.map((c, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-lg shadow p-8 m-2 flex flex-col h-full min-h-[280px]">
                <p className="font-semibold text-lg md:text-xl mb-3">
                  “{c.quote}”
                </p>
                <p className="text-gray-600 mb-6">{c.text}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border"
                  />
                  <span className="font-bold text-lg text-gray-900">
                    {c.name}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
