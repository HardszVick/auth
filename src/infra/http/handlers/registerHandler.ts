import { FastifyReply, FastifyRequest } from "fastify";

export const registerHandler = async (
  req: FastifyRequest<{
    Body: { email: string; password: string; name: string };
  }>,
  rep: FastifyReply
) => {
  const { email, password, name } = req.body;
  const user = await req.AuthService.getUserByEmail(email);
  if (user) {
    return rep
      .status(400)
      .send({ sucess: false, message: "Email already registered" });
  }

  const newUser = await req.AuthService.createNewUser(name, email, password);
  if (!newUser) {
    return rep
      .status(500)
      .send({ sucess: false, message: "Error creating user" });
  }
  return rep
    .status(201)
    .send({
      sucess: true,
      data: { id: newUser.id, email: newUser.email, name: newUser.name },
    });
};
export default registerHandler;
