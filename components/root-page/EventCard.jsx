import Image from "next/image";
import Link from "next/link";
import ActionButtons from "../ActionButtons";

const EventCard = ({ eventInfo }) => {
  return (
    <>
      <div className="overflow-hidden rounded-md bg-[#242526]">
        <div className="relative w-full h-[300px]">
          <Image
            fill
            src={eventInfo?.imageUrl}
            alt={eventInfo?.name}
            className="object-cover"
          />
        </div>

        <div className="p-3">
          <Link
            href={`/event-details/${eventInfo?.id}`}
            className="font-bold text-lg"
          >
            {eventInfo?.name}
          </Link>
          <p className="text-[#9C9C9C] text-sm mt-1">{eventInfo?.location}</p>
          <div className="text-[#737373] text-sm mt-1">
            <span>{eventInfo?.interested_ids?.length} Interested</span>
            <span className="mx-1">|</span>
            <span>{eventInfo?.going_ids?.length} Going</span>
          </div>
          <ActionButtons
            eventID={eventInfo?.id}
            interestedUserIDs={eventInfo?.interested_ids}
          />
        </div>
      </div>
    </>
  );
};

export default EventCard;
