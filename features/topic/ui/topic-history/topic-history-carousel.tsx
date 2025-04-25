import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TopicListItem } from "@/features/topic/model/types/topic-list-item";
import { dateFormat } from "@/libs/utils";
import Link from "next/link";

const TopicHistoryCarousel = ({ topics }: { topics: TopicListItem[] }) => {
  return (
    <div className="mt-4 h-fit w-full">
      <Carousel>
        <CarouselContent className="-ml-1">
          {topics.map((topic) => (
            <CarouselItem
              key={topic.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Link
                href={`/topic/${topic.id}/chat`}
                className="w-full"
              >
                <Card className="aspect-square cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-sm">{topic.title}</CardTitle>
                    <CardDescription>{dateFormat(new Date(topic.created))}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default TopicHistoryCarousel;
