"use client";
import { interestInEvent } from "@/actions";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const ActionButtons = ({ fromDetails, eventID, interestedUserIDs }) => {
  const { authDetails } = useAuth();
  const router = useRouter();
  const isInterested = interestedUserIDs?.find((id) => id === authDetails?.id);
  const [interested, setInterested] = useState(isInterested);
  const [isPending, startTransition] = useTransition();

  const toggleInterestEvent = async () => {
    if (authDetails) {
      await interestInEvent(eventID, authDetails?.id);
      setInterested(!interested);
    } else {
      router.push("/login");
    }
  };

  const onGoing = () => {
    if (authDetails) {
      router.push("/payment");
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
        <button
          onClick={() =>
            startTransition(() => {
              toggleInterestEvent();
            })
          }
          className={`w-full ${
            interested && "bg-indigo-600 hover:bg-indigo-800"
          }`}
        >
          Interested
        </button>
        <button
          onClick={onGoing}
          className=" text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1"
        >
          Going
        </button>
      </div>
    </>
  );
};

export default ActionButtons;
