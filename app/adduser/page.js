const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
import AddUserForm from "@/components/AddUserForm";
import EditUserForm from "@/components/EditUserForm";
import Link from "next/link";
const getUsers = async (page, limit) => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_API_URL}/users?page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading users: ", error);
  }
};

const AddUser = async ({ searchParams }) => {
  const page = parseInt(searchParams.page);
  const limit = parseInt(searchParams.limit);
  const { users, count } = await getUsers(page, limit);

  return (
    <>
      <div className="w-full flex justify-center">
        <AddUserForm limit={limit} />
      </div>
      <div className="flex flex-wrap justify-center w-full">
        {users?.map((user) => {
          return (
            <div className="m-5 shadow-md p-5">
              <EditUserForm item={user} />
              <h1>{user.name}</h1>
              <h1>{user.userid}</h1>
              <Link href={`/userDetails/${user.userid}`}>
              <button>Show User</button></Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddUser;
