"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TopicListItem } from "@/features/topic/model/types/topic-list-item";
import { dateFormat } from "@/libs/utils";
import Link from "next/link";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

const TopicHistoryCarousel = ({ topics }: { topics: TopicListItem[] }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="mt-4 h-24">
      <Carousel
        draggable
        swipeable
        keyBoardControl
        responsive={responsive}
        autoPlay
        itemClass="aspect-square p-3"
      >
        {topics.map((topic) => (
          <Link
            href={`/topic/${topic.id}/chat`}
            key={topic.id}
          >
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle className="text-sm">{topic.title}</CardTitle>
                <CardDescription>{dateFormat(new Date(topic.created))}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default TopicHistoryCarousel;
