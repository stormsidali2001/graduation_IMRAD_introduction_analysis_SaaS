import { getAllUsersAction } from "@/server/actions/get-users";
import LastUsersContainer from "./LastUsersContainer";
export const LastUsersTable = async () => {
  try {
    const users = (await getAllUsersAction({ page: 1 }))?.data;

    return <LastUsersContainer users={users} />;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
