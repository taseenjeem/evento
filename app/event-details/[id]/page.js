import EventDetails from "@/components/event-details-page/EventDetails";
import EventVenue from "@/components/event-details-page/EventVenue";
import HeroSection from "@/components/event-details-page/HeroSection";
import { getEventByID } from "@/db/queries";

const EventDetailsPage = async ({ params }) => {
  const eventInfo = await getEventByID(params?.id);

  return (
    <>
      <HeroSection eventInfo={eventInfo} />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          <EventDetails details={eventInfo?.details} swags={eventInfo?.swags} />
          <EventVenue location={eventInfo?.location} />
        </div>
      </section>
    </>
  );
};

export default EventDetailsPage;
