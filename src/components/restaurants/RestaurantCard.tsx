import RestaurantType from "@/types/RestaurantType";
import convertDate from "@/utils/functions/convertDate";
import deleteRestaurantById from "@/utils/functions/deleteRestaurantById";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  restaurant: RestaurantType;
}

const RestaurantCard = ({ restaurant }: Props) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: deleteRestaurantById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });

  return (
    <tr id={restaurant.id}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize">
        {restaurant.name}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize ">
        <p className="border w-fit rounded-full px-2 font-semibold">
          {restaurant.status}
        </p>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize">
        {restaurant.cuisine}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize">
        {restaurant.location}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize">
        {convertDate(restaurant.created_at)}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex gap-6 justify-center">
        <Link href={`/restaurants/${restaurant.id}`} className="text-blue-500">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1.4rem"
            width="1.4rem">
            <path d="M21 15.344l-2.121 2.121-3.172-3.172-1.414 1.414 3.172 3.172L15.344 21H21zM3 8.656l2.121-2.121 3.172 3.172 1.414-1.414-3.172-3.172L8.656 3H3zM21 3h-5.656l2.121 2.121-3.172 3.172 1.414 1.414 3.172-3.172L21 8.656zM3 21h5.656l-2.121-2.121 3.172-3.172-1.414-1.414-3.172 3.172L3 15.344z" />
          </svg>
        </Link>
        <button
          className="text-red-600"
          onClick={async () => await mutateAsync(restaurant.id)}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="1.4rem"
            width="1.4rem">
            <path d="M20 5H9l-7 7 7 7h11a2 2 0 002-2V7a2 2 0 00-2-2zM18 9l-6 6M12 9l6 6" />
          </svg>
        </button>
      </td>
    </tr>
  );
};
export default RestaurantCard;
