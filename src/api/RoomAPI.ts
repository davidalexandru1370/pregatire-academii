import { Room } from "../Models/Room";
import { createHeader } from "../Utilities/Helpers";
import { baseUrl, Methods, RoomEndpoints } from "./Constants";

export async function startRoom(quizId: string): Promise<Room | Error> {
  let url = baseUrl + RoomEndpoints.StartRoom;
  let header = createHeader(Methods.POST, quizId);
  return await fetch(url, header)
    .then(async (response: Response) => {
      console.log(response);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(response.statusText);
    })
    .then((room: Room) => {
      return room;
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });
}
