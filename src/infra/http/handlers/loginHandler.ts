import { FastifyReply, FastifyRequest } from "fastify";

export const loginHandler = async (
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  rep: FastifyReply
) => {
  const { email, password } = req.body;

  const user = await req.AuthService.getUserByEmail(email);
  if (!user) {
    return rep
      .status(401)
      .send({ success: false, message: "Invalid credentials" });
  }

  const isSamePassword = await req.AuthService.samePassword(
    password,
    user.passwordHash
  );

  if (!isSamePassword) {
    return rep
      .status(401)
      .send({ success: false, message: "Invalid credentials" });
  }

  const refreshToken = await req.JwtService.generateRefreshToken(
    { id: user.id },
    req.ip,
    req.headers["user-agent"] || ""
  );

  const accessToken = req.JwtService.generateAccessToken({ id: user.id });

  rep.setCookie("refreshToken", refreshToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  rep.setCookie("accessToken", accessToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 15, // 15 min
  });

  return rep.send({
    success: true,
    data: {
      accessToken,
      refreshToken, // opcional
    },
  });
};
