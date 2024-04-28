import EventDetails from "@/components/event-details-page/EventDetails";
import EventVenue from "@/components/event-details-page/EventVenue";
import HeroSection from "@/components/event-details-page/HeroSection";

const EventDetailsPage = () => {
  return (
    <>
      <HeroSection />
      <section class="container">
        <div class="grid grid-cols-5 gap-12 my-12">
          <EventDetails />
          <EventVenue />
        </div>
      </section>
    </>
  );
};

export default EventDetailsPage;
