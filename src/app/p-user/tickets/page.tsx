import Layout from "@/components/layouts/UserPanelLayout";
import Tickets from "@/components/templates/p-user/tickets/Tickets";
import connectToDB from "@/configs/db";
import TicketModel from "../../../../models/Ticket";
import authUser from "@/utils/getUserData";
import DepartmentModel from "../../../../models/Department";

const page = async () => {
  
  connectToDB();
  const user = await authUser();
  const tickets = await TicketModel.find({ user: user?._id }).populate({
    path: "department",
    model: DepartmentModel,
    select: "title",
  });

  return (
    <Layout>
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </Layout>
  );
};

export default page;
