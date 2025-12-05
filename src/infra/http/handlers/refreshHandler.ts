import { FastifyReply, FastifyRequest } from "fastify";

export const refreshHandler = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return rep.status(401).send({
      success: false,
      message: "Refresh token not provided",
    });
  }

  const payload = req.JwtService.verifyRefreshToken(refreshToken);
  if (!payload) {
    return rep.status(401).send({
      success: false,
      message: "Invalid refresh token",
    });
  }

  const stored = await req.JwtService.getAcessTokenByToken(refreshToken);

  if (!stored || stored.revoked || stored.expiresAt < new Date()) {
    return rep.status(401).send({
      success: false,
      message: "Refresh token expired or revoked",
    });
  }

  const revokeRefreshToken =
    req.JwtService.revokeRefreshTokenByToken(refreshToken);
  if (!revokeRefreshToken)
    return rep.status(500).send({ sucess: false, message: "unkwnown error" });

  const newAccessToken = req.JwtService.generateAccessToken(payload);
  const newRefreshToken = await req.JwtService.generateRefreshToken(payload, req.ip, req.headers["user-agent"] || "")

  rep.setCookie("refreshToken", newRefreshToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  rep.setCookie("accessToken", newAccessToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 15, // 15 min
  });

  return rep.code(200).send({
    success: true,
    data: {
      accessToken: newAccessToken,
    },
  });
};
